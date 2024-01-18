import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShellComponent } from "@app/shell/shell.component";
import { PublicGuard, ProtectedGuard } from "ngx-auth";
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";

const routes: Routes = [
	{
		path: AMAZE_ROUTE_PATHS.DEFAULT,
		component: ShellComponent,
		children: [
			{
				path: AMAZE_ROUTE_PATHS.LOGIN,
				canActivate: [PublicGuard],
				loadChildren: () => import("@app/scenes/authentication/login/login.module").then((m) => m.LoginModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.REGISTER,
				canActivate: [PublicGuard],
				loadChildren: () => import("@app/scenes/authentication/register/register.module").then((m) => m.RegisterModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.RESET_PASSWORD,
				canActivate: [PublicGuard],
				loadChildren: () => import("@app/scenes/authentication/forgotpassword/forgotpassword.module").then((m) => m.ForgotpasswordModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.GENERATE_PASSWORD,
				loadChildren: () => import("@app/scenes/authentication/forgotpassword/forgotpassword.module").then((m) => m.ForgotpasswordModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.PRODUCT_LISTING,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/products-dashboard/products-dashboard.module").then((m) => m.ProductsDashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CATALOGS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/catalog/catalogs/catalogs.module").then((m) => m.CatalogsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CATALOG,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/catalog/catalog/catalog.module").then((m) => m.CatalogModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.DOMAINS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/domains/domains.module").then((m) => m.DomainsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.DOMAIN_PROPERTIES,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/domains/domain-properties/domain-properties.module").then((m) => m.DomainPropertiesModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.DOMAIN_VALUES,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/domains/domain-values/domain-values.module").then((m) => m.DomainValuesModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.PRODUCT_SEARCH,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/product-search/product-search.module").then((m) => m.ProductSearchModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ATTRIBUTE_VALUE_LOCK,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/attribute-value-lock/attribute-value-lock.module").then((m) => m.AttributeValueLockModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CHANNELS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/channels/channels.module").then((m) => m.ChannelsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CHANNEL,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/channel/channel.module").then((m) => m.ChannelModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CHANNEL_ATTRIBUTE_MAPPING,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/channel-attribute-mapping/channel-attribute-mapping.module").then((m) => m.ChannelAttributeMappingModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CHANNEL_DASHBOARD,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/channel-dashboard/channel-dashboard.module").then((m) => m.ChannelDashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.MULTI_CHANNEL_DASHBOARD,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/multi-channel-dashboard/multi-channel-dashboard.module").then((m) => m.MultiChannelDashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.LOOKUP_TABLE_MASTER,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/channel/lookup-table-master/lookup-table-master.module").then((m) => m.LookupTableMasterModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.WORKFLOW,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/workflow/workflow.module").then((m) => m.WorkflowModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.REVIEW_DASHBOARD,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/review-dashboard/review.module").then((m) => m.ReviewDashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.COMING_SOON,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/comingsoon/soon.module").then((m) => m.SoonModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CONFIGURATION,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/configuration/configuration.module").then((m) => m.ConfigurationModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ASSETS_LIBRARY,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/dam/dam.module").then((m) => m.DamModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ASSETS_LIBRARY_IMPORT,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/dam-imports/dam-imports-module").then((m) => m.DamImportsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ASSETS_BATCH_EDIT_PHOTO_BATCH_EDIT_TEMPLATES,
				canActivate: [ProtectedGuard],
				loadChildren: () =>
					import("@app/scenes/dam-batch-edit/photo-batch-edit/batch-edit-templates/batch-edit-templates.module").then((m) => m.PhotoBatchEditTemplatesModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ASSETS_BATCH_EDIT_PHOTO_BATCH_EDIT_OPERATIONS,
				canActivate: [ProtectedGuard],
				loadChildren: () =>
					import("@app/scenes/dam-batch-edit/photo-batch-edit/batch-edit-operations/batch-edit-operations.module").then((m) => m.PhotoBatchEditOperationsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.REPORTS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/reports-dashboard/reports.module").then((m) => m.ReportsDashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.IMPORTS_IMPORT_FILE,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/import/import-file/import.module").then((m) => m.ImportModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.IMPORTS_IMPORT_TEMPLATE,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/import/import-template/import-template.module").then((m) => m.ImportTemplateModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.EXPORTS_EXPORT_FILE,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/export/export-file/export.module").then((m) => m.ExportModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.EXPORTS_EXPORT_TEMPLATE,
				canActivate: [ProtectedGuard],
				loadChildren: () =>
					import("@app/scenes/export/export-template/export-template.module").then(
						(m) => m.ExportTemplateModule
					)
			},
			{
				path: AMAZE_ROUTE_PATHS.STYLE_GUIDE_REPORT,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/style-guide-report/style-guide-report.module").then((m) => m.StyleGuideReportModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.MANAGEMENT_ROLES,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/management/roles/roles.module").then((m) => m.RoleManagementModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.MANAGEMENT_USERS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/management/users/users.module").then((m) => m.UserManagementModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.MANAGEMENT_GROUPS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/management/groups/groups.module").then((m) => m.GroupsManagementModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CONNECTORS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/connectors/connectors/connectors.module").then((m) => m.ConnectorsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.CONNECTOR_CONNECTORTYPE,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/connectors/connector/connector.module").then((m) => m.ConnectorModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.USER_PROFILE,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/user/user-profile.module").then((m) => m.UserProfileModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.SHORTCUTS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/shortcuts/shortcuts.module").then((m) => m.ShortcutsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ONE_TIME_SYNC,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/synchronization/sync-requests/sync-requests.module").then((m) => m.SyncRequestsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.REAL_TIME_SYNC,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/synchronization/realtime-sync-linkages/realtime-sync-linkages.module").then((m) => m.RealtimeSyncLinkagesModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.HELP_CENTER_DOWNLOADS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/help-center/downloadable/downloadable.module").then((m) => m.DownloadableModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.SUPER_ADMIN,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/super-admin/super-admin.module").then((m) => m.SuperAdminModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.VALIDATION_FAILURE_MANAGEMENT,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/validation-failure-management/validation-failure-management.module").then((m) => m.ValidationFailureManagementModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.PUBLIC_API,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/public-api/public-api.module").then((m) => m.PublicApiModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.FORMULA_MASTER,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/formula-master/formula-master.module").then((m) => m.ForumlaMasterModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.PDP_TEMPLATES,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/pdp/pdp.module").then((m) => m.PdpModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.DASHBOARD,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/dashboard/dashboard.module").then((m) => m.DashboardModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.ASSORTMENTS,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/assortments/assortments.module").then((m) => m.AssortmentsModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.GEN_AI_RULES,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/gen-ai/gen-ai.module").then((m) => m.GenAiModule)
			},
			// admin
			{
				path: AMAZE_ROUTE_PATHS.EXTERNAL_FILE_LOCATION_STEUP,
				canActivate: [ProtectedGuard],
				loadChildren: () => import("@app/scenes/ftp/ftp.module").then((m) => m.FtpModule)
			},
			{
				path: AMAZE_ROUTE_PATHS.DEFAULT,
				redirectTo: `/${AMAZE_ROUTE_PATHS.LOGIN}`,
				pathMatch: "full"
			}
		],
		data: { reuse: true }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShellRoutingModule {}
