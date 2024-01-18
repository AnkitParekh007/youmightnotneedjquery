import { ICatalog, IUserInfo } from "@app/store/interfaces/app.interfaces";

export interface IAssortmentState {
	userInfo: IUserInfo | undefined;
	catalog: ICatalog | undefined;
	pageTransferInfo: any;
}
