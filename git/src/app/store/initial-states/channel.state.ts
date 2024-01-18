import { IChannelState, IChannelsDashboardState } from "@app/store/interfaces/channel.interfaces";
import { MAP_STATE, NODE_SEARCH_OPTIONS } from "@app/scenes/channel/channel/channel.constants";
import { NODE_TREE_PLUMBING_HELPER } from "@app/scenes/channel/channel/channel.helpers";
import { ATTRIBUTE_SEARCH_OPTIONS } from "@app/scenes/channel/channel-attribute-mapping/channel-attribute-mapping.constants";

export const initialChannelState: IChannelState = {
	channelsPage: {
		isChannelsFetching: true,
		isChannelsFetched: false,
		isChannelsFetchingError: false,
		isChannelsFound: false,
		channels: [],
		selectedChannel: undefined,
		isGridMode: true,
		channelSort: {
			order: "name",
			reverse: false
		},
		channelsFilters: {
			channelGlobalSearchText: "",
			isFilterPanelVisible: false,
			isFilterPanelFiltersApplied: false,
			sourceCatalogSearchText: "",
			targetCatalogSearchText: "",
			createdOn: "",
			channelStatus: [],
			channelUnMappedSkuOption:"",
			channelUnMappedSkuCount:0,
			channelUnMappedAttributeOption:"",
			channelUnMappedAttributeCount:0
		}
	},
	channelPage: {
		currentChannel: undefined,
		sourceCatalog: undefined,
		targetCatalog: undefined,
		sourceCatalogNodeSearch: {
			searchOption: NODE_SEARCH_OPTIONS[0],
			searchText: "",
			isNodeSearching: false,
			clickedNode: null,
			isSearchTextDisabled: false,
			nodeSearchList: []
		},
		targetCatalogNodeSearch: {
			searchOption: NODE_SEARCH_OPTIONS[0],
			searchText: "",
			isNodeSearching: false,
			clickedNode: null,
			isSearchTextDisabled: false,
			nodeSearchList: []
		},
		sourceTree: {
			isTreeLoading: true,
			isTreeFetched: false,
			isTreeFetchingError: false,
			currentNode: undefined,
			currentParentNode: undefined,
			currentNodeMaps: [],
			isCountsOnNodeActive: false
		},
		targetTree: {
			isTreeLoading: true,
			isTreeFetched: false,
			isTreeFetchingError: false,
			currentNode: undefined,
			currentParentNode: undefined,
			currentNodeMaps: [],
			isCountsOnNodeActive: false
		},
		isRunMapRollbackPanelActive: false,
		mapping: {
			timer: undefined,
			nodeMaps: [],
			nodeMapTargets: [],
			copiedAttributeMaps: {},
			mappedTargetIds: [],
			nodeMapOption: MAP_STATE.ALL,
			executeOnce: true,
			isSystemMap: NODE_TREE_PLUMBING_HELPER.isSystemMap,
			nodeSuggestionMaps: [],
			refreshingNodes: [],
			isTargetSelection: false,
			selectedNewTargetNode: undefined,
			selectedNodeMap: undefined,
			source: {
				indexes: [],
				sysMaps: [],
				userMaps: [],
				maps: [],
				userBuiltNodeMaps: true,
				systemGenNodeMaps: false,
				sysTargetNodeIds: [],
				userTargetNodeIds: [],
				isSystemMap: NODE_TREE_PLUMBING_HELPER.isSystemMap,
				nodeMapDetails: []
			},
			target: {
				indexes: [],
				sysMaps: [],
				userMaps: [],
				maps: [],
				userBuiltNodeMaps: true,
				systemGenNodeMaps: false,
				sysTargetNodeIds: [],
				userTargetNodeIds: [],
				isSystemMap: NODE_TREE_PLUMBING_HELPER.isSystemMap,
				nodeMapDetails: []
			},
			sourceSKUs: {
				option: MAP_STATE.ALL,
				all: true,
				sysGen: false,
				userBuilt: false
			},
			targetSKUs: {
				option: MAP_STATE.ALL,
				all: true,
				sysGen: false,
				userBuilt: false
			}
		}
	},
	channelAttributeMappingPage: {
		sourceNode: null,
		targetNode: null,
		sourceAttributeSearch: {
			searchOption: ATTRIBUTE_SEARCH_OPTIONS[0],
			searchText: "",
			isSearching: false,
			clickedNode: null,
			isSearchTextDisabled: false,
			attributeSearchList: []
		},
		targetAttributeSearch: {
			searchOption: ATTRIBUTE_SEARCH_OPTIONS[0],
			searchText: "",
			isSearching: false,
			clickedNode: null,
			isSearchTextDisabled: false,
			attributeSearchList: []
		},
		sourceTree: {
			fancyTree: undefined,
			isTreeLoading: true,
			isTreeFetched: false,
			isTreeFetchingError: false,
			currentNode: undefined,
			currentParentNode: undefined,
			currentNodeMaps: [],
			isCountsOnNodeActive: false
		},
		targetTree: {
			fancyTree: undefined,
			isTreeLoading: true,
			isTreeFetched: false,
			isTreeFetchingError: false,
			currentNode: undefined,
			currentParentNode: undefined,
			currentNodeMaps: [],
			isCountsOnNodeActive: false
		},
		mapping: {
			activeSourceAttrNode: null,
			activeSourceNodeId: "",
			activeTargetAttrNode: null,
			allSourceAttrs: [],
			allSupressUnSupressList: [],
			allTargetAttrs: [],
			arithmeticSourceAttrsList: [],
			arithmeticTargetAttrsList: [],
			attrConditionsList: [],
			attrConditionsListArray: [],
			attributeMaps: [],
			attrMapEditingActive: false,
			attrMapSourceEditingActive: false,
			attrMapTargetEditingActive: false,
			attrMapTypeObj: [],
			currentInheritedAttrMaps: [],
			currentSelectedNodeAttrMaps: [],
			globalAttributeMaps: [],
			inheritedAttributeMaps: [],
			isGlobalAttrMapping: false,
			isInheritedAttrMapping: false,
			isTargetAttrValueLoaded: false,
			isTargetRequiredAttributesExists: false,
			preventNodeClicks: false,
			lastSelectedAttrNode: null,
			nodeAttributeMaps: [],
			regExListCount: 1,
			sourceAttr: null,
			sourceAttributeLists: [],
			sourceSkuNode: null,
			suggestedAttrMaps: [],
			suppressAttrsSourceList: [],
			suppressAttrsTargetList: [],
			targetSkuNode: null,
			unSuppressAttrsSourceList: [],
			unSuppressAttrsTargetList: [],
			updatingMap: {
				selectedRule: "",
				selectedSources: [],
				selectedTargets: [],
				meta: undefined,
				isEdit: false,
			},
			lastPerformedOperation: undefined
		}
	},
	realms: []
};

