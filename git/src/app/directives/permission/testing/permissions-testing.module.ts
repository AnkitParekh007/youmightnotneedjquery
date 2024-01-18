//
//
// import { PermissionsModule } from '../index';
// import { NgModule } from '@angular/core';
//
// @NgModule({
//     exports: [PermissionsModule],
//     providers: [
//         {provide: PermissionsStore, useClass: PermissionsMockStore},
//         {provide: RolesStore, useClass: PermissionsMockStore},
//         {provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader}, {
//             provide: Router,
//             useFactory: setupTestingRouter,
//             deps: [
//                 UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
//                 ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
//             ]
//         },
//         {provide: PreloadingStrategy, useExisting: NoPreloading}, provideRoutes([])
//     ]
// })
// export class RouterTestingModule {
//     static withRoutes(routes: Routes, config?: ExtraOptions): ModuleWithProviders {
//         return {
//             ngModule: RouterTestingModule,
//             providers: [
//                 provideRoutes(routes),
//                 {provide: ROUTER_CONFIGURATION, useValue: config ? config : {}},
//             ]
//         };
//     }
// }
//
// // ngModule: PermissionsModule,
// //     providers: [
// //     PermissionsStore,
// //     RolesStore,
// //     PermissionsService,
// //     PermissionsGuard,
// //     RolesService,
// //     {provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate},
// //     {provide: USE_ROLES_STORE, useValue: config.rolesIsolate},
// // ]
