import { ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { merge, Subscription } from "rxjs";
import { skip, take } from "rxjs/operators";
import { PermissionsPredefinedStrategies } from "../enums/predefined-strategies.enum";
import { PermissionsConfigurationService, StrategyFunction } from "../service/configuration.service";
import { PermissionsService } from "../service/permissions.service";
import { RolesService } from "../service/roles.service";
import { isBoolean, isFunction, isString, notEmptyValue } from "../utils/utils";

@Directive({
	selector: "[PermissionsOnly],[PermissionsExcept]"
})
export class PermissionsDirective implements OnInit, OnDestroy, OnChanges {
	@Input() PermissionsOnly: string | string[];
	@Input() PermissionsOnlyThen: TemplateRef<any>;
	@Input() PermissionsOnlyElse: TemplateRef<any>;

	@Input() PermissionsExcept: string | string[];
	@Input() PermissionsExceptElse: TemplateRef<any>;
	@Input() PermissionsExceptThen: TemplateRef<any>;

	@Input() PermissionsThen: TemplateRef<any>;
	@Input() PermissionsElse: TemplateRef<any>;

	@Input() PermissionsOnlyAuthorisedStrategy: string | StrategyFunction;
	@Input() PermissionsOnlyUnauthorisedStrategy: string | StrategyFunction;

	@Input() PermissionsExceptUnauthorisedStrategy: string | StrategyFunction;
	@Input() PermissionsExceptAuthorisedStrategy: string | StrategyFunction;

	@Input() PermissionsUnauthorisedStrategy: string | StrategyFunction;
	@Input() PermissionsAuthorisedStrategy: string | StrategyFunction;

	@Output() permissionsAuthorized = new EventEmitter();
	@Output() permissionsUnauthorized = new EventEmitter();

	private initPermissionSubscription: Subscription;
	// skip first run cause merge will fire twice
	private firstMergeUnusedRun = 1;
	private currentAuthorizedState: boolean;

	constructor(
		private permissionsService: PermissionsService,
		private configurationService: PermissionsConfigurationService,
		private rolesService: RolesService,
		private viewContainer: ViewContainerRef,
		private changeDetector: ChangeDetectorRef,
		private templateRef: TemplateRef<any>
	) {}

	ngOnInit(): void {
		this.viewContainer.clear();
		this.initPermissionSubscription = this.validateExceptOnlyPermissions();
	}

	ngOnChanges(changes: SimpleChanges): void {
		const onlyChanges = changes.PermissionsOnly;
		const exceptChanges = changes.PermissionsExcept;
		if (onlyChanges || exceptChanges) {
			// Due to bug when you pass empty array
			if (onlyChanges && onlyChanges.firstChange) {
				return;
			}
			if (exceptChanges && exceptChanges.firstChange) {
				return;
			}

			merge(this.permissionsService.permissions$, this.rolesService.roles$)
				.pipe(skip(this.firstMergeUnusedRun), take(1))
				.subscribe(() => {
					if (notEmptyValue(this.PermissionsExcept)) {
						this.validateExceptAndOnlyPermissions();
						return;
					}

					if (notEmptyValue(this.PermissionsOnly)) {
						this.validateOnlyPermissions();
						return;
					}

					this.handleAuthorisedPermission(this.getAuthorisedTemplates());
				});
		}
	}

	ngOnDestroy(): void {
		if (this.initPermissionSubscription) {
			this.initPermissionSubscription.unsubscribe();
		}
	}

	private validateExceptOnlyPermissions(): Subscription {
		return merge(this.permissionsService.permissions$, this.rolesService.roles$)
			.pipe(skip(this.firstMergeUnusedRun))
			.subscribe(() => {
				if (notEmptyValue(this.PermissionsExcept)) {
					this.validateExceptAndOnlyPermissions();
					return;
				}

				if (notEmptyValue(this.PermissionsOnly)) {
					this.validateOnlyPermissions();
					return;
				}
				this.handleAuthorisedPermission(this.getAuthorisedTemplates());
			});
	}

	private validateExceptAndOnlyPermissions(): void {
		Promise.all([this.permissionsService.hasPermission(this.PermissionsExcept), this.rolesService.hasOnlyRoles(this.PermissionsExcept)])
			.then(([hasPermission, hasRole]) => {
				if (hasPermission || hasRole) {
					this.handleUnauthorisedPermission(this.PermissionsExceptElse || this.PermissionsElse);
					return;
				}

				if (!!this.PermissionsOnly) {
					throw false;
				}

				this.handleAuthorisedPermission(this.PermissionsExceptThen || this.PermissionsThen || this.templateRef);
			})
			.catch(() => {
				if (!!this.PermissionsOnly) {
					this.validateOnlyPermissions();
				} else {
					this.handleAuthorisedPermission(this.PermissionsExceptThen || this.PermissionsThen || this.templateRef);
				}
			});
	}

	private validateOnlyPermissions(): void {
		Promise.all([this.permissionsService.hasPermission(this.PermissionsOnly), this.rolesService.hasOnlyRoles(this.PermissionsOnly)])
			.then(([hasPermissions, hasRoles]) => {
				if (hasPermissions || hasRoles) {
					this.handleAuthorisedPermission(this.PermissionsOnlyThen || this.PermissionsThen || this.templateRef);
				} else {
					this.handleUnauthorisedPermission(this.PermissionsOnlyElse || this.PermissionsElse);
				}
			})
			.catch(() => {
				this.handleUnauthorisedPermission(this.PermissionsOnlyElse || this.PermissionsElse);
			});
	}

	private handleUnauthorisedPermission(template: TemplateRef<any>): void {
		if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState) {
			return;
		}

		this.currentAuthorizedState = false;
		this.permissionsUnauthorized.emit();

		if (this.getUnAuthorizedStrategyInput()) {
			this.applyStrategyAccordingToStrategyType(this.getUnAuthorizedStrategyInput());
			return;
		}

		if (this.configurationService.onUnAuthorisedDefaultStrategy && !this.elseBlockDefined()) {
			this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
		} else {
			this.showTemplateBlockInView(template);
		}
	}

	private handleAuthorisedPermission(template: TemplateRef<any>): void {
		if (isBoolean(this.currentAuthorizedState) && this.currentAuthorizedState) {
			return;
		}

		this.currentAuthorizedState = true;
		this.permissionsAuthorized.emit();

		if (this.getAuthorizedStrategyInput()) {
			this.applyStrategyAccordingToStrategyType(this.getAuthorizedStrategyInput());
			return;
		}

		if (this.configurationService.onAuthorisedDefaultStrategy && !this.thenBlockDefined()) {
			this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
		} else {
			this.showTemplateBlockInView(template);
		}
	}

	private applyStrategyAccordingToStrategyType(strategy: string | StrategyFunction): void {
		if (isString(strategy)) {
			this.applyStrategy(strategy);
			return;
		}

		if (isFunction(strategy)) {
			this.showTemplateBlockInView(this.templateRef);
			(strategy as StrategyFunction)(this.templateRef);
			return;
		}
	}

	private showTemplateBlockInView(template: TemplateRef<any>): void {
		this.viewContainer.clear();
		if (!template) {
			return;
		}

		this.viewContainer.createEmbeddedView(template);
		this.changeDetector.markForCheck();
	}

	private getAuthorisedTemplates(): TemplateRef<any> {
		return this.PermissionsOnlyThen || this.PermissionsExceptThen || this.PermissionsThen || this.templateRef;
	}

	private elseBlockDefined(): boolean {
		return !!this.PermissionsExceptElse || !!this.PermissionsElse;
	}

	private thenBlockDefined() {
		return !!this.PermissionsExceptThen || !!this.PermissionsThen;
	}

	private getAuthorizedStrategyInput() {
		return this.PermissionsOnlyAuthorisedStrategy || this.PermissionsExceptAuthorisedStrategy || this.PermissionsAuthorisedStrategy;
	}

	private getUnAuthorizedStrategyInput() {
		return this.PermissionsOnlyUnauthorisedStrategy || this.PermissionsExceptUnauthorisedStrategy || this.PermissionsUnauthorisedStrategy;
	}

	private applyStrategy(str: any) {
		if (str === PermissionsPredefinedStrategies.SHOW) {
			this.showTemplateBlockInView(this.templateRef);
			return;
		}

		if (str === PermissionsPredefinedStrategies.REMOVE) {
			this.viewContainer.clear();
			return;
		}
		const strategy = this.configurationService.getStrategy(str);
		this.showTemplateBlockInView(this.templateRef);
		strategy(this.templateRef);
	}
}
