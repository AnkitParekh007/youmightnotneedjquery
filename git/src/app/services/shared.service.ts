// core
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";
import { untilDestroyed } from "@app/core";


// commonly used servcies
import { ConfigService } from "@app/services/config.service";
import { UrlService } from "@app/services/url.service";
import { UiService } from "@app/services/ui.service";
import { AmazeStorageService } from "@app/services/storage.service";
import { DigitalAssetsService } from "@app/services/digitalAssets.service";
import { FancyTreeService } from "@app/services/fancytree.service";
import { UtilityService } from "@app/services/utility.service";
import { GridService } from "@app/services/grid.service";
import { ClipboardService } from "ngx-clipboard";
import { DialogService } from "@app/components/dialog/dialog.service";
import { ConfirmDialogService } from "@app/components/confirmdialog/confirm-dialog.service";
import { SessionStorageService } from "ngx-webstorage";
import { I18nService } from "@app/core";
import { HelperService } from "@app/services/helper.service";
import { PermissionsService } from "@app/directives/permission/service/permissions.service";
import { RolesService } from "@app/directives/permission//service/roles.service";
import { PrivilegesService } from "@app/services/privileges.service";
import { PopupService } from "@app/services/popup.service";
import { CommunicateService } from "@app/services/communicate.service";
import { AnalyticsService } from "@app/services/analytics.service";
import { CatalogLockService } from "@app/services/catalog-lock.service";
import { MockDataService } from "@app/core/mock-data/mock-data.service";
import { UiLabelsService } from "@app/services/ui-labels.service";

// Constants
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";
import { NODE_SEARCH_OPTIONS } from "@app/scenes/channel/channel/channel.constants";

// stores
import { AppStore, CatalogStore, DamStore, ImportStore, ChannelStore } from "@app/store/stores";
import * as moment from "moment";
import * as underscore from "underscore";
import * as loadash from "lodash";
import * as is from "is_js";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import { SETIMEOUT_TIMER } from "@app/models/enums/common.enums";

declare var jQuery: any;

@Injectable({
	providedIn: "root"
})
export class SharedService {
	public plugins: any = {};
	public stores: any = {};

	public x: any = {
		aInternal: 10,
		aListener: function (val) {},
		set a(val) {
			this.aInternal = val;
			this.aListener(val);
		},
		get a() {
			return this.aInternal;
		},
		registerListener: function (listener) {
			this.aListener = listener;
		}
	};

	constructor(
		public configService: ConfigService,
		public urlService: UrlService,
		public uiService: UiService,
		public sessionStorageService: SessionStorageService,
		public amazeStorageService: AmazeStorageService,
		public digitalAssetsService: DigitalAssetsService,
		public fancyTreeService: FancyTreeService,
		public utilityService: UtilityService,
		public gridService: GridService,
		public clipboardService: ClipboardService,
		public dialogService: DialogService,
		public confirmDialogService: ConfirmDialogService,
		public i18nService: I18nService,
		public helperService: HelperService,
		public permissionsService: PermissionsService,
		public rolesService: RolesService,
		public privilegesService: PrivilegesService,
		public popService: PopupService,
		public communicateService: CommunicateService,
		public analyticsService: AnalyticsService,
		public catalogLockService: CatalogLockService,
		public mockDataService : MockDataService,
		public labelsService : UiLabelsService,
		public router: Router
	) {
		this.initPlugins();
		this.initStores();
		this.initPermissions();
		this.catalogLockService.setServiceHelpers(this);
	}

	initPlugins() {
		this.plugins = {
			jQ     : jQuery,
			mom    : moment,
			lod    : loadash,
			undSco : underscore,
			fs     : saveAs,
			is     : is,
			swal   : Swal
		};
	}

	initStores() {
		this.stores = {
			appStore     : AppStore,
			catalogStore : CatalogStore,
			DamStore     : DamStore,
			ImportStore  : ImportStore,
			ChannelStore : ChannelStore
		};
	}

	initPermissions() {
		this.privilegesService.initiatePermissionsModule(this.permissionsService, this.rolesService);
		this.privilegesService.setPermissions();
	}

