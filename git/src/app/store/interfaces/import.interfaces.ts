export interface IImportExportPage {
	currentView: number;
	selectedImport?: any[];
	selectedExport?: any[];
	currentfilters: any;
	currentSort: any;
	isloading: boolean;
	isEmpty: boolean;
}

export interface IImportState {
	ImportTemplatePage: {
		currentView: number;
		templates: any[];
		selectedTemplates: any[];
		currentfilters: any;
		currentSort: any;
		isTemplateEmpty: boolean;
		loadingState: {
			fetching: boolean;
			fetched: boolean;
			resultsFound: boolean;
		};
	};
	ImportPage: IImportExportPage;
	ExportPage: IImportExportPage;
}
