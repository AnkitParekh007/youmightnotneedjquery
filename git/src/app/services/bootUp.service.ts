// core
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { untilDestroyed } from "@app/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

// services
import { SharedService } from "@app/services/shared.service";

// Constants
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";

// stores
import { AppStore, CatalogStore, ChannelStore } from "@app/store/stores";
import { AMAZE_STORE_STATES } from "@app/store/enums/store.enums";

// extras
import { SETIMEOUT_TIMER } from "@app/models/enums/common.enums";
import { AMAZE_TERMS } from "@app/models/enums/amaze-terms.enums";

@Injectable({
	providedIn: "root"
})
export class BootUpService {
	public appState     : AppStore;
	public catalogState : CatalogStore;
	public channelState : ChannelStore;
	public plugins      : any;

	constructor(
		private sharedService: SharedService,
		private router: Router,
		private dialogRef: MatDialog)
	{
		this.init();
	}

	public fetchAmazeEntities(options){
		const $t = this;
		const {
			entityName,
			meta,
			fetchAll,
			fetchSingle,
			singleEntityId,
			preFetchCallback,
			postfetchCallback,
			fetchErrorCallback
		} = options;

		const addQueryParamsToApiUrls = (contextualApiUrl) => {
			if($t.plugins.is.not.undefined(meta.queryParams) && $t.plugins.is.not.empty(meta.queryParams)){
				meta.queryParams.forEach(param => {
					contextualApiUrl = $t.sharedService.urlService.addQueryStringParm(contextualApiUrl, param.field, param.value);
				});
			}
			return contextualApiUrl;
		}

		if($t.plugins.is.not.undefined(entityName) && $t.plugins.is.not.empty(entityName) && $t.plugins.is.not.null(entityName)){
			const fetchApiUrls : string[] = [];
			switch(entityName){
				case AMAZE_TERMS.CATALOGS:
					let fetchCatalogsApiUrl = "";
					if($t.plugins.is.not.undefined(fetchAll) && $t.plugins.is.truthy(fetchAll)){
						if($t.plugins.is.not.undefined(meta.type)){
							switch(meta.type){
								case AMAZE_TERMS.CATALOG:
									fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getCatalogs"));
									fetchCatalogsApiUrl = $t.sharedService.urlService.addQueryStringParm(fetchCatalogsApiUrl, "includePrimary", true);
									fetchCatalogsApiUrl = $t.sharedService.urlService.addQueryStringParm(fetchCatalogsApiUrl, "lockDetailsRequired", true);
									fetchApiUrls.push(fetchCatalogsApiUrl);
									break;
								case AMAZE_TERMS.BASIC:
									fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getCatalogBasicDetails"));
									fetchApiUrls.push(fetchCatalogsApiUrl);
									break;
								case AMAZE_TERMS.DOMAIN:
									fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getCatalogDomainDetails"));
									fetchApiUrls.push(fetchCatalogsApiUrl);
									break;
								case AMAZE_TERMS.COMPLETE:
									fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getAllCatalogs"));
									fetchApiUrls.push(fetchCatalogsApiUrl);
									break;
								case AMAZE_TERMS.ALL:
									fetchApiUrls.push($t.sharedService.urlService.simpleApiCall("getCatalogs"));
									fetchApiUrls.push($t.sharedService.urlService.simpleApiCall("getCatalogBasicDetails"));
									fetchApiUrls.push($t.sharedService.urlService.simpleApiCall("getCatalogDomainDetails"));
									fetchApiUrls.push($t.sharedService.urlService.simpleApiCall("getAllCatalogs"));
									break;
								default:
									fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getCatalogs"));
									fetchCatalogsApiUrl = $t.sharedService.urlService.addQueryStringParm(fetchCatalogsApiUrl, "includePrimary", true);
									fetchCatalogsApiUrl = $t.sharedService.urlService.addQueryStringParm(fetchCatalogsApiUrl, "lockDetailsRequired", true);
									break;
							}
						} else {
							fetchApiUrls.push(addQueryParamsToApiUrls($t.sharedService.urlService.simpleApiCall("getCatalogs")));
						}
					} else if($t.plugins.is.not.undefined(fetchSingle) && $t.plugins.is.truthy(fetchSingle)){
						fetchCatalogsApiUrl = addQueryParamsToApiUrls($t.sharedService.urlService.apiCallWithParams("getCatalog", { "{catalogId}" : singleEntityId}));
						fetchApiUrls.push(fetchCatalogsApiUrl);
					}
					break;
				case AMAZE_TERMS.HIERARCHIES:
					break;
				case AMAZE_TERMS.DOMAINS:
					break;
				case AMAZE_TERMS.CHANNELS:
					break;
				case AMAZE_TERMS.AMAZE_PARAMS:
					break;
				case AMAZE_TERMS.REALMS:
					break;
				case AMAZE_TERMS.PRIVILEGES:
					break;
				case AMAZE_TERMS.PERMISSIONS:
					break;
			}

			if($t.plugins.is.not.undefined(preFetchCallback) && $t.plugins.is.function(preFetchCallback)){
				preFetchCallback();
			}

			const fetchApiCalls = fetchApiUrls.map((apiUrl) => $t.sharedService.configService.get(apiUrl));
			forkJoin(fetchApiCalls)
				.pipe(distinctUntilChanged(), untilDestroyed($t))
				.subscribe((apiResponse) => {
					if($t.plugins.is.not.undefined(postfetchCallback) && $t.plugins.is.function(postfetchCallback)){
						$t.updateContextualStoreAfterFetch({...options, data : apiResponse});
						postfetchCallback(apiResponse);
					}
				}, (apiError:any) => {
					if($t.plugins.is.not.undefined(fetchErrorCallback) && $t.plugins.is.function(fetchErrorCallback)){
						fetchErrorCallback(apiError);
					}
				});
		}
	}

