export enum AMAZE_API_NAMES {
	// Entity Info API
	GET_ENTITY_INFO                                      = "GET_ENTITY_INFO",

	// Catalog Related API names
	GET_CATALOGS                                         = "GET_CATALOGS",
	GET_CATALOG                                          = "GET_CATALOG",
	GET_CATALOG_BASIC_DETAILS                            = "GET_CATALOG_BASIC_DETAILS",
	GET_CATALOG_DOMAIN_DETAILS                           = "GET_CATALOG_DOMAIN_DETAILS",
	CREATE_CATALOG                                       = "CREATE_CATALOG",
	DELETE_CATALOG                                       = "DELETE_CATALOG",
	GET_ALL_CATALOGS                                     = "GET_ALL_CATALOGS",

	// Domain Related API names
	GET_DOMAINS                                          = "GET_DOMAINS",
	ADD_DOMAIN                                           = "ADD_DOMAIN",
	UPDATE_DOMAIN                                        = "UPDATE_DOMAIN",
	DELETE_DOMAIN                                        = "DELETE_DOMAIN",

	// Style Guide Related API names
	GET_STYLE_GUIDE                                      = "GET_STYLE_GUIDE",
	GET_STYLE_GUIDE_REPORT                               = "GET_STYLE_GUIDE_REPORT",
	GET_STYLE_GUIDE_REPORT_COUNT                         = "GET_STYLE_GUIDE_REPORT_COUNT",
	CREATE_STYLE_GUIDE                                   = "CREATE_STYLE_GUIDE",
	UPDATE_STYLE_GUIDE                                   = "UPDATE_STYLE_GUIDE",
	DELETE_STYLE_GUIDE                                   = "DELETE_STYLE_GUIDE",
	DELETE_STYLE_GUIDE_REPORT                            = "DELETE_STYLE_GUIDE_REPORT",
	DOWNLOAD_STYLE_GUIDE_REPORT                          = "DOWNLOAD_STYLE_GUIDE_REPORT",
	FIX_STYLE_GUIDE                                      = "FIX_STYLE_GUIDE",
	PERFORM_CHECK_STYLE_GUIDE                            = "PERFORM_CHECK_STYLE_GUIDE",

	// Global Search Related API names
	CATALOG_GLOBAL_SEARCH                                = "CATALOG_GLOBAL_SEARCH",
	SKU_GLOBAL_SEARCH                                    = "SKU_GLOBAL_SEARCH",

	// Catalog Nodes Related API names
	GET_CATALOG_NODES                                    = "GET_CATALOG_NODES",
	GET_CATALOG_CHILD_NODES                              = "GET_CATALOG_CHILD_NODES",
	GET_CATALOG_NODES_LIST                               = "GET_CATALOG_NODES_LIST",
	GET_CATALOG_NODES_IN_ORDER                           = "GET_CATALOG_NODES_IN_ORDER",
	GET_CATALOG_NODES_SEARCH                             = "GET_CATALOG_NODES_SEARCH",
	GET_CATALOG_NODES_SEARCH_HIERARCHY                   = "GET_CATALOG_NODES_SEARCH_HIERARCHY",
	GET_CATALOG_NODE_DETAILS                             = "GET_CATALOG_NODE_DETAILS",

	// Taxonomy Related API names
	ADD_NODES                                            = "ADD_NODES",
	UPDATE_NODES                                         = "UPDATE_NODES",
	MOVE_NODES                                           = "MOVE_NODES",
	REORDER_NODES                                        = "REORDER_NODES",
	DELETE_NODES                                         = "DELETE_NODES",
	COPY_TAXONOMY_STRUCTURE                              = "COPY_TAXONOMY_STRUCTURE",

	// SKU Related API names
	GET_SKU                                              = "GET_SKU",
	GET_SKUS                                             = "GET_SKUS",
	GET_SKUS_BY_NODE                                     = "GET_SKUS_BY_NODE",
	ADD_SKUS                                             = "ADD_SKUS",
	CREATE_SKUS                                          = "CREATE_SKUS",
	EDIT_SKUS                                            = "EDIT_SKUS",
	UPDATE_SKUS                                          = "UPDATE_SKUS",
	DELETE_SKUS                                          = "DELETE_SKUS",
	MOVE_SKUS                                            = "MOVE_SKUS",
	MIRROR_SKUS                                          = "MIRROR_SKUS",
	REMOVE_MIRROR_SKUS                                   = "REMOVE_MIRROR_SKUS",
	CROSS_LIST_SKUS                                      = "CROSS_LIST_SKUS",
	GET_CROSSLIST_SKUS                                   = "GET_CROSSLIST_SKUS",
	ADD_CROSSLIST_SKUS                                   = "ADD_CROSSLIST_SKUS",
	REMOVE_CROSSLIST_SKUS                                = "REMOVE_CROSSLIST_SKUS",
	REMOVE_SKU_CROSS_LISTING                             = "REMOVE_SKU_CROSS_LISTING",
	GET_SKU_ATTRIBUTES                                   = "GET_SKU_ATTRIBUTES",
	GET_SKU_IDS                                          = "GET_SKU_IDS",

	// SKU Relationship Related API names
	GET_SKU_RELATIONSHIPS                                = "GET_SKU_RELATIONSHIPS",
	CREATE_SKU_RELATIONSHIPS                             = "CREATE_SKU_RELATIONSHIPS",
	UPDATE_SKU_RELATIONSHIPS                             = "UPDATE_SKU_RELATIONSHIPS",
	DELETE_SKU_RELATIONSHIPS                             = "DELETE_SKU_RELATIONSHIPS",

	// Related SKUs Related API names
	GET_RELATED_SKUS                                     = "GET_RELATED_SKUS",
	ADD_RELATED_SKUS                                     = "ADD_RELATED_SKUS",
	UPDATE_RELATED_SKUS                                  = "UPDATE_RELATED_SKUS",
	DELETE_RELATED_SKUS                                  = "DELETE_RELATED_SKUS",

	// SKUs-UOM converison API names
	GET_TARGET_UOM                                       = "GET_TARGET_UOM",
	GET_CONVERSION_FORMULA                               = "GET_CONVERSION_FORMULA",
	GET_SCHEMA_ATTR_ON_MULTIPLE_NODE                     = "GET_SCHEMA_ATTR_ON_MULTIPLE_NODE",
	UOM_CONVERSION                                       = "UOM_CONVERSION",

