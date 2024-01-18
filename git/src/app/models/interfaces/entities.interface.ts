interface Common {
	id?: string;
	name?: string;
	description?: string;
	isActive?: boolean;
	createdBy?: string;
	createDate?: Date;
	updatedBy?: string;
	updatedDate?: Date;
}

export interface CatalogDomain extends Common {
	catalogId?: string;
	isPrimary?: string;
}

export interface Catalog extends Common {}

export interface Node extends Common {
	customerTaxonomyId?: string;
	parentTaxonomyId?: string;
	rootTaxonomyId?: string;
	catalogId?: string;
	type?: string;
	level?: string;
	taxonomyPath?: string;
	isHidden?: boolean;
	deletedBy?: string;
	deleteDate?: Date;
	deleteRemark?: string;
}

export interface Taxonomy extends Node {
	children?: Node[];
}

export interface Schema extends Common {
	catalogDomainId?: string;
	taxonomyId?: string;
	attributeId?: string;
	attributeDisplayOrder?: string;
	isInSchema?: boolean;
	comments?: string;
}

export interface SchemaConstraint extends Common {
	schemaId?: string;
	commonMasterId?: string;
	minValue?: string;
	maxValue?: string;
}

export interface SKU extends Common {
	catalogId?: string;
	customerSkuId: string;
	type?: string;
	parentSkuId?: string;
}

export interface Attibute extends Common {
	catalogId?: string;
	attributeGroupId?: string;
	customerAttributeId?: string;
	name?: string;
	dataType?: string;
	isGlobal?: boolean;
	canHaveLOV?: boolean;
	canHaveMultipleUOM?: boolean;
}

export interface ExternalSource extends Common {
	taxonomyId?: Node[];
	priority1?: string;
	priority2?: string;
	priority3?: string;
	priority4?: string;
	priority5?: string;
	priority6?: string;
	priority7?: string;
	priority8?: string;
	priority9?: string;
	priority10?: string;
}

export interface DigitalAsset extends Common {
	type?: string;
	location?: string;
	digitalAssetLinkedId?: string;
	effectiveStartDate: Date;
	effectiveEndDate: Date;
}

export interface AttibuteGroup extends Common {
	attributeGroupName?: string;
}

export interface AttibuteAlias extends Common {
	attributeId?: string;
	schemaId?: string;
	attributeAliasName?: string;
	isGlobalAlias: boolean;
}

export interface UOM extends Common {
	symbol?: string;
	isBaseUOM?: string;
	uomCategory?: string;
	isGlobalAlias: boolean;
}

export interface UOMConversion extends Common {
	uomBaseId?: string;
	uomTargetId?: string;
	uomConversionTarget?: string;
}

export interface SchemaLOV extends Common {
	schemaId?: string;
	schemaAttributeValue?: string;
}

export interface SchemaUOM extends Common {
	schemaId?: string;
	uomId?: string;
}

export interface AttibuteMetaData extends Common {
	attributeId?: string;
	metaAttributeName?: string;
	metaAttributeValue?: string;
	isSysytemDefined?: boolean;
}

export interface AttibuteDigitalAsset extends Common {
	attributeId?: string;
	digitalAssetId?: string;
}

export interface AttibuteUOM extends Common {
	attributeId?: string;
	uomId?: string;
}

export interface SkuTaxonomy extends Common {
	skuId?: string;
	taxonomyId?: string;
	productFamilyId?: string;
}

export interface SkuAttibuteValue extends Common {
	skuId?: string;
	attributeId?: string;
	attributeValue?: string;
}

export interface SkuDigitalAsset extends Common {
	skuDigitalAssetId?: string;
	metaAttributeName?: string;
	metaAttributeValue?: string;
}

export interface SkuDigitalAssetMetaAttribute extends Common {
	skuId?: string;
	digitalAssetId?: string;
	isPrimary?: boolean;
}

export interface TaxonomyDigitalAsset extends Common {
	taxonomyId?: string;
	digitalAssetId?: string;
	isPrimary?: boolean;
}

export interface DigitalAssetMetaAttribute extends Common {
	digitalAssetId?: string;
	metaAttributeName?: string;
	metaAttributeValue?: string;
}

export interface TaxonomyDigitalAsset extends Common {
	taxonomyId?: string;
	digitalAssetId?: string;
	isPrimary?: boolean;
}