	private updateContextualStoreAfterFetch(options){
		const $t = this;
		const {
			data,
			entityName,
			meta,
			fetchAll,
			fetchSingle,
			singleEntityId
		} = options;
		switch(entityName){
			case AMAZE_TERMS.CATALOGS:
				if($t.plugins.is.not.undefined(fetchAll) && $t.plugins.is.truthy(fetchAll)){
					if($t.plugins.is.not.undefined(meta.type)){
						switch(meta.type){
							case AMAZE_TERMS.CATALOG:
								break;
							case AMAZE_TERMS.BASIC:
								break;
							case AMAZE_TERMS.DOMAIN:
								break;
							case AMAZE_TERMS.COMPLETE:
								break;
							case AMAZE_TERMS.ALL:
								break;
							default:
								break;
						}
					} else {

					}
				} else if($t.plugins.is.not.undefined(fetchSingle) && $t.plugins.is.truthy(fetchSingle)){

				}
				break;
			case AMAZE_TERMS.HIERARCHIES:
				break;
			case AMAZE_TERMS.DOMAINS:
				break;
			case AMAZE_TERMS.CHANNELS:
				break;
			case AMAZE_TERMS.AMAZE_PARAMS:
				break;
			case AMAZE_TERMS.REALMS:
				break;
			case AMAZE_TERMS.PRIVILEGES:
				break;
			case AMAZE_TERMS.PERMISSIONS:
				break;
		}
	}

	private startStoreObservers(){
		const $t = this;
		const observingStates : string[] = [
			AMAZE_STORE_STATES.APP_STATE,
			AMAZE_STORE_STATES.CHANNEL_STATE,
			AMAZE_STORE_STATES.CATALOG_STATE,
			AMAZE_STORE_STATES.MULTI_CHANNEL_DASHBOARD_STATE,
			AMAZE_STORE_STATES.IMPORT_STATE,
			AMAZE_STORE_STATES.DAM_STATE
		];
		observingStates.forEach((observingState) => {
			$t.sharedService.sessionStorageService
				.observe(observingState)
				.pipe(distinctUntilChanged(), untilDestroyed($t))
				.subscribe((result) => {
					if ($t.plugins.is.not.undefined(result) && $t.plugins.is.json(result)) {
						$t[observingState] = JSON.parse(result);
					}
				});
		});
	}

	private init(){
		this.plugins = this.sharedService.plugins;
		this.startStoreObservers();
	}

	ngOnDestroy() {}
}
