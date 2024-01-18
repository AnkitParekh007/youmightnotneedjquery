import { MAP_STATE } from "@app/scenes/channel/channel/channel.constants";
import { ISortParam } from "@app/store/interfaces/common.interfaces";

export interface IBridgeNotificationUser {
	id?              : string;
	roboUserType?    : string;
	firstName?       : string;
	lastName?        : string;
	email?           : string;
	alternateIds?    : any;
	enabled?         : boolean;
	name?            : string;
}

export interface IBridgeCatalog {
	id?                              : string;
	primarySecurityRealm?            : string;
	guestSecurityRealms?             : string[];
	name?                            : string;
	company?                         : string;
	schemaAttributeMetaData?         : any;
	taxonomyNodeAttributeMetaData?   : any;
	type?                            : string;
	projects?                        : any;
	exportInclusionPolicy?           : string;
	rowSort?                         : any;
	columnSort?                      : any;
	workflowGeneratedFileType?       : string;
	stepAutoApprove?                 : boolean;
	notificationUser?: {
		users?: IBridgeNotificationUser[];
	};
	metadata?: any;
}

export interface ILastUpdated {
	actionType?    : string;
	user?          : IBridgeNotificationUser;
	timestamp?     : string;
	remark?        : string;
}

export interface IBridgeChannel {
	id?                        : string;
	securityRealm?             : string;
	name?                      : string;
	state?                     : string;
	sourceCatalogId?           : string;
	sourceName?                : string;
	targetCatalogId?           : string;
	targetName?                : string;
	notificationStatus?        : string;
	sourceCatalogLogoUri?      : string;
	targetCatalogLogoUri?      : string;
	isPersistItemIdInTarget?   : boolean;
	lastUpdated?               : ILastUpdated;
}

export interface ITaxonomyBridgeSkuCounts {
	skuCount                           : number;
	skuCountWithChildren               : number;
	movedSkuCount                      : number;
	movedSkuCountWithChildren          : number;
	totalMappedSkuCount                : number;
	totalMappedSkuCountWithChildren    : number;
	mappedSkuCount                     : number;
	mappedSkuCountWithChildren         : number;
	deleteSkuCount                     : number;
	deleteSkuCountWithChildren         : number;
	replaceSkuCount                    : number;
	replaceSkuCountWithChildren        : number;
	rollbackSkuCount                   : number;
	rollbackSkuCountWithChildren       : number;
	updateSkuCount                     : number;
	updateSkuCountWithChildren         : number;
	totalBridgeSkuCount                : number;
	totalBridgeSkuCountWithChildren    : number;
	totalMovedSkuCount                 : number;
	totalMovedSkuCountWithChildren     : number;
}

export interface IBridgeCatalogTreeNode {
	id?                      : string;
	breadCrumb?              : string;
	catalogId?               : string;
	derivedAttributes?       : any;
	children?                : IBridgeCatalogTreeNode[];
	importedAsLeaf?          : boolean;
	isLazy?                  : boolean;
	key?                     : string;
	lastUpdated?             : ILastUpdated;
	metaData                 : any;
	name?                    : string;
	nodeMaps?                : any;
	notes?                   : any;
	root?                    : boolean;
	title?                   : string;
	validationFailedCount?   : number;
	taxonomyBridgeSkuCounts? : ITaxonomyBridgeSkuCounts;
}

export interface IChannelsPageState {
	isChannelsFetching         : boolean;
	isChannelsFetched          : boolean;
	isChannelsFound            : boolean;
	isChannelsFetchingError    : boolean;
	channels                   : any;
	selectedChannel            : any;
	isGridMode                 : boolean;
	channelSort                : ISortParam;
	channelsFilters: {
		channelGlobalSearchText           : string;
		isFilterPanelVisible              : boolean;
		isFilterPanelFiltersApplied       : boolean;
		sourceCatalogSearchText           : string;
		targetCatalogSearchText           : string;
		createdOn                         : string;
		channelStatus                     : any;
		channelUnMappedSkuOption          : any;
		channelUnMappedSkuCount           : number;
		channelUnMappedAttributeOption    : any;
		channelUnMappedAttributeCount     : number;
	};
}

