export const reportsDashboardState: any = {
	activeSection: 1,
	sections: [
		{
			sectionId: 1,
			sectionName: "All",
			isSet: false,
			tooltip: "Switch All Reports"
		},
		{
			sectionId: 2,
			sectionName: "Product",
			isSet: true,
			tooltip: "Switch to Product Reports"
		},
		{
			sectionId: 3,
			sectionName: "Schema",
			isSet: false,
			tooltip: "Switch to Schema Reports"
		},
		{
			sectionId: 4,
			sectionName: "Taxonomy",
			isSet: false,
			tooltip: "Switch to Taxonomy Reports"
		}
	],
	selectedSection: {
		sectionId: 1,
		sectionName: "All",
		isSet: false,
		tooltip: "Switch All Reports"
	},
	selectedCatalog: {},
	pageTransferInfo: {}
};
