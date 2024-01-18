import { IDamState } from "@app/store/interfaces/dam.interfaces";

export const damState: IDamState = {
	libraryPage: {
		currentView: 1,
		selectedAssets: [],
		selectedAssetsLight: [],
		currentfilters: {},
		currentSort: {}
	},
	libraryImports: {
		selectedImport: []
	},
	pageTransferInfo: {}
};
