// Amaze Apis
// where G  stands for GET api request
// where PO stands for POST api request
// where PU stands for PUT api request
// where PA stands for PATCH api request
// where D  stands for DELETE api request
export const urls: any = {
	// actual live APIs
	// Entity Info
	getEntityInfo: "/entity/{entityType}/{entitykey}", // G

	// Catalog module APIs
	createCatalog: "/catalogs", // PO
	getCatalogs: "/catalogs/previewDetails?aggregationLevel=catalog", // G
	getCatalog: "/catalogs/{catalogId}", // G
	getCatalogsCacheMaterializedView: "/catalogs/cachedMaterializedInfo", // G
	getCatalogsMaterializedView: "/catalogs/materializedInfo", // G
	getCatalogMaterializedView: "/catalogs/{catalogId}/domain/{domainId}/materializedInfo", // G
	updateCatalog: "/catalogs/{catalogId}", // PU
	getCatalogBasicDetails: "/catalogs/previewDetails?aggregationLevel=basic", // G
	getCatalogDomainDetails: "/catalogs/previewDetails?aggregationLevel=domain", // G
	getDomains: "/catalogs/{catalogId}/domain", // G
	addDomain: "/catalogs/{catalogId}/domain", // PO
	updateDomain: "/catalogs/{catalogId}/domain", // PA
	deleteDomain: "/catalogs/{catalogId}/domain/{domainId}", // DEL
	getAllCatalogs: "/allCatalogs", // G
	deleteCatalog: "/catalogs/{catalogId}", // DEL

	// style guide APIs
	getStyleGuide: "/catalogs/{catalogId}/styleGuide", // G
	createStyleGuide: "/catalogs/{catalogId}/styleGuide", // PO
	updateStyleGuide: "/catalogs/{catalogId}/styleGuide", // PA
	deleteStyleGuide: "/catalogs/{catalogId}/styleGuide", // D
	performCheckStyleGuide: "/catalogs/{catalogId}/styleGuide/performCheck", // PA
	getStyleGuideReportCount: "/catalogs/{catalogId}/styleGuide/checkResult/count", // G
	getStyleGuideReport: "/catalogs/{catalogId}/styleGuide/checkResult", // G
	fixStyleGuide: "/catalogs/{catalogId}/styleGuide/fix", // PA
	deleteStyleGuideReport: "/catalogs/{catalogId}/styleGuide/checkResult", // D
	downloadStyleGuideReport: "/catalogs/{catalogId}/styleGuide/downloadReport", // G

	// Taxonomy module APIs
	getCatalogNodesInOrder: "/catalogs/{catalogId}/nodes/reorderAlphabetically?domain={domain}", // PA
	getCatalogNodes: "/catalogs/{catalogId}/nodes?depth={depth}&domain={domain}", // G
	getCatalogNodesSearch: "/catalogs/{catalogId}/searchNodes", // G
	getCatalogNodesSearchHierarchy: "/catalogs/{catalogId}/nodes/{nodeId}/getParentIds", // G
	getCatalogNodess: "/catalogs/{catalogId}/nodes", // G need to change in future
	getCatalogChildNodes: "/catalogs/{catalogId}/nodes?depth={depth}&nodeId={nodeId}&domain={domain}", // G
	getNodeDetails: "/catalogs/{catalogId}/nodes/{nodeId}", // G
	addNodes: "/catalogs/{catalogId}/nodes?domain={domain}", // PO
	updateNodes: "/catalogs/{catalogId}/nodes?domain={domain}", // PO
	moveNodes: "/catalogs/{catalogId}/nodes/{nodeId}/move?domain={domain}", // PA
	reorderNodes: "/catalogs/{catalogId}/nodes/{nodeId}/reorder?domain={domain}", // PA
	deleteNodes: "/catalogs/{catalogId}/nodes/{nodeId}?domain={domain}", // D
	copyTaxonomyStructure: "/catalogs/{catalogId}/domain/copyTaxonomyStructure", // PO
	catalogGlobalSearch: "/catalogs/{catalogId}/globalSearch", // G
	skuGlobalSearch: "/catalogs/{catalogId}/globalSkuSearch", // G

	// SKUs module APIs
	getSku: "/catalogs/{catalogId}/skus/{skuId}", // G
	getSkus: "/catalogs/{catalogId}/skus;type=EQ:SKU", // G
	getSkusByNode: "/catalogs/{catalogId}/nodes/{nodeId}/skus", // G
	createSkus: "/catalogs/{catalogId}/nodes/{nodeId}/skus", // PO
	updateSkus: "/catalogs/{catalogId}/skus", // PA
	editSkus: "/catalogs/{catalogId}/skus", // PU
	deleteSkus: "/catalogs/{catalogId}/skus", // D
	crossListSkus: "/catalogs/{catalogId}/crossListing/nodes/{nodeId}/skus", // PO
	removeSkuCrossListing: "/catalogs/{catalogId}/crossListing/nodes/{nodeId}/skus", // D
	moveSkus: "/catalogs/{catalogId}/nodes/{targetNodeId}/skus", // PA
	addSkus: "/catalogs/{catalogId}/nodes/{nodeId}/skus", // PO
	mirrorSkus: "/catalogs/{catalogId}/domain/mirrorSkus", // PO
	removeMirrorSkus: "/catalogs/{catalogId}/domain/{domainId}/mirrorSkus", // DEL
	getCrosslistSkus: "/catalogs/{catalogId}/crossListing/nodes/{nodeId}/skus?count=true", // GET
	addCrosslistSkus: "/catalogs/{catalogId}/skuCrossListing", // PO
	removeCrosslistSkus: "/catalogs/{catalogId}/crossListing/nodes/{nodeId}/skus", // DEL
	getSkuAttributes: "/catalogs/{catalogId}/domains/{domainId}/attributes",
	getSkuIds: "/catalogs/{catalogId}/skuIds",
	getSkuAttributeById: "/catalogs/{catalogId}/skus/{skuId}/attributes/{skuAttributeId}", // G
	getSkuAttributesByNodeAndSku: "/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/skuAttributesByNodeAndSku",

	// SKU Relationships
	getSkuRelationships: "/skuRelationships", // G
	createSkuRelationships: "/skuRelationships", // PO
	updateSkuRelationships: "/skuRelationships/{relationshipId}", // PA
	deleteSkuRelationships: "/skuRelationships/{relationshipId}", // D

	getRelatedSkus: "/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/relatedSkus", // G
	addRelatedSkus: "/catalogs/{catalogId}/relatedSkus", // PO
	updateRelatedSku: "/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/relatedSkus/{skuTaxoRelationId}", // PA
	deleteRelatedSkus: "/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/relatedSkus", // DEL

	// SKUs UoM converison APIs
	getTargetUom: "/catalogs/{catalogId}/attributes/{attributeId}/uoms", // G
	getConversionFormula: "/uoms/{baseUomId}/targetUoms/{targetUomId}/conversionFormula", // G
	getSchemaAttrOnMultipleNode: "/catalogs/{catalogId}/commonSchemaAttributes", // G
	uomConversion: "/catalogs/{catalogId}/attributes/{attributeId}/skuAttributeUomValues-convert", // PA

	// SKU external sources
	getExternalSources: "/catalogs/{catalogId}/nodes/{nodeId}/externalSources", // G
	createSKUFromExternalSources: "/catalogs/{catalogId}/skuAttributes", // PO
	updateSKUFromExternalSources: "/catalogs/{catalogId}/skuAttributes", // PA
	deleteSKUFromExternalSources: "/catalogs/{catalogId}/skuAttributes", // D
	copySKUAttributes: "/catalogs/{catalogId}/skus/{skuId}/attributes/{attributeId}/copy", // PA
	getStaticHtml: "/getUrlHtml?url={url}",
	externalSourcesAudit: "/catalogs/{catalogId}/skuAttributes/audit",

	// SKU validation APIS
	getSkuValidationFailuresSummaryForTaxonomy: "/catalogs/{catalogId}/nodes/{nodeId}/skuValidationFailures/summary", // G
	getSkuValidationFailuresForTaxonomy: "/catalogs/{catalogId}/nodes/{nodeId}/skuValidationFailures", // G
	getSkuValidationFailures: "/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/validationFailures", // G
	getSkuAttributesForFiltering: "/catalogs/{catalogId}/failedValidationAttributes", // G

	// Schema module APIs
	getSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes", // G
	getSchemaAttributes: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/attributes", // G
	getCopiedSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes?limit={limit}&offset={offset}&count={count}", // G
	addSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes", // PO
	editSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes", // PU
	deleteSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes", // D
	pasteSchemas: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes-paste?sourceNode={sourceNode}&uom={uom}&lov={lov}&constraint={constraint}", // PO
	pasteSchemasCharacteristics: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/{schemaAttributeId}/pasteFrom?uom={uom}&lov={lov}&constraint={constraint}", // PA
	reorderSchemaAttributes: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/{schemaAttributeId}/reorder", // PA
	updateSchemaAttributeComments: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/{schemaAttributeId}/userComment-update", // PA
	updateSchemaAttributeNaviOrder: "/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/{schemaAttributeId}/navigationOrder-update", // PA
	resetDisplayOrder: "/catalogs/{catalogId}/domain/{domainId}/resetDisplayOrder?reorderFlag=RESET", // PA

	// Product Family APIs
	getProFamilies: "/catalogs/{catalogId}/skus;type=EQ:ProductFamily", // G
	getProFamily: "/catalogs/{catalogId}/skus", // G
	getChildProFamilies: "/catalogs/{catalogId}/skus", // G
	attachSkuToProFamilies: "/catalogs/{catalogId}/nodes/{nodeId}/productFamilies/{productFamilyId}/skuLinkage-create", // PA
	detachSkuToProFamilies: "/catalogs/{catalogId}/nodes/{nodeId}/skuLinkage-remove", // D
	getProductFamiliesByAttribute: "/catalogs/{catalogId}/skuAttributes", // G
	rollUpSkuAttributes: "/catalogs/{catalogId}/nodes/{nodeId}/productFamilies/{productFamilyId}/attributes/{attributeId}/rollAttributeValues?rollUp={rollUp}", // PA
	moveProductFamily: "/catalogs/{catalogId}/nodes/{nodeId}/productFamilies/{productFamilyId}/move", // PA
	editProductFamilyTitle: "/catalogs/{catalogId}/skus/{productFamilyId}/title-update", // PA
	getPFTreeHierarchy: "/catalogs/{catalogId}/nodes/{nodeId}/productFamilies/{pfId}/getParentIds", // G
	executePFRecommendation: "/catalogs/{catalogId}/nodes/{nodeId}/productFamily/recommendation", // P
	pfRecommendationStatus: "/catalogs/{catalogId}/nodes/{nodeId}/productFamily/recommendationStatus", // G
	cascadeValueToSKUs: "/catalogs/{catalogId}/nodes/{nodeId}/productFamily/rollAttributeValues", // PA

	// Attribute module APIs
	getAttributes: "/catalogs/{catalogId}/attributes", // G
	getAttribute: "/catalogs/{catalogId}/attributes/{attributeId}", // G
	attributesSearch: "/catalogs/{catalogId}/attributes", // G
	addAttributes: "/catalogs/{catlogId}/attributes", // PO
	editAttributes: "/catalogs/{catlogId}/attributes", // PU
	deleteAttribute: "/catalogs/{catlogId}/attributes/{attributeId}", // D
	isAttrDuplicated: "/catalogs/{catalogId}/attributes/{attributeId}/isDuplicate?name={attributeTerm}", // G

	// Attribute Groups module APIs
	getAttributeGroups: "/catalogs/{catalogId}/attributeGroups", // G
	createAttributeGroups: "/catalogs/{catalogId}/attributeGroups", // PO
	updateAttributeGroups: "/catalogs/{catalogId}/attributeGroups/{attributeGroupId}", // PU
	removeAttributeGroups: "/catalogs/{catalogId}/attributeGroups/{attributeGroupId}", // DEL
	getAttributesInGroups: "/catalogs/{catalogId}/attributeGroups/{attributeGroupId}/attributes", // G
	addAttributeInGroups: "/catalogs/{catalogId}/attributeGroups/{attributeGroupId}/attributes-add", // PA
	removeAttributeInGroups: "/catalogs/{catalogId}/attributeGroups/{attributeGroupId}/attributes-remove", // PA

	// Attribute Metadata module APIs
	getAttributeMetatagRelevance: "/metatagRelevance",
	getAttributeMetatag: "/attributeMetatag", // G
	addAttributeMetatag: "/attributeMetatag", // PO
	editAttributeMetatag: "/attributeMetatag", // PU
	deleteAttributeMetatag: "/attributeMetatag/{metatagId}", // DEL

	getAttributeMetaAttribute: "/attributeMetaAttribute", // G
	addAttributeMetaAttribute: "/attributeMetaAttribute", // PO
	editAttributeMetaAttribute: "/attributeMetaAttribute", // PU
	deleteAttributeMetaAttribute: "/attributeMetaAttribute/{metaAttributeId}", // DEL

	// Uoms module APIs
	// getUoms: "/uoms?limit={limit}&offset={offset}&uomName={uomName}&count={count}", // G
	getUoms: "/uoms", // G
	addUoms: "/uoms", // PO
	editUoms: "/uoms", // PU
	deleteUom: "/uoms/{uomId}", // D
	getUomsCategories: "/uomCategories", // G

	// Digital Assets API
	getPreSignedUrl: "/preSignedUrl", // PO
	getDigitalAssets: "/digitalAssets", // G
	getDigitalAsset: "/digitalAssets/{assetId}", // G
	addDigitalAssets: "/digitalAssets", // PO
	deleteDigitalAssets: "/digitalAssets", // DE
	downloadAssets: "/digitalAssets/download", // PU
	uploadDigitalUrl: "/digitalAssets/url", // PO
	uploadDigitalUrlFile: "/digitalAssets/urlFile", // PO
	uploadDigitalZipFile: "/digitalAssets/zip", // PO
	uploadDigitalCloudStorage: "/digitalAssets/{cloudStoreName}/drive", // PO
	getAssetTagsList: "/digitalAssets/tags", // G
	downloadAssetManifestReport: "/digitalAssetManifestReport", // G
	bulkUpdateDAMetadata: "/bulkUpdateDAs", // PU
	getDaCountsForAdvancedFilter: "/getDaCountsForAdvancedFilter",
	daMetatags: "/daMetatags",
	daMetaAttributes: "/daMetaAttributes",
	attributesForDAs: "/attributesForDAs",
	summary: "/digitalAssets/summary",

	// Vision Information
	triggerPhotoVisionInformation: "/daPhotoBatchVisionInfoProcess", // PO
	getAssetVisionInfoCount: "/daPhotoBatchVisionInfoProcess/count", // G
	getAssetVisionInfo: "/digitalAssets/{digitalAssetId}/recognitionInfo", // G
	getSkusRecommendedDA: "/digitalAssets/recommendations", // G

	// Digital Assets Import API
	getDigitalAssetForImport: "/digitalAssets/import", // G
	getDigitalAssetForImportDetaisl: "/digitalAssets/import/{importId}/details", // G
	getImportErrorLog: "/digitalAssets/import/{importId}/downloadError", // G
	getUniqueErrorMessages: "/digitalAssets/import/{importId}/getUniqueErrors", // G

	// Digital Assets Metadata APIs
	getDAMetaAttributes: "/daMetaAttributes;digitalAssetMetaAttributeName=LK:{searchTerm}", // G
	getDAMetaTags: "/daMetatags;digitalAssetMetatagName=LK:{searchTerm}", // G
	addMetaAttributes: "/addMissingDaMetaAttributesAndGetKeys", // PU
	addMetaTags: "/addMissingDaMetaTagsAndGetKeys", // PU

	// Assets Linkage and delinkage (Taxonomy)
	getTaxonomyDigitalAssetLinksById: "/catalogs/{catalogId}/taxonomyLinks/links/{linkId}", // G
	getTaxonomyDigitalAssetLinksByTaxonomy: "/catalogs/{catalogId}/taxonomyLinks/nodes/{taxonomyId}", // G
	getTaxonomyDigitalAssetLinksByDigitalAsset: "/catalogs/{catalogId}/taxonomyLinks/digitalAssets/{digitalAssetId}", // G
	createTaxonomyDigitalAssetLink: "/catalogs/{catalogId}/taxonomyLinks", // PO
	updateTaxonomyDigitalAssetLink: "/catalogs/{catalogId}/taxonomyLinks", // PU
	deleteTaxonomyDigitalAssetLink: "/catalogs/{catalogId}/taxonomyLinks", // DEL
	getTaxonomyReport: "/catalogs/{catalogId}/domain/{domain}/taxonomyDetailsReport", // PA

	// Assets Linkage and delinkage (SKU)
	getSkuDigitalAssetLinksById: "/catalogs/{catalogId}/skuLinks/links/{linkId}", // G
	getSkuDigitalAssetLinksBySku: "/catalogs/{catalogId}/skuLinks/skus/{skuId}", // G
	getSkuDigitalAssetLinksByDigitalAsset: "/catalogs/{catalogId}/skuLinks/digitalAssets/{digitalAssetId}", // G
	createSkuDigitalAssetLink: "/catalogs/{catalogId}/skuLinks", // PO
	updateSkuDigitalAssetLink: "/catalogs/{catalogId}/skuLinks", // PU
	deleteSkuDigitalAssetLink: "/catalogs/{catalogId}/skuLinks", // DEL

	// Assets Linkage and delinkage (Attribute)
	getAttributeDigitalAssetLinksById: "/catalogs/{catalogId}/attributeLinks/links/{linkId}", // G
	getAttributeDigitalAssetLinksByAttribute: "/catalogs/{catalogId}/attributeLinks/attributes/{attributeId}", // G
	getAttributeDigitalAssetLinksByDigitalAsset: "/catalogs/{catalogId}/attributeLinks/digitalAssets/{digitalAssetId}", // G
	createAttributeDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks/", // PO
	updateAttributeDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks/", // PU
	deleteAttributeDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks", // DEL

	// Assets Linkage and delinkage (Attribute)
	getDomainDigitalAssetLinksById: "/catalogs/{catalogId}/attributeLinks/links/{linkId}", // G
	getDomainDigitalAssetLinksByDomain: "/catalogs/{catalogId}/attributeLinks/attributes/{attributeId}", // G
	getDomainDigitalAssetLinksByDigitalAsset: "/catalogs/{catalogId}/attributeLinks/digitalAssets/{digitalAssetId}", // G
	createDomainDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks/", // PO
	updateDomainDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks/", // PU
	deleteDomainDigitalAssetLink: "/catalogs/{catalogId}/attributeLinks", // DEL

	// Assets Linkage and delinkage (Domain Values a.k.a Super Attribute Values)
	getDomainvalueDigitalAssetLinksById : "/catalogs/{catalogId}/domainValueLinks/links/{linkId}", // G
	getDomainvalueDigitalAssetLinksByDomainvalue: "/catalogs/{catalogId}/domainValueLinks/domainValues/{domainValueId}", // G
	getDomainvalueDigitalAssetLinksByDigitalAsset: "/catalogs/{catalogId}/domainValueLinks/digitalAssets/{digitalAssetId}", // G
	createDomainvalueDigitalAssetLink: "/catalogs/{catalogId}/domainValueLinks/", // PO
	updateDomainvalueDigitalAssetLink: "/catalogs/{catalogId}/domainValueLinks/", // PU
	deleteDomainvalueDigitalAssetLink: "/catalogs/{catalogId}/domainValueLinks", // DEL

	// Assets Linkage and delinkage (SKU Meta Attribute)
	createSkuMetaAttributeDigitalAssetLinks: "/catalogs/{catalogId}/skuLinks/", // PO
	deleteSkuMetaAttributeDigitalAssetLinks: "/catalogs/{catalogId}/skuLinks/links/{linkId}", // DEL
	getSkuMetaAttributeDigitalAssetLinks: "/catalogs/{catalogId}/skuLinks/links/{linkId}/metaAttribute", // G

	// Assets Bulk Edit APIs (Photos)
	getPhotoEditTemplatesList: "/daPhotoEditTemplates", // G
	getPhotoEditTemplate: "/daPhotoEditTemplates/{templateId}", // G
	addPhotoEditTemplate: "/daPhotoEditTemplates", // PO
	editPhotoEditTemplate: "/daPhotoEditTemplates", // PA
	deletePhotoEditTemplate: "/daPhotoEditTemplates/{templateId}", // DEL

	getphotoEditBatchProcess: "/daPhotoEditBatchProcess", // G
	getphotoEditBatchProcessCount: "/daPhotoEditBatchProcess/count", // G
	createBatchProcess: "/daPhotoEditBatchProcess", // PO
	processSampleOutputForTemplate: "/daPhotoEditTemplates/{templateId}/process", // PO
	getBatchProcessProcessedAssets: "/daPhotoEditBatchProcess/{templateId}/units", // G

	// (Role management APIs)
	getUsers: "/security/users", // G
	createUser: "/security/users", // PO
	updateUser: "/security/users/{userId}", // PU
	deleteUser: "/security/users/{userId}", // DEL
	getUser: "/security/users/{userId}", // G

	getRolesForUser: "/security/users/{userId}/roles", // G
	addRolesToUser: "/security/users/{userId}/roles", // PO
	removeRolesFromUser: "/security/users/{userId}/roles", // D
	getPrivilegesForUser: "/security/users/{userId}/privileges", // G
	getPrivilegeCodesForUser: "/security/users/{userId}/privilegeCodes", // G

	// (User management APIs)
	getRoles: "/security/roles", // G
	createRole: "/security/roles", // PO
	updateRole: "/security/roles/{roleId}", // PU
	deleteRole: "/security/roles/{roleId}", // DEL
	getUsersForRole: "/security/roles/{roleId}/users", // G
	addUsersToRole: "/security/roles/{roleId}/users", // PO
	removeUsersFromRole: "/security/roles/{roleId}/users", // DEL

	assignUsersToUserGroups: "/security/userGroups/{userGroupId}/users", // PO
	assignRolesToUserGroups: "/security/userGroups/{userGroupId}/roles", // PO
	getUserGroups: "/security/userGroups", // GET
	addUserGroups: "/security/userGroups", // POST
	editUserGroups: "/security/userGroups/{userGroupId}", // PUT
	deleteUserGroups: "/security/userGroups/{userGroupId}", // DEL

	getGlobalPrivileges: "/security/global/privileges", // G
	getPrivilegesForRole: "/security/roles/{roleId}/privileges", // G
	getPrivilegeCodesForRole: "/security/roles/{roleId}/privilegeCodes", // G
	addPrivilegeToRole: "/security/roles/{roleId}/privileges", // PO
	removePrivilegeFromRole: "/security/roles/{roleId}/privileges", // DEL
	setPrivilegesForRole: "/security/roles/{roleId}/privileges", // PU
	setPrivilegesForRoleFromCodes: "/security/roles/{roleId}/privileges", // PA
	catalogDomainReviewPrivileges: "/security/review/privileges", // G

	// review
	getReviewsList: "/catalogs/{catalogId}/reviews", // G
	getReview: "/catalogs/{catalogId}/reviews/{reviewId}", // G
	updateReviews: "/catalogs/{catalogId}/reviews", // PU
	getReviewHistory: "/catalogs/{catalogId}/reviews/{reviewId}", // G
	getReviewCounts: "/catalogs/{catalogId}/reviews/count", // G
	updateReviewNotes: "/catalogs/{catalogId}/reviews/{reviewId}/note", // PO
	reAssignReviewRequest: "/catalogs/{catalogId}/reviews/assign", // PA
	checkPendingTaxonomyReview: "/catalogs/{catalogId}/nodes/{nodeId}/operation/{operationName}/checkPendingReview", // G
	getReviewRestrictionsMatrix: "/reviewRestrictions", // G
	getReviewStatuses: "/reviewStatuses", // G
	getReviewActions: "/entities/{entity}/reviewActions", // G
	getRestrictions: "/restrictions", // G

	// reject review Request Modifications
	updateRejectReviewSkuAttributes: "/catalogs/{catalogId}/reviews/{reviewId}/skuAttributes", // PA
	updateRejectReviewSkuDaLink: "/catalogs/{catalogId}/reviews/{reviewId}/skuDigitalAssets", // PA
	updateRejectReviewTaxonomyDaLink: "/catalogs/{catalogId}/reviews/{reviewId}/taxonomyDigitalAssets", // PA
	updateRejectReviewTaxonomy: "/catalogs/{catalogId}/reviews/{reviewId}/skuMoves", // PA
	updateRejectReviewSKU: "/catalogs/{catalogId}/reviews/{reviewId}/skus/{skuId}", // PU
	updateRejectTaxonomyUpdates: "/catalogs/{catalogId}/reviews/{reviewId}/taxonomyUpdate", // PA
	updateRejectSchema: "/catalogs/{catalogId}/reviews/{reviewId}/schema", // PA

	// Reports
	getAllReports: "/catalogs/{catalogId}/reports", // G
	getExecutionHistory: "/catalogs/{catalogId}/reports/{reportCode}/executionHistory", // G
	reportFavorite: "/catalogs/{catalogId}/reports/{reportCode}/favorite", // PA
	executeReport: "/catalogs/{catalogId}/reports/{reportCode}/execute", // PO
	fetchReport: "/catalogs/{catalogId}/reports/{reportCode}/data", // G
	fetchP7DrilldownReport: "/catalogs/{catalogId}/reports/{reportCode}/drilldown/data", // G
	fetchP1DrilldownReport: "/catalogs/{catalogId}/reports/{reportCode}/skus", // G
	downloadReport: "/catalogs/{catalogId}/reports/{reportCode}/data/download", // G
	getLovsForAttr: "/catalogs/{catalogId}/attributes/{attributeId}/lovs", // G
	getUomsForAttr: "/catalogs/{catalogId}/attributes/{attributeId}/uoms", // G
	updateSkuValueReport: "/catalogs/{catalogId}/reports/{reportCode}/skus", // PU
	fixReport: "/catalogs/{catalogId}/reports/{reportCode}/skus", // DE
	fixReportT1: "/catalogs/{catalogId}/reports/{reportCode}/taxonomies", // PA
	fixP12: "/catalogs/{catalogId}/reports/{reportCode}/fixExtraneousSpaces", // PU
	fixReportS10Lovs: "/catalogs/{catalogId}/reports/{reportCode}/schemas/lovs",
	fixReportS10Uoms: "/catalogs/{catalogId}/reports/{reportCode}/schemas/uoms",
	fixReportS10Constraints: "/catalogs/{catalogId}/reports/{reportCode}/schemas/constraints", // DE
	addNoteToReport: "/catalogs/{catalogId}/reports/{reportCode}/note", // PA
	checkLovSuggestions: "/catalogs/{catalogId}/reports/{reportCode}/taxonomies", // G

	// validation Failure management
	getValidationConstraintsList: "/catalogs/{catalogId}/validation/constraints", // G
	validationFailureBySchemaConstraints: "/catalogs/{catalogId}/reports/validation/failures/by/schemaConstraint", // G
	validationFailureByAttributes: "/catalogs/{catalogId}/reports/validation/failures/by/attribute", // G
	validationFailureByTopAttributes: "/catalogs/{catalogId}/reports/validation/failures/by/top/attribute", // G
	validationFailureByTopNodes: "/catalogs/{catalogId}/reports/validation/failures/by/top/node", // G
	validationFailureBySkuList: "/catalogs/{catalogId}/reports/validation/failures/skusList", // G
	updateFailureForUomsAndLovs: "/catalogs/{catalogId}/reports/validation/failures/skusList", // PU
	getLovSuggestions: "/catalogs/{catalogId}/attributes/{attributeId}/lovs", // G
	getValidationsCount: "/catalogs/{catalogId}/reports/validation/failures/skuCount", // G

	// Import Templates
	getImportTemplates: "/importTemplates", // G
	createImportTemplates: "/catalogs/{catalogId}/importTemplates", // PO
	updateImportTemplates: "/catalogs/{catalogId}/importTemplates/{id}", // PU
	deleteImportTemplates: "/catalogs/{catalogId}/importTemplates/{id}", // DEL
	getSingleImportTemplates: "/catalogs/{catalogId}/importTemplates/{id}", // G
	previewImportTemplates: "/catalogs/{catalogId}/importTemplates/preview", // PO
	importTemplatevalidateName: "/catalogs/{catalogId}/importTemplates/validateName", // PO
	saveAsImportTemplate: "/catalogs/{catalogId}/importTemplates/{existingTemplateId}/copyImportTemplate", // PO

	// Hybrid Import Templates
	getHybridTemplates: "/importHybridTemplates", // G
	createHybridTemplate: "/importHybridTemplates", // PO
	updateHybridTemplate: "/importHybridTemplates/{templateId}", // PU
	saveHybridTemplateAs: "/importHybridTemplates/{templateId}/saveImportHybridTemplateAs", // PO
	deleteHybridTemplate: "/importHybridTemplates/{templateId}", // DEL

	// Imports
	getImports: "/imports", // G
	createImports: "/catalogs/{catalogId}/imports", // PO
	updateImports: "/catalogs/{catalogId}/imports/{id}", // PU
	getImport: "/catalogs/{catalogId}/imports/{id}", // PU
	deleteImport: "/catalogs/{catalogId}/imports/{id}", // DEL
	deleteFile: "/catalogs/{catalogId}/imports/{importId}/importFiles/{importFileId}", // DELETE
	processImport: "/catalogs/{catalogId}/imports/{importId}/process", // PU
	addFile: "/catalogs/{catalogId}/imports/{importId}/importFiles", // PU
	getImportFileTypes: "/importFileTypes", // G
	downloadImportFile: "/catalogs/{catalogId}/imports/{importId}/importFiles/{importFileId}", // G
	getChildrenImportsByPerpetualImport : "/imports/{importId}/childImports", // G

	// Exports
	getExports: "/exports", // G
	createExports: "/catalogs/{catalogId}/exports", // PO
	updateExports: "/catalogs/{catalogId}/exports/{id}", // PU
	getExport: "/catalogs/{catalogId}/exports/{id}", // PU
	deleteExport: "/catalogs/{catalogId}/exports/{id}", // DEL
	getExportFileTypes: "/exportFileTypes", // G
	downloadExportFile: "/catalogs/{catalogId}/exports/{exportId}/exportFiles/{exportFileId}", // G
	downloadExportSample: "/exportFileTypes/{id}",
	processExports: "/catalogs/{catalogId}/exports/{exportId}", // PA
	getSearchedCondition: "/conditionNameAndIds", // G
	getLatestExportDate: "/catalogs/{catalogId}/exports/latestExportDates", // G
	getGraingerSkuUpdateCount: "/graingerTemplates/skuUpdateCount", // G
	getGraingerIterationFailedSKUs: "/catalogs/{catalogId}/exports/{exportId}/exportIterationFailedSkus", // G
	patchIterationSKUAttributeValue: "/catalogs/{catalogId}/domain/{domainId}/graingerTemplates/skuUpdate", // PA
	getIterationFailureDescription: "/failedSkusDescriptions", // G
	getBmeCatVersions: "/bmecatVersion", // G
	getExportReadiness: "/exportReadiness/{skuId}", // G

	// Export Templates
	getExportTemplates: "/exportTemplates", // G
	getExportTemplateInfo: "/customExportTemplate/{templateId}", // G
	exportPreSignedUrl: "/exportTemplateFile",
	exportTemplateFields: "/exportTemplateFields",
	exportTemplates: "/catalogs/{catalogId}/exportTemplates",
	deleteExportTemplate: "/customExportTemplate/{templateId}", // DEL
	updateExportTemplate: "/catalogs/{catalogId}/exportTemplates/{templateId}", // PU
	getExportTemplateTypes: "/exportTemplateTypes", // G
	checkExportTemplateName: "/checkExportTemplateName?exportTemplateId={templateId}&exportTemplateName={templateName}", // G

	// Amazon Templates API
	amazonTemplates: "/amazonTemplates",
	singleAmazonTemplate: "/amazonTemplates/{templateId}",
	downloadTemplateFile: "/amazonTemplates/{templateId}/amazonTemplateFile",
	amazonFieldMappingTypes: "/amazonFieldMappingTypes",

	// Grainger Templates API
	graingerTemplates: "/graingerTemplates",
	singleGraingerTemplate: "/graingerTemplates/{templateId}",
	downloadGraingerTemplateFile: "/graingerTemplates/{templateId}/graingerTemplateFile",
	graingerFieldMappingTypes: "/graingerFieldMappingTypes",
	graingerLovs: "/graingerTemplates/{templateId}/fields/{graingerTemplateFieldId}/values",
	getGraingerTemplateSections: "/graingerTemplates/{templateId}/sections", // G
	getUploadedFileSections: "/graingerTemplates/file/sections", // G
	removeUploadedFile: "/graingerTemplateFile", // DEL

	// Amaze parameters API
	getAmazeParams: "/parameters", // G

	// Amaze Authentication
	googleLogin: "/login?provider=google",
	getAuthenticationToken: "/userToken",
	getUserInfo: "/security/currentUser",
	loginByPassword: "/loginByPassword",
	resetPassword: "/security/resetPassword", // PA
	forgotPassword: "/security/forgotPassword", // PO
	logout: "/logout",

	// Aamze-bridge synchronization
	getBridgeCatalogs: "/bridgeLink/bridgeCatalogs", // G
	createCatalogLink: "/bridgeLink/domains/{domainId}", // PO
	deleteCatalogLink: "/bridgeLink/domains/{domainId}", // DEL
	getCatalogLink: "/bridgeLink/domains/{domainId}", // G
	createCatalogSyncRequest: "/bridgeLink/catalogSyncRequests", // PO
	getCatalogSyncRequests: "/bridgeLink/catalogSyncRequests", // G,
	getCatalogSyncStatuses: "/bridgeLink/catalogSyncStatuses", // G
	getCatalogSyncTypes: "/bridgeLink/catalogSyncTypes", // G

	// Realtime Sync Linkages
	getRealTimeSyncLinkages: "/bridgeLink/realTimeSyncLinkages", // G
	deleteRealTimeLinkage: "/bridgeLink/realTimeSyncLinkages/{linkageId}", // DEL
	createRealTimeSyncLinkage: "/bridgeLink/realTimeSyncLinkages", // PO

	// Amaze Product Detail Page
	getPDPTemplates: "/skuPdpTemplates", // G
	createPDPTemplate: "/skuPdpTemplates", // PO
	updatePDPTemplate: "/skuPdpTemplates/{skuPdpTemplateId}", // PU
	deletePDPTemplates: "/skuPdpTemplates/{skuPdpTemplateId}", // DE
	deletePDPEligibilttyTemplates: "/skuPdpTemplates/{skuPdpTemplateId}/eligibility", // DE

	// Amaze Taxonomy metadata
	getTaxoMetatags: "/taxonomyMetaTags", // G
	createTaxoMetatag: "/taxonomyMetaTags", // PO
	updateTaxoMetatag: "/taxonomyMetaTags", // PA
	deleteTaxoMetatag: "/taxonomyMetaTags/{tagId}", // DEL
	getTaxoDetailsByMetatag: "/taxonomyMetaTags/{tagId}/taxonomyPaths?count=true", // G
	getTaxoMetaAttr: "/taxonomyMetaAttributes", // G
	createTaxoMetaAttr: "/taxonomyMetaAttributes", // PO
	updateTaxoMetaAttr: "/taxonomyMetaAttributes", // PA
	getTaxoDetailsByMetaAttr: "/taxonomyMetaAttributes/{tagId}/taxonomyPaths?count=true", // G
	deleteTaxoMetaAttr: "/taxonomyMetaAttributes/{tagId}", // DEL

	// Download Bulk Digital Assets
	getBulkAssetCount: "/digitalAssets/bulkDownload/count", // PO
	submitBulkAsset: "/digitalAssets/bulkDownload", // PO

	// Advance SKU Search (Product Search)
	getProductSearchConfigurations: "/skuSearchConditionFilters", // G
	getAdvanceSearchSkuResult: "/catalogs/{catalogId}/conditions/{conditionId}", // G
	saveAdvanceSearchCondition: "/skuSearchConditionFilters", // PO
	getSavedConditions: "/conditions", // G
	getSavedCondition: "/conditions/{conditionId}", // G
	getSavedConditionUsages: "/conditions/{conditionId}/linkages", // G

	// CKB
	getTerrains: "/customers/terrain", // G
	getTaxonomyRecommendations: "/taxonomy/path/recommendation", // G
	getAttributesRecommendations: "/attribute/detail/recommendation", // G

	saveTaxonomyRecommendations: "/catalogs/{catalogId}/nodes/tree", // PO
	editAdvanceSearchCondition: "/conditions/{conditionId}", // PU
	getAttributeDetails: "/catalogs/{catalogId}/attributes/details", // G
	getUomDetails: "/uoms/details", // PO
	getConfidenceBuckets: "/confidence/buckets", // G
	getCkbSchemaSuggestion: "/catalogs/{catalogId}/ckb/attribute/name/recommendation", // G
	getCkbAttributesWithAmazeMasterAttributes: "/catalogs/{catalogId}/ckb/sku/attribute/recommendation", // G
	getAttributeLovRecommendations: "/attribute/detail/recommendation", // G

	// Connetcors
	getConnectorsList: "/connectors", // G
	getConnectorConfigs: "/connectors/{connectorId}/connectorConfigs", // G
	getConnectorConfig: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}", // G
	createConnectorConfig: "/connectors/{connectorId}/connectorConfigs", // PO
	updateConnectorConfig: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}", // PA
	deleteConnectorConfig: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}", // DE
	checkConnection: "/connectors/{connectorId}/connectorConfigs/checkConnection", // PO
	getStoreWebsites: "/connectors/{connectorId}/connectorConfigs/getStoreWebsites", // PO

	// Magento 2 connector
	getVendorAttributes: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}/vendorAttributes", // G
	getAttributeMappings: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}/catalogs/{catalogId}/attributeMappings", // G
	createAttrMappigs: "/connectors/{connectorId}/connectorConfigs/{connectorConfigId}/catalogs/{catalogId}/attributeMappings", // PA

	// Public Apis
	addUserNotifications: "/catalogNotifications", // PO
	deletUserNotifications: "/catalogNotifications/{userId}", // DEL
	getCurrentToken: "/security/users/{userId}/apiToken/currentToken", // G
	generateToken: "/security/users/{userId}/apiToken/tokens", // PO
	deleteToken: "/security/users/{userId}/apiToken", // DEL

	// Formula Master
	getFormulas: "/catalogs/{catalogId}/formulas", // G
	getFormulaSections: "/catalogs/{catalogId}/formulas/{formulaId}", // G
	createFormula: "/catalogs/{catalogId}/formulas", // PO
	deleteFormula: "/catalogs/{catalogId}/formulas/{formulaId}/delete", // DEL
	editFormula: "/catalogs/{catalogId}/formulas/updateSections", // PU
	addFormulaToTaxonomy: "/catalogs/{catalogId}/formulas/{formulaId}/applyFormula", // PA
	getSectionTypes: "/catalogs/{catalogId}/formulas/sectionTypes", // G
	getSectionArgumentTypes: "/catalogs/{catalogId}/formulas/sectionArgumentTypes", // G
	getSectionInputValues: "/catalogs/{catalogId}/formulas/sectionInputValues", // G
	clearFormula: "/catalogs/{catalogId}/formulas/clearTaxonomyFormula", // PA
	manageTaxonomyFormula: "/catalogs/{catalogId}/formulas/{formulaId}/manageTaxonomyFormula", // PA
	entitiesAttachedToFormula: "/catalogs/{catalogId}/formulas/{formulaId}/entitiesToRemoveFormula", // G
	checkExpression: "/checkExpression", // PO

	// Attribute Value Lock
	getSkuAttributesLockInfo: "/catalogs/{catalogId}/skuAttributes/lock", // G
	getSkuAttrValueStagingInfo: "/catalogs/{catalogId}/skuAttributes/{skuAttributeId}/stagingValues", // G
	approveSkuAttrValueStagingValues: "/catalogs/{catalogId}/skuAttributes/{skuAttributeId}/approveStagingValues", // PA
	createAttributeLock: "/catalogs/{catalogId}/skuAttributes/lock", // PO
	getLockedAttributes: "/catalogs/{catalogId}/lockAttributes", // G
	unlockAttributeLock: "/catalogs/{catalogId}/skuAttributes/unlock", // PA

	// Domain
	generateOtp: "/catalogs/{catalogId}/domain/{domainId}/deletionRequest", // PU

	// customers
	getCustomerName: "/customers/name", // G

	// -- Amaze 2-0 --
	// Dashboard
	getAllWidgets: "/userWidgets/{userId}", // G
	getWidgetData: "/catalogs/{catalogId}/domain/{domainId}/userWidgets/data", // G
	getWidgetRange: "/catalogs/{catalogId}/domain/{domainId}/userWidgets/range?widgetCode=S2", // G
	enableDisableWidget: "/userWidgets", // PUT
	reorderWidgets: "/userWidgets", // PA
	resetWidgetOrder: "/userWidgets/{userId}", //PA

	// Products Listing
	getProduct: "/catalogs/{catalogId}/skus",
	getProductList: "/catalogs/{catalogId}/skus/productListing",
	getLeanAttributes: "/catalogs/{catalogId}/leanAttributes",
	getSkuVariants: "/catalogs/{catalogId}/skusVariants", // G
	getDataQualityProblems: "/catalogs/{catalogId}/skus/{skuId}/dataQualityScoreProlems", // G
	getSyndicationInfo: "/catalogs/{catalogId}/skus/{skuId}/syndicationInfo", // G
	getSyndicationValidationFailures: "/catalogs/{catalogId}/skus/{skuId}/syndicationValidationFailures", // G
	getSyndicationUnMappedAttributes: "/catalogs/{catalogId}/skus/{skuId}/syndicationUnmappedAttributes", // G
	getSyndicationFromConsolidation: "/catalogs/{catalogId}/skus/{skuId}/syndicationFromConsolidation", // G
	getSyndicationAttributeMappingDetails: "/catalogs/{catalogId}/skus/{skuId}/syndicationAttributeMappingDetails", // G

	//360 View
	getAttrCategories: "/catalogs/{catalogId}/skus/{skuId}/skuAttributes360view", //G
	getAttrCategoriesByTaxonomy: '/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributes/taxonomyAttributes360view', //G

	// Rytr API
	getMarketingRecommendation: "/catalogs/{catalogId}/skus/{skuId}/marketing/recommendation", //G

	// Assortments
	getAssortments: "/catalogs/{catalogId}/assortments", // G
	addAssortment: "/catalogs/{catalogId}/assortments", // PO
	editAssortment: "/catalogs/{catalogId}/assortments", // PA,
	deleteAssortment: "/catalogs/{catalogId}/assortments/{assortmentId}", // DEL
	addSKUsToAssortment: "/catalogs/{catalogId}/populateSkuAssortments", // PA
	removeSKUsFromAssortment: "/catalogs/{catalogId}/deleteSkuAssortments", // DEL

	// Channel APIS
	getBridgeChannels: "/bridge/projects", // G
	getChannelDetails: "/channels/{channelId}", // G
	createChannel: "/bridge/projects", // G
	getBridgeChannelSummary: "/bridge/projects/{projectId}/projectAndCatalogSummary",
	getBridgeChannel: "/bridge/projects/{projectId}", // G
	getBridgeCatalogsForChannelCreation: "/bridge/catalogs", // G
	deleteBridgeChannel: "/bridge/projects/{projectId}", // DEL
	getBridgeCatalogNodes: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/amaze?depth=2", // G
	getBridgeCatalogChildNodes: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/amaze?depth=2", // G
	getBridgeCatalogNodesSearch: "/bridge/catalogs/{catalogId}/nodes", // G
	getBridgeCatalogSkuByItemIdSearch: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/searchByItemId", // G
	changeChannelState: "/bridge/projects/{projectId}?fields=state", // PU
	buildChannel: "/bridge/projects/{projectId}/applyMappers", // G
	validateChannelMappingBackup: "/bridge/mapsBackups/project/{projectId}/validateBackupByName", // G
	createChannelMappingBackup: "/bridge/downlodRequest/createNew?timezone={timezone}&backupName={backupName}", // PO
	getBackupMapsCount: "/bridge/mapsBackups/count", //G
	getBackupMaps: "/bridge/mapsBackups", // G
	restoreBackupMaps: "/bridge/downlodRequest/createNew", // PO
	getAmazeCatalogDetailsFromBridgeCatalog: "/bridge/{bridgeCatalogId}/getAmazeLinkedCatalog", // G

	// Channel Node Mapping
	getNodeMaps: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps", // G
	getNodeMap: "/bridge/nodes/{mapperId}/nodeMap", // G
	getSuggestedNodeMaps: "/bridge/rules/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}", // G
	createNodeMapWithSchemaAttributes: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/schema", // PO
	createNodeMapWithNodeAttributes: "/bridge/pojects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributes", // PO
	createNodeMap: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps", // PO
	updateNodeMaps: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps/{mapperId}", // PU
	deleteNodeMap: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps/{mapperId}", // DEL
	reorderNodeMaps: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/reorderNodeMaps", // PU
	getNodeParentHierarchy: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/parents/amaze", // G
	getNodeParentsHierarchy: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/parentIds", // G
	getPreTransformSKUs: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps/{nodeMapId}/skus", // G
	getTransformedSKUs: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps/{nodeMapId}/transform", // G
	getPreTransformSKUsBySkuId: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}", // G
	getTransformedSKUsBySkuId: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/skus/{skuId}/transform", // G
	getUnmappedSKUs: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/skus", // G
	getUnmappedSKUsCount: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/count", // G
	searchSkusInPreTransformView: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/skus", // G
	generateUnmappedDownload: "/bridge/downlodRequest/createNew", // PO
	updatePersistItemIdInTargetForChannel: "/bridge/projects/{projectId}/updateIsItemIdPersistInTarget", // PU
	forceBuildSKUsInChannel: "/bridge/projects/{projectId}/forceSkuRebuild", // PO
	getPreTransformViewSkus:"/bridge/nodes/{nodeMapId}/attributeMappingDetails", // G
	getNodeCounts: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/taxonomyCounts", // G
	getSKUsWithoutAttributeMapsInNodeCount: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/skusWithoutAttributeMaps", // G
	getAttributeMapsCountForNodeMap: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{sourceNodeId}/targets/{targetNodeId}/attributeMapsCount", // G
    createDuplicateAttributeMapForNode:  "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{copiedSourceNodeId}/targets/{copiedTargetNodeId}/copyAttributeMaps?sourceNodeId={sourceNodeId}&targetNodeId={targetNodeId}", //
    getSkusInCurrentState: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/nodeMaps/{nodeMapId}/skus", // G
    getSpawnedSystemMaps: "/bridge/nodes/{nodeMapId}/spawnedSystemMaps", // G

	// Channel Attribute Mapping
	getAttributeMaps: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{sourceNodeId}/targetNodes/{targetNodeId}/attributeMaps", // G
	addAttributeMap : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributeMaps", // PO
	editAttributeMap : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributeMaps/{mapperId}", // PU
	deleteAttributeMap : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributeMaps/{mapperId}", // DEL
	getSourceNodeInheritedAttributes : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/schema?fields=lov", // G
	getSourceLeafNodeAttributes : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributes", // G
	getSourceAttributes : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/targets/{targetNodeId}/attributes", // G
 	getSourceAttributeValues: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributes/{attributeId}/skuAttributeValues", // G
	getMappedSourceAttributeValues : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/targets/{targetNodeId}/attributes/{attributeId}/skuAttributeValues", // G
	getUnMappedSourceAttributeValues : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributes/{attributeId}/unmappedSkuAttributeValues", // G
	getUnMappedSourceAttributeValuesCount : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/count", // G
	getTargetNodeAttributes: "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/schema?fields=lov", // G
	getTargetAttributeLOVs: "/bridge/projects/{projectId}/targetCatalog/{catalogId}/nodes/{nodeId}/attributes/{attributeId}", // G

	// Regex Operations
	getSampleRegexResults: "/bridge/regexResults", // PO
	getSavedRegexTemplates: "/bridge/projects/{projectId}/regexTemplates", // G
	saveRegexTemplate: "/bridge/projects/d18a5549-a437-411f-b4b2-9a8207a302df/regexTemplates", // PO

	// attribute mapping search
	sourceValueSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/suggestAttributeValue", // G
	targetValueSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/suggestSchemaLovValue", // G
	sourceAttrSearch  : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/searchAttributeValue", // G
	targetAttrSearch  : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/searchSchemaLovValue", // G

	sourceByIdOrName           : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/searchAttributeByNameOrId", // G
	sourceSchemaattrByIdOrName : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/searchSchemaByNameOrId", // G
	targetByIdOrName           : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/searchSchemaByNameOrId", // G

	// attribute global mapping
	getGlobalAttributeMaps : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalAttributeMaps", // G
	getGlobalAttributes    : "/bridge/catalogs/{catalogId}/globalAttributes", // G
	addGlobalAttributeMap  : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalAttributeMaps", // PO
	editGlobalAttributeMap  : "/bridge/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/attributeMaps/{mapperId}", // PU
	deleteGlobalAttributeMap  : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalAttributeMaps/{mapperId}", // DEL
	getGloablAttriuteSchema : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalSchema", // G
	searchGlobalAttributes: "/bridge/catalogs/{catalogId}/globalAttributes/searchByNameOrId", // G
	searchGlobalAttributeValues: "/bridge/catalogs/{catalogId}/suggestGlobalAttributeValues", // G
	searchGlobalAttributeByValue: "/bridge/catalogs/{catalogId}/searchGlobalAttributesByValue", // G
	getGlobalMappedSourceAttributeValues: "/bridge/rules/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/target/{targetId}/attributes/{attributeId}", // G
	getGlobalSourceAttributesLov: "/bridge/catalogs/{catalogId}/globalAttributes/{attributeId}", // G
	getGlobalTargetAttributesLov: "/bridge/targetCatalog/{catalogId}/globalAttributes/{attributeId}", // G

	globalSourceAttrSearchByIdOrName : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalAttributes/searchByNameOrId", // G
	globalTargetAttrSearchByIdOrName : "/bridge/projects/{projectId}/catalogs/{catalogId}/globalAttributes/searchByNameOrId", // G
	globalSourceAttrValueSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/suggestGlobalAttributeValues", // G
	globalTargetAttrValueSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/suggestGlobalAttributeValues", // G
	globalSourceAttrSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/searchGlobalAttributesByValue", // G
	globalTargetAttrSearch : "/bridge/projects/{projectId}/catalogs/{catalogId}/searchGlobalAttributesByValue", // G
	globalSourceAttributeSearchForCondition : "/bridge/projects/{projectId}/catalogs/{catalogId}/searchAttributesByName", // G

	// Attribute Mapping String Operations
	fetchProcessingActionSteps  : "/bridge/processingActionSteps", // G
	fetchProcessingActionStep   : "/bridge/processingActionSteps/{processingActionStepId}", // G
	createProcessingActionStep  : "/bridge/processingActionSteps", // POST
	updateProcessingActionStep  : "/bridge/processingActionSteps", // PU
	deleteProcessingActionStep  : "/bridge/processingActionSteps/{processingActionStepId}", // DEL

	fetchProcessingLogics              : "/bridge/attributeMappingLogics", // G
	fetchProcessingLogic               : "/bridge/attributeMappingLogics/{attributeMappingLogicId}", // G
	createProcessingLogic              : "/bridge/attributeMappingLogics", // POST
	updateProcessingLogic              : "/bridge/attributeMappingLogics", // PU
	deleteProcessingLogic              : "/bridge/attributeMappingLogics/{attributeMappingLogicId}", // DEL
	fetchProcessingLogicPreview        : "/bridge/nodeMap/{mapperId}/attribute/{attributeId}/attributeMappingLogics/{attributeMappingLogicId}", // G
	fetchProcessingLogicPreviewCount   : '/bridge/nodeMap/{mapperId}/attribute/{attributeId}/count', // G
	fetchUomValueMappings              : "/bridge/uomValueMappings", // G
	fetchUomValueMapping               : "/bridge/uomValueMappings/{uomValueMappingId}", // G
	createUomValueMapping              : "/bridge/uomValueMappings", // POST
	updateUomValueMapping              : "/bridge/uomValueMappings", // PU
	deleteUomValueMapping              : "/bridge/uomValueMappings/{uomValueMappingId}", // DEL
	fetchEnforcedUomsForUomMappings    : "/bridge/catalogs/{catalogId}/nodes/{nodeId}/attributes/{attributeId}/uomConstraint", // G
	getAllAttributeMappingLogics : "/bridge/getAllByRealm/attributeMappingLogics", // G

	// Realms
	getCustomerRealms: "/customerRealm", // G

	// multilingual
	getLanguages: "/supportedLanguages", // G
	getAutoSetChoices: "/supportedAutoSetChoices", // G
	getEnabledLanguages: "/catalogs/{catalogId}/supportedLanguages", // G
	getSKUContext: "/contexts", // G
	updateTitleAndAlternate: "/catalogs/{catalogId}/skus/{skuId}/title-update-with-locales" , // PA
	getSkuContextDetails: "/catalogs/{catalogId}/skus/{skuId}/contextDetails", // G

	// authorization
	getAllChannels: "/allChannels", // G
	updateChannelPrivileges: "/security/roles/{roleId}/channelPrivileges", // PA

	// External file location
	externalLocationTestLogin:'/externalLocationTestLogin', //PO
	getAllExternalFileLocations: "/externalLocations", // G
	createExternalFileLocation:'/externalLocations', //PO
	updateExternalFileLocation:'/externalLocations/{id}',//PA
	testImportExternalFileLocation:'/externalLocationTestImport',//PO
	testExportExternalFileLocation:'/externalLocationTestExport',//PO
	deleteExternalFileLocation:'/externalLocations/{id}',//DEL
	getExternalLocations:'/externalLocations/{condition}',// G

	// Channel Dashboard APIs
	getCatalogById: "/bridge/catalogs/{catalogId}", // G
	getChannelCatalogProgress: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}", // G
	getTaxonomyMappingInformation: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/taxonomyMapping", // G
	getSchemaAttributeMappingInformation: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/schemaAttributeMapping", // G
	getRestorationList: "/bridge/mapsBackups/project/{projectId}", // G
	getBuildsList: "/bridge/projects/{projectId}/skuMove", // G
	getSourceAndTargetUnmappedAttributeCountDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/sourceAndTargetUnmappedAttributeCountDetails", // G
	getGlobalAttributeCount: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/globalAttributeCount", // G
	getUnmappedSourceAndTargetNodeCount: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/unmappedSourceAndTargetNodeCount", // G
	getUnmappedSourceValuesCount: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/unmappedSourceValuesCount", // G
	getUnmappedSkuCountBasedOnCurrentMapping: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/unmappedSkuCountBasedOnCurrentMapping", // G
	getUnmappedTargetValuesCount: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/unmappedTargetValuesCount", // G
	getNodeMapCount: "/bridge/projects/{projectId}/nodeMapCount", // G
	getAttributeMapCount: "/bridge/projects/{projectId}/attributeMapCount", // G

	// Widget #1 - drilldown
	getSkuMappingDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/mappingDetails", // G
	getSkuMappingDetailsCount: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/targetCatalogs/{targetCatalogId}/mappingDetails/count", // G

	// Widget #2 - drilldown
	getTaxonomyMappingDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/taxonomyMappingDetails", // G
	getTaxonomyMappingTargetDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/taxonomyMappingTargetDetails", // G

	// Widget #3 - drilldown
	getSchemaAttributeMappingDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/schemaAttributeMappingDetails", // G
	getSchemaAttributeMappingTargetDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/schemaAttributeMappingDetails", // G
	getUnmappedSchemaAttributeDetails: "/bridge/projectProgress/projects/{projectId}/catalogs/{catalogId}/nodes/{nodeId}/unmappedSchemaAttributeDetails", // G

	// Fetch Batch ID
	importFileNameVariable: '/importFileNameVariable',//G

	// Lookup master APIs
	createLookupTable           : "/bridge/attributeMappingTableLookup", //PO
	updateLookupTable           : "/bridge/attributeMappingTableLookup", //PU
	copyLookupTable             : "/bridge/attributeMappingTableLookup", //PO
	getLookupTable              : "/bridge/attributeMappingTableLookup", //G
	getSingleLookupTable        : "/bridge/attributeMappingTableLookup/{id}", //G
	getChannelListWhereUsed     : "/bridge/attributeMappingTableLookup/{id}/projectsWhereUsed", //G
	createLookupTableUsingImport: "/bridge/attributeMappingTableLookup/csv", //PO
	deleteLookupTable           : "/bridge/attributeMappingTableLookup/{id}", //DEL

	// Multi Channel Dashboard APIs
	getAllCatalogWithChannelIncluded             : "/catalogsWithChannelsIncluded", // G
	fetchChannelDetailsByCatalog                 : "/channelDetailsByCatalogs/{catalogId}", // G
	fetchCatalogOverAllCounts                    : "/bridge/dashboard/catalogs/{catalogId}/overallCount", // G
	fetchCatalogSummaryCounts                    : "/bridge/dashboard/catalogs/{catalogId}/catalogSummaryCount", // G
	fetchCatalogProjectDetails                   : "/bridge/dashboard/catalogs/{catalogId}/projectDetails", // G
	fetchCatalogDetails                          : "/bridge/dashboard/catalogs/{catalogId}/catalogDetails", // G
	fetchCatalogSkuPresence                      : "/bridge/dashboard/catalogs/{catalogId}/skuPresence", // G
	fetchCatalogNodes                            : "/bridge/catalogs/{catalogId}/getCatalogNodes", // G
	fetchCatalogPostTransformView                : "/bridge/dashboard/projects/{projectId}/sourceCatalog/{sourceCatalogId}/targetCatalog/{targetCatalogId}/data", // G
	fetchCatalogPostTransformViewCount           : "/bridge/dashboard/projects/{projectId}/sourceCatalog/{sourceCatalogId}/targetCatalog/{targetCatalogId}/count", // G
	fetchAttributeMapsByProjectAndItemId         : "/bridge/dashboard/projects/{projectId}/sourceCatalog/{sourceCatalogId}/targetCatalog/{targetCatalogId}/sourceItemId/{sourceItemId}/targetItemId/{targetItemId}", // G
	fetchAttributeMapsByProjectAndItemIdCount    : "/bridge/dashboard/projects/{projectId}/sourceCatalog/{sourceCatalogId}/targetCatalog/{targetCatalogId}/sourceItemId/{sourceItemId}/targetItemId/{targetItemId}/count", // G
	fetchNodeMapsByProjectAndItemId              : "/bridge/dashboard/projects/{projectId}/sourceCatalog/{sourceCatalogId}/targetCatalog/{targetCatalogId}/sourceItemId/{sourceItemId}/targetItemId/{targetItemId}/nodeMaps", // G
	fetchSystemDefinedBuckets                    : "/bridge/dashboard/catalogs/{catalogId}/systemDefinedBucket", // G
	fetchUserDefinedBuckets                      : "/bridge/dashboard/userDefinedBucket/catalogs/{catalogId}", // G
	fetchUserDefinedBucket                       : "/bridge/dashboard/userDefinedBucket/{userDefinedBucketId}", // G
	fetchChannelsForBucket                       : "/bridge/projects/catalogs/{catalogId}", // G
	createUserDefinedBucket                      : "/bridge/dashboard/userDefinedBucket", // PO
	updateUserDefinedBucket                      : "/bridge/dashboard/userDefinedBucket", // PU
	deleteUserDefinedBucket                      : "/bridge/dashboard/userDefinedBucket/{userDefinedBucketId}", // DEL
	fetchSkuFillRateBuckets                      : "/bridge/dashboard/catalogs/{catalogId}/skuFillRateBuckets",  // G
	fetchCatalogAttributes                       : "/bridge/dashboard/catalogs/{catalogId}/attributes",  // G
	fetchNodesContainingAttributes               : "/bridge/dashboard/catalogs/{catalogId}/attribute/{attributeId}/nodes",  // G
	fetchAttributeLevelFillRates                 : "/bridge/dashboard/catalogs/{catalogId}/attribute/{attributeId}/node/{nodeId}/fillRate",  // G

	// Domains (Super Attributes)
	fetchSuperAttributeDomains                 : "/catalogs/{catalogId}/attributeDomains", // G
	createUpdateSuperAttributeDomain           : "/catalogs/{catalogId}/attributeDomains", // PO and PU
	deleteSuperAttributeDomain                 : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}", // DEL
	copySuperAttributeDomain                   : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}", // PO
	fetchSuperAttributeDomainProperties        : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainProperties", // G
	createUpdateSuperAttributeDomainProperty   : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainProperties", // PO and PU
	deleteSuperAttributeDomainProperty         : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainProperties/{domainPropertyId}", // DEL
	copySuperAttributeDomainProperty           : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainProperties/{domainPropertyId}", // PO
	fetchSuperAttributeDomainValues            : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues", // G
	createUpdateSuperAttributeDomainValues     : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues", // PO and PU
	deleteSuperAttributeDomainValue            : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}", // DEL
	copySuperAttributeDomainValue              : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}", // PO
	createUpdateDomainValueProperties          : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}/domainProperties/{domainPropertyId}", // PO and PU
	deleteDomainValueProperties                : "/catalogs/{catalogId}/domainValueProp/{domainValuePropId}", // DEL
	createUpdateDomainValueRelationship        : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}/domainRelationship", // PO and PU
	deleteDomainValueRelationship              : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}/domainRelationship/{domainRelationship}", // DEL
	createUpdateDomainValueDigitalAssets       : "/catalogs/{catalogId}/attributeDomains/{attributeDomainsId}/domainValues/{domainValueId}/domainDigitalAsset", // PO and PU
	updateDomainPropertyValues                 : "/domainValues/{domainValueId}/domainProperties/{domainPropertyId}/domainValueProp", // PA

	// Worflow
	getWorkflows	: "/workflows",
	getWorkflow		: "/workflows/{workflowId}",
	getWorkflowDetails: "/workflows/workflowDetails",
	getTargetCatalogs : "/targetCatalogs"
};
