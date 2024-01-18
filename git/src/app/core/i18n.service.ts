import { Injectable } from "@angular/core";
import { LocaleData } from "@app/models/constants/locales";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import enUS from "@translations/en-US.json";
import frFR from "@translations/fr-FR.json";
import frDZ from "@translations/fr-DZ.json";

const languageKey = "language";

/**
 * Pass-through function to mark a string for translation extraction.
 * Running `npm translations:extract` will include the given string by using this.
 * @param s The string to extract for translation.
 * @return The same string.
 */
export function extract(s: string) {
	return s;
}

@Injectable()
export class I18nService {
	public defaultLanguage: string;
	public supportedLanguages: string[];
	private langChangeSubscription!: Subscription;

	constructor(private translateService: TranslateService) {
		// Embed languages to avoid extra HTTP requests
		translateService.setTranslation("en-US", enUS);
		translateService.setTranslation("fr-FR", frFR);
		translateService.setTranslation("fr-DZ", frDZ);
	}

	/**
	 * Initializes i18n for the application.
	 * Loads language from local storage if present, or sets default language.
	 * @param defaultLanguage The default language to use.
	 * @param supportedLanguages The list of supported languages.
	 */
	init(defaultLanguage: string, supportedLanguages: string[]) {
		const supportedLangs = LocaleData.map((lang: any) => lang.id);
		this.defaultLanguage = defaultLanguage;
		this.supportedLanguages = supportedLanguages || supportedLangs;
		this.language = "";

		// Warning: this subscription will always be alive for the app's lifetime
		this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
			localStorage.setItem(languageKey, event.lang);
		});
	}

	/**
	 * Cleans up language change subscription.
	 */
	destroy() {
		this.langChangeSubscription.unsubscribe();
	}

	/**
	 * Sets the current language.
	 * Note: The current language is saved to the local storage.
	 * If no parameter is specified, the language is loaded from local storage (if present).
	 * @param language The IETF language code to set.
	 */
	set language(language: string) {
		const $t = this;
		const supportedLangs = LocaleData.map((lang: any) => lang.id);

		language = language || localStorage.getItem(languageKey) || $t.translateService.getBrowserCultureLang();
		let isSupportedLanguage = ($t.supportedLanguages || supportedLangs).includes(language);

		// If no exact match is found, search without the region
		if (language && !isSupportedLanguage) {
			language = language.split("-")[0];
			language = ($t.supportedLanguages || supportedLangs).find((supportedLanguage) => supportedLanguage.startsWith(language)) || "";
			isSupportedLanguage = Boolean(language);
		}

		// Fallback if language is not supported
		if (!isSupportedLanguage) {
			language = $t.defaultLanguage;
		}
		$t.translateService.use(language);
	}

	/**
	 * Gets the current language.
	 * @return The current language code.
	 */
	get language(): string {
		return this.translateService.currentLang;
	}
}
