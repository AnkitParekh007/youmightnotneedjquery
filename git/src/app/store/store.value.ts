import { IChannelState, IChannelsDashboardState } from "@app/store/interfaces/channel.interfaces";
import { initialAppState, initialChannelState, initialChannelsDashboardState } from "@app/store/initial-states";
import { IAppState } from "@app/store/interfaces/app.interfaces";
import { IDomainsState } from "@app/store/interfaces/domains.interfaces";
import { IGenAiState } from "@app/store/interfaces/gen-ai.interfaces";
import { productsDashboardState as initialProductsDasboardState } from "@app/store/initial-states/products-dashboard.state";
import { domainsState as initialDomainsState} from "@app/store/initial-states/domains.state";
import { genAiState as initialGenAiState} from "@app/store/initial-states/gen-ai.state";


export const appState: IAppState = initialAppState;

export const catalogState: any = {
	catalogsPage: {
		isGridMode: true,
		catalogs: [],
		catalogsFound: false,
		selectedCatalog: {},
		catalogSearchText: "",
		isAdvancedSearch: false,
		currentSort: {
			order: "catalogName",
			reverse: false
		}
	},
	catalogPage: {
		selectedCatalog: {},
		catalogDomains: [],
		selectedDomain: {},
		isGlobalSearchEnable: false,
		isInterDomainSearch: false,
		globalSearchEntity: {
			type: "",
			value: "",
			domain: {}
		},
		currentCatalogPrivileges: [],
		currentCatalogPrivilegeCodes: [],
		isClientTerrainsAvailable: false
	},
	catalogDashboardPage: {},
	styleGuide: {
		selectedRule: []
	},
	taxonomyPanel: {
		panelActive: true,
		taxonomySections: [
			{
				sectionId: 1,
				sectionName: "Taxonomy Hierarchy",
				isSet: true,
				tooltip: "Switch to Taxonomy view"
			},
			{
				sectionId: 2,
				sectionName: "Taxonomy Metadata Master",
				isSet: false,
				tooltip: "Switch to Taxonomy Metatadata Master"
			}
		],
		selectedTaxonomySection: {
			sectionId: 1,
			sectionName: "Taxonomy",
			isSet: true,
			tooltip: "Switch to Taxonomy view"
		},
		activeTaxonomyPanel: 1,
		isTreeLoading: true,
		isTreeLoaded: false,
		noTreeDataFound: false,
		isNodeClicked: false,
		selectedNodes: [],
		expandedNodes: {
			roots: [],
			branches: [],
			leafs: []
		},
		taxonomyTree: {},
		clickedNode: {},
		treeSearchOperator: 0,
		treeSearchField: "",
		allNodesSelected: false,
		showMiniToolbar: false,

		showNodeSkuCount: true,
		showNodeChildCount: false,
		showNodeCrosslistCount: false,
		showNodeValidationCount: false,
		showAssetCount: false,
		showReviewAssetCount: false,
		showReviewNodesColor: false,
		showNodeMetaInfo: true,
		showSkuTitleFormulaStatus: true,
		reviewNodeClicked: false,
		activeCounts: 1
	},
	middlePanel: {
		panelActive: false,
		pfRecommendation: {
			executing: [],
			executed: []
		},
		middleSections: [
			{
				sectionId: 1,
				sectionName: "SKU",
				isSet: false,
				tooltip: "Switch to SKU view"
			},
			{
				sectionId: 2,
				sectionName: "Product Family",
				isSet: false,
				tooltip: "Switch to Product Family view"
			},
			{
				sectionId: 3,
				sectionName: "Schema",
				isSet: true,
				tooltip: "Switch to Schema view"
			}
		],
		activeMiddlePanel: 3,
		selectedMiddleSection: {
			sectionId: 3,
			sectionName: "Schema",
			isSet: true,
			tooltip: "Switch to Schema view"
		},
		skuGridState: {
			currentFilters: {},
			currentSort: {},
			currentAttrs: [],
			currentGrps: [],
			gridDetails: {}
		},
		selectedSKUs: [],
		selectedSchemas: [],
		schemaPanelDisable: true,
		isSchemaEmpty: true,
		schemaGridState: {},
		copiedSchema: {},
		selectedFamilies: []
	},
	thirdPanel: {
		panelActive: true,
		sections: [
			{
				sectionId: 1,
				sectionName: "Attributes",
				isSet: true,
				tooltip: "Switch to Attribute Master List view"
			},
			{
				sectionId: 2,
				sectionName: "Attr. Groups",
				isSet: false,
				tooltip: "Switch to Attribute Master Group view"
			},
			{
				sectionId: 3,
				sectionName: "Attr. Metadata Master",
				isSet: false,
				tooltip: "Switch to Attribute Metadata Master"
			}
		],
		activeThirdPanelSection: 1,
		selectedSection: {
			sectionId: 1,
			sectionName: "Attribute Master List",
			isSet: true,
			tooltip: "Switch to Attribute Master List view"
		},

		attrPanelLoading: false,
		attrPanelLoaded: false,
		attrPanelDataNotFound: false,
		selectedAttribute: [],
		selectedMetatag: [],
		selectedMetaAttr: [],
		selectedGroup: [],
		isAttrEmpty: true,
		isRefreshSchema: false,
		isRefreshAttribute: false,
		isRefreshSchemaAddIcon: false
	},
	notification: {
		taxonomy: { on: false, count: 0, refreshAllOn: false, entries: [] },
		sku: { on: false, count: 0, refreshAllOn: false, entries: [] },
		productfamily: {
			on: false,
			count: 0,
			refreshAllOn: false,
			entries: []
		},
		schema: { on: false, count: 0, refreshAllOn: false, entries: [] },
		attribute: { on: false, count: 0, refreshAllOn: false, entries: [] },
		pfrecommendation: {
			on: false,
			count: 0,
			refreshAllOn: false,
			entries: []
		}
	}
};

