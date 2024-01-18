import { IProductSearchState } from "@app/store/interfaces/product-search.interfaces";

export const productSearchState: IProductSearchState = {
	currentSavingCriteria: "",
	currentApiResponseAfterSave: {},
	currentConditionCardIndices: []
};
