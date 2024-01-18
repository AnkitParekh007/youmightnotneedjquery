export interface IRestrictions {
	CATALOG_LOCK_RESTRICTIONS: ICatalogLockRestrictions;
	REVIEW_RESTRICTIONS: IReviewRestrictions;
}

export interface ICommonAddDeleteEditRestrictions {
	add: boolean;
	delete: boolean;
	edit: boolean;
}

export interface ICommonAsssetLinkageRestrictions {
	assetLinkage: boolean;
}

export interface ICatalogLockRestrictions {
	ADVANCED_SEARCH: IAdvancedSearchRestrictions;
	ATTRIBUTE_MASTER: IAttributeMasterRestrictions;
	BRIDGE_SYNC: IBridgeSyncRestrictions;
	DA_IMPORTS: ICommonAddDeleteEditRestrictions;
	DA_LIBRARY: ICommonAsssetLinkageRestrictions;
	EXPORT_FILE: ICommonAddDeleteEditRestrictions;
	PRODUCT_DETAIL_PAGE: IProductDetailPageRestrictions;
	PRODUCT_FAMILY: IProductFamilyRestrictions;
	REPORT: IReportRestrictions;
	ROLE_MANAGEMENT: IRoleManagementRestrictions;
	SCHEMA: ICommonAddDeleteEditRestrictions;
	SKU: ISkuRestrictions;
	STYLE_GUIDE: IStyleGuideRestrictions;
	TAXONOMY: ITaxonomyRestrictions;
	UOM_MASTER: ICommonAddDeleteEditRestrictions;
	USER_GROUP_MANAGEMENT: IUserGroupManagementRestrictions;
	USER_MANAGEMENT: IUserManagementRestrictions;
	VALIDATION_MANAGEMENT: IValidationManagementRestrictions;
}

export interface ISkuRestrictions extends ICommonAddDeleteEditRestrictions, ICommonAsssetLinkageRestrictions {
	copyValues: boolean;
	mirrorFrom: boolean;
	mirrorTo: boolean;
	moveFrom: boolean;
	moveTo: boolean;
	pfLinkage: boolean;
	manageRelations?: boolean;
}

export interface IAdvancedSearchRestrictions {
	skuRestrictions: ISkuRestrictions;
}

export interface IAttributeMasterRestrictions extends ICommonAddDeleteEditRestrictions, ICommonAsssetLinkageRestrictions {
	attributeGroups: ICommonAddDeleteEditRestrictions;
	attributeMetaTags: ICommonAddDeleteEditRestrictions;
}

export interface IReportRestrictions {
	skuValueAndUomUpdate: boolean;
}
export interface IValidationManagementRestrictions extends IReportRestrictions { }

export interface IStyleGuideRestrictions {
	fixForEntireCatalog: boolean;
}

export interface ITaxonomyRestrictions extends ICommonAsssetLinkageRestrictions {
	addChild: boolean;
	copiedFrom: boolean;
	copiedTo: boolean;
	delete: boolean;
	edit: boolean;
	move: boolean;
	movedTo: boolean;
	taxonomyMetaAttributes?: ICommonAddDeleteEditRestrictions;
	taxonomyMetaTags?: ICommonAddDeleteEditRestrictions;
}

export interface IUserManagementRestrictions {
	addUser: boolean;
	catalogIndependentPrivileges: boolean;
	deleteUser: boolean;
	editUser: boolean;
	grantRole: boolean;
}

export interface IRoleManagementRestrictions {
	editRole: boolean;
	addRole: boolean;
	deleteRole: boolean;
}

export interface IProductFamilyRestrictions extends ICommonAddDeleteEditRestrictions, ICommonAsssetLinkageRestrictions { }

export interface IProductDetailPageRestrictions extends ICommonAsssetLinkageRestrictions {
	edit: boolean;
}

export interface IBridgeSyncRestrictions {
	syncAction: boolean;
}

export interface IUserGroupManagementRestrictions {
	addUserGroup: boolean;
	deleteUserGroup: boolean;
	editUserGroup: boolean;
}

export interface ICommonReviewRestrictions {
	taxonomyRestriction: ITaxonomyRestrictions;
	childrenTaxonomyTreeRestriction: ITaxonomyRestrictions;
	skuRestriction: ISkuRestrictions;
	skuRestrictionForchildrenTaxonomyTree: ISkuRestrictions;
	schemaRestriction: ICommonAddDeleteEditRestrictions;
	schemaRestrictionForchildrenTaxonomyTree: ICommonAddDeleteEditRestrictions;
}

export interface IReviewRestrictions {
	SCHEMA_ADD: ICommonReviewRestrictions;
	SCHEMA_DELETE: ICommonReviewRestrictions;
	SCHEMA_UPDATE: ICommonReviewRestrictions;
	SKU_AUTHORING_ATTRIBUTE_VALUES: ICommonReviewRestrictions;
	SKU_AUTHORING_CLASSIFICATION: ICommonReviewRestrictions;
	SKU_AUTHORING_DIGITAL_ASSET_LINKAGE: ICommonReviewRestrictions;
	SKU_AUTHORING_SKU_ADD_DELETE: ICommonReviewRestrictions;
	TAXONOMY_ADD: ICommonReviewRestrictions;
	TAXONOMY_DELETE: ICommonReviewRestrictions;
	TAXONOMY_DIGITAL_ASSET_LINKAGE: ICommonReviewRestrictions;
	TAXONOMY_EDIT: ICommonReviewRestrictions;
	TAXONOMY_HIERARCHY_DELETE: ICommonReviewRestrictions;
	TAXONOMY_MOVE: ICommonReviewRestrictions;
}