	// SKU Authoring API names
	GET_EXTERNAL_SOURCES                                 = "GET_EXTERNAL_SOURCES",
	CREATE_SKU_FROM_EXTERNAL_SOURCES                     = "CREATE_SKU_FROM_EXTERNAL_SOURCES",
	UPDATE_SKU_FROM_EXTERNAL_SOURCES                     = "UPDATE_SKU_FROM_EXTERNAL_SOURCES",
	DELETE_SKU_FROM_EXTERNAL_SOURCES                     = "DELETE_SKU_FROM_EXTERNAL_SOURCES",
	COPY_SKU_ATTRIBUTES                                  = "COPY_SKU_ATTRIBUTES",
	GET_STATIC_HTML                                      = "GET_STATIC_HTML",
	EXTERNAL_SOURCES_AUDIT                               = "EXTERNAL_SOURCES_AUDIT",

	// SKU Validation API names
	GET_SKU_VALIDATION_FAILURES                          = "GET_SKU_VALIDATION_FAILURES",
	GET_SKU_VALIDATION_FAILURES_FOR_TAXONOMY             = "GET_SKU_VALIDATION_FAILURES_FOR_TAXONOMY",
	GET_SKU_VALIDATION_FAILURES_SUMMARY_FOR_TAXONOMY     = "GET_SKU_VALIDATION_FAILURES_SUMMARY_FOR_TAXONOMY",
	GET_SKU_ATTRIBUTES_FOR_FILTERING                     = "GET_SKU_ATTRIBUTES_FOR_FILTERING",

	// SCHEMA related API names
	GET_SCHEMAS                                          = "GET_SCHEMAS",
	GET_SCHEMA_ATTRIBUTES                                = "GET_SCHEMA_ATTRIBUTES",
	GET_COPIED_SCHEMAS                                   = "GET_COPIED_SCHEMAS",
	ADD_SCHEMAS                                          = "ADD_SCHEMAS",
	EDIT_SCHEMAS                                         = "EDIT_SCHEMAS",
	DELETE_SCHEMAS                                       = "DELETE_SCHEMAS",
	PASTE_SCHEMAS                                        = "PASTE_SCHEMAS",
	PASTE_SCHEMAS_CHARACTERISTICS                        = "PASTE_SCHEMAS_CHARACTERISTICS",
	REORDER_SCHEMA_ATTRIBUTES                            = "REORDER_SCHEMA_ATTRIBUTES",
	UPDATE_SCHEMA_ATTRIBUTE_COMMENTS                     = "UPDATE_SCHEMA_ATTRIBUTE_COMMENTS",
	UPDATE_SCHEMA_ATTRIBUTE_NAVIGATION_ORDER             = "UPDATE_SCHEMA_ATTRIBUTE_NAVIGATION_ORDER",
	RESET_SCHEMA_DISPLAY_ORDER                           = "RESET_SCHEMA_DISPLAY_ORDER",

	// Product Family related API names
	GET_PRODUCT_FAMILIES                                 = "GET_PRODUCT_FAMILIES",
	GET_PRODUCT_FAMILY                                   = "GET_PRODUCT_FAMILY",
	GET_CHILD_PRODUCT_FAMILIES                           = "GET_CHILD_PRODUCT_FAMILIES",
	GET_PRODUCT_FAMILIES_BY_ATTRIBUTE                    = "GET_PRODUCT_FAMILIES_BY_ATTRIBUTE",
	GET_PRODUCT_FAMILY_TREE_HIERARCHY                    = "GET_PRODUCT_FAMILY_TREE_HIERARCHY",
	ATTACH_SKU_TO_PRODUCT_FAMILIES                       = "ATTACH_SKU_TO_PRODUCT_FAMILIES",
	DETACH_SKU_TO_PRODUCT_FAMILIES                       = "DETACH_SKU_TO_PRODUCT_FAMILIES",
	ROLL_UP_SKU_ATTRIBUTES                               = "ROLL_UP_SKU_ATTRIBUTES",
	MOVE_PRODUCT_FAMILY                                  = "MOVE_PRODUCT_FAMILY",
	EDIT_PRODUCT_FAMILY_TITLE                            = "EDIT_PRODUCT_FAMILY_TITLE",
	EXECUTE_PF_RECOMMENDATION                            = "EXECUTE_PF_RECOMMENDATION",
	GET_PF_RECOMMENDATION_STATUS                         = "GET_PF_RECOMMENDATION_STATUS",
	CASCADE_VALUE_TO_SKUS                                = "CASCADE_VALUE_TO_SKUS",

	// Attribute related API names
	GET_ATTRIBUTES                                       = "GET_ATTRIBUTES",
    GET_ATTRIBUTE                                        = "GET_ATTRIBUTE",
    ATTRIBUTES_SEARCH                                    = "ATTRIBUTES_SEARCH",
    ADD_ATTRIBUTES                                       = "ADD_ATTRIBUTES",
    EDIT_ATTRIBUTES                                      = "EDIT_ATTRIBUTES",
    DELETE_ATTRIBUTE                                     = "DELETE_ATTRIBUTE",
    IS_ATTR_DUPLICATED                                   = "IS_ATTR_DUPLICATED",

	// Attribute Group related API names
	GET_ATTRIBUTE_GROUPS                                 = "GET_ATTRIBUTE_GROUPS",
    CREATE_ATTRIBUTE_GROUPS                              = "CREATE_ATTRIBUTE_GROUPS",
    UPDATE_ATTRIBUTE_GROUPS                              = "UPDATE_ATTRIBUTE_GROUPS",
    REMOVE_ATTRIBUTE_GROUPS                              = "REMOVE_ATTRIBUTE_GROUPS",
    GET_ATTRIBUTES_IN_GROUPS                             = "GET_ATTRIBUTES_IN_GROUPS",
    ADD_ATTRIBUTE_IN_GROUPS                              = "ADD_ATTRIBUTE_IN_GROUPS",
    REMOVE_ATTRIBUTE_IN_GROUPS                           = "REMOVE_ATTRIBUTE_IN_GROUPS",

