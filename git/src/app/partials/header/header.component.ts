import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit, ViewEncapsulation, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, Event } from "@angular/router";
import { filter, delay, debounceTime } from "rxjs/operators";
import { untilDestroyed } from "@app/core";
import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { I18nService } from "@app/core";
import { SharedService } from "@app/services/shared.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	encapsulation: ViewEncapsulation.None,
	providers: [AuthenticationService, I18nService]
})
export class HeaderComponent implements OnInit {
	@Output() lockToggle = new EventEmitter<boolean>();
	public isLoggedIn$       : boolean;
	public loggedInUser      : any = {};
	public elem              : any;
	public isFullScreen      = false;
	public appState          : any;
	public catState          : any;
	public recentCatalog     : any = undefined;
	public isMiniLaunch      = false;
	public isLoading         = true;
	public selectedCatalog   : any;
	public is                : any;
	private catalogState: any = {
		isFloating    : false,
		isFetching    : true,
		isFound       : true,
		catalogs      : [],
		selected      : {}
	};

	constructor(
		@Inject(DOCUMENT) public document: any,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public authenticationService: AuthenticationService,
		public i18nService: I18nService,
		public sharedService: SharedService,
		public cdr: ChangeDetectorRef
	) {
		this.init();
	}

	lockSideNav(_event: any) {
		this.appState.lockSidenav = _event.checked;
		this.sharedService.uiService.syncAppStore(this.appState);
	}

	launchChannelDashboard() {
		this.sharedService.launchChannelDashboard(this.sharedService.uiService.getChannelStore.channelsPage.selectedChannel);
	}

	get isChannelPage() {
		var currentPage = this.sharedService.uiService.currentPage();
		return currentPage.indexOf("channel/") != -1 && currentPage.indexOf("dashboard") == -1;
	}

	checkLocation() {
		var loc = location.hash.replace("#/", "");
		return loc != "dashboard" && loc != "products";
	}

	init() {
		this.isLoggedIn$ = this.authenticationService.isUserSigned();
		this.elem = document.documentElement;
		this.is = this.sharedService.plugins.is;
		this.appState = this.sharedService.uiService.getAppStore;
		this.catState = this.sharedService.uiService.getCatStore;
		this.recentCatalog = this.showRecentCatalog() ? this.appState.recentlyVisitedCatalog.catalog : undefined;
	}

	startObservingRouteAndStoreChanges() {
		this.sharedService.sessionStorageService
			.observe("appState")
			.pipe(delay(1000), debounceTime(1000), untilDestroyed(this))
			.subscribe((result) => {
				if (typeof result !== "undefined" && this.sharedService.uiService.isValidJson(result)) {
					this.appState = JSON.parse(result);
					this.setRecentCatalogForHeader();
				}
			});

		// look for appState on route change
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.pipe(delay(1000), debounceTime(1000), untilDestroyed(this))
			.subscribe((event: Event) => {
				this.appState = this.sharedService.uiService.getAppStore;
				this.setRecentCatalogForHeader();
				this.invokeCatalogLockSocket();
				this.startIdlenessCheck();
			});
	}

	startIdlenessCheck() {
		setTimeout(() => {
			this.sharedService.uiService.initUserInactivtyCheck();
		}, 100);
	}

	invokeCatalogLockSocket() {
		if (!this.router.url.includes("catalogs")) {
			this.sharedService.catalogLockService.setServiceHelpers(this.sharedService);
		}
	}

	setRecentCatalogForHeader() {
		if (!this.router.url.includes("catalog/")) {
			this.recentCatalog = this.showRecentCatalog() ? this.appState.recentlyVisitedCatalog.catalog : undefined;
		} else {
			this.recentCatalog = undefined;
			setTimeout(() => { jQuery('#amaze-contextual-language-selector').css('right', jQuery(window).width() - jQuery(".lock-sidenav-toggle").position().left + 'px'); }, 3500);
		}
	}

