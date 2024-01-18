import { ICatalog, IUserInfo } from "@app/store/interfaces/app.interfaces";

export interface IDashboardState {
	userInfo: IUserInfo;
	widgets: any[];
	catalog: ICatalog;
	pageTransferInfo: any;
}
