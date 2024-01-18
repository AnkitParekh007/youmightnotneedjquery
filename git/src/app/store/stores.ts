import { Injectable } from "@angular/core";
import { GenericStore } from "@app/store/store";
import { AmazeStorageService } from "@app/services/storage.service";
import {
	appState,
	assortmentState,
	catalogState,
	channelsDashboardState,
	channelState,
	damState,
	dashboardState,
	domainsState,
	genAiState,
	gridState,
	importState,
	languageState,
	productsDashboardState,
	productSearchState,
	reportsDashboardState,
	reviewDashboardState,
	socketState,
	styleGuideReportState
} from "@app/store/store.value";
import { AMAZE_STORE_STATES } from "@app/store/enums/store.enums";

@Injectable({ providedIn: "root" })
export class AppStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.APP_STATE,
			state: appState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class CatalogStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.CATALOG_STATE,
			state: catalogState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ChannelStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.CHANNEL_STATE,
			state: channelState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ChannelsDashboardStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.MULTI_CHANNEL_DASHBOARD_STATE,
			state: channelsDashboardState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class DamStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.DAM_STATE,
			state: damState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ImportStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.IMPORT_STATE,
			state: importState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class GridStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.GRID_STATE,
			state: gridState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class StyleGuideReportStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.STYLE_GUIDE_REPORT_STATE,
			state: styleGuideReportState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ReviewDashboardStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.REVIEW_DASHBOARD_STATE,
			state: reviewDashboardState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ReportsDashboardStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.REPORTS_DASHBOARD_STATE,
			state: reportsDashboardState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ProductSearchStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.PRODUCT_SEARCH_STATE,
			state: productSearchState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class SocketStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.SOCKET_STATE,
			state: socketState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class ProductsDashboardStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.PRODUCT_DASHBOARD_STATE,
			state: productsDashboardState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class DashboardStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.DASHBOARD_STATE,
			state: dashboardState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class AssortmentStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.ASSORTMENT_STATE,
			state: assortmentState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class GenAiStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.GEN_AI_STATE,
			state: genAiState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class DomainsStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.DOMAINS_STATE,
			state: domainsState,
			storeService: amazeStorageService
		});
	}
}

@Injectable({ providedIn: "root" })
export class LanguageStore extends GenericStore {
	constructor(public amazeStorageService: AmazeStorageService) {
		super({
			name: AMAZE_STORE_STATES.LANGUAGE_STATE,
			state: languageState,
			storeService: amazeStorageService
		});
	}
}