	setCatStore(catalog: any, domain?: any, catalogPrivCodes?: any) {
		const as = this.uiService.getAppStore;
		const cs = this.uiService.getCatStore;
		this.uiService.showApiStartPopMsg("Loading Catalog " + catalog.catalogName);
		cs.catalogsPage.selectedCatalog = catalog;
		cs.catalogPage.selectedCatalog =  catalog;
		if(this.plugins.is.undefined(domain) && this.plugins.is.undefined(domain)){
			cs.catalogPage.selectedDomain = catalog.domains[0];
		} else {
			cs.catalogPage.selectedDomain = this.plugins.is.not.undefined(catalog.selectedDomain) ? catalog.domains[0] : domain;
		}
		cs.catalogPage.catalogDomains  = catalog.domains;
		cs.taxonomyPanel.selectedNodes = [];
		this.plugins.is.not.undefined(catalogPrivCodes) ? (cs.catalogPage.currentCatalogPrivilegeCodes = Object.values(catalogPrivCodes)) : "";
		this.uiService.syncCatStore(cs);
	}

	launchCatalog(catalog: any, domain?: any) {
		this.setCatStore(catalog, domain);
		this.getUserCatalogPrivileges();
	}

	launchChannel(channel: any) {
		if(this.plugins.is.null(this.uiService.getChannelStore)){
			this.uiService.setChannelStore();
		}
		this.uiService.showApiStartPopMsg(`Loading Channel ${channel.name}`);
		const channelStore = this.uiService.getChannelStore;
		channelStore.channelsPage.selectedChannel = channel;
		channelStore.channelPage.currentChannel   = channel;
		["source", "target"].forEach(context => {
			channelStore.channelPage[context + "CatalogNodeSearch"].searchText = "";
			channelStore.channelPage[context + "CatalogNodeSearch"].clickedNode = null;
			channelStore.channelPage[context + "CatalogNodeSearch"].searchOption = NODE_SEARCH_OPTIONS[0];
			channelStore.channelPage[context + "CatalogNodeSearch"].nodeSearchList = [];
		});
		this.uiService.syncChannelStore(channelStore);
		this.router.navigate([AMAZE_ROUTE_PATHS.CHANNEL.replace(":channelId", channelStore.channelsPage.selectedChannel.id)]);
		setTimeout(() => this.uiService.closePopMsg());
	}

	launchChannelDashboard(channel: any) {
		if(this.plugins.is.null(this.uiService.getChannelStore)){
			this.uiService.setChannelStore();
		}
		const channelStore = this.uiService.getChannelStore;
		channelStore.channelsPage.selectedChannel = channel;
		channelStore.channelPage.currentChannel   = channel;
		this.uiService.syncChannelStore(channelStore);
		this.router.navigate([AMAZE_ROUTE_PATHS.CHANNEL_DASHBOARD.replace(":channelId", channelStore.channelsPage.selectedChannel.id)]);
	}

	setAmazeParams() {
		const $t = this;
		const appState = $t.uiService.getAppStore;
		if($t.plugins.is.empty(appState.amazeParams)) {
			setTimeout(() => jQuery(".amazeSideNav").addClass("disabled-state-default-cursor"), SETIMEOUT_TIMER.TIMER_2);
			const clientcode = $t.uiService.getClientCode();
			$t.configService
				.get($t.urlService.simpleApiCall("getAmazeParams"))
				.pipe(distinctUntilChanged(), untilDestroyed($t))
				.subscribe((data: any) => {
					if ($t.plugins.is.not.undefined(data)) {
						appState.amazeParams = data;
						$t.uiService.syncAppStore(appState);
					} else {
						$t.router.navigate(["/login"], { replaceUrl: true });
					}
					setTimeout(() => jQuery(".amazeSideNav").length ? jQuery(".amazeSideNav").removeClass("disabled-state-default-cursor") : "", SETIMEOUT_TIMER.TIMER_2);
				}, (e: any) => {
					$t.router.navigate(["/login"], { replaceUrl: true });
				});
		} else {
			setTimeout(() => jQuery(".amazeSideNav").length ? jQuery(".amazeSideNav").removeClass("disabled-state-default-cursor") : "", SETIMEOUT_TIMER.TIMER_2);
		}
	}