	// Attribute MetaTag Group related API names
	GET_ATTRIBUTE_METATAG_RELEVANCE                      = "GET_ATTRIBUTE_METATAG_RELEVANCE",
    GET_ATTRIBUTE_METATAG                                = "GET_ATTRIBUTE_METATAG",
    ADD_ATTRIBUTE_METATAG                                = "ADD_ATTRIBUTE_METATAG",
    EDIT_ATTRIBUTE_METATAG                               = "EDIT_ATTRIBUTE_METATAG",
    DELETE_ATTRIBUTE_METATAG                             = "DELETE_ATTRIBUTE_METATAG",
    GET_ATTRIBUTE_META_ATTRIBUTE                         = "GET_ATTRIBUTE_META_ATTRIBUTE",
    ADD_ATTRIBUTE_META_ATTRIBUTE                         = "ADD_ATTRIBUTE_META_ATTRIBUTE",
    EDIT_ATTRIBUTE_META_ATTRIBUTE                        = "EDIT_ATTRIBUTE_META_ATTRIBUTE",
    DELETE_ATTRIBUTE_META_ATTRIBUTE                      = "DELETE_ATTRIBUTE_META_ATTRIBUTE",

	// UOMs related API names
	GET_UOMS                                             = "GET_UOMS",
    ADD_UOMS                                             = "ADD_UOMS",
    EDIT_UOMS                                            = "EDIT_UOMS",
    DELETE_UOM                                           = "DELETE_UOM",
    GET_UOMS_CATEGORIES                                  = "GET_UOMS_CATEGORIES",

	// Digital Assets related API names
	GET_PRE_SIGNED_URL                                   = "GET_PRE_SIGNED_URL",
	GET_DIGITAL_ASSETS                                   = "GET_DIGITAL_ASSETS",
    GET_DIGITAL_ASSET                                    = "GET_DIGITAL_ASSET",
    ADD_DIGITAL_ASSETS                                   = "ADD_DIGITAL_ASSETS",
    DELETE_DIGITAL_ASSETS                                = "DELETE_DIGITAL_ASSETS",
    DOWNLOAD_ASSETS                                      = "DOWNLOAD_ASSETS",
    UPLOAD_DIGITAL_URL                                   = "UPLOAD_DIGITAL_URL",
    UPLOAD_DIGITAL_URL_FILE                              = "UPLOAD_DIGITAL_URL_FILE",
    UPLOAD_DIGITAL_ZIP_FILE                              = "UPLOAD_DIGITAL_ZIP_FILE",
    UPLOAD_DIGITAL_CLOUD_STORAGE                         = "UPLOAD_DIGITAL_CLOUD_STORAGE",
    GET_ASSET_TAGS_LIST                                  = "GET_ASSET_TAGS_LIST",
    DOWNLOAD_ASSET_MANIFEST_REPORT                       = "DOWNLOAD_ASSET_MANIFEST_REPORT",
    BULK_UPDATE_DA_METADATA                              = "BULK_UPDATE_DA_METADATA",
    GET_DA_COUNTS_FOR_ADVANCED_FILTER                    = "GET_DA_COUNTS_FOR_ADVANCED_FILTER",
    DA_METATAGS                                          = "DA_METATAGS",
    DA_META_ATTRIBUTES                                   = "DA_META_ATTRIBUTES",
    ATTRIBUTES_FOR_DIGITAL_ASSETS                        = "ATTRIBUTES_FOR_DIGITAL_ASSETS",
    DA_SUMMARY                                           = "DA_SUMMARY",

	// Vision API related API names
    TRIGGER_PHOTO_VISION_INFORMATION                     = "TRIGGER_PHOTO_VISION_INFORMATION",
    GET_ASSET_VISION_INFO_COUNT                          = "GET_ASSET_VISION_INFO_COUNT",
    GET_ASSET_VISION_INFO                                = "GET_ASSET_VISION_INFO",
    GET_SKUS_RECOMMENDED_DA                              = "GET_SKUS_RECOMMENDED_DA",

	// Digital Assets Import related API names
	GET_DIGITAL_ASSET_FOR_IMPORT                         = "GET_DIGITAL_ASSET_FOR_IMPORT",
    GET_DIGITAL_ASSET_FOR_IMPORT_DETAISL                 = "GET_DIGITAL_ASSET_FOR_IMPORT_DETAISL",
    GET_IMPORT_ERROR_LOG                                 = "GET_IMPORT_ERROR_LOG",
    GET_UNIQUE_ERROR_MESSAGES                            = "GET_UNIQUE_ERROR_MESSAGES",

	// Digital Assets Metadata related API names
    GET_DA_META_ATTRIBUTES                               = "GET_DA_META_ATTRIBUTES",
    GET_DA_META_TAGS                                     = "GET_DA_META_TAGS",
    ADD_META_ATTRIBUTES                                  = "ADD_META_ATTRIBUTES",
    ADD_META_TAGS                                        = "ADD_META_TAGS",

	// Assets Linkage and Delinkage (Taxonomy) related API names
    GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_ID               = "GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_ID",
    GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_TAXONOMY         = "GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_TAXONOMY",
    GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET    = "GET_TAXONOMY_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET",
    CREATE_TAXONOMY_DIGITAL_ASSET_LINK                   = "CREATE_TAXONOMY_DIGITAL_ASSET_LINK",
    UPDATE_TAXONOMY_DIGITAL_ASSET_LINK                   = "UPDATE_TAXONOMY_DIGITAL_ASSET_LINK",
    DELETE_TAXONOMY_DIGITAL_ASSET_LINK                   = "DELETE_TAXONOMY_DIGITAL_ASSET_LINK",
    GET_TAXONOMY_REPORT                                  = "GET_TAXONOMY_REPORT",

	// Assets Linkage and Delinkage (SKU) related API names
    GET_SKU_DIGITAL_ASSET_LINKS_BY_ID                    = "GET_SKU_DIGITAL_ASSET_LINKS_BY_ID",
    GET_SKU_DIGITAL_ASSET_LINKS_BY_SKU                   = "GET_SKU_DIGITAL_ASSET_LINKS_BY_SKU",
    GET_SKU_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET         = "GET_SKU_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET",
    CREATE_SKU_DIGITAL_ASSET_LINK                        = "CREATE_SKU_DIGITAL_ASSET_LINK",
    UPDATE_SKU_DIGITAL_ASSET_LINK                        = "UPDATE_SKU_DIGITAL_ASSET_LINK",
    DELETE_SKU_DIGITAL_ASSET_LINK                        = "DELETE_SKU_DIGITAL_ASSET_LINK",

