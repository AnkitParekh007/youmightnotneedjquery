import { Component, Inject, OnInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
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
	selector: "edit-domain-dialog",
	templateUrl: "./edit-domain-popup.component.html",
	styleUrls: ["./edit-domain-popup.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class EditDomainComponent implements OnInit {
	popupData: any;
	uds: any;
	labels:any;
	editDomainForm: FormGroup;
	error: string;
	isLoading = false;
	submitted = false;
	uiExpPanels: any = [
		{ id: 1, entity: "TAXONOMY", label: "Taxonomy Edits" },
		{ id: 2, entity: "SKU", label: "SKU Authoring" },
		{ id: 3, entity: "SCHEMA", label: "Schema Modifications" }
	];
	currentDomains: any = [];
	reviewConfig: any = {
		configurations: [],
		reviewToggle: false,
		rules: [],
		ruleControls: []
	};
	ckbToggle = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private dialogRef: MatDialogRef<EditDomainComponent>,
		private formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef,
		public sharedService: SharedService
	) {
		this.popupData = data.data.data;
		this.uds = this.sharedService.plugins.undSco;
		this.labels = this.sharedService.labelsService.terms;
		this.currentDomains = this.popupData.allDomainData.map((x) => x.domainName);
		this.currentDomains = this.currentDomains.filter((x) => x != this.popupData.domainData.domainName);
		this.ckbToggle = this.popupData.domainData.aiModeActive;
		this.reviewConfig.reviewToggle = this.popupData.domainData.reviewModeActive;
		if (this.reviewConfig.reviewToggle) {
			this.reviewConfig.configurations = this.popupData.domainData.reviewerConfigurations;
		}
	}

	isValidCheck(fieldName: string) {
		return this.editDomainForm.controls[fieldName].invalid && (this.editDomainForm.controls[fieldName].dirty || this.editDomainForm.controls[fieldName].touched);
	}

	getErrorMessage(fieldName: string) {
		if (fieldName == "name") {
			return this.editDomainForm.controls.domainName.hasError("required")
				? this.labels.HIERARCHY +" Name is Required"
				: this.editDomainForm.controls.domainName.hasError("noneOf")
				? this.labels.HIERARCHY +" Name already exist"
				: "";
		} else if (fieldName == "description") {
			return this.editDomainForm.controls.domainDescription.hasError("required") ? this.labels.HIERARCHY +" Description is Required" : "";
		}
	}

	displayReviewerFn(user: any): string {
		return user ? user.userFirstName + " " + user.userLastName : "";
	}

	toggleReviewers(_event: MatCheckboxChange, _rule: any, _configRule: any, _ruleIndex: any) {
		if (_rule.controls.ruleEnabled.value) {
			_rule.controls.ruleUser.enable();
		} else {
			_rule.controls.ruleUser.disable();
		}
		_rule.controls.ruleUser.patchValue("");
	}

	handleFormChanges() {
		this.editDomainForm
			.get("reviewToggle")
			.valueChanges.pipe(distinctUntilChanged(), untilDestroyed(this))
			.subscribe((isSelected) => {
				this.reviewConfig.reviewToggle = isSelected;
				if (this.reviewConfig.reviewToggle) {
					this.sharedService.uiService.scrollToBottom($(".scrollableSection"));
				}
			});
	}

	setCatalogDomainReviewPrivileges() {
		const $t = this;
		if ($t.reviewConfig.reviewToggle) {
			$t.editDomainForm.get("reviewToggle").patchValue(true);
		}
		if ($t.ckbToggle) {
			$t.editDomainForm.get("ckbToggle").patchValue(true);
		}
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
						$t.setReviewers(r);
					});
				}
			});
	}

	get reviewersRules() {
		return this.editDomainForm.get("review_rules") as FormArray;
	}

	setReviewers(_rule: any) {
		const $t = this;
		let existentRule;
		let isRuleSet = false;
		let setUserKey = "";
		let setUser = {};

		if ($t.reviewConfig.configurations.length) {
			existentRule = $t.reviewConfig.configurations.find((u) => parseInt(u.userActionKey) == parseInt(_rule.actionKey));
			isRuleSet = !$t.uds.isUndefined(existentRule);
			setUserKey = isRuleSet ? existentRule.reviewerUserKey : "";
			setUser = isRuleSet ? _rule.users.find((u) => parseInt(u.userKey) == parseInt(setUserKey)) : "";
		}

		this.reviewersRules.push(
			this.formBuilder.group({
				ruleEnabled: isRuleSet ? true : false,
				ruleUser: new FormControl(
					{
						value: isRuleSet ? setUser : "",
						disabled: isRuleSet ? false : true
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

	editdomainInDatabase() {
		this.submitted = true;
		if (this.editDomainForm.invalid) {
			return;
		}
		if (this.reviewConfig.reviewToggle) {
			const totalReviewerRules = this.editDomainForm.value.review_rules;
			const reviewerRuleSelections = this.editDomainForm.value.review_rules.filter((r) => !r.ruleEnabled);
			if (totalReviewerRules.length == reviewerRuleSelections.length) {
				this.warnAboutNoReviewSelectionMade();
				return;
			} else {
				this.editDomainForm.value["rules"] = this.reviewConfig.rules;
			}
		}
		this.popupData.onSubmit(this.editDomainForm.value);
	}

	editDomainToDatabaseWithoutReviewDetails() {
		this.reviewConfig.reviewToggle = false;
		this.editDomainForm.value.reviewToggle = this.reviewConfig.reviewToggle;
		this.popupData.onSubmit(this.editDomainForm.value);
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
					$t.editDomainToDatabaseWithoutReviewDetails();
				}
			});
	}

	ngOnInit() {
		this.editDomainForm = this.formBuilder.group({
			domainName: new FormControl(this.popupData.domainData.domainName, [Validators.required, RxwebValidators.noneOf({ matchValues: this.currentDomains })]),
			domainDescription: new FormControl(this.popupData.domainData.domainDescription, [Validators.required]),
			reviewToggle: false,
			review_rules: this.formBuilder.array([]),
			ckbToggle: false
		});
		this.handleFormChanges();
		this.setCatalogDomainReviewPrivileges();
	}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	ngOnDestroy() {}
}
