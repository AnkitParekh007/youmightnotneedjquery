import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from "@angular/core";
import { StrategyFunction } from "../service/configuration.service";

@Directive({
	selector: "[PermissionsOnly],[PermissionsExcept]"
})
export class PermissionsAllowStubDirective implements OnInit {
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

	constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

	ngOnInit(): void {
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
		this.permissionsUnauthorized.emit();
	}

	private getAuthorizedTemplate() {
		return this.PermissionsOnlyThen || this.PermissionsExceptThen || this.PermissionsThen || this.templateRef;
	}
}
