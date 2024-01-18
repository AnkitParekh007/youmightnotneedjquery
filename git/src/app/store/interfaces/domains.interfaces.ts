import { ICatalog, IUserInfo } from "@app/store/interfaces/app.interfaces";

export interface IDomainsState {
	domainState : {
		userInfo         : IUserInfo | undefined;
		catalog          : ICatalog  | undefined;
		pageTransferInfo : any;
		domainsList      : any[];
		isGridMode       : boolean;
	},
	domainPropertyState : {
		selectedDomain : any | undefined;
		isGridMode     : boolean;
	},
	domainValueState : {
		selectedDomain           : any | undefined;
		selectedDomainProperties : any[];
		isGridMode               : boolean;
	}
}