export const initialChannelsDashboardState: IChannelsDashboardState = {
	catalogsList: [],
	widgetConfigurations: {
		widgets: [
			{
				order: 0,
				headerLabel: "Channel Performance By SKU Presence",
				isVisible: true,
				meta: {
					availableForSource : true,
					availableForTarget : true,
					widgetId : "CPKP"
				},
			},
			{
				order: 1,
				headerLabel: "Channel Performance By SKU Content in Target",
				headerSubLabel : "System Defined Buckets",
				isVisible: true,
				meta: {
					availableForSource : true,
					availableForTarget : false,
					widgetId : "SDB"
				}
			},
			{
				order: 2,
				headerLabel: "Channel Performance By SKU Content in Target",
				headerSubLabel : "User Generated Buckets",
				isVisible: true,
				meta: {
					availableForSource : true,
					availableForTarget : false,
					widgetId : "UDB"
				}
			},
			{
				order: 3,
				headerLabel: "Channel Performance By SKU Content in Target",
				headerSubLabel : "SKU Fill Rate Analysis",
				isVisible: true,
				meta: {
					availableForSource : true,
					availableForTarget : true,
					widgetId : "SFRA"
				}
			},
			{
				order: 4,
				headerLabel: "Channel Performance By SKU Content in Target",
				headerSubLabel : "Individual Attribute Level Mapping/Fill Analysis for Catalog",
				isVisible: true,
				meta: {
					availableForSource : true,
					availableForTarget : true,
					widgetId : "IALMFA"
				}
			}
		],
		applyWidgetSettingsToAllCatalog : false,
		selectedCatalogWhenApplyToAll   : undefined,
		savedSettings : {}
	},
	selectedCatalog: undefined,
	selectedCatalogType: "",
	selectedFavouriteCatalogId: "",
	selectedCatalogSummary: {
		globalAttributeCount: 0,
		nodesContainingSkuCount: 0,
		nodesCount: 0,
		schemaAttributeCount: 0,
		skuAttributeCount: 0,
		totalSkuCount: 0,
		skuCountForSourceProject: 0
	},
	selectedCatalogOverallCountSummary: {
		totalProjectCount: 0,
		totalBuiltCount: 0,
		recentBuildProjectCount: 0,
		importCount: 0,
		exportCount: 0,
		totalExportCount: 0,
		catalogId: '',
		catalogType: '',
		catalogStatus: ''
	},
	sourceSkuPresence: {
		catalogName: "",
		catalogId: "",
		projectId: "",
		catalogLogo: "",
		skuCount: 0,
		totalSkuCount: 0,
		validationPassedSkuCount: 0,
		lastBuildDate: "",
		projectName: ""
	},
	targetSkuPresence: {
		catalogName: "",
		catalogId: "",
		projectId: "",
		catalogLogo: "",
		skuCount: 0,
		totalSkuCount: 0,
		validationPassedSkuCount: 0,
		lastBuildDate: "",
		projectName: ""
	}
};
