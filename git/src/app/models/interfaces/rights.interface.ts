// Common Interfaces starts
interface Rights {
	readAccess?: boolean;
	createAccess?: boolean;
	updateAccess?: boolean;
	deleteAccess?: boolean;
}
interface DigitalAssetsAccess extends Rights {
	viewAssetsAccess?: boolean;
	linkAssetsAccess?: boolean;
	deLinkAssetsAccess?: boolean;
	viewLinkageAccess?: boolean;
}
// Common Interfaces ends

interface DomainAccess extends Rights {
	id?: string;
	domainName?: string;
	domainSubName?: string;
}
interface CatalogAccess extends Rights {
	id?: string;
	catalogName?: string;
	importAccess?: boolean;
	reimportAccess?: boolean;
	exportAccess?: boolean;
}
interface TaxonomyAccess extends Rights {
	moveNodeAccess?: boolean;
	viewAssetsAccess?: boolean;
	LinkAssetAccess?: boolean;
	DelinkAssetAccess?: boolean;
	searchAccess?: boolean;
}
interface AttributeUserCommentsAccess extends Rights {}
interface SchemaAttributesAccess extends Rights {
	attributeCharacteristicCopyAccess: {
		copyUOMsAccesss?: boolean;
		copyLOVsAccesss?: boolean;
		copyConstraintsAccesss?: boolean;
		commentsAccess?: AttributeUserCommentsAccess;
	};
	attributeCharacteristicPasteAccess: boolean;
}
interface SchemaAccess extends Rights {
	attributeAccess?: SchemaAttributesAccess;
	schemaSettingsAccess?: {
		copySchemaAccess?: boolean;
		pasteSchemaAccess?: boolean;
		autoOrderRankAccess?: boolean;
		spellCheckerAccess?: boolean;
		refreshSchemaAccess?: boolean;
	};
	addToFamilyAccess?: boolean;
}
interface SKUAccess extends Rights {
	moveSKUAccess?: boolean;
	addAssetAccess?: boolean;
	editAssetAccess?: boolean;
	deleteAssetAccess?: boolean;
	viewAssetsAccess?: boolean;
	LinkAssetAccess?: boolean;
	DelinkAssetAccess?: boolean;
	externalSourceAccess?: boolean;
	searchSKUAccess?: boolean;
	saveSearchAccess?: boolean;
	addToFamilyAccess?: boolean;
}
interface ProductFamilyAccess extends Rights {
	reorderFamilyAccess?: boolean;
}
interface DashboardWidgetAccess {
	widgetId: Number;
	widgetName?: string;
	viewAccess?: string;
}
interface DashboardWidgetAccess {
	favouriteCatalog?: {
		catalogId?: string;
		catalogName?: string;
	};
	widgets: DashboardWidgetAccess[];
}
interface UserDetails {
	userId?: string;
	userName?: string;
	userLanguage?: string;
}
interface Role {
	roleId?: string;
	roleName?: string;
}
interface Permissions {
	permissionId?: string;
	permissionName?: string;
}

// Final Data To be pulled for a logged in user
interface userAccess {
	userDetails?: UserDetails;
	roleDetails?: Role[];
	permissionDetails?: Permissions[];
	dashboardAccess?: DashboardWidgetAccess;
	domainAccess?: DomainAccess;
	digitalAssetsAccess?: DigitalAssetsAccess;
	catalogAccess?: CatalogAccess;
	taxonomyAccess?: TaxonomyAccess;
	schemaAccess?: SchemaAccess;
	skuAccess?: SKUAccess;
	productFamilyAccess?: ProductFamilyAccess;
}