export interface IChannelNodeSearchParams {
	searchOption           : any;
	searchText             : string;
	isNodeSearching        : boolean;
	clickedNode            : Fancytree.FancytreeNode | undefined | null | any;
	isSearchTextDisabled   : boolean;
	nodeSearchList         : Fancytree.FancytreeNode[] | any[];
}

export interface IChannelAttributeSearchParams {
	searchOption           : any;
	searchText             : string;
	isSearching            : boolean;
	clickedNode            : Fancytree.FancytreeNode | undefined | null | any;
	isSearchTextDisabled   : boolean;
	attributeSearchList    : Fancytree.FancytreeNode[] | any[];
}

export interface IChannelNodeTree {
	isTreeLoading          : boolean;
	isTreeFetched          : boolean;
	isTreeFetchingError    : boolean;
	currentNode            : any;
	currentParentNode      : any;
	currentNodeMaps        : any;
	isCountsOnNodeActive   : boolean;
	fancyTree?             : any;
}
export interface IMapping{
	timer                    : undefined | any;
	nodeMaps                 : any[];
	nodeMapTargets           : any[];
	mappedTargetIds          : any[];
	copiedAttributeMaps      : undefined | any;
	nodeMapOption            : MAP_STATE.ALL;
	executeOnce              : true;
	isSystemMap              : Function;
	nodeSuggestionMaps       : any[];
	refreshingNodes          : any[];
	isTargetSelection        : boolean;
	selectedNewTargetNode    : undefined | any;
	selectedNodeMap          : undefined | any;
	source: {
		indexes             : any[];
		maps                : any[];
		sysMaps             : any[];
		userMaps            : any[];
		userBuiltNodeMaps   : boolean;
		systemGenNodeMaps   : boolean;
		sysTargetNodeIds    : any[];
		userTargetNodeIds   : any[];
		isSystemMap         : Function;
		nodeMapDetails      : any[];
	},
	target: {
		indexes             : any[];
		maps                : any[];
		sysMaps             : any[];
		userMaps            : any[];
		userBuiltNodeMaps   : boolean;
		systemGenNodeMaps   : boolean;
		sysTargetNodeIds    : any[];
		userTargetNodeIds   : any[];
		isSystemMap         : Function;
		nodeMapDetails      : any[];
	},
	sourceSKUs: {
		option    : MAP_STATE.ALL;
		all       : boolean;
		sysGen    : boolean;
		userBuilt : boolean;
	},
	targetSKUs: {
		option    : MAP_STATE.ALL;
		all       : boolean;
		sysGen    : boolean;
		userBuilt : boolean;
	}
}

export interface IAttributeMapping{
	activeSourceAttrNode             : any | null;
	activeSourceNodeId               : string;
	activeTargetAttrNode             : any | null;
	allSourceAttrs                   : any[];
	allSupressUnSupressList          : any[];
	allTargetAttrs                   : any[],
	arithmeticSourceAttrsList        : any[];
	arithmeticTargetAttrsList        : any[];
	attrConditionsList               : any[];
	attrConditionsListArray          : any[];
	attributeMaps                    : any[];
	attrMapEditingActive             : boolean;
	attrMapSourceEditingActive       : boolean;
	attrMapTargetEditingActive       : boolean;
	attrMapTypeObj                   : any[];
	currentInheritedAttrMaps         : any[];
	currentSelectedNodeAttrMaps      : any[];
	globalAttributeMaps              : any[];
	inheritedAttributeMaps           : any[];
	isGlobalAttrMapping              : boolean;
	isInheritedAttrMapping           : boolean;
	isTargetAttrValueLoaded          : boolean;
	isTargetRequiredAttributesExists : boolean;
	preventNodeClicks                : undefined | boolean;
	lastSelectedAttrNode             : any | null;
	nodeAttributeMaps                : any[];
	regExListCount                   : number;
	sourceAttr                       : any;
	sourceAttributeLists             : any[];
	sourceSkuNode                    : any | null | undefined;
	suggestedAttrMaps                : any[];
	suppressAttrsSourceList          : any[];
	suppressAttrsTargetList          : any[];
	targetSkuNode                    : any | null | undefined;
	unSuppressAttrsSourceList        : any[];
	unSuppressAttrsTargetList        : any[];
	updatingMap : {
		selectedRule    : any;
		selectedSources : any[];
		selectedTargets : any[];
		meta            : any;
		isEdit          : boolean
	};
	lastPerformedOperation : any | undefined;
}

