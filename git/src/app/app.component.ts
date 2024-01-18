// core
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { filter, map, mergeMap } from "rxjs/operators";
import { merge } from "rxjs";
import { environment } from "@env/environment";
import { I18nService, untilDestroyed } from "@app/core";
import { LocaleData } from "@app/models/constants/locales";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private translateService: TranslateService,
		private i18nService: I18nService
	) {
		this.translateService.setDefaultLang("en");
	}

	ngOnInit() {
		// Setup translations
		const supportedLanguages = LocaleData.map((lang: any) => lang.id);
		this.i18nService.init(environment.DEFAULT_LANGUAGE, supportedLanguages);

		const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

		// Change page title on navigation or language change, based on route data
		merge(this.translateService.onLangChange, onNavigationEnd)
			.pipe(
				map(() => {
					let route = this.activatedRoute;
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				}),
				filter((route) => route.outlet === "primary"),
				mergeMap((route) => route.data),
				untilDestroyed(this)
			)
			.subscribe((event) => {
				const title = event["title"];
				if (title) {
					this.titleService.setTitle(this.translateService.instant(title));
				}
			});
	}

	ngOnDestroy() {
		this.i18nService.destroy();
	}
}
