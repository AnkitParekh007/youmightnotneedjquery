// core
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { untilDestroyed } from "@app/core";
import { distinctUntilKeyChanged } from "rxjs/operators";
import { MultilevelNodes, Configuration, MultilevelMenuService } from "ng-material-multilevel-menu";

// services
import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { SharedService } from "@app/services/shared.service";

//extras
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";
import { AMAZE_MATERIAL_ICONS } from "app/models/enums/amaze-material-icons.enums";
import { ISideNavLogo, SideNavImagePaths } from "@app/partials/sideNav/sideNav.constants";
import { AMAZE_COMMUNICATION_MESSAGES } from "@app/models/enums/amaze-communication-messages.enums";
import { SETIMEOUT_TIMER } from "@app/models/enums/common.enums";
import { environment } from "@env/environment";
import { SIDENAV_LABELS } from "@app/partials/sideNav/sideNav.labels";
import { primaryColor, secondartColor, sidenavSecondaryMenuBackground } from "theme/theme.constants";
import * as is from "is_js";

@Component({
	selector: "app-sidenav",
	templateUrl: "./sideNav.component.html",
	styleUrls: ["./sideNav.component.scss"],
	encapsulation: ViewEncapsulation.None,
	providers: [AuthenticationService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
	appState: any;
	isLoggedIn$: boolean = false;

	mainNavConfig: Configuration = {
		paddingAtStart        : false,
		classname             : "amaze-side-nav",
		listBackgroundColor   : primaryColor,
		fontColor             : sidenavSecondaryMenuBackground,
		backgroundColor       : primaryColor,
		selectedListFontColor : secondartColor,
		highlightOnSelect     : true,
		collapseOnSelect      : true,
		useDividers           : false,
		rtlLayout             : false
	};

	navConfig: Configuration = this.mainNavConfig;
	secondaryNavConfig: Configuration = {
		...this.mainNavConfig,
		classname: "amaze-side-nav catalog-menu"
	};

	navItems: MultilevelNodes[] = [
		{
			id: "products-link",
			label: SIDENAV_LABELS.PRODUCTS,
			icon: AMAZE_MATERIAL_ICONS.PRODUCTS,
			items: [
				{
					id: "view-my-products-link",
					label: SIDENAV_LABELS.VIEW_MY_PRODUCTS,
					icon: AMAZE_MATERIAL_ICONS.VIEW_MY_PRODUCTS,
					link: `/${AMAZE_ROUTE_PATHS.PRODUCT_LISTING}`
				},
				{
					id: "products-dashboard-link",
					label: SIDENAV_LABELS.PRODUCT_DASHBOARD,
					icon: AMAZE_MATERIAL_ICONS.PRODUCT_DASHBOARD,
					link: `/${AMAZE_ROUTE_PATHS.DASHBOARD}`
				},
				{
					id: "assortments-link",
					label: SIDENAV_LABELS.ASSORTMENTS,
					icon: AMAZE_MATERIAL_ICONS.ASSORTMENTS,
					link: `/${AMAZE_ROUTE_PATHS.ASSORTMENTS}`
				}
			]
		},
		{
			id: "catalog-link",
			label: SIDENAV_LABELS.CATALOG,
			icon: AMAZE_MATERIAL_ICONS.CATALOG,
			items: [
				{
					id: "all-catalogs-link",
					label: SIDENAV_LABELS.ALL_CATALOGS,
					icon: AMAZE_MATERIAL_ICONS.ALL_CATALOGS,
					link: `/${AMAZE_ROUTE_PATHS.CATALOGS}`
				},
				{
					id: "configure-catalog-link",
					label: SIDENAV_LABELS.CONFIGURE_CATALOG,
					icon: AMAZE_MATERIAL_ICONS.CONFIGURE_CATALOG,
					disabled: false,
					onSelected: function () {
						jQuery("#catalogListMenu, #mainMenu").toggleClass("d-none");
					}
				},
				{
					id: "domains-link",
					label: SIDENAV_LABELS.DOMAINS,
					icon: AMAZE_MATERIAL_ICONS.DOMAINS,
					link: `/${AMAZE_ROUTE_PATHS.DOMAINS}`
				},
				{
					id: "advance-sku-search-link",
					label: SIDENAV_LABELS.ADVANCED_SKU_SEARCH,
					icon: AMAZE_MATERIAL_ICONS.ADVANCED_SKU_SEARCH,
					link: `/${AMAZE_ROUTE_PATHS.PRODUCT_SEARCH}`
				},
				{
					id: "style-guide-link",
					label: SIDENAV_LABELS.STYLE_GUIDE,
					icon: AMAZE_MATERIAL_ICONS.STYLE_GUIDE,
					link: `/${AMAZE_ROUTE_PATHS.STYLE_GUIDE_REPORT}`
				},
				{
					id: "quality-metrics-link",
					label: SIDENAV_LABELS.QUALITY_METRICS,
					icon: AMAZE_MATERIAL_ICONS.QUALITY_METRICS,
					link: `/${AMAZE_ROUTE_PATHS.REPORTS}`
				},
				{
					id: "sku-attribute-lock-link",
					label: SIDENAV_LABELS.SKU_ATTRIBUTE_LOCK,
					icon: AMAZE_MATERIAL_ICONS.SKU_ATTRIBUTE_LOCK,
					link: `/${AMAZE_ROUTE_PATHS.ATTRIBUTE_VALUE_LOCK}`
				},
				{
					id: "validation-failure-link",
					label: SIDENAV_LABELS.VALIDATION_FAILURE,
					icon: AMAZE_MATERIAL_ICONS.VALIDATION_FAILURE,
					link: `/${AMAZE_ROUTE_PATHS.VALIDATION_FAILURE_MANAGEMENT}`
				},
				{
					id: "api-management-link",
					label: SIDENAV_LABELS.API_MANAGEMENT,
					icon: AMAZE_MATERIAL_ICONS.API_MANAGEMENT,
					link: `/${AMAZE_ROUTE_PATHS.PUBLIC_API}`
				},
				{
					id: "formula-master-link",
					label: SIDENAV_LABELS.FORMULA_MASTER,
					icon: AMAZE_MATERIAL_ICONS.FORMULA_MASTER,
					link: `/${AMAZE_ROUTE_PATHS.FORMULA_MASTER}`
				},
				{
					id: "pdp-template-link",
					label: SIDENAV_LABELS.PDP_TEMPLATE,
					icon: AMAZE_MATERIAL_ICONS.PDP_TEMPLATE,
					link: `/${AMAZE_ROUTE_PATHS.PDP_TEMPLATES}`
				}
			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		...((is.not.undefined(environment.GEN_AI_FEATURE) && is.truthy(environment.GEN_AI_FEATURE)) ? [{
				id: "gen-ai-link",
				label: SIDENAV_LABELS.GEN_AI_RULES,
				svgIcon: AMAZE_MATERIAL_ICONS.GEN_AI_RULES_WHITE,
				link: `/${AMAZE_ROUTE_PATHS.GEN_AI_RULES}`
			}] : []
		),
		{
			id: "channels-link",
			label: SIDENAV_LABELS.CHANNELS,
			icon: AMAZE_MATERIAL_ICONS.CHANNELS,
			hidden: true,
			items: [
				{
					id: "all-channels",
					label: SIDENAV_LABELS.ALL_CHANNELS,
					icon: AMAZE_MATERIAL_ICONS.CHANNELS,
					link: `/${AMAZE_ROUTE_PATHS.CHANNELS}`
				},
				{
					id: "launch-channel-link",
					label: SIDENAV_LABELS.LAUNCH_CHANNEL,
					icon: AMAZE_MATERIAL_ICONS.CONFIGURE_CATALOG,
					disabled: false,
					onSelected: function () {
						jQuery("#channelListMenu, #mainMenu").toggleClass("d-none");
					}
				},
				{
					id: "multiple-channel-dashboard",
					label: SIDENAV_LABELS.CHANNELS_DASHBOARD,
					icon: AMAZE_MATERIAL_ICONS.MULTI_CHANNEL_DASHBOARD,
					link: `/${AMAZE_ROUTE_PATHS.MULTI_CHANNEL_DASHBOARD}`
				},
				{
					id: "lookup-tabel-master",
					label: SIDENAV_LABELS.LOOKUP_TABLE_MASTER,
					icon: AMAZE_MATERIAL_ICONS.IMPORT_TEMPLATE,
					link: `/${AMAZE_ROUTE_PATHS.LOOKUP_TABLE_MASTER}`
				},

			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		{
			id: "workflows-link",
			label: SIDENAV_LABELS.WORKFLOW,
			icon: AMAZE_MATERIAL_ICONS.WORKFLOW,
			link: `/${AMAZE_ROUTE_PATHS.WORKFLOW}`
		},
		{
			id: "review-dashboard-link",
			label: SIDENAV_LABELS.REVIEW_DASHBOARD,
			icon: AMAZE_MATERIAL_ICONS.REVIEW_DASHBOARD,
			link: `/${AMAZE_ROUTE_PATHS.REVIEW_DASHBOARD}`
		},
		{
			id: "import-link",
			label: SIDENAV_LABELS.IMPORT,
			icon: AMAZE_MATERIAL_ICONS.IMPORT,
			items: [
				{
					id: "import-template-link",
					label:SIDENAV_LABELS.IMPORT_TEMPLATE,
					icon: AMAZE_MATERIAL_ICONS.IMPORT_TEMPLATE,
					link: `/${AMAZE_ROUTE_PATHS.IMPORTS_IMPORT_TEMPLATE}`
				},
				{
					id: "catalog-import-link",
					label:SIDENAV_LABELS.CATALOG_IMPORT,
					icon: AMAZE_MATERIAL_ICONS.CATALOG_IMPORT,
					link: `/${AMAZE_ROUTE_PATHS.IMPORTS_IMPORT_FILE}`
				},
				{
					id: "digital-asset-link",
					label: SIDENAV_LABELS.DIGITAL_ASSET_IMPORT,
					icon: AMAZE_MATERIAL_ICONS.DIGITAL_ASSET_IMPORT,
					link: `/${AMAZE_ROUTE_PATHS.ASSETS_LIBRARY_IMPORT}`
				}
			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		{
			id: "catalog-export-link",
			label: SIDENAV_LABELS.EXPORT,
			icon: AMAZE_MATERIAL_ICONS.CATALOG_EXPORT,
			items: [
				{
					id: "catalog-export-link",
					label: SIDENAV_LABELS.CATALOG_EXPORT,
					icon: AMAZE_MATERIAL_ICONS.CATALOG_EXPORT,
					link: `/${AMAZE_ROUTE_PATHS.EXPORTS_EXPORT_FILE}`
				},
				{
					id: "catalog-export-link",
					label: SIDENAV_LABELS.CUSTOM_EXPORT_TEMPLATE,
					icon: AMAZE_MATERIAL_ICONS.IMPORT_TEMPLATE,
					link: `/${AMAZE_ROUTE_PATHS.EXPORTS_EXPORT_TEMPLATE}`
				},

			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		{
			id: "connectors-link",
			label: SIDENAV_LABELS.CONNECTORS,
			icon: AMAZE_MATERIAL_ICONS.CONNECTORS,
			link: `/${AMAZE_ROUTE_PATHS.CONNECTORS}`
		},
		{
			id: "digital-asset-link",
			label: SIDENAV_LABELS.DIGITAL_ASSET,
			icon: AMAZE_MATERIAL_ICONS.DIGITAL_ASSET,
			items: [
				{
					id: "digital-asset-library-link",
					label: SIDENAV_LABELS.DIGITAL_ASSET_LIBRARY,
					icon: AMAZE_MATERIAL_ICONS.DIGITAL_ASSET_LIBRARY,
					link: `/${AMAZE_ROUTE_PATHS.ASSETS_LIBRARY}`
				},
				{
					id: "batch-edit-template-link",
					label: SIDENAV_LABELS.BATCH_EDIT_TEMPLATE,
					icon: AMAZE_MATERIAL_ICONS.BATCH_EDIT_TEMPLATE,
					link: `/${AMAZE_ROUTE_PATHS.ASSETS_BATCH_EDIT_PHOTO_BATCH_EDIT_TEMPLATES}`
				},
				{
					id: "batch-edit-operations-link",
					label: SIDENAV_LABELS.BATCH_EDIT_OPERATIONS,
					icon: AMAZE_MATERIAL_ICONS.BATCH_EDIT_OPERATIONS,
					link: `/${AMAZE_ROUTE_PATHS.ASSETS_BATCH_EDIT_PHOTO_BATCH_EDIT_OPERATIONS}`
				}
			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		{
			id: "bridge-synchronization-link",
			label: SIDENAV_LABELS.BRIDGE_SYNCHRONIZATION,
			icon: AMAZE_MATERIAL_ICONS.BRIDGE_SYNCHRONIZATION,
			items: [
				{
					id: "synchronization-requests-link",
					label:SIDENAV_LABELS.SYNCHRONIZATION_REQUESTS,
					icon: AMAZE_MATERIAL_ICONS.SYNCHRONIZATION_REQUESTS,
					link: `/${AMAZE_ROUTE_PATHS.ONE_TIME_SYNC}`
				},
				{
					id: "realtime-sync-linkages-link",
					label: SIDENAV_LABELS.REALTIME_SYNC_LINKAGES,
					icon: AMAZE_MATERIAL_ICONS.REALTIME_SYNC_LINKAGES,
					link: `/${AMAZE_ROUTE_PATHS.REAL_TIME_SYNC}`
				}
			],
			onSelected: this.convertToMaterialOutlineIcon
		}
	];
	secondaryNavItems: MultilevelNodes[] = [
		{
			id: "security-link",
			label: SIDENAV_LABELS.SECURITY,
			icon: AMAZE_MATERIAL_ICONS.SECURITY,
			items: [
				{
					id: "user-management-link",
					label: SIDENAV_LABELS.USER_MANAGEMENT,
					icon: AMAZE_MATERIAL_ICONS.USER,
					link: `/${AMAZE_ROUTE_PATHS.MANAGEMENT_USERS}`
				},
				{
					id: "role-management-link",
					label: SIDENAV_LABELS.ROLE_MANAGEMENT,
					icon: AMAZE_MATERIAL_ICONS.ROLE,
					link: `/${AMAZE_ROUTE_PATHS.MANAGEMENT_ROLES}`
				},
				{
					id: "user-groups-management-link",
					label: SIDENAV_LABELS.USER_GROUPS_MANAGEMENT,
					icon: AMAZE_MATERIAL_ICONS.GROUP,
					link: `/${AMAZE_ROUTE_PATHS.MANAGEMENT_GROUPS}`
				}
			],
			onSelected: this.convertToMaterialOutlineIcon
		},
		{
			id: "admin-link",
			label: SIDENAV_LABELS.ADMIN,
			icon: AMAZE_MATERIAL_ICONS.ADMIN,
			items: [
				{
					id: "external-file-location-setup-link",
					label: SIDENAV_LABELS.EXTERNAL_FILE_LOCATION,
					icon: AMAZE_MATERIAL_ICONS.EXPORT_FILE_LOCATION_SETUP,
					link: `/${AMAZE_ROUTE_PATHS.EXTERNAL_FILE_LOCATION_STEUP}`
				},

			],
			onSelected: this.convertToMaterialOutlineIcon
		},


		{
			id: "help-link",
			label: SIDENAV_LABELS.HELP,
			icon: AMAZE_MATERIAL_ICONS.HELP,
			link: `/${AMAZE_ROUTE_PATHS.HELP_CENTER_DOWNLOADS}`
		},
		{
			id: "logout-link",
			label: SIDENAV_LABELS.LOGOUT,
			icon: AMAZE_MATERIAL_ICONS.LOGOUT,
			link: `/${AMAZE_ROUTE_PATHS.LOGIN}`,
			onSelected: function () {
				this.logout();
			}
		}
	];
	menuCatalogItems: MultilevelNodes[] = [];
	menuChannelItems: MultilevelNodes[] = [];

	logoConfig: ISideNavLogo = {
		expandedImage: SideNavImagePaths.NEW_REGULAR_EXPANDED,
		collapsedImage: SideNavImagePaths.NEW_REGULAR_COLLAPSED
	};

	constructor(
		public authenticationService: AuthenticationService,
		public router: Router,
		public sharedService: SharedService,
		public cdr: ChangeDetectorRef,
		public multilevelMenuService: MultilevelMenuService
	) {
		this.isLoggedIn$ = this.authenticationService.loggedIn.value;
	}

	checkCurrentDate() {
		const $t = this;
		const specialDay = $t.sharedService.uiService.checkIsSpecialDay($t.sharedService.plugins.mom().format("YYYY-MM-DD"));
		if (typeof specialDay !== "undefined") {
			switch (specialDay) {
				case "Christmas Day":
				case "Christmas Eve":
					$t.logoConfig.expandedImage = SideNavImagePaths.CHRISTMAS_EXPANDED;
					$t.logoConfig.collapsedImage = SideNavImagePaths.CHRISTMAS_COLLAPSED;
					break;
			}
		}
	}

	setMenuItems(isChannel?: boolean) {
		const $t  = this;
		const isChannelContext = is.not.undefined(isChannel) && is.truthy(isChannel);
		const key = isChannelContext ? "Channel" : "Catalog";
		let sourceList = isChannelContext ? $t.sharedService.uiService.getChannelStore.channelsPage.channels : $t.appState.catalogsList;
			sourceList = $t.sharedService.plugins.undSco.sortBy(sourceList, (listItem) => isChannelContext ? listItem.name.toLowerCase() : listItem.catalogName.toLowerCase());

		isChannelContext ? ($t.menuChannelItems = []) : ($t.menuCatalogItems = []);

		$t.navItems.forEach((navItem: MultilevelNodes) => {
			if (navItem.icon == AMAZE_MATERIAL_ICONS.CATALOG || navItem.icon == AMAZE_MATERIAL_ICONS.DIGITAL_ASSET_LIBRARY) {
				navItem.items.forEach((subNavItem: MultilevelNodes) => {
					if (navItem.icon === AMAZE_MATERIAL_ICONS.CATALOG && subNavItem.icon === AMAZE_MATERIAL_ICONS.CONFIGURE_CATALOG) {
						subNavItem.disabled = is.empty($t.appState.catalogsList);
					}
					if (navItem.icon === AMAZE_MATERIAL_ICONS.DIGITAL_ASSET && (subNavItem.icon === AMAZE_MATERIAL_ICONS.BATCH_EDIT_TEMPLATE || subNavItem.icon === AMAZE_MATERIAL_ICONS.BATCH_EDIT_OPERATIONS)) {
						subNavItem.disabled = !$t.sharedService.privilegesService.checkPermission("da_edit");
					}
				});
			}
			if (navItem.icon === AMAZE_MATERIAL_ICONS.CHANNELS) {
				navItem.items[1].disabled = is.empty($t.sharedService.uiService.getChannelStore.channelsPage.channels);
			}
		});

		if (is.not.empty(sourceList)) {
			const innerMenuItem = {
				label      : "Back to Main Menu",
				icon       : AMAZE_MATERIAL_ICONS.BACK,
				onSelected :  () => {
					jQuery(`#${key.toLowerCase()}ListMenu, #mainMenu`).toggleClass("d-none");
				}
			};
			isChannelContext ? ($t.menuChannelItems.push(innerMenuItem)) : ($t.menuCatalogItems.push(innerMenuItem));
			sourceList.forEach((c: any) => {
				const innerMenuItem = {
					label: c[isChannel ? "name" : "catalogName"],
					icon: AMAZE_MATERIAL_ICONS.CATALOG_GENERIC,
					onSelected :  () => {
						$t.launchEntity(isChannel, c);
					}
				};
				isChannelContext ? ($t.menuChannelItems.push(innerMenuItem)) : ($t.menuCatalogItems.push(innerMenuItem));
			});
		}
		$t.sharedService.helperService.applyChanges($t.cdr);
	}

	launchEntity(isChannel: boolean, clickedEntity: any) {
		const $t = this;
		const contextStore  = isChannel ? $t.sharedService.uiService.getChannelStore : $t.sharedService.uiService.getCatStore;
		const validateStore = new Promise((res) => {
			if (is.empty(Object.keys(contextStore))){
				isChannel ? $t.sharedService.uiService.setChannelStore() : $t.sharedService.uiService.setCatStore();
			}
			res(null);
		});
		validateStore.then(() => {
			jQuery("#catalogListMenu, #mainMenu").toggleClass("d-none");
		}).then(() => {
			$t.sharedService["launch" + (isChannel ? "Channel" : "Catalog")](clickedEntity);
			if (jQuery("." + (isChannel ? "channel" : "catalog") + "-wrapper").length) {
				setTimeout(() => {
					window.location.reload();
				}, SETIMEOUT_TIMER.TIMER_10);
			}
		});
	}

	selectedNavItem(event: any) {
		if (this.sharedService.uiService.sideNavOperations("isOpen") && typeof event["link"] !== "undefined" && !this.sharedService.uiService.getAppStore.lockSidenav) {
			this.sharedService.uiService.sideNavOperations("expanded");
			jQuery(".amazeSideNav").addClass("amazeSideNavExpanded");
		}
	}

	logout() {
		const logouturl = this.sharedService.urlService.simpleApiCall("logout");
		this.sharedService.configService.delete(logouturl).subscribe((data: any) => {
			localStorage.removeItem("cc");
			localStorage.removeItem("googleAuthencticationParams");
			document.getElementsByTagName("BODY")[0].removeAttribute("clientcode");
			document.getElementsByTagName("BODY")[0].removeAttribute("googleAuthencticationParams");
			this.authenticationService.logout().subscribe(() => {
				this.sharedService.catalogLockService.closeLockSocket();
				this.sharedService.amazeStorageService.clearCompleteSessionStorage();
				this.router.navigate([`/${AMAZE_ROUTE_PATHS.LOGIN}`], {
					replaceUrl: true
				});
			});
		});
	}

	sideNavAction(_action) {
		!this.sharedService.uiService.getAppStore.lockSidenav ? this.sharedService.uiService.sideNavOperations(_action) : "";
	}

	convertToMaterialOutlineIcon() {
		setTimeout(() =>
			$(".amaze-side-nav").find(".material-icons").addClass("material-icons-outlined").removeClass("material-icons").css({ "font-size": "20px", display: "block" })
		);
	}

	initializeSideNavMenu(){
		const $t = this;
		if(is.not.null($t.sharedService.uiService.getChannelStore)){
			let which = (is.not.undefined(environment.GEN_AI_FEATURE) && is.truthy(environment.GEN_AI_FEATURE) ? 3 : 2);
			$t.navItems[which].hidden = is.empty($t.sharedService.uiService.getChannelStore.realms);
		}
		[ AMAZE_COMMUNICATION_MESSAGES.FETCHED_CATALOGS_FROM_PREVIEW_DETAILS, AMAZE_COMMUNICATION_MESSAGES.FETCHED_CHAANELS_FROM_CHANNEL_LISTING].forEach(message => {
			$t.sharedService.communicateService.on(message, (newState) => {
				const isChannel = message === AMAZE_COMMUNICATION_MESSAGES.FETCHED_CHAANELS_FROM_CHANNEL_LISTING;
				if(is.falsy(isChannel)){
					$t.appState = Object.assign({},  newState);
				};
				$t.setMenuItems(isChannel);
			});
		});
		$t.checkCurrentDate();
		$t.convertToMaterialOutlineIcon();
		$t.appState = $t.sharedService.uiService.getAppStore;
		$t.sharedService.sessionStorageService
			.observe("appstate")
			.pipe(distinctUntilKeyChanged("catalogsList"), untilDestroyed($t))
			.subscribe((result) => {
				if (is.not.undefined(result) && $t.sharedService.uiService.isValidJson(result)) {
					$t.appState = JSON.parse(result);
					$t.setMenuItems();
					$t.sharedService.helperService.applyChanges($t.cdr);
				}
			});
		$t.setMenuItems();
		$t.setMenuItems(true);
	}

	ngOnInit() {
		this.initializeSideNavMenu();
	}

	ngOnDestroy() {}
}
