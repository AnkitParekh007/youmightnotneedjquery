export interface DropDownOption {
	label: string;
	value: number | string | Object;
	data?: any;
	icon?: string;
}

export interface IApiQueryParam {
	key: string;
	value: string | boolean | null | undefined;
}
