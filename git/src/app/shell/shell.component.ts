// core
import { Component, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, Event, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd } from "@angular/router";
import { MediaObserver } from "@angular/flex-layout";
import { untilDestroyed } from "@app/core";

// services
import { SharedService } from "@app/services/shared.service";
import { AuthenticationService, CredentialsService, I18nService } from "@app/core";

@Component({
	selector: "app-shell",
	templateUrl: "./shell.component.html",
	styleUrls: ["./shell.component.scss"],
	providers: [AuthenticationService, CredentialsService, I18nService]
})
export class ShellComponent implements OnInit {
	@ViewChild("sidenav") public sidenav: any;

	public lockToggleClicked = false;
	public isShowingRouteLoadIndicator: boolean;

	constructor(
		public router: Router,
		public titleService: Title,
		public media: MediaObserver,
		public authenticationService: AuthenticationService,
		public credentialsService: CredentialsService,
		public i18nService: I18nService,
		public sharedService: SharedService
	) {}

	setLanguage(language: string) {
		this.isShowingRouteLoadIndicator = false;
		this.i18nService.language = language;
	}

	toggleLoader() {
		this.router.events.pipe(untilDestroyed(this)).subscribe((event: Event): void => {
			if (event instanceof RouteConfigLoadStart) {
				this.isShowingRouteLoadIndicator = true;
				return;
			} else if (event instanceof RouteConfigLoadEnd) {
				this.isShowingRouteLoadIndicator = false;
				return;
			} else if (event instanceof NavigationEnd) {
				const appState = this.sharedService.uiService.getAppStore;
				this.sharedService.uiService.syncAppStore({
					...appState,
					currentPage: event.url.toString().replace("/", ""),
					currentPageName :this.titleService.getTitle()
				});
			}
		});
	}

	sideNavAction(_action) {
		jQuery("#mainMenu").hasClass("d-none") ? jQuery("#catalogListMenu, #mainMenu").toggleClass("d-none") : "";
		this.sharedService.uiService.sideNavOperations(_action);
	}

	logout() {
		this.authenticationService
			.logout()
			.pipe(untilDestroyed(this))
			.subscribe(() => this.router.navigate(["/login"], { replaceUrl: true }));
	}

	get username(): string | null {
		const credentials = this.credentialsService.credentials;
		return credentials ? credentials.username : null;
	}

	get languages(): string[] {
		return this.i18nService.supportedLanguages;
	}

	get isMobile(): boolean {
		return this.media.isActive("xs") || this.media.isActive("sm");
	}

	get toOpenNavAtLoad(): boolean {
		return true;
	}

	get title(): string {
		return this.titleService.getTitle();
	}

	toggleLockScreen(unLock: boolean) {
		this.lockToggleClicked = unLock;
	}

	ngOnInit() {
		this.sharedService.gridService.setGridStore();
	}

	ngAfterViewInit() {
		const $t = this;
		$t.sharedService.uiService.sideNavOperations("set", this.sidenav);
		jQuery(".amazeSideNav").find(".mat-drawer-inner-container").addClass("stylishScroll");
		$t.toggleLoader();
		$t.sharedService.communicateService.on("language-change", function (newLocale: any) {
			if (newLocale) {
				$t.i18nService.language = newLocale;
			}
		});
		$t.sharedService.uiService.setAppVersionInfo();
	}

	ngOnDestroy() {}
}
