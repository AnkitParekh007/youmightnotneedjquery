export interface IDamState {
	libraryPage: {
		currentView: number;
		selectedAssets: any[];
		selectedAssetsLight: any[];
		currentfilters: any;
		currentSort: any;
	};
	libraryImports: {
		selectedImport: any[];
	};
	pageTransferInfo: any;
}