	// Assets Linkage and Delinkage (Attribute) related API names
    GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_ID              = "GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_ID",
    GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_ATTRIBUTE       = "GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_ATTRIBUTE",
    GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET   = "GET_ATTRIBUTE_DIGITAL_ASSET_LINKS_BY_DIGITAL_ASSET",
    CREATE_ATTRIBUTE_DIGITAL_ASSET_LINK                  = "CREATE_ATTRIBUTE_DIGITAL_ASSET_LINK",
    UPDATE_ATTRIBUTE_DIGITAL_ASSET_LINK                  = "UPDATE_ATTRIBUTE_DIGITAL_ASSET_LINK",
    DELETE_ATTRIBUTE_DIGITAL_ASSET_LINK                  = "DELETE_ATTRIBUTE_DIGITAL_ASSET_LINK",

	// Assets Linkage and Delinkage (SKU Meta Attribute) related API names
	CREATE_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS        = "CREATE_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS",
    DELETE_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS        = "DELETE_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS",
    GET_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS           = "GET_SKU_META_ATTRIBUTE_DIGITAL_ASSET_LINKS",

	// Assets Bulk Edit (Photos) related API names
    GET_PHOTO_EDIT_TEMPLATES_LIST                       = "GET_PHOTO_EDIT_TEMPLATES_LIST",
    GET_PHOTO_EDIT_TEMPLATE                             = "GET_PHOTO_EDIT_TEMPLATE",
    ADD_PHOTO_EDIT_TEMPLATE                             = "ADD_PHOTO_EDIT_TEMPLATE",
    EDIT_PHOTO_EDIT_TEMPLATE                            = "EDIT_PHOTO_EDIT_TEMPLATE",
    DELETE_PHOTO_EDIT_TEMPLATE                          = "DELETE_PHOTO_EDIT_TEMPLATE",
    GETPHOTO_EDIT_BATCH_PROCESS                         = "GETPHOTO_EDIT_BATCH_PROCESS",
    GETPHOTO_EDIT_BATCH_PROCESS_COUNT                   = "GETPHOTO_EDIT_BATCH_PROCESS_COUNT",
    CREATE_BATCH_PROCESS                                = "CREATE_BATCH_PROCESS",
    PROCESS_SAMPLE_OUTPUT_FOR_TEMPLATE                  = "PROCESS_SAMPLE_OUTPUT_FOR_TEMPLATE",
    GET_BATCH_PROCESS_PROCESSED_ASSETS                  = "GET_BATCH_PROCESS_PROCESSED_ASSETS",

	// User management related API names
    GET_USERS                                           = "GET_USERS",
    CREATE_USER                                         = "CREATE_USER",
    UPDATE_USER                                         = "UPDATE_USER",
    DELETE_USER                                         = "DELETE_USER",
    GET_USER                                            = "GET_USER",
    GET_ROLES_FOR_USER                                  = "GET_ROLES_FOR_USER",
    ADD_ROLES_TO_USER                                   = "ADD_ROLES_TO_USER",
    REMOVE_ROLES_FROM_USER                              = "REMOVE_ROLES_FROM_USER",
    GET_PRIVILEGES_FOR_USER                             = "GET_PRIVILEGES_FOR_USER",
    GET_PRIVILEGE_CODES_FOR_USER                        = "GET_PRIVILEGE_CODES_FOR_USER",

	// Role management related API names
	GET_ROLES                                           = "GET_ROLES",
    CREATE_ROLE                                         = "CREATE_ROLE",
    UPDATE_ROLE                                         = "UPDATE_ROLE",
    DELETE_ROLE                                         = "DELETE_ROLE",
    GET_USERS_FOR_ROLE                                  = "GET_USERS_FOR_ROLE",
    ADD_USERS_TO_ROLE                                   = "ADD_USERS_TO_ROLE",
    REMOVE_USERS_FROM_ROLE                              = "REMOVE_USERS_FROM_ROLE",

	// User Group management related API names
	ASSIGN_USERS_TO_USER_GROUPS                          = "ASSIGN_USERS_TO_USER_GROUPS",
    ASSIGN_ROLES_TO_USER_GROUPS                          = "ASSIGN_ROLES_TO_USER_GROUPS",
    GET_USER_GROUPS                                      = "GET_USER_GROUPS",
    ADD_USER_GROUPS                                      = "ADD_USER_GROUPS",
    EDIT_USER_GROUPS                                     = "EDIT_USER_GROUPS",
    DELETE_USER_GROUPS                                   = "DELETE_USER_GROUPS",

	// Privileges management related API names
	GET_GLOBAL_PRIVILEGES                                = "GET_GLOBAL_PRIVILEGES",
    GET_PRIVILEGES_FOR_ROLE                              = "GET_PRIVILEGES_FOR_ROLE",
    GET_PRIVILEGE_CODES_FOR_ROLE                         = "GET_PRIVILEGE_CODES_FOR_ROLE",
    ADD_PRIVILEGE_TO_ROLE                                = "ADD_PRIVILEGE_TO_ROLE",
    REMOVE_PRIVILEGE_FROM_ROLE                           = "REMOVE_PRIVILEGE_FROM_ROLE",
    SET_PRIVILEGES_FOR_ROLE                              = "SET_PRIVILEGES_FOR_ROLE",
    SET_PRIVILEGES_FOR_ROLE_FROM_CODES                   = "SET_PRIVILEGES_FOR_ROLE_FROM_CODES",
    CATALOG_DOMAIN_REVIEW_PRIVILEGES                     = "CATALOG_DOMAIN_REVIEW_PRIVILEGES",

	// Review related API names
	GET_REVIEWS_LIST                                     = "GET_REVIEWS_LIST",
    GET_REVIEW                                           = "GET_REVIEW",
    UPDATE_REVIEWS                                       = "UPDATE_REVIEWS",
    GET_REVIEW_HISTORY                                   = "GET_REVIEW_HISTORY",
    GET_REVIEW_COUNTS                                    = "GET_REVIEW_COUNTS",
    UPDATE_REVIEW_NOTES                                  = "UPDATE_REVIEW_NOTES",
    RE_ASSIGN_REVIEW_REQUEST                             = "RE_ASSIGN_REVIEW_REQUEST",
    CHECK_PENDING_TAXONOMY_REVIEW                        = "CHECK_PENDING_TAXONOMY_REVIEW",
    GET_REVIEW_RESTRICTIONS_MATRIX                       = "GET_REVIEW_RESTRICTIONS_MATRIX",
    GET_REVIEW_STATUSES                                  = "GET_REVIEW_STATUSES",
    GET_REVIEW_ACTIONS                                   = "GET_REVIEW_ACTIONS",
    GET_RESTRICTIONS                                     = "GET_RESTRICTIONS",

