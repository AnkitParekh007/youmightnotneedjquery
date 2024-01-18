// core
import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Observable, of, BehaviorSubject, forkJoin } from "rxjs";
import { takeUntil } from "rxjs/operators";

// interfaces
import { User } from "@app/models/interfaces/user.interface";

// services
import { CredentialsService } from "./credentials.service";
import { AuthService } from "ngx-auth";

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
	providedIn: "root"
})
export class AuthenticationService implements AuthService {
	// Returns true when user is looged in and email is verified
	get isAuthenticated() {
		return this.loggedIn.asObservable();
	}
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userInfo: User;
	public appState: any;
	public channelState: any;
	private ngUnsubscribe = new Subject();
	private interruptedUrl: string;

	constructor(private credentialsService: CredentialsService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private ngZone: NgZone) {}

	public isAuthorized(): Observable<boolean> {
		// const isAuthorized: boolean = !!sessionStorage.getItem('accessToken');
		const isAuthorized: boolean = !!sessionStorage.getItem("userInfo");
		return of(isAuthorized);
	}

	public getAccessToken(): Observable<string> {
		const accessToken: string = sessionStorage.getItem("accessToken");
		return of(accessToken);
	}

	public refreshToken(): Observable<any> {
		const refreshToken: string = sessionStorage.getItem("refreshToken");
		return this.http.post("http://localhost:3001/refresh-token", {
			refreshToken
		});
		// .catch(() => this.logout())
	}

	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		return response.status === 401;
	}

	public verifyRefreshToken(req: HttpRequest<any>): boolean {
		return req.url.endsWith("refresh-token");
	}

	public skipRequest(req: HttpRequest<any>): boolean {
		return req.url.endsWith("third-party-request");
	}

	public getInterruptedUrl(): string {
		return this.interruptedUrl;
	}

	public setInterruptedUrl(url: string): void {
		this.interruptedUrl = url;
	}

	// Sign in with email/password
	SignIn(user: User) {
		this.loggedIn.next(true);
	}

	// Sign up with email/password
	SignUp(user: User) {}

	// Send email verfificaiton when new user sign up
	SendVerificationMail() {}

	// Reset Forggot password
	ForgotPassword(passwordResetEmail: any) {}

	// Returns true when user info is present in localStorage
	isUserSigned() {
		return sessionStorage.getItem("userInfo") != null;
	}

	/**
	 * Authenticates the user.
	 * @param context The login parameters.
	 * @return The user credentials.
	 */
	login(context: any, _sharedService: any) {
		this.appState = _sharedService.uiService.getAppStore;
		// Replace by proper authentication call
		const data = {
			email: context.username,
			password: context.password,
			browserName: "",
			deviceId: "",
			ipAddress: ""
		};
		this.appState.serverParams.clientCode = context.code;
		this.appState.serverParams.provider = "PASSWORD";
		this.appState.serverParams.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		_sharedService.uiService.syncAppStore(this.appState);
		const apiUrl = _sharedService.urlService.simpleApiCall("loginByPassword");
		_sharedService.uiService.showLoginLoading();
		_sharedService.configService
			.post(apiUrl, data, { observe: "response" })
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(
				(response: any) => {
					const userResponse = response.body;
					this.appState.serverParams.token = response.headers.get("X-Access-Token");
					_sharedService.uiService.syncAppStore(this.appState);
					const userRoleApiUrl = _sharedService.urlService.apiCallWithParams("getRolesForUser", {
						"{userId}": userResponse.user.id
					});
					_sharedService.configService
						.get(userRoleApiUrl)
						.pipe(takeUntil(this.ngUnsubscribe))
						.subscribe(
							(res: any) => {
								if (res.length == 0) {
									_sharedService.uiService.showApiErrorPopMsg("You do not have any privileges assigned for Amaze.Please contact the administrator");
									jQuery(".login-wrapper").removeClass("d-none");
								} else {
									sessionStorage.setItem("userInfo", JSON.stringify(userResponse.user));
									this.credentialsService.setCredentials(userResponse.user);
									this.setUserAuthorization(userResponse.user, _sharedService);
								}
							},
							(e: any) => {
								jQuery(".login-wrapper").removeClass("d-none");
								_sharedService.uiService.showApiErrorPopMsg(e.error);
							}
						);
				},
				(error: any) => {
					jQuery(".login-wrapper").removeClass("d-none");
					_sharedService.uiService.showApiErrorPopMsg(error.error);
				}
			);
	}

	/**
	 ** Logs out the user and clear credentials.
	 ** @return True if the user was logged out successfully.
	 **/
	logout(): Observable<boolean> {
		// Customize credentials invalidation here
		this.credentialsService.setCredentials();
		return of(true);
	}

	/*
	 ** Setting up user data when sign in with username/password or google auth
	 */
	SetUserData(_user: any, _isAuth: boolean) {
		const $t = this;
		let userData: User = {};
		if (_user != null) {
			userData = $t.getUserData();
			if (Object.keys(_user).length) {
				Object.keys(_user).forEach((prop: any) => {
					userData[prop] = _user[prop];
				});
			}
			userData["displayName"] = _isAuth ? _user["familyName"] : _user["userFirstName"] + " " + _user["userLastName"];
			userData["picture"] = _isAuth ? _user["picture"] : userData["picture"];
			userData["photoURL"] = _isAuth ? _user["picture"] : userData["picture"];
			sessionStorage.setItem("userInfo", JSON.stringify(userData));
		} else {
			sessionStorage.setItem("userInfo", null);
		}
	}

	/*
	 ** Getting logged in user information from either servive
	 ** or from localstorage (if not found in service)
	 */
	getUserData() {
		if (sessionStorage.getItem("userInfo") == null) {
			return {
				uid: Math.floor(Math.random() * 1000000000).toString(),
				id: Math.floor(Math.random() * 1000000000).toString(),
				email: "",
				displayName: "User",
				picture: "assets/img/userIcon.png",
				verifiedEmail: false,
				firstName: "User",
				lastName: "",
				userEmail: "",
				password: ""
			};
		} else {
			return JSON.parse(sessionStorage.getItem("userInfo"));
		}
	}

	/*
	 ** Getting logged in user information from Amaze Database
	 */
	getUserInfo(_sharedService) {
		this.appState = _sharedService.uiService.getAppStore;
		const getUserUrl = _sharedService.urlService.simpleApiCall("getUserInfo");
		_sharedService.configService
			.get(getUserUrl)
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(
				(response) => {
					this.credentialsService.setCredentials(response);
					this.SetUserData(response, false);
					this.setUserAuthorization(response, _sharedService);
				},
				(error) => {
					_sharedService.uiService.showApiErrorPopMsg(error.error);
				}
			);
	}

	/*
	 ** Signing in with Google
	 */
	googleSignIn(_clientCode: any, _sharedService: any) {
		this.appState = _sharedService.uiService.getAppStore;
		let googleLoginUrl: string = _sharedService.urlService.simpleApiCall("googleLogin");
		const isLocal: boolean = location.hostname == "localhost" ? true : false;
		let requiredParams: any;

		this.appState.serverParams.clientCode = _clientCode;
		this.appState.serverParams.provider = "google";
		this.appState.serverParams.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		_sharedService.uiService.syncAppStore(this.appState);

		if (isLocal) {
			requiredParams = `&local=${isLocal}&customerCode=${_clientCode}&application=amaze&force_prompt=true`;
		} else {
			requiredParams = `&customerCode=${_clientCode}&application=amaze&force_prompt=true`;
		}

		googleLoginUrl = googleLoginUrl.concat(requiredParams);
		location.href = googleLoginUrl;
	}

	/*
	 ** Authenticating User with valid Client Code
	 */
	authenticate(_clientCode: any, _sharedService: any) {
		this.appState = _sharedService.uiService.getAppStore;
		const isLocal: boolean = location.hostname == "localhost" ? true : false;
		let url_string;
		let url;
		let authorizationCode;
		if (document.getElementsByTagName("BODY")[0].hasAttribute("googleAuthencticationParams")) {
			url_string = document.getElementsByTagName("BODY")[0].getAttribute("googleAuthencticationParams");
			url = new URL(url_string);
			authorizationCode = url.searchParams.get("code");
		}
		if (authorizationCode != undefined) {
			let getAuthenticationTokenUrl = _sharedService.urlService.simpleApiCall("getAuthenticationToken");
			getAuthenticationTokenUrl = getAuthenticationTokenUrl.concat(`?code=${authorizationCode}`);
			if (isLocal) {
				getAuthenticationTokenUrl = getAuthenticationTokenUrl.concat(`&local=${isLocal}`);
			}
			this.appState.serverParams.token = authorizationCode;
			_sharedService.uiService.syncAppStore(this.appState);
			_sharedService.uiService.showLoginLoading();
			_sharedService.configService
				.get(getAuthenticationTokenUrl, { observe: "response" })
				.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe(
					(response: any) => {
						this.appState.serverParams.token = response.headers.get("X-Access-Token");
						_sharedService.uiService.syncAppStore(this.appState);
						localStorage.removeItem("cc");
						localStorage.removeItem("googleAuthencticationParams");
						document.getElementsByTagName("BODY")[0].removeAttribute("clientcode");
						document.getElementsByTagName("BODY")[0].removeAttribute("googleAuthencticationParams");
						this.SetUserData(response.body.userProfile, true);
						this.getUserInfo(_sharedService);
					},
					(error) => {
						_sharedService.uiService.showApiErrorPopMsg(error.error);
						jQuery(".login-wrapper").removeClass("d-none");
					}
				);
		} else {
			_sharedService.uiService.closePopMsg();
			_sharedService.uiService.showApiErrorPopMsg("Something went wrong while logging. Please try again");
		}
	}

	/*
	 ** Setting up roles and privileges in App store after
	 ** user is successfully autheticated by the system
	 */
	setUserAuthorization(_userInfo: any, _sharedService: any) {
		const $t = this;
		$t.appState.userInfo = $t.getUserData();
		_sharedService.uiService.getChannelStore == null ? _sharedService.uiService.setChannelStore() : "";
		$t.channelState = _sharedService.uiService.getChannelStore;
		$t.appState.authorization.currentUserInfo = $t.getUserData();
		_sharedService.uiService.syncAppStore($t.appState);
		const userRoleApiUrl = _sharedService.urlService.apiCallWithParams("getRolesForUser", {
			"{userId}": _userInfo.id
		});
		let userPrivilegeApiUrl = _sharedService.urlService.apiCallWithParams("getPrivilegesForUser", {
			"{userId}": _userInfo.id
		});
		userPrivilegeApiUrl = _sharedService.urlService.addQueryStringParm(userPrivilegeApiUrl, "catId", 0);
		let userPrivilegeCodesApiUrl = _sharedService.urlService.apiCallWithParams("getPrivilegeCodesForUser", {
			"{userId}": _userInfo.id
		});
		const customerRealmsApiUrl = _sharedService.urlService.simpleApiCall("getCustomerRealms");
		userPrivilegeCodesApiUrl = _sharedService.urlService.addQueryStringParm(userPrivilegeCodesApiUrl, "catId", 0);
		const customerNameUrl = _sharedService.urlService.simpleApiCall("getCustomerName");
		const userRoleApiCall = _sharedService.configService.get(userRoleApiUrl);
		const userPrivilegeApiCall = _sharedService.configService.get(userPrivilegeApiUrl);
		const userPrivilegeCodesApiCall = _sharedService.configService.get(userPrivilegeCodesApiUrl);
		const customerNameApiCall = _sharedService.configService.get(customerNameUrl);
		const customerRealmApiCall = _sharedService.configService.get(customerRealmsApiUrl);
		forkJoin(userRoleApiCall, userPrivilegeApiCall, userPrivilegeCodesApiCall, customerNameApiCall, customerRealmApiCall)
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(
				([res1, res2, res3, res4, res5]) => {
					$t.appState.authorization.userRoles = res1;
					$t.appState.authorization.userPrivileges = res2[0];
					$t.appState.authorization.userPrivilegeCodes = res3[0];
					$t.appState.userInfo["fullCustomerName"] = Object.values(res4)[0];
					_sharedService.uiService.syncAppStore($t.appState);
					$t.channelState.realms = res5;
					_sharedService.uiService.syncChannelStore($t.channelState);
					_sharedService.uiService.closePopMsg();
					$t.router.navigateByUrl("dashboard").then(() => {
						setTimeout(() => window.location.reload(), 100);
					});
				},
				(error) => {
					_sharedService.uiService.showApiErrorPopMsg(error.error);
				}
			);
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
