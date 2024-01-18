export interface alternateUserIdentities {
	id?: string;
	customerCode?: string;
	userId?: string;
	provider?: string;
	alternateUserId?: string;
	alternateEmail?: string;
}

export interface User {
	// basic user properties
	uid?: string;
	id?: string;

	// properties in Amaze system
	customerCode?: string;
	userFirstName?: string;
	userLastName?: string;
	userEmail?: string;
	userAccessStartDate?: string;
	userAccessEndDate?: string;
	alternateIdentities?: alternateUserIdentities[];
	active?: boolean;
	systemUser?: boolean;

	// properties provided by Google Auth
	name?: string;
	givenName?: string;
	familyName?: string;
	email?: string;
	verifiedEmail?: string;
	hd?: string;
	locale?: string;
	picture?: string;

	// properties defined for UI
	displayName?: string;
	photoURL?: string;
	password?: string;
}

export interface LoginContext {
	username: string;
	password: string;
	remember?: boolean;
}
