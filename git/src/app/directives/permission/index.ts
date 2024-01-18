import { NgModule, ModuleWithProviders } from "@angular/core";
import { PermissionsDirective } from "./directive/permissions.directive";
import { PermissionsService, USE_PERMISSIONS_STORE } from "./service/permissions.service";
import { PermissionsGuard } from "./router/permissions-guard.service";
import { RolesService, USE_ROLES_STORE } from "./service/roles.service";
import { PermissionsStore } from "./store/permissions.store";
import { RolesStore } from "./store/roles.store";
import { PermissionsAllowStubDirective } from "./testing/permissions-allow.directive.stub";
import { PermissionsRestrictStubDirective } from "./testing/permissions-restrict.directive.stub";
import { PermissionsConfigurationService, USE_CONFIGURATION_STORE } from "./service/configuration.service";
import { PermissionsConfigurationStore } from "./store/configuration.store";

export * from "./store/roles.store";
export * from "./store/permissions.store";
export * from "./store/configuration.store";

export * from "./directive/permissions.directive";

export * from "./service/permissions.service";
export * from "./service/roles.service";
export * from "./service/configuration.service";

export * from "./router/permissions-guard.service";

export * from "./model/permissions-router-data.model";
export * from "./model/role.model";

export * from "./testing/permissions-allow.directive.stub";
export * from "./testing/permissions-restrict.directive.stub";

export * from "./enums/predefined-strategies.enum";

export interface PermissionsModuleConfig {
	// isolate the service instance, only works for lazy loaded modules or components with the "providers" property
	rolesIsolate?: boolean;
	permissionsIsolate?: boolean;
	configurationIsolate?: boolean;
}

@NgModule({
	imports: [],
	declarations: [PermissionsDirective],
	exports: [PermissionsDirective]
})
export class PermissionsModule {
	static forRoot(config: PermissionsModuleConfig = {}): ModuleWithProviders<PermissionsModule> {
		return {
			ngModule: PermissionsModule,
			providers: [
				PermissionsStore,
				RolesStore,
				PermissionsConfigurationStore,
				PermissionsService,
				PermissionsGuard,
				RolesService,
				PermissionsConfigurationService,
				{
					provide: USE_PERMISSIONS_STORE,
					useValue: config.permissionsIsolate
				},
				{ provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
				{
					provide: USE_CONFIGURATION_STORE,
					useValue: config.configurationIsolate
				}
			]
		};
	}

	static forChild(config: PermissionsModuleConfig = {}): ModuleWithProviders<PermissionsModule> {
		return {
			ngModule: PermissionsModule,
			providers: [
				{
					provide: USE_PERMISSIONS_STORE,
					useValue: config.permissionsIsolate
				},
				{ provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
				{
					provide: USE_CONFIGURATION_STORE,
					useValue: config.configurationIsolate
				},
				PermissionsConfigurationService,
				PermissionsService,
				RolesService,
				PermissionsGuard
			]
		};
	}
}

@NgModule({
	imports: [],
	declarations: [PermissionsAllowStubDirective],
	exports: [PermissionsAllowStubDirective]
})
export class PermissionsAllowStubModule {}

@NgModule({
	imports: [],
	declarations: [PermissionsRestrictStubDirective],
	exports: [PermissionsRestrictStubDirective]
})
export class PermissionsRestrictStubModule {}