	// Reject review request modifications related API names
    UPDATE_REJECT_REVIEW_SKU_ATTRIBUTES                  = "UPDATE_REJECT_REVIEW_SKU_ATTRIBUTES",
    UPDATE_REJECT_REVIEW_SKU_DA_LINK                     = "UPDATE_REJECT_REVIEW_SKU_DA_LINK",
    UPDATE_REJECT_REVIEW_TAXONOMY_DA_LINK                = "UPDATE_REJECT_REVIEW_TAXONOMY_DA_LINK",
    UPDATE_REJECT_REVIEW_TAXONOMY                        = "UPDATE_REJECT_REVIEW_TAXONOMY",
    UPDATE_REJECT_REVIEW_SKU                             = "UPDATE_REJECT_REVIEW_SKU",
    UPDATE_REJECT_TAXONOMY_UPDATES                       = "UPDATE_REJECT_TAXONOMY_UPDATES",
    UPDATE_REJECT_SCHEMA                                 = "UPDATE_REJECT_SCHEMA",

	// Reports related API names
    GET_ALL_REPORTS                                      = "GET_ALL_REPORTS",
    GET_EXECUTION_HISTORY                                = "GET_EXECUTION_HISTORY",
    REPORT_FAVORITE                                      = "REPORT_FAVORITE",
    EXECUTE_REPORT                                       = "EXECUTE_REPORT",
    FETCH_REPORT                                         = "FETCH_REPORT",
    FETCH_P_7_DRILLDOWN_REPORT                           = "FETCH_P_7_DRILLDOWN_REPORT",
    FETCH_P_1_DRILLDOWN_REPORT                           = "FETCH_P_1_DRILLDOWN_REPORT",
    DOWNLOAD_REPORT                                      = "DOWNLOAD_REPORT",
    GET_LOVS_FOR_ATTR                                    = "GET_LOVS_FOR_ATTR",
    GET_UOMS_FOR_ATTR                                    = "GET_UOMS_FOR_ATTR",
    UPDATE_SKU_VALUE_REPORT                              = "UPDATE_SKU_VALUE_REPORT",
    FIX_REPORT                                           = "FIX_REPORT",
    FIX_REPORT_T_1                                       = "FIX_REPORT_T_1",
    FIX_P_12                                             = "FIX_P_12",
    FIX_REPORT_S_10_LOVS                                 = "FIX_REPORT_S_10_LOVS",
    FIX_REPORT_S_10_UOMS                                 = "FIX_REPORT_S_10_UOMS",
    FIX_REPORT_S_10_CONSTRAINTS                          = "FIX_REPORT_S_10_CONSTRAINTS",
    ADD_NOTE_TO_REPORT                                   = "ADD_NOTE_TO_REPORT",
    CHECK_LOV_SUGGESTIONS                                = "CHECK_LOV_SUGGESTIONS",

	// Validation Failure management related API names
    GET_VALIDATION_CONSTRAINTS_LIST                      = "GET_VALIDATION_CONSTRAINTS_LIST",
    VALIDATION_FAILURE_BY_SCHEMA_CONSTRAINTS             = "VALIDATION_FAILURE_BY_SCHEMA_CONSTRAINTS",
    VALIDATION_FAILURE_BY_ATTRIBUTES                     = "VALIDATION_FAILURE_BY_ATTRIBUTES",
    VALIDATION_FAILURE_BY_TOP_ATTRIBUTES                 = "VALIDATION_FAILURE_BY_TOP_ATTRIBUTES",
    VALIDATION_FAILURE_BY_TOP_NODES                      = "VALIDATION_FAILURE_BY_TOP_NODES",
    VALIDATION_FAILURE_BY_SKU_LIST                       = "VALIDATION_FAILURE_BY_SKU_LIST",
    UPDATE_FAILURE_FOR_UOMS_AND_LOVS                     = "UPDATE_FAILURE_FOR_UOMS_AND_LOVS",
    GET_LOV_SUGGESTIONS                                  = "GET_LOV_SUGGESTIONS",
    GET_VALIDATIONS_COUNT                                = "GET_VALIDATIONS_COUNT",

	// Import Templates related API names
    GET_IMPORT_TEMPLATES                                 = "GET_IMPORT_TEMPLATES",
    CREATE_IMPORT_TEMPLATES                              = "CREATE_IMPORT_TEMPLATES",
    UPDATE_IMPORT_TEMPLATES                              = "UPDATE_IMPORT_TEMPLATES",
    DELETE_IMPORT_TEMPLATES                              = "DELETE_IMPORT_TEMPLATES",
    GET_SINGLE_IMPORT_TEMPLATES                          = "GET_SINGLE_IMPORT_TEMPLATES",
    PREVIEW_IMPORT_TEMPLATES                             = "PREVIEW_IMPORT_TEMPLATES",
    IMPORT_TEMPLATEVALIDATE_NAME                         = "IMPORT_TEMPLATEVALIDATE_NAME",
    SAVE_AS_IMPORT_TEMPLATE                              = "SAVE_AS_IMPORT_TEMPLATE",

	// Hybrid Import Templates related API names
    GET_HYBRID_TEMPLATES                                 = "GET_HYBRID_TEMPLATES",
    CREATE_HYBRID_TEMPLATE                               = "CREATE_HYBRID_TEMPLATE",
    UPDATE_HYBRID_TEMPLATE                               = "UPDATE_HYBRID_TEMPLATE",
    SAVE_HYBRID_TEMPLATE_AS                              = "SAVE_HYBRID_TEMPLATE_AS",
    DELETE_HYBRID_TEMPLATE                               = "DELETE_HYBRID_TEMPLATE",

