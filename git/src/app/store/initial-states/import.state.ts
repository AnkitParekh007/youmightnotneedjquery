import { IImportState } from "@app/store/interfaces/import.interfaces";

export const importState: IImportState = {
	ImportTemplatePage: {
		currentView: 1,
		templates: [],
		selectedTemplates: [],
		currentfilters: {},
		currentSort: {},
		isTemplateEmpty: true,
		loadingState: {
			fetching: true,
			fetched: false,
			resultsFound: false
		}
	},
	ImportPage: {
		currentView: 2,
		selectedImport: [],
		currentfilters: {},
		currentSort: {},
		isloading: true,
		isEmpty: true
	},
	ExportPage: {
		currentView: 2,
		selectedExport: [],
		currentfilters: {},
		currentSort: {},
		isloading: true,
		isEmpty: true
	}
};