export const channelState: IChannelState = initialChannelState;
export const channelsDashboardState: IChannelsDashboardState = initialChannelsDashboardState;

export const damState: any = {
	libraryPage: {
		currentView: 1,
		selectedAssets: [],
		selectedAssetsLight: [],
		currentfilters: {},
		currentSort: {}
	},
	libraryImports: {
		selectedImport: []
	},
	pageTransferInfo: {}
};

export const importState: any = {
	ImportTemplatePage: {
		currentView: 1,
		templates: [],
		selectedTemplates: [],
		currentfilters: {},
		currentSort: {},
		isTemplateEmpty: true,
		loadingState: {
			fetching: true,
			fetched: false,
			resultsFound: false
		}
	},
	ImportPage: {
		currentView: 2,
		selectedImport: [],
		currentfilters: {},
		currentSort: {},
		isloading: true,
		isEmpty: true
	},
	ExportPage: {
		currentView: 2,
		selectedExport: [],
		currentfilters: {},
		currentSort: {},
		isloading: true,
		isEmpty: true
	}
};

export const styleGuideReportState: any = {
	taxonomyReport: {
		selectedReport: []
	},
	skuReport: {
		selectedReport: []
	},
	attributeReport: {
		selectedReport: []
	}
};

export const reviewDashboardState: any = {
	pageTransferInfo: {}
};

export const reportsDashboardState: any = {
	activeSection: 1,
	sections: [
		{
			sectionId: 1,
			sectionName: "All",
			isSet: false,
			tooltip: "Switch All Reports"
		},
		{
			sectionId: 2,
			sectionName: "Product",
			isSet: true,
			tooltip: "Switch to Product Reports"
		},
		{
			sectionId: 3,
			sectionName: "Schema",
			isSet: false,
			tooltip: "Switch to Schema Reports"
		},
		{
			sectionId: 4,
			sectionName: "Taxonomy",
			isSet: false,
			tooltip: "Switch to Taxonomy Reports"
		}
	],
	selectedSection: {
		sectionId: 1,
		sectionName: "All",
		isSet: false,
		tooltip: "Switch All Reports"
	},
	selectedCatalog: {},
	pageTransferInfo: {}
};

export const productSearchState: any = {
	currentSavingCriteria: "",
	currentApiResponseAfterSave: {},
	currentConditionCardIndices: []
};

export const gridIndividualState: any = {
	url: "",
	sortname: "",
	sortorder: "",
	postData: "",
	search: "",
	rowNum: 50,
	page: 1
};

export const gridState: any = {
	skuGrid: gridIndividualState,
	schemaGrid: gridIndividualState,
	attributeGrid: gridIndividualState
};

export const socketState: any = {
	catalogSocket: {
		on: false,
		catalogDetails: {}
	}
};

export const productsDashboardState: any = initialProductsDasboardState;

export const dashboardState: any = {
	userInfo: {},
	widgets: [],
	catalog: {},
	pageTransferInfo: {}
};

export const assortmentState: any = {
	userInfo: {},
	catalog: {},
	pageTransferInfo: {}
};

export const genAiState: IGenAiState = initialGenAiState;
export const domainsState: IDomainsState = initialDomainsState;

export const languageState: any = {
	context: {},
	enabledLanguages: [],
	currentSelected: {},
	skuContext: []
};
