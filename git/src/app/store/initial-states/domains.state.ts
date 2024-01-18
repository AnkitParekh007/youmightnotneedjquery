import { IDomainsState } from "../interfaces/domains.interfaces";

export const domainsState: IDomainsState = {
	domainState : {
		userInfo         : undefined,
		catalog          : undefined,
		pageTransferInfo : undefined,
		domainsList      : [],
		isGridMode       : true
	},
	domainPropertyState : {
		selectedDomain : undefined,
		isGridMode     : true
	},
	domainValueState : {
		selectedDomain           : undefined,
		selectedDomainProperties : [],
		isGridMode               : true
	}
};
