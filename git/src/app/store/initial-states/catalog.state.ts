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
				isSet: true,
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
				isSet: false,
				tooltip: "Switch to Schema view"
			}
		],
		activeMiddlePanel: 0,
		selectedMiddleSection: {
			sectionId: 1,
			sectionName: "SKUs",
			isSet: true,
			tooltip: "Switch to SKU view"
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
