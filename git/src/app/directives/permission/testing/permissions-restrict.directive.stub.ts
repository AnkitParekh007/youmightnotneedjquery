import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from "@angular/core";
import { StrategyFunction } from "../service/configuration.service";

@Directive({
	selector: "[PermissionsOnly],[PermissionsExcept]"
})
export class PermissionsRestrictStubDirective implements OnInit {
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

	constructor(private viewContainer: ViewContainerRef) {}

	ngOnInit(): void {
		this.viewContainer.clear();
		if (this.getUnAuthorizedTemplate()) {
			this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
		}
		this.permissionsUnauthorized.emit();
	}

	private getUnAuthorizedTemplate() {
		return this.PermissionsOnlyElse || this.PermissionsExceptElse || this.PermissionsElse;
	}
}
