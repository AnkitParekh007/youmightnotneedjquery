import { Component, Inject, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from "@angular/forms";

import { MatCheckboxChange } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { distinctUntilChanged, map } from "rxjs/operators";
import { untilDestroyed } from "@app/core";

import { SharedService } from "@app/services/shared.service";

import { UserSelectionValidator } from "@app/directives/custom-validators/user-selection-validators";
declare var jQuery: any;

@Component({
	selector: "add-domain-dialog",
	templateUrl: "./add-domain-popup.component.html",
	styleUrls: ["./add-domain-popup.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class AddDomainComponent implements OnInit {
	addDomainForm: FormGroup;
	error: string;
	isLoading = false;
	labels:any;
	submitted = false;
	isNameFieldFocused = true;
	popupData: any;
	uiExpPanels: any = [
		{ id: 1, entity: "TAXONOMY", label: "Taxonomy Edits" },
		{ id: 2, entity: "SKU", label: "SKU Authoring" },
		{ id: 3, entity: "SCHEMA", label: "Schema Modifications" }
	];
	currentDomains: any = [];
	reviewConfig: any = {
		reviewToggle: false,
		rules: [],
		ruleControls: []
	};

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private dialogRef: MatDialogRef<AddDomainComponent>,
		private formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef,
		public sharedService: SharedService
	) {
		this.popupData = data.data.data;
		this.currentDomains = this.popupData.allDomainData.map((x) => x.domainName);
		this.labels = this.sharedService.labelsService.terms;
	}

	handleFormChanges() {
		this.addDomainForm
			.get("reviewToggle")
			.valueChanges.pipe(distinctUntilChanged(), untilDestroyed(this))
			.subscribe((isSelected) => {
				this.reviewConfig.reviewToggle = isSelected;
				if (this.reviewConfig.reviewToggle) {
					this.sharedService.uiService.scrollToBottom($(".scrollableSection"));
				}
			});
	}

	toggleReviewers(_event: MatCheckboxChange, _rule: any, _configRule: any, _ruleIndex: any) {
		if (_rule.controls.ruleEnabled.value) {
			_rule.controls.ruleUser.enable();
		} else {
			_rule.controls.ruleUser.disable();
		}
		_rule.controls.ruleUser.patchValue("");
	}

	isValidCheck(fieldName: string) {
		return this.addDomainForm.controls[fieldName].invalid && (this.addDomainForm.controls[fieldName].dirty || this.addDomainForm.controls[fieldName].touched);
	}

	getErrorMessage(fieldName: string) {
		if (fieldName == "name") {
			return this.addDomainForm.controls.domainName.hasError("required")
				? this.labels.HIERARCHY +" Name is Required"
				: this.addDomainForm.controls.domainName.hasError("noneOf")
				? this.labels.HIERARCHY +" Name already exist"
				: "";
		} else if (fieldName == "description") {
			return this.addDomainForm.controls.domainDescription.hasError("required") ? this.labels.HIERARCHY +" Description is Required" : "";
		}
	}

	displayReviewerFn(user: any): string {
		return user ? user.userFirstName + " " + user.userLastName : "";
	}

	getCatalogDomainReviewPrivileges() {
		const $t = this;
		let api = $t.sharedService.urlService.simpleApiCall("catalogDomainReviewPrivileges");
		api = $t.sharedService.urlService.addQueryStringParm(api, "catalogId", $t.sharedService.uiService.getCatStore.catalogsPage.selectedCatalog.catalogKey);
		$t.sharedService.configService
			.get(api)
			.pipe(distinctUntilChanged(), untilDestroyed($t))
			.subscribe((data: any) => {
				if (data.length) {
					$t.reviewConfig.rules = data;
					$t.reviewConfig.rules.forEach((r: any, rIndex: any) => {
						$t.reviewConfig.rules[rIndex].filteredUsers = r.users;
						$t.addReviewers(r.users);
					});
				}
			});
	}

	get reviewersRules() {
		return this.addDomainForm.get("review_rules") as FormArray;
	}

	addReviewers(_ruleUsers: any) {
		this.reviewersRules.push(
			this.formBuilder.group({
				ruleEnabled: false,
				ruleUser: new FormControl(
					{
						value: "",
						disabled: true
					},
					[
						RxwebValidators.compose({
							validators: [
								RxwebValidators.required({
									conditionalExpression: (x) => x.ruleEnabled
								}),
								UserSelectionValidator
							]
						})
					]
				)
			})
		);
	}

	filterUsers(searchedValue: string, ruleIndex: any) {
		this.reviewConfig.rules[ruleIndex].filteredUsers =
			searchedValue == ""
				? this.reviewConfig.rules[ruleIndex].users
				: this.reviewConfig.rules[ruleIndex].users.filter((option: any) => {
						return (
							option.userFirstName.toLowerCase().includes(searchedValue) ||
							option.userLastName.toLowerCase().includes(searchedValue) ||
							option.userEmailId.toLowerCase().includes(searchedValue)
						);
				  });
	}

	addDomainToDatabase() {
		this.submitted = true;
		if (this.addDomainForm.invalid) {
			return;
		}
		if (this.reviewConfig.reviewToggle) {
			const totalReviewerRules = this.addDomainForm.value.review_rules;
			const reviewerRuleSelections = this.addDomainForm.value.review_rules.filter((r) => !r.ruleEnabled);
			if (totalReviewerRules.length == reviewerRuleSelections.length) {
				this.warnAboutNoReviewSelectionMade();
				return;
			} else {
				this.addDomainForm.value["rules"] = this.reviewConfig.rules;
			}
		}
		this.popupData.onSubmit(this.addDomainForm.value);
	}

	addDomainToDatabaseWithoutReviewDetails() {
		this.reviewConfig.reviewToggle = false;
		this.addDomainForm.value.reviewToggle = this.reviewConfig.reviewToggle;
		this.popupData.onSubmit(this.addDomainForm.value);
	}

	warnAboutNoReviewSelectionMade() {
		const $t = this;
		$t.sharedService.plugins.swal
			.fire({
				title: "Please confirm",
				text: "Review Mode is enabled but no reviewer has been assigned. Still want to continue ?",
				type: "question",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Proceed"
			})
			.then((result) => {
				if (result.value) {
					$t.addDomainToDatabaseWithoutReviewDetails();
				}
			});
	}

	ngOnInit() {
		const $t = this;
		$t.addDomainForm = $t.formBuilder.group({
			domainName: new FormControl("", [Validators.required, RxwebValidators.noneOf({ matchValues: $t.currentDomains })]),
			domainDescription: new FormControl("", [Validators.required]),
			reviewToggle: false,
			review_rules: $t.formBuilder.array([]),
			ckbToggle: false
		});
		$t.handleFormChanges();
		$t.getCatalogDomainReviewPrivileges();
	}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	ngOnDestroy() {}
}