	showRecentCatalog() {
		let result = false;
		const rvc = this.appState.recentlyVisitedCatalog;
		if(this.is.not.undefined(rvc) && this.is.not.empty(rvc)){
			this.isMiniLaunch = window.location.hash.includes("export-file/new") ||
			window.location.hash.includes("validation-failure-management") ||
			window.location.hash.includes("product-listing") ||
			window.location.hash.includes("channel");
			result = (
				this.is.not.undefined(rvc.catalogPrivilegeCodes) &&
				this.is.not.empty(rvc.catalogPrivilegeCodes) &&
				Object.values(rvc.catalogPrivilegeCodes).includes("catalog_open") &&
				Object.values(rvc.catalogPrivilegeCodes).includes("catalog_view")
			);
		}
		return result;
	}

	visitRecentCatalog() {
		const $t = this;
		const validateStore = () => {
			if (!Object.keys($t.sharedService.uiService.getCatStore).length) {
				$t.sharedService.uiService.setCatStore();
			}
		};
		$.when(validateStore()).done(function () {
			setTimeout(() => {
				$t.sharedService.launchCatalog($t.sharedService.uiService.getAppStore.recentlyVisitedCatalog.catalog);
			}, 1000);
		});
	}

	sideNavAction(_action) {
		this.sharedService.uiService.sideNavOperations(_action);
	}

	lockScreen() {
		this.lockToggle.emit(true);
	}

	setDefaultPic(event: any) {
		event.target.src = "assets/img/userIcon.png";
	}

	setLanguage(language: string) {
		this.i18nService.language = language;
	}

	logout() {
		const logouturl = this.sharedService.urlService.simpleApiCall("logout");
		this.sharedService.configService.delete(logouturl).subscribe((data: any) => {
			this.router.navigate(["/login"], { replaceUrl: true });
			localStorage.removeItem("cc");
			localStorage.removeItem("googleAuthencticationParams");
			document.getElementsByTagName("BODY")[0].removeAttribute("clientcode");
			document.getElementsByTagName("BODY")[0].removeAttribute("googleAuthencticationParams");
			this.sharedService.catalogLockService.closeLockSocket();
			this.sharedService.amazeStorageService.clearCompleteSessionStorage();
			// this.authenticationService.logout().subscribe(() => { });
		});
	}

	get currentLanguage(): string {
		return this.i18nService.language;
	}

	get languages(): string[] {
		return this.i18nService.supportedLanguages;
	}

	get username(): string | null {
		return null;
	}

	openFullscreen() {
		this.isFullScreen = !this.isFullScreen;
		if (this.elem.requestFullscreen) {
			this.elem.requestFullscreen();
		} else if (this.elem.mozRequestFullScreen) {
			/* Firefox */
			this.elem.mozRequestFullScreen();
		} else if (this.elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			this.elem.webkitRequestFullscreen();
		} else if (this.elem.msRequestFullscreen) {
			/* IE/Edge */
			this.elem.msRequestFullscreen();
		}
	}

	/* Close fullscreen */
	closeFullscreen() {
		this.isFullScreen = !this.isFullScreen;
		if (this.document.exitFullscreen) {
			this.document.exitFullscreen();
		} else if (this.document.mozCancelFullScreen) {
			/* Firefox */
			this.document.mozCancelFullScreen();
		} else if (this.document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			this.document.webkitExitFullscreen();
		} else if (this.document.msExitFullscreen) {
			/* IE/Edge */
			this.document.msExitFullscreen();
		}
	}

	onCatalogChange(_catalog: any) {
		this.catalogState.selected = Object.assign({}, _catalog);
		this.selectedCatalog = this.catalogState.selected;
	}

	saveCatalogsList(_catalogs: any) {
		if (_catalogs.length) {
			this.catalogState.catalogs = _catalogs;
			this.isLoading = false;

			if (this.activatedRoute.snapshot.queryParams.catalogId) {
				this.selectedCatalog = this.catalogState.catalogs.find((d) => d.catalogKey == this.activatedRoute.snapshot.queryParams.catalogId);

				this.onCatalogChange(this.selectedCatalog);
			}
		}

		this.catalogState.isFound = this.catalogState.catalogs.length !== 0;
		this.catalogState.isFetching = false;
		this.sharedService.helperService.applyChanges(this.cdr);
	}

	ngOnInit() {
		this.loggedInUser = this.authenticationService.getUserData();
	}
	ngAfterViewInit() {
		this.startObservingRouteAndStoreChanges();
		this.setRecentCatalogForHeader();
		this.startIdlenessCheck();
		this.sharedService.getLanguageConfig();
	}
	ngOnDestroy() { }
}
