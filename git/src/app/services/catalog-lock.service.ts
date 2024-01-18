// core
import { Injectable, OnDestroy } from "@angular/core";
import { WebsocketService } from "@app/core/websocket/websocket.service";
import { timer } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import * as is from "is_js";
import { AMAZE_TERMS } from "@app/models/enums/amaze-terms.enums";

@Injectable({
	providedIn: "root"
})
export class CatalogLockService extends WebsocketService implements OnDestroy {
	appState                 : any;
	catState                 : any;
	socketState              : any;
	heartBeatTimer           : any;
	sharedServiceInstance    : any;
	socketListening          : boolean = false;
	socketPayload: any = {
		filterType    : "CATALOG",
		userId        : 0,
		eventType     : "FILTER_SUBSCRIBE",
		customerCode  : "",
		catalogId     : []
	};

	constructor() {
		super({ url: AMAZE_TERMS.AMAZE });
	}

	setServiceHelpers(_instance: any) {
		const isAuthenticationPages = ["login", "register", "resetpassword", "generatepassword"].some((a) => window.location.hash.includes(a));
		if (!isAuthenticationPages) {
			this.socketListening = typeof window["catalogLockSocketOn"] !== "undefined";
			if (!this.socketListening) {
				this.sharedServiceInstance = _instance;
				this.appState = this.sharedServiceInstance.uiService.getAppStore;
				this.catState = this.sharedServiceInstance.uiService.getCatStore;
				this.sharedServiceInstance.uiService.setSocketStore();
				this.socketState = this.sharedServiceInstance.uiService.getSocketStore;
				this.initCatalogStatusWebSocket();
			}
		}
	}

	initCatalogStatusWebSocket() {
		const $t = this;
		if ($t.appState.catalogsList.length) {
			$t.socketPayload = {
				filterType: "CATALOG",
				userId: Number($t.appState.userInfo.id),
				eventType: "FILTER_SUBSCRIBE",
				customerCode: $t.sharedServiceInstance.uiService.getClientCode(),
				catalogId: $t.appState.catalogsList.map((c) => c.catalogKey)
			};
			$t.wsObservable.pipe(distinctUntilChanged()).subscribe((data: any) => {
				if (data.changeEventType == "CATALOG") {
					$t.changeCatalogState(data);
				}
			});
			$t.startingMessage = $t.socketPayload;
			$t.send($t.socketPayload);
			$t.heartBeatTimer = timer(0, 840000).subscribe((i) => {
				i != 0 ? $t.send({ eventType: "PING" }) : "";
			});
			$t.socketState.catalogSocket.on = true;
			window["catalogLockSocketOn"] = true;
			$t.sharedServiceInstance.uiService.syncSocketStore($t.socketState);
		}
	}

	changeCatalogState(_entry: any) {
		const $t = this;
		const isLock: boolean = _entry.actionType == "LOCK";
		try {
			$t.appState = $t.sharedServiceInstance.uiService.getAppStore;
			$t.catState = $t.sharedServiceInstance.uiService.getCatStore;
			$t.socketState = $t.sharedServiceInstance.uiService.getSocketStore;

			if ($t.appState.catalogsList.length) {
				$t.socketState.catalogSocket.catalogDetails = _entry;
				$t.sharedServiceInstance.uiService.syncSocketStore($t.socketState);
			}
			if ($t.catState.catalogsPage.catalogs.length) {
				$t.catState.catalogsPage.catalogs.find((c) => c.catalogKey == _entry.catalogId[0]).locked = isLock;
				$t.catState.catalogsPage.catalogs.find((c) => c.catalogKey == _entry.catalogId[0]).selectedDomain.locked = isLock;
				$t.catState.catalogsPage.catalogs.find((c) => c.catalogKey == _entry.catalogId[0]).domains.find((d) => d.catalogKey == _entry.catalogId[0]).locked = isLock;
				if (Object.keys($t.catState.catalogsPage.selectedCatalog).length && $t.catState.catalogsPage.selectedCatalog.catalogKey == _entry.catalogId[0]) {
					$t.catState.catalogsPage.selectedCatalog.locked = isLock;
					$t.catState.catalogsPage.selectedCatalog.selectedDomain.locked = isLock;
					$t.catState.catalogsPage.selectedCatalog.domains.find((d) => d.catalogKey == _entry.catalogId[0]).locked = isLock;
				}
				$t.sharedServiceInstance.uiService.syncCatStore($t.catState);
			}

			if (Object.keys($t.catState.catalogPage.selectedCatalog).length && $t.catState.catalogsPage.selectedCatalog.catalogKey == _entry.catalogId[0]) {
				is.not.undefined($t.catState.catalogPage.selectedCatalog) ? ($t.catState.catalogPage.selectedCatalog.locked = isLock) : "";
				is.not.undefined($t.catState.catalogPage.selectedCatalog.selectedDomain) ? ($t.catState.catalogPage.selectedCatalog.selectedDomain.locked = isLock) : "";
				is.not.undefined($t.catState.catalogPage.selectedCatalog.domains) && $t.catState.catalogPage.selectedCatalog.domains.length
					? ($t.catState.catalogPage.selectedCatalog.domains.find((d) => d.domainKey == $t.catState.catalogPage.selectedCatalog.selectedDomain.domainKey).locked = isLock)
					: "";
				is.not.undefined($t.catState.catalogPage.selectedDomain.catalog) ? ($t.catState.catalogPage.selectedDomain.catalog.locked = isLock) : "";
				is.not.undefined($t.catState.catalogPage.catalogDomains) && $t.catState.catalogPage.catalogDomains.length
					? ($t.catState.catalogPage.catalogDomains.find((d) => d.id == $t.catState.catalogPage.selectedDomain.id).catalog.locked = isLock)
					: "";
				$t.sharedServiceInstance.uiService.syncCatStore($t.catState);
			}
			$t.sharedServiceInstance.utilityService.changeMessage("CATALOG-LOCK-SOCKET-EVENT");
		} catch (e) {
			console.error(e);
		}
	}

	closeLockSocket() {
		try {
			const $t = this;
			const closingPayload: any = {
				...$t.socketPayload,
				eventType    : "FILTER_UNSUBSCRIBE_ALL",
				userId       : Number($t.appState.userInfo.id),
				customerCode : $t.sharedServiceInstance.uiService.getClientCode(),
				catalogId    : $t.appState.catalogsList.map((c) => c.catalogKey)
			};
			if(is.not.undefined($t.heartBeatTimer)){
				$t.heartBeatTimer.unsubscribe();
			}
			$t.send(closingPayload);
			$t.close();
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this.closeLockSocket();
	}
}