	// Imports related API names
    GET_IMPORTS                                          = "GET_IMPORTS",
    CREATE_IMPORTS                                       = "CREATE_IMPORTS",
    UPDATE_IMPORTS                                       = "UPDATE_IMPORTS",
    GET_IMPORT                                           = "GET_IMPORT",
    DELETE_IMPORT                                        = "DELETE_IMPORT",
    DELETE_FILE                                          = "DELETE_FILE",
    PROCESS_IMPORT                                       = "PROCESS_IMPORT",
    ADD_FILE                                             = "ADD_FILE",
    GET_IMPORT_FILE_TYPES                                = "GET_IMPORT_FILE_TYPES",
    DOWNLOAD_IMPORT_FILE                                 = "DOWNLOAD_IMPORT_FILE",

	// Exports related API names
    GET_EXPORTS                                          = "GET_EXPORTS",
    CREATE_EXPORTS                                       = "CREATE_EXPORTS",
    UPDATE_EXPORTS                                       = "UPDATE_EXPORTS",
    GET_EXPORT                                           = "GET_EXPORT",
    DELETE_EXPORT                                        = "DELETE_EXPORT",
    GET_EXPORT_FILE_TYPES                                = "GET_EXPORT_FILE_TYPES",
    DOWNLOAD_EXPORT_FILE                                 = "DOWNLOAD_EXPORT_FILE",
    DOWNLOAD_EXPORT_SAMPLE                               = "DOWNLOAD_EXPORT_SAMPLE",
    PROCESS_EXPORTS                                      = "PROCESS_EXPORTS",
    GET_SEARCHED_CONDITION                               = "GET_SEARCHED_CONDITION",
    GET_LATEST_EXPORT_DATE                               = "GET_LATEST_EXPORT_DATE",
    GET_GRAINGER_SKU_UPDATE_COUNT                        = "GET_GRAINGER_SKU_UPDATE_COUNT",
    GET_GRAINGER_ITERATION_FAILED_SKUS                   = "GET_GRAINGER_ITERATION_FAILED_SKUS",
    PATCH_ITERATION_SKU_ATTRIBUTE_VALUE                  = "PATCH_ITERATION_SKU_ATTRIBUTE_VALUE",
    GET_ITERATION_FAILURE_DESCRIPTION                    = "GET_ITERATION_FAILURE_DESCRIPTION",
    GET_BME_CAT_VERSIONS                                 = "GET_BME_CAT_VERSIONS",
    GET_EXPORT_READINESS                                 = "GET_EXPORT_READINESS",

	// Export Templates related API names
    GET_EXPORT_TEMPLATES                                 = "GET_EXPORT_TEMPLATES",
    GET_EXPORT_TEMPLATE_INFO                             = "GET_EXPORT_TEMPLATE_INFO",
    EXPORT_PRE_SIGNED_URL                                = "EXPORT_PRE_SIGNED_URL",
    EXPORT_TEMPLATE_FIELDS                               = "EXPORT_TEMPLATE_FIELDS",
    EXPORT_TEMPLATES                                     = "EXPORT_TEMPLATES",
    DELETE_EXPORT_TEMPLATE                               = "DELETE_EXPORT_TEMPLATE",
    UPDATE_EXPORT_TEMPLATE                               = "UPDATE_EXPORT_TEMPLATE",
    GET_EXPORT_TEMPLATE_TYPES                            = "GET_EXPORT_TEMPLATE_TYPES",
    CHECK_EXPORT_TEMPLATE_NAME                           = "CHECK_EXPORT_TEMPLATE_NAME",

	// Amazon Templates related API names
    AMAZON_TEMPLATES                                     = "AMAZON_TEMPLATES",
    SINGLE_AMAZON_TEMPLATE                               = "SINGLE_AMAZON_TEMPLATE",
    DOWNLOAD_TEMPLATE_FILE                               = "DOWNLOAD_TEMPLATE_FILE",
    AMAZON_FIELD_MAPPING_TYPES                           = "AMAZON_FIELD_MAPPING_TYPES",

	// Grainger Templates related API names
    GRAINGER_TEMPLATES                                   = "GRAINGER_TEMPLATES",
    SINGLE_GRAINGER_TEMPLATE                             = "SINGLE_GRAINGER_TEMPLATE",
    DOWNLOAD_GRAINGER_TEMPLATE_FILE                      = "DOWNLOAD_GRAINGER_TEMPLATE_FILE",
    GRAINGER_FIELD_MAPPING_TYPES                         = "GRAINGER_FIELD_MAPPING_TYPES",
    GRAINGER_LOVS                                        = "GRAINGER_LOVS",
    GET_GRAINGER_TEMPLATE_SECTIONS                       = "GET_GRAINGER_TEMPLATE_SECTIONS",
    GET_UPLOADED_FILE_SECTIONS                           = "GET_UPLOADED_FILE_SECTIONS",
    REMOVE_UPLOADED_FILE                                 = "REMOVE_UPLOADED_FILE",

	// Amaze parameters related API
    GET_AMAZE_PARAMS                                     = "GET_AMAZE_PARAMS",

	// Authentication related API names
    GOOGLE_LOGIN                                         = "GOOGLE_LOGIN",
    GET_AUTHENTICATION_TOKEN                             = "GET_AUTHENTICATION_TOKEN",
    GET_USER_INFO                                        = "GET_USER_INFO",
    LOGIN_BY_PASSWORD                                    = "LOGIN_BY_PASSWORD",
    RESET_PASSWORD                                       = "RESET_PASSWORD",
    FORGOT_PASSWORD                                      = "FORGOT_PASSWORD",
    LOGOUT                                               = "LOGOUT",

	// Aamze-bridge Synchronization related API names
    GET_BRIDGE_CATALOGS                                  = "GET_BRIDGE_CATALOGS",
    CREATE_CATALOG_LINK                                  = "CREATE_CATALOG_LINK",
    DELETE_CATALOG_LINK                                  = "DELETE_CATALOG_LINK",
    GET_CATALOG_LINK                                     = "GET_CATALOG_LINK",
    CREATE_CATALOG_SYNC_REQUEST                          = "CREATE_CATALOG_SYNC_REQUEST",
    GET_CATALOG_SYNC_REQUESTS                            = "GET_CATALOG_SYNC_REQUESTS",
    GET_CATALOG_SYNC_STATUSES                            = "GET_CATALOG_SYNC_STATUSES",
    GET_CATALOG_SYNC_TYPES                               = "GET_CATALOG_SYNC_TYPES",

	// Realtime Sync Linkages related API names
    GET_REAL_TIME_SYNC_LINKAGES                          = "GET_REAL_TIME_SYNC_LINKAGES",
    DELETE_REAL_TIME_LINKAGE                             = "DELETE_REAL_TIME_LINKAGE",
    CREATE_REAL_TIME_SYNC_LINKAGE                        = "CREATE_REAL_TIME_SYNC_LINKAGE",

