export const productsDashboardState: any = {
	catalogState: {
		isFetching: true,
		isFound: true,
		catalogs: [],
		selectedCatalog: {},
		catalogDomains: [],
		selectedDomain: {},
		currentCatalogPrivileges: [],
		currentCatalogPrivilegeCodes: [],
		isClientTerrainsAvailable: false,
		lastvistedCatalog: undefined,
		autoSelectCatalog: undefined
	},
	filterState: {
		isFilterPanelHidden: false,
		isFilterApplied: false,
		showAttributeSearch: false,
		filtersChest: [
			{
				filterName: "taxonomy",
				label: "Taxonomy",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "attribute",
				label: "Attribute",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productItem",
				label: "Product Item ID",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productTitle",
				label: "Product Title",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "linkage",
				label: "DA Linkage",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productHavingMissingData",
				label: "Products That Have Missing Data",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productDataQualityScore",
				label: "Products Data Quality Score",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productFamily",
				label: "View Products/Product Family",
				isApplied: false,
				disabled: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "productCrosslistingCriteria",
				label: "Products Crosslisting Criteria",
				isApplied: false,
				disabled: true,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "assortment",
				label: "Assortments",
				disabled: false,
				isApplied: false,
				appliedFilters: [],
				meta: {}
			},
			{
				filterName: "domain",
				label: "Domains",
				disabled: false,
				isApplied: false,
				appliedFilters: [],
				meta: {}
			}
		],
		appliedFilters: []
	},
	productsState: {
		gridState: {
			currentFilters: {},
			currentSort: {},
			currentAttrs: [],
			currentGrps: [],
			gridDetails: {
				gridId: "resultsGrid",
				gridWrapId: "app-products-listing-section-wrapper",
				gridLimit: 25,
				gridOffset: 0,
				isGridView: false
			}
		},
		selectedSKUs: [],
		selectedSchemas: [],
		isSchemaEmpty: true,
		copiedSchema: {},
		selectedFamilies: []
	},
	pageTransferInfo: {}
};