export interface IChannelPageState {
	currentChannel              : any;
	sourceCatalog               : any;
	targetCatalog               : any;
	sourceCatalogNodeSearch     : IChannelNodeSearchParams;
	targetCatalogNodeSearch     : IChannelNodeSearchParams;
	sourceTree                  : IChannelNodeTree;
	targetTree                  : IChannelNodeTree;
	isRunMapRollbackPanelActive : boolean;
	mapping                     : IMapping;
}

export interface IChannelAttributeMappingPageState{
	sourceNode            : any;
	targetNode            : any;
	sourceAttributeSearch : IChannelAttributeSearchParams;
	targetAttributeSearch : IChannelAttributeSearchParams;
	sourceTree            : IChannelNodeTree;
	targetTree            : IChannelNodeTree;
	mapping               : IAttributeMapping;
}

export interface IChannelState {
	channelsPage                : IChannelsPageState;
	channelPage                 : IChannelPageState;
	channelAttributeMappingPage : IChannelAttributeMappingPageState;
	realms                      : any[];
}

export interface ISelectedCatalogSummary {
	catalogId?                : string;
	globalAttributeCount      : number;
	nodesContainingSkuCount   : number;
	nodesCount                : number;
	schemaAttributeCount      : number;
	skuAttributeCount         : number;
	skuCountForSourceProject? : number;
	totalSkuCount             : number;
}

export interface ISelectedCatalogOverallCountSummary{
	catalogId               : string;
	catalogStatus           : string;
	catalogType             : string;
	exportCount             : number;
	importCount             : number;
	recentBuildProjectCount : number;
	totalBuiltCount         : number;
	totalExportCount        : number;
	totalProjectCount       : number;
}

export interface ICatalogSkuPresence{
	catalogId                  : string;
	catalogLogo                : string;
	catalogName                : string;
	catalogType?               : string;
	consolidatedSkuCount?      : number;
	lastBuildDate              : string;
	projectId                  : string;
	projectName                : string;
	skuCount                   : number;
	totalSkuCount              : number;
	validationPassedSkuCount?  : number;
}

export interface IDashboardWidget {
	order              : number;
	headerLabel        : string;
	headerSubLabel?    : string;
	isVisible          : boolean;
	meta               : any;
}
export interface IWidgetsConfigurations{
	widgets : IDashboardWidget[];
	applyWidgetSettingsToAllCatalog : boolean;
	selectedCatalogWhenApplyToAll   : any | undefined;
	savedSettings : any;
}

export interface IChannelsDashboardState {
	catalogsList                         : any[];
	widgetConfigurations                 : IWidgetsConfigurations;
	selectedCatalog                      : any | undefined;
	selectedCatalogOverallCountSummary   : ISelectedCatalogOverallCountSummary;
	selectedCatalogSummary               : ISelectedCatalogSummary;
	selectedCatalogType                  : string;
	selectedFavouriteCatalogId           : string;
	sourceSkuPresence                    : ICatalogSkuPresence;
	targetSkuPresence                    : ICatalogSkuPresence;
}
