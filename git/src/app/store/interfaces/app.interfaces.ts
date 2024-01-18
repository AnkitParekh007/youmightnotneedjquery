import { IRestrictions } from "@app/models/interfaces/restrictions.interfaces";

export interface IAlternateUserIdentities {
	id?: string;
	customerCode?: string;
	userId?: string;
	provider?: string;
	alternateUserId?: string;
	alternateEmail?: string;
}

export interface IUser {
	id?: number;
	customerCode?: string;
	userFirstName?: string;
	userLastName?: string;
	userEmail?: string;
	userAccessStartDate?: string;
	userAccessEndDate?: string;
	alternateIdentities?: IAlternateUserIdentities[];
	catalog?: ICatalog;
	active?: boolean;
	systemUser?: boolean;
	apiEnabled?: boolean;
}

export interface IUserInfo extends IUser {
	uid?: string;
	email?: string;
	displayName?: string;
	picture?: string;
	verifiedEmail?: string;
	firstName?: string;
	lastName?: string;
	password?: string;
	name?: string;
	givenName?: string;
	familyName?: string;
	hd?: string;
	locale?: string;
	photoURL?: string;
	fullCustomerName?: string;
}

export interface IServerParams {
	clientCode: string;
	timezone: string;
	token: string;
	provider: string;
}

export interface IAmazeParams {
	customerCode: string;
	id: number;
	parameterCode: string;
	parameterDefaultValue: string;
	parameterDescription: string;
	parameterName: string;
	parameterSetValue: string;
}

export interface IRole {
	id: number;
	customerCode: string;
	name: string;
	description: string;
	privileges: IUserPrivilege[];
	custom: boolean;
}

export interface IUserPrivilege {
	id: number;
	customerCode: string;
	code: string;
	module: string;
	name: string;
	description: string;
	commonActionKey: number;
	catalogPrivilege: boolean;
	purchased: boolean;
	catalogId: number;
	dependentUponPrivilegeCode?: string;
	dependentUponPrivilegeKey?: number;
}

export interface IUserRole {
	id: number;
	user: IUser;
	role: IRole;
	groupInherited: boolean;
}

export interface IAuthorization {
	currentUserInfo: IUserInfo;
	userRoles: IUserRole[];
	userPrivileges: IUserPrivilege[];
	userPrivilegeCodes: string[];
}

export interface IRecentlyVisitedCatalog {
	catalog: ICatalog;
	catalogDomain: ICatalogDomain;
	catalogPrivilegeCodes: string[];
}

export interface ICatalog {
	id?: number;
	customerCode?: string;
	catalogKey?: number;
	catalogName?: string;
	catalogDescription?: string;
	totalNodes?: number;
	roots?: number;
	leaves?: number;
	attributes?: number;
	attributeGroups?: number;
	globalAttributes?: number;
	stringAttributes?: number;
	numericAttributes?: number;
	dateTimeAttributes?: number;
	skus?: number;
	products?: number;
	skuAndProductAssets?: number;
	taxonomyAssets?: number;
	attributeAssets?: number;
	usersWithCatalogViewPrivilege?: number;
	usersWithCatalogOpenPrivilege?: number;
	domainKey?: string;
	domainName?: string;
	primaryDomain?: ICatalogDomain;
	domainReviewModeActive?: string;
	locked?: boolean;
	primary?: boolean;
}

export interface ICatalogDomain {
	id?: number;
	catalog?: ICatalog;
	domainName?: string;
	reviewModeActive?: boolean;
	aiModeActive?: boolean;
	primary?: boolean;
	catalogId?: number;
}

export interface ICatalogPanelsSelection {
	firstPanel: boolean;
	middlePanel: boolean;
	lastPanel: boolean;
}

export interface ILanguageConfig {
	languages: ArrayBuffer[];
	autoSetChoices: ArrayBuffer[];
	skuContexts: ArrayBuffer[]
}

export interface IAppState {
	userInfo: IUserInfo;
	serverParams: IServerParams;
	amazeParams: IAmazeParams[];
	authorization: IAuthorization;
	recentlyVisitedCatalog: IRecentlyVisitedCatalog;
	pageTransferInfo: any;
	catalogsList: ICatalog[];
	catalogsPrivileges : any[];
	catalogPanelsSelection: ICatalogPanelsSelection;
	restrictions: IRestrictions | undefined;
	currentPage: string;
	currentPageName : string;
	languageConfig: ILanguageConfig;
	lockSidenav: boolean;
}