	// Product Detail Page related API names
    GET_PDP_TEMPLATES                                    = "GET_PDP_TEMPLATES",
    CREATE_PDP_TEMPLATE                                  = "CREATE_PDP_TEMPLATE",
    UPDATE_PDP_TEMPLATE                                  = "UPDATE_PDP_TEMPLATE",
    DELETE_PDP_TEMPLATES                                 = "DELETE_PDP_TEMPLATES",
    DELETE_PDP_ELIGIBILTTY_TEMPLATES                     = "DELETE_PDP_ELIGIBILTTY_TEMPLATES",

	// Taxonomy Metadata related API names
    GET_TAXO_METATAGS                                    = "GET_TAXO_METATAGS",
    CREATE_TAXO_METATAG                                  = "CREATE_TAXO_METATAG",
    UPDATE_TAXO_METATAG                                  = "UPDATE_TAXO_METATAG",
    DELETE_TAXO_METATAG                                  = "DELETE_TAXO_METATAG",
    GET_TAXO_DETAILS_BY_METATAG                          = "GET_TAXO_DETAILS_BY_METATAG",
    GET_TAXO_META_ATTR                                   = "GET_TAXO_META_ATTR",
    CREATE_TAXO_META_ATTR                                = "CREATE_TAXO_META_ATTR",
    UPDATE_TAXO_META_ATTR                                = "UPDATE_TAXO_META_ATTR",
    GET_TAXO_DETAILS_BY_META_ATTR                        = "GET_TAXO_DETAILS_BY_META_ATTR",
    DELETE_TAXO_META_ATTR                                = "DELETE_TAXO_META_ATTR",

	// Bulk Download Digital Assets related API names
    GET_BULK_ASSET_COUNT                                 = "GET_BULK_ASSET_COUNT",
    SUBMIT_BULK_ASSET                                    = "SUBMIT_BULK_ASSET",

	// Advance SKU Search (Product Search) related API names
    GET_PRODUCT_SEARCH_CONFIGURATIONS                    = "GET_PRODUCT_SEARCH_CONFIGURATIONS",
    GET_ADVANCE_SEARCH_SKU_RESULT                        = "GET_ADVANCE_SEARCH_SKU_RESULT",
    SAVE_ADVANCE_SEARCH_CONDITION                        = "SAVE_ADVANCE_SEARCH_CONDITION",
    GET_SAVED_CONDITIONS                                 = "GET_SAVED_CONDITIONS",
    GET_SAVED_CONDITION                                  = "GET_SAVED_CONDITION",
    GET_SAVED_CONDITION_USAGES                           = "GET_SAVED_CONDITION_USAGES",

	// CKB related API names
    GET_TERRAINS                                         = "GET_TERRAINS",
    GET_TAXONOMY_RECOMMENDATIONS                         = "GET_TAXONOMY_RECOMMENDATIONS",
    GET_ATTRIBUTES_RECOMMENDATIONS                       = "GET_ATTRIBUTES_RECOMMENDATIONS",
    SAVE_TAXONOMY_RECOMMENDATIONS                        = "SAVE_TAXONOMY_RECOMMENDATIONS",
    EDIT_ADVANCE_SEARCH_CONDITION                        = "EDIT_ADVANCE_SEARCH_CONDITION",
    GET_ATTRIBUTE_DETAILS                                = "GET_ATTRIBUTE_DETAILS",
    GET_UOM_DETAILS                                      = "GET_UOM_DETAILS",
    GET_CONFIDENCE_BUCKETS                               = "GET_CONFIDENCE_BUCKETS",
    GET_CKB_SCHEMA_SUGGESTION                            = "GET_CKB_SCHEMA_SUGGESTION",
    GET_CKB_ATTRIBUTES_WITH_AMAZE_MASTER_ATTRIBUTES      = "GET_CKB_ATTRIBUTES_WITH_AMAZE_MASTER_ATTRIBUTES",
    GET_ATTRIBUTE_LOV_RECOMMENDATIONS                    = "GET_ATTRIBUTE_LOV_RECOMMENDATIONS",

	// Connectors related API names
    GET_CONNECTORS_LIST                                  = "GET_CONNECTORS_LIST",
    GET_CONNECTOR_CONFIGS                                = "GET_CONNECTOR_CONFIGS",
    GET_CONNECTOR_CONFIG                                 = "GET_CONNECTOR_CONFIG",
    CREATE_CONNECTOR_CONFIG                              = "CREATE_CONNECTOR_CONFIG",
    UPDATE_CONNECTOR_CONFIG                              = "UPDATE_CONNECTOR_CONFIG",
    DELETE_CONNECTOR_CONFIG                              = "DELETE_CONNECTOR_CONFIG",
    CHECK_CONNECTION                                     = "CHECK_CONNECTION",
    GET_STORE_WEBSITES                                   = "GET_STORE_WEBSITES",

	// Magento 2 Connector related API names
    GET_VENDOR_ATTRIBUTES                                = "GET_VENDOR_ATTRIBUTES",
    GET_ATTRIBUTE_MAPPINGS                               = "GET_ATTRIBUTE_MAPPINGS",
    CREATE_ATTR_MAPPIGS                                  = "CREATE_ATTR_MAPPIGS",

	// Public Apis Module related API names
    ADD_USER_NOTIFICATIONS                               = "ADD_USER_NOTIFICATIONS",
    DELET_USER_NOTIFICATIONS                             = "DELET_USER_NOTIFICATIONS",
    GET_CURRENT_TOKEN                                    = "GET_CURRENT_TOKEN",
    GENERATE_TOKEN                                       = "GENERATE_TOKEN",
    DELETE_TOKEN                                         = "DELETE_TOKEN",

