export interface IGridIndividualState {
	url: string;
	sortname: string;
	sortorder: string;
	postData: string;
	search: string;
	rowNum: number;
	page: number;
}

export interface IGridState {
	skuGrid: IGridIndividualState;
	schemaGrid: IGridIndividualState;
	attributeGrid: IGridIndividualState;
}
