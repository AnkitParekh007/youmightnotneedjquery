interface Common {
	id?: string;
	name?: string;
	description?: string;
	isActive?: boolean;
	createdBy?: string;
	createDate?: Date;
	updatedBy?: string;
	updatedDate?: Date;
}

export interface User extends Common {
	customerId?: string;
	firstname?: string;
	lastname?: string;
	displayName?: string;
	emailId?: string;
	phoneInternationalCode?: string;
	phoneNumber?: string;
	photo?: string;
	address1?: string;
	address2?: string;
	address3?: string;
	cityId?: string;
	zipCode?: string;
	accessStartDate?: Date;
	accessEndDate?: Date;
	deletedBy?: string;
	deletedDate?: Date;
	deleteReason?: string;
}

export interface Customer extends Common {
	domainId?: string;
	segmentId?: string;
	customerName?: string;
	customerStartDate?: string;
	customerEndDate?: string;
	isRepeatCustomer?: boolean;
}

export interface CustomerSegment extends Common {
	customerSegment?: string;
}

export interface CustomerDomain extends Common {
	customerDomain?: string;
	customerSubDomain?: string;
}

export interface Country extends Common {
	isoCode?: string;
}

export interface State extends Common {
	countryId?: string;
	stateCode?: string;
}

export interface City extends Common {
	stateId?: string;
	cityName?: string;
}

export interface Password extends Common {
	userId?: string;
	passwordHash?: string;
	paswordSalt?: string;
	isSystemGenerated?: string;
	changeOnNextLogin?: boolean;
	passwordStartDate?: Date;
}

export interface Role extends Common {
	isCustomRole?: boolean;
}

export interface Privilege extends Common {}

export interface UserPrivilege extends Common {
	userId?: string;
	privilegeId?: string;
}

export interface RolePrivilege extends Common {
	roleId?: string;
	privilegeId?: string;
}

export interface UserRole extends Common {
	userId?: string;
	roleId?: string;
}

export interface PasswordQuestion extends Common {
	passwordQuestion?: string;
}

export interface UserPasswordQuestion extends Common {
	userId?: string;
	PasswordQuestionId?: string;
	UserPasswordQuestionResponse?: string;
}

export interface UserAuthenticationLogin {
	userAuthenticationLoginId?: string;
	userId?: string;
	loginDateTime?: Date;
	ipAddress?: string;
	browserName?: string;
	isSuccessFulLogin?: boolean;
}

export interface LoginCompliance {
	userLoginComplianceId?: string;
	userId?: string;
	isEmailIdVerified?: boolean;
	isPhoneNumberVerified?: string;
	isPasswordPolicyComplaint?: boolean;
	isPasswordRecoverySetup?: boolean;
	isAccountLockedOut?: boolean;
	lockoutStartDate?: Date;
	lockoutEndDate?: Date;
	createdDate?: Date;
}
