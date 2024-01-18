import { IRestrictions } from "@app/models/interfaces/restrictions.interfaces";
import { IAppState, IUserInfo } from "@app/store/interfaces/app.interfaces";

export const initialUserInfo: IUserInfo = {
	uid: "",
	id: 0,
	email: "",
	displayName: "",
	picture: "",
	verifiedEmail: "",
	firstName: "",
	lastName: "",
	userEmail: "",
	password: "",
	name: "",
	givenName: "",
	familyName: "",
	locale: "",
	photoURL: "",
	customerCode: "",
	userFirstName: "",
	userLastName: "",
	userAccessStartDate: "",
	userAccessEndDate: "",
	alternateIdentities: [],
	catalog: undefined,
	active: false,
	systemUser: false,
	apiEnabled: false,
	fullCustomerName: ""
};

export const initialRestrictions: IRestrictions = {
	REVIEW_RESTRICTIONS: {
		SCHEMA_ADD: undefined,
		SCHEMA_DELETE: undefined,
		SCHEMA_UPDATE: undefined,
		SKU_AUTHORING_ATTRIBUTE_VALUES: undefined,
		SKU_AUTHORING_CLASSIFICATION: undefined,
		SKU_AUTHORING_DIGITAL_ASSET_LINKAGE: undefined,
		SKU_AUTHORING_SKU_ADD_DELETE: undefined,
		TAXONOMY_ADD: undefined,
		TAXONOMY_DELETE: undefined,
		TAXONOMY_DIGITAL_ASSET_LINKAGE: undefined,
		TAXONOMY_EDIT: undefined,
		TAXONOMY_HIERARCHY_DELETE: undefined,
		TAXONOMY_MOVE: undefined
	},
	CATALOG_LOCK_RESTRICTIONS: {
		ADVANCED_SEARCH: undefined,
		ATTRIBUTE_MASTER: undefined,
		BRIDGE_SYNC: undefined,
		DA_IMPORTS: undefined,
		DA_LIBRARY: undefined,
		EXPORT_FILE: undefined,
		PRODUCT_DETAIL_PAGE: undefined,
		PRODUCT_FAMILY: undefined,
		REPORT: undefined,
		ROLE_MANAGEMENT: undefined,
		SCHEMA: undefined,
		SKU: undefined,
		STYLE_GUIDE: undefined,
		TAXONOMY: undefined,
		UOM_MASTER: undefined,
		USER_GROUP_MANAGEMENT: undefined,
		USER_MANAGEMENT: undefined,
		VALIDATION_MANAGEMENT: undefined
	}
}

export const initialAppState: IAppState = {
	userInfo: initialUserInfo,
	serverParams: {
		clientCode: "",
		timezone: "",
		token: "",
		provider: ""
	},
	amazeParams: [],
	authorization: {
		currentUserInfo: initialUserInfo,
		userRoles: [],
		userPrivileges: [],
		userPrivilegeCodes: []
	},
	currentPage: "",
	currentPageName : "",
	recentlyVisitedCatalog: {
		catalog: undefined,
		catalogDomain: undefined,
		catalogPrivilegeCodes: undefined
	},
	pageTransferInfo: {},
	catalogsList: [],
	catalogsPrivileges : [],
	catalogPanelsSelection: {
		firstPanel: true,
		middlePanel: true,
		lastPanel: false
	},
	restrictions: initialRestrictions,
	languageConfig: {
		languages: [],
		autoSetChoices: [],
		skuContexts: []
	},
	lockSidenav: false
};