	getUserCatalogPrivileges() {
		const $t = this;
		const as = $t.uiService.getAppStore;
		const cs = $t.uiService.getCatStore;
		let userPrivilegeApiUrl = $t.urlService.apiCallWithParams("getPrivilegesForUser", {
			"{userId}": as.authorization.currentUserInfo.id
		});
		userPrivilegeApiUrl = $t.urlService.addQueryStringParm(userPrivilegeApiUrl, "catId", cs.catalogsPage.selectedCatalog.catalogKey);
		let userPrivilegeCodesApiUrl = $t.urlService.apiCallWithParams("getPrivilegeCodesForUser", {
			"{userId}": as.authorization.currentUserInfo.id
		});
		userPrivilegeCodesApiUrl = $t.urlService.addQueryStringParm(userPrivilegeCodesApiUrl, "catId", cs.catalogsPage.selectedCatalog.catalogKey);
		const userPrivilegeApiCall = $t.configService.get(userPrivilegeApiUrl);
		const userPrivilegeCodesApiCall = $t.configService.get(userPrivilegeCodesApiUrl);
		forkJoin(userPrivilegeApiCall, userPrivilegeCodesApiCall)
			.pipe(distinctUntilChanged(), untilDestroyed($t))
			.subscribe(([res1, res2]) => {
				if (res2[cs.catalogsPage.selectedCatalog.catalogKey].includes("catalog_open")) {
					cs.catalogPage.currentCatalogPrivileges = res1[cs.catalogsPage.selectedCatalog.catalogKey];
					cs.catalogPage.currentCatalogPrivilegeCodes = res2[cs.catalogsPage.selectedCatalog.catalogKey];
					$t.uiService.syncCatStore(cs);
					setTimeout(() => {
						$t.uiService.syncCatStore(cs);
						$t.uiService.closePopMsg();
						$t.router.navigate(["/catalog/" + cs.catalogsPage.selectedCatalog.catalogKey], {
							replaceUrl: true
						});
					}, SETIMEOUT_TIMER.TIMER_10);
				} else {
					$t.uiService.showApiErrorPopMsg("Not Authorized");
				}
			}, (e) => {
				$t.uiService.showApiErrorPopMsg(e.error);
			});
	}

	getLanguageConfig() {
		const $t = this;
		const appState = $t.uiService.getAppStore;
		if (appState.languageConfig.languages.length == 0) {
			const langApiCall    = $t.configService.get($t.urlService.simpleApiCall("getLanguages"));
			const autoSetApiCall = $t.configService.get($t.urlService.simpleApiCall("getAutoSetChoices"));
			forkJoin(langApiCall, autoSetApiCall)
				.pipe(distinctUntilChanged(), untilDestroyed($t))
				.subscribe((response: any) => {
					appState.languageConfig["languages"] = response[0].map(function(lang) {
						return {
							...lang,
							label: `${lang.languageInEnglish} (${lang.languageInLocal}) - ${lang.country}`
						}
					});
					appState.languageConfig["autoSetChoices"] = response[1].map(function(choice) {
						return {
							id    : choice.commonMasterKey,
							label : choice.displayName,
							value : choice.displayName.toUpperCase().replaceAll(" ", "_")
						}
					});
					$t.uiService.syncAppStore(appState);
				}, (error) => {
					$t.uiService.showApiErrorPopMsg(error.error);
				});
		}
	}

	showCatlogLockIndication(options:any){
		const $t = this;
		const { contextCatalog, beforeCheckCallback, afterCheckCallBack, alwaysCheckCallback } = options;
		const socketState = $t.uiService.getSocketStore;
		if (socketState.catalogSocket.catalogDetails.catalogId[0] == contextCatalog.catalogKey) {
			const currentLockState = socketState.catalogSocket.catalogDetails.actionType == "LOCK";
			if ($t.plugins.is.not.undefined(beforeCheckCallback) && $t.plugins.is.function(beforeCheckCallback)) {
				beforeCheckCallback(currentLockState);
			}
			const importLockMsg = contextCatalog.locked
				? "Catalog Import is in progress. <br><small>Disabling Some actions until the catalog import completes...</small>"
				: "Catalog import is completed.<br><small>Enabling actions...</small>";
			$t.plugins.swal
				.fire({
					title: "",
					html: '<p class="my-3 h3">' + importLockMsg + "</p>",
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false,
					backdrop: true,
					didOpen: () => {
						$t.plugins.swal.showLoading();
					}
				})
				.then((result) => {
					if (result.dismiss === $t.plugins.swal.DismissReason.timer) {
						if ($t.plugins.is.not.undefined(afterCheckCallBack) && $t.plugins.is.function(afterCheckCallBack)) {
							afterCheckCallBack(currentLockState);
						}
					}
				});
			if ($t.plugins.is.not.undefined(alwaysCheckCallback) && $t.plugins.is.function(alwaysCheckCallback)) {
				alwaysCheckCallback(currentLockState);
			}
		}
	}

	ngOnDestroy() {}
}