	// Formula Master related API names
    GET_FORMULAS                                         = "GET_FORMULAS",
    GET_FORMULA_SECTIONS                                 = "GET_FORMULA_SECTIONS",
    CREATE_FORMULA                                       = "CREATE_FORMULA",
    DELETE_FORMULA                                       = "DELETE_FORMULA",
    EDIT_FORMULA                                         = "EDIT_FORMULA",
    ADD_FORMULA_TO_TAXONOMY                              = "ADD_FORMULA_TO_TAXONOMY",
    GET_SECTION_TYPES                                    = "GET_SECTION_TYPES",
    GET_SECTION_ARGUMENT_TYPES                           = "GET_SECTION_ARGUMENT_TYPES",
    GET_SECTION_INPUT_VALUES                             = "GET_SECTION_INPUT_VALUES",
    CLEAR_FORMULA                                        = "CLEAR_FORMULA",
    MANAGE_TAXONOMY_FORMULA                              = "MANAGE_TAXONOMY_FORMULA",
    ENTITIES_ATTACHED_TO_FORMULA                         = "ENTITIES_ATTACHED_TO_FORMULA",
    CHECK_EXPRESSION                                     = "CHECK_EXPRESSION",

	// Attribute Value Lock related API names
    GET_SKU_ATTRIBUTES_LOCK_INFO                         = "GET_SKU_ATTRIBUTES_LOCK_INFO",
    GET_SKU_ATTR_VALUE_STAGING_INFO                      = "GET_SKU_ATTR_VALUE_STAGING_INFO",
    APPROVE_SKU_ATTR_VALUE_STAGING_VALUES                = "APPROVE_SKU_ATTR_VALUE_STAGING_VALUES",
    CREATE_ATTRIBUTE_LOCK                                = "CREATE_ATTRIBUTE_LOCK",
    GET_LOCKED_ATTRIBUTES                                = "GET_LOCKED_ATTRIBUTES",
    UNLOCK_ATTRIBUTE_LOCK                                = "UNLOCK_ATTRIBUTE_LOCK",

	// Domain related API
    GENERATE_OTP                                         = "GENERATE_OTP",

	// Customers related API
    GET_CUSTOMER_NAME                                    = "GET_CUSTOMER_NAME",

	// Dashboard related API names
    GET_ALL_WIDGETS                                      = "GET_ALL_WIDGETS",
    GET_WIDGET_DATA                                      = "GET_WIDGET_DATA",
    GET_WIDGET_RANGE                                     = "GET_WIDGET_RANGE",
    ENABLE_DISABLE_WIDGET                                = "ENABLE_DISABLE_WIDGET",
    REORDER_WIDGETS                                      = "REORDER_WIDGETS",
    RESET_WIDGET_ORDER                                   = "RESET_WIDGET_ORDER",

	// Products Listing related API names
    GET_PRODUCT                                          = "GET_PRODUCT",
    GET_PRODUCT_LIST                                     = "GET_PRODUCT_LIST",
    GET_LEAN_ATTRIBUTES                                  = "GET_LEAN_ATTRIBUTES",
    GET_SKU_VARIANTS                                     = "GET_SKU_VARIANTS",
    GET_DATA_QUALITY_PROBLEMS                            = "GET_DATA_QUALITY_PROBLEMS",
    GET_SYNDICATION_INFO                                 = "GET_SYNDICATION_INFO",
    GET_SYNDICATION_VALIDATION_FAILURES                  = "GET_SYNDICATION_VALIDATION_FAILURES",
    GET_SYNDICATION_UN_MAPPED_ATTRIBUTES                 = "GET_SYNDICATION_UN_MAPPED_ATTRIBUTES",
    GET_SYNDICATION_FROM_CONSOLIDATION                   = "GET_SYNDICATION_FROM_CONSOLIDATION",
    GET_SYNDICATION_ATTRIBUTE_MAPPING_DETAILS            = "GET_SYNDICATION_ATTRIBUTE_MAPPING_DETAILS",

	// Product 360 View related API names
    GET_ATTR_CATEGORIES                                  = "GET_ATTR_CATEGORIES",

	// Marketing Recommed=ndation related API
    GET_MARKETING_RECOMMENDATION                         = "GET_MARKETING_RECOMMENDATION",

	// Assortments related API names
    GET_ASSORTMENTS                                      = "GET_ASSORTMENTS",
    ADD_ASSORTMENT                                       = "ADD_ASSORTMENT",
    EDIT_ASSORTMENT                                      = "EDIT_ASSORTMENT",
    DELETE_ASSORTMENT                                    = "DELETE_ASSORTMENT",
    ADD_SKUS_TO_ASSORTMENT                               = "ADD_SKUS_TO_ASSORTMENT",
    REMOVE_SKUS_FROM_ASSORTMENT                          = "REMOVE_SKUS_FROM_ASSORTMENT",

	// Channels related API names
    GET_BRIDGE_CHANNELS                                  = "GET_BRIDGE_CHANNELS",
	CREATE_CHANNEL                                       = "CREATE_CHANNEL",
	DELETE_CHANNEL                                       = "DELETE_CHANNEL",
    GET_BRIDGE_CHANNEL                                   = "GET_BRIDGE_CHANNEL",
	GET_BRIDGE_CHANNEL_FOR_CATALOG_CREATION				 = "GET_BRIDGE_CHANNEL_FOR_CATALOG_CREATION",
    GET_BRIDGE_CATALOG_NODES                             = "GET_BRIDGE_CATALOG_NODES",
    GET_BRIDGE_CATALOG_CHILD_NODES                       = "GET_BRIDGE_CATALOG_CHILD_NODES",
    GET_BRIDGE_CATALOG_NODES_SEARCH                      = "GET_BRIDGE_CATALOG_NODES_SEARCH",
    CHANGE_CHANNEL_STATE                                 = "CHANGE_CHANNEL_STATE",
    BUILD_CHANNEL                                        = "BUILD_CHANNEL",
    VALIDATE_MAP                                         = "VALIDATE_MAP",
    CREATE_NEW_MAP                                       = "CREATE_NEW_MAP",
    GET_BACKUP_MAPS_COUNT                                = "GET_BACKUP_MAPS_COUNT",
    GET_BACKUP_MAPS                                      = "GET_BACKUP_MAPS",
    RESTORE_BACKUP_MAPS                                  = "RESTORE_BACKUP_MAPS",
    GET_AMAZE_CATALOG_DETAILS_FROM_BRIDGE_CATALOG        = "GET_AMAZE_CATALOG_DETAILS_FROM_BRIDGE_CATALOG",
    GET_NODE_MAPS                                        = "GET_NODE_MAPS",
	GET_PRE_TRANSFORM_SKUS                               = "GET_PRE_TRANSFORM_SKUS",
	GET_TRANSFORMED_SKUS                               	 = "GET_TRANSFORMED_SKUS"
}
