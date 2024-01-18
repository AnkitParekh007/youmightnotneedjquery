import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { untilDestroyed } from "@app/core";
import { SessionStorageService } from "ngx-webstorage";
import { throwError } from "rxjs";
import { catchError, distinctUntilChanged, finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import * as lodash from "lodash";

@Injectable({
	providedIn: "root"
})
export class ConfigService {
	accessTokenHeader = "x-access-token";
	defaultAccessToken = "";
	defaultOauthProvider = "Google";
	restURLHeaders = {
		accessToken: "",
		oauthProvider: "Google"
	};
	globals: any = {
		env: ""
	};
	public apiHeaders: HttpHeaders;
	private state: any;
	private langState: any;

	constructor(private http: HttpClient, public storage: SessionStorageService, private router: Router, private dialogRef: MatDialog) {
		this.fetchCurrentState();
		this.fetchCurrentLangState();
	}

	fetchCurrentState() {
		this.state = JSON.parse(this.storage.retrieve("appstate"));
	}

	fetchCurrentLangState() {
		this.langState = JSON.parse(this.storage.retrieve("languagestate"));
	}

	noCacheUrl(url: string): string {
		const timestamp = "_=" + new Date().getTime();
		const prefix = url.indexOf("?") !== -1 ? "&" : "?";
		return url + prefix + timestamp;
	}

	configureServerParams(_isFile?: any) {
		this.apiHeaders = new HttpHeaders();
		const commonheaders = {
			"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: "Sat, 01 Jan 2000 00:00:00 GMT",
			"If-Modified-Since": "0"
		};
		Object.keys(commonheaders).forEach((c) => {
			this.apiHeaders = this.apiHeaders.set(c, commonheaders[c]);
		});
		this.fetchCurrentState();
		const commonServerParams = JSON.parse(JSON.stringify(this.state.serverParams));
		this.apiHeaders = this.apiHeaders.set("X-Customer-Code", commonServerParams.clientCode);
		this.apiHeaders = this.apiHeaders.set("X-Timezone", commonServerParams.timezone);
		this.apiHeaders = this.apiHeaders.set("X-Oauth-Provider", commonServerParams.provider);
		this.apiHeaders = this.apiHeaders.set("Content-Type", "application/json");
		if (commonServerParams.token) {
			this.apiHeaders = this.apiHeaders.set("X-Access-Token", commonServerParams.token);
		}
	}

	configureDynamicParams(headers: any) {
		if (headers && Object.keys(headers).length !== 0) {
			for (const property in headers) {
				if (headers.hasOwnProperty(property)) {
					this.apiHeaders = this.apiHeaders.set(property, headers[property]);
				}
			}
		}
	}

	configureServerHeaders(headers?: any, _isFile?: any) {
		this.configureServerParams(_isFile);
		this.configureDynamicParams(headers);
		const httpOptions = {
			headers: this.apiHeaders
		};
		return httpOptions;
	}

	prepareHeaders(_options?: any, _isFile?: any) {
		let headerOptions;
		if (_options) {
			if (_options.hasOwnProperty("headers")) {
				headerOptions = {
					...lodash.omit(_options, ["headers"]),
					...this.configureServerHeaders(_options.headers)
				};
			} else {
				headerOptions = {
					..._options,
					...this.configureServerHeaders()
				};
			}
		} else {
			headerOptions = this.configureServerHeaders(undefined, _isFile);
		}
		return headerOptions;
	}

	/**
	 * Generic Method for Get API Calls
	 */
	get(url: any, options?: any, noLanguage?: boolean, noContext?: boolean) {
		const headerOptions = this.prepareHeaders(options);
		if (!noLanguage) {
			this.fetchCurrentLangState();
			let prefix = url.indexOf("?") !== -1 ? "&" : "?";
			if (this.langState && this.langState.currentSelected.localeCode) {
				url += prefix + "localeCode=" + encodeURIComponent(this.langState.currentSelected.localeCode);
				this.langState && this.langState.skuContext.find(x => x.isSelected) && this.langState.skuContext.find(x => x.isSelected).id && !noContext ? url += "&contextId=" + this.langState.skuContext.find(x => x.isSelected).id : '';
			}
		}
		url = this.noCacheUrl(url);
		return this.http.get(url, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for Get API Calls
	 */
	getSynchronously(url: any, options?: any): Promise<any> {
		return this.get(url, options).toPromise();
	}

	/**
	 * Generic Method for Get API Calls with payload
	 */
	getWithPayload(url: any, getBody?: any, options?: any) {
		const headerOptions = this.prepareHeaders(options);
		headerOptions.body = getBody;
		url = this.noCacheUrl(url);
		return this.http.request("GET", url, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for POST API Calls
	 */
	post(url, postBody?: any, options?, byPassErrorHandling?: boolean) {
		const headerOptions = this.prepareHeaders(options);
		this.fetchCurrentLangState();
		let prefix = url.indexOf("?") !== -1 ? "&" : "?";
		if (this.langState && this.langState.currentSelected.localeCode) {
			url += prefix + "localeCode=" + encodeURIComponent(this.langState.currentSelected.localeCode);
			this.langState && this.langState.skuContext.find(x => x.isSelected) && this.langState.skuContext.find(x => x.isSelected).id ? url += "&contextId=" + this.langState.skuContext.find(x => x.isSelected).id : '';
		}
		url = this.noCacheUrl(url);
		return this.http.post(url, postBody, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(!byPassErrorHandling ? this.handleError(error) : error)),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for POST API Calls
	 */
	postFile(url, postBody?: any) {
		this.apiHeaders = new HttpHeaders();

		const commonheaders = {
			"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: "Sat, 01 Jan 2000 00:00:00 GMT",
			"If-Modified-Since": "0"
		};
		Object.keys(commonheaders).forEach((c) => {
			this.apiHeaders = this.apiHeaders.set(c, commonheaders[c]);
		});
		this.fetchCurrentState();
		const commonServerParams = JSON.parse(JSON.stringify(this.state.serverParams));
		this.apiHeaders = this.apiHeaders.set("X-Customer-Code", commonServerParams.clientCode);
		this.apiHeaders = this.apiHeaders.set("X-Timezone", commonServerParams.timezone);
		this.apiHeaders = this.apiHeaders.set("X-Oauth-Provider", commonServerParams.provider);
		if (commonServerParams.token) {
			this.apiHeaders = this.apiHeaders.set("X-Access-Token", commonServerParams.token);
		}
		const httpOptions = {
			headers: this.apiHeaders
		};
		return this.http.post(url, postBody, httpOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for PUT API Calls
	 */
	put(url, putData?: any, options?, noLanguage?) {
		const headerOptions = this.prepareHeaders(options);
		if (!noLanguage) {
			this.fetchCurrentLangState();
			let prefix = url.indexOf("?") !== -1 ? "&" : "?";
			if (this.langState && this.langState.currentSelected.localeCode) {
				url += prefix + "localeCode=" + encodeURIComponent(this.langState.currentSelected.localeCode);
				this.langState && this.langState.skuContext.find(x => x.isSelected) && this.langState.skuContext.find(x => x.isSelected).id ? url += "&contextId=" + this.langState.skuContext.find(x => x.isSelected).id : '';
			}
		}
		url = this.noCacheUrl(url);
		return this.http.put(url, putData, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for DELETE API Calls
	 */
	delete(url, options?) {
		const headerOptions = this.prepareHeaders(options);
		url = this.noCacheUrl(url);
		return this.http.delete(url, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for DELETE API Calls
	 */
	deleteWithBody(url, deletebody?: any, options?) {
		const headerOptions = this.prepareHeaders(options);
		headerOptions.body = deletebody;
		url = this.noCacheUrl(url);
		return this.http.delete(url, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}
	/**
	 * Generic Method for PATCH API Calls
	 */
	patch(url, patchBody?: any, options?, noLanguage?) {
		const headerOptions = this.prepareHeaders(options);
		if (!noLanguage) {
			this.fetchCurrentLangState();
			let prefix = url.indexOf("?") !== -1 ? "&" : "?";
			if (this.langState && this.langState.currentSelected.localeCode) {
				url += prefix + "localeCode=" + encodeURIComponent(this.langState.currentSelected.localeCode);
				this.langState && this.langState.skuContext.find(x => x.isSelected) && this.langState.skuContext.find(x => x.isSelected).id ? url += "&contextId=" + this.langState.skuContext.find(x => x.isSelected).id : '';
			}
		}
		url = this.noCacheUrl(url);
		return this.http.patch(url, patchBody, headerOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	/**
	 * Generic Method for Uploading Data To server like files
	 */
	upload(url: string, files: any) {
		const formData: FormData = new FormData();
		if (files) {
			files.forEach((file) => {
				formData.append("file", file, file.name);
			});
		}
		return this.post(url, formData);
	}

	formUrlParam(url, data) {
		let queryString = "";
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if (!queryString) {
					queryString = `?${key}=${data[key]}`;
				} else {
					queryString += `&${key}=${data[key]}`;
				}
			}
		}
		return url + queryString;
	}

	longRequest() {
		const request = new HttpRequest("POST", "/api/test-request", {}, { reportProgress: true });
		this.http.request(request).subscribe((event) => {
			if (event.type === HttpEventType.DownloadProgress) {
				console.log("Download progress event", event);
			}

			if (event.type === HttpEventType.UploadProgress) {
				console.log("Upload progress event", event);
			}

			if (event.type === HttpEventType.Response) {
				console.log("response received...", event.body);
			}
		});
	}

	handleError(error: any | HttpErrorResponse) {
		const $t = this;
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error("An error occurred:", error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			// console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
			if (error.statusText == "OK") {
				let redirectToLogin = false;
				let showSessionTimeoutMsg = false;
				let errPopupMessage = "";
				const errorMessage = (_isUnauthorised: boolean) => {
					_isUnauthorised ? (error.error = "User Session Timeout") : "";
					errPopupMessage = "Something Went Wrong. \n Due to the following technical error: \n" + error.error;
					Swal.fire({
						title: "Something Went Wrong. \n Due to the following technical error: \n",
						text: error.error, // description of the modal
						icon: "error", // warning, error, success, info, and question,
						backdrop: true,
						allowOutsideClick: true,
						allowEscapeKey: true,
						allowEnterKey: true,
						timer: 5000
					});
				};
				switch (error.status) {
					case 202: // Review Request Status
						errPopupMessage = error.error.text;
						break;
					case 412: // Attribute Deletion Status
						errPopupMessage = error.error;
						break;
					case 404: // Forbidden
						errPopupMessage = error.error.message ? error.error.message : error.error;
						break;
					case 301: // Moved Permanently
					case 400: // Bad Request
					case 401: // Unauthorized
					case 403: // Forbidden
					case 405: // Method Not Allowed
						if (!lodash.isUndefined(error) && !lodash.isUndefined(error.error)) {
							if (lodash.isObject(error.error) && lodash.keys(error.error).length) {
								errPopupMessage = error.error.errorMessage;
								switch (error.error.errorType) {
									case "SessionExpired":
									case "InvalidCredentials":
										redirectToLogin = true;
										error.status == 401 && errPopupMessage.indexOf("does not exist") == -1 ? (showSessionTimeoutMsg = true) : "";
										break;
								}
							} else {
								errPopupMessage = error.error;
							}
						}
						break;
					case 500: // Internal Server Error
					case 501: // Not Implemented
					case 502: // Bad Gateway
					case 503: // Service Unavailable
					case 504: // Gateway Timeout
						errorMessage(false);
						break;
				}
				if (redirectToLogin) {
					this.dialogRef.closeAll();
					const sweetAlertCancel = document.querySelector(".swal2-cancel") as HTMLElement;
					if (sweetAlertCancel) {
						sweetAlertCancel.click();
					}
					setTimeout(() => {
						$t.router.navigate(["/login"], {
							queryParams: {},
							replaceUrl: true
						});
						setTimeout(() => {
							showSessionTimeoutMsg ? errorMessage(true) : "";
						}, 200);
					}, 700);
				}
				error.error = errPopupMessage;
			}
			return error;
		}
		// returning an observable with a user-facing error message
		return throwError("Something bad happened; please try again later.");
	}

	getRestAuthHeaders() {
		const currentToken = this.restURLHeaders["accessToken"];
		if (currentToken === "") {
			const localStoreToken = localStorage.getItem("accessToken");
			if (localStoreToken !== "") {
				this.restURLHeaders["accessToken"] = localStoreToken;
			} else {
				console.log("Access token not persisted in local store");
			}
		}
		return this.restURLHeaders;
	}

	getAuthHeadersWithAuthorizatio() {
		const authHeader = this.getRestAuthHeaders();
		// authHeader.push( {'X-Authorization-Mode': "SKIP"} );
		return authHeader;
	}

	saveAuthorizationToken(responseHeader: any) {
		// Response header is returned as a string with new-line character as delimiter
		const headerAry = responseHeader.split(/\r\n|\r|\n/g);

		let responseElem = "";
		const accessTokenElem = "x-access-token: ";

		for (let i = 0; i < headerAry.length; i++) {
			responseElem = headerAry[i];
			const responseElement = responseElem.toLowerCase();
			if (responseElement.startsWith(accessTokenElem)) {
				const accessToken = responseElem.substr(accessTokenElem.length);
				this.compareResponseTokenToCurrentToken(accessToken);
				break;
			}
		}
	}

	setNewAccessToken = function (_accessToken) {
		this.restURLHeaders["accessToken"] = _accessToken;
	};

	clearAccessToken() {
		localStorage.setItem("accessToken", this.defaultAccessToken);
		this.setNewAccessToken(this.defaultAccessToken);
	}

	checkServiceRespToken(xhr: any) {
		if (this.globals.env !== "DEV-OFFLINE") {
			const responseToken = xhr.getResponseHeader(this.accessTokenHeader);
			if (responseToken == null) {
				xhr.getResponseHeader(this.accessTokenHeader.toLowerCase());
			}
			this.compareResponseTokenToCurrentToken(responseToken);
		}
	}

	compareResponseTokenToCurrentToken(responseToken) {
		const restHeader = this.getRestAuthHeaders();
		const currentToken = restHeader["accessToken"];
		const respToken = encodeURIComponent(responseToken);

		if (respToken && respToken !== currentToken) {
			const localStoreToken = localStorage.getItem("accessToken");
			if (respToken !== localStoreToken) {
				localStorage.setItem("accessToken", respToken);
			}
			this.setNewAccessToken(respToken);
			console.log("Save new accessToken: ******" + respToken.slice(-6)); // debugging
		}
	}

	getOauthProvider() {
		return this.restURLHeaders["oauthProvider"];
	}

	setOauthProvider(_oauthProvider) {
		this.restURLHeaders["oauthProvider"] = _oauthProvider;
	}

	clearOauthProvider() {
		// localStore.storeOauthProvider('');
		this.setOauthProvider("");
	}

	addQueryStringParm(url, name, value) {
		const re = new RegExp("([?&]" + name + "=)[^&]+", "");
		const add = function (sep) {
			url += sep + name + "=" + encodeURIComponent(value);
		};
		const change = function () {
			url = url.replace(re, "$1" + encodeURIComponent(value));
		};
		if (url.indexOf("?") === -1) {
			add("?");
		} else {
			if (re.test(url)) {
				change();
			} else {
				add("&");
			}
		}
		return url;
	}

	genericApiCaller(
		_requestType: any,
		_requestUrl: any,
		_requestBody?: any,
		_requestQueryParams?: any,
		_beforeHitCallback?: any,
		_successCallBack?: any,
		_failureCallBack?: any,
		_context?: any
	) {
		const $t = this;
		let apiCall;

		if (_requestQueryParams && _requestQueryParams.length) {
			_requestQueryParams.forEach((r: any) => {
				_requestUrl = $t.addQueryStringParm(_requestUrl, r.name, r.value);
			});
		}

		switch (_requestType) {
			case "GET":
				apiCall = $t.get(_requestUrl);
				break;
			case "GET_WITH_PAYLOAD":
				apiCall = $t.getWithPayload(_requestUrl, _requestBody);
				break;
			case "PUT":
				apiCall = $t.put(_requestUrl, _requestBody);
				break;
			case "POST":
				apiCall = $t.post(_requestUrl, _requestBody);
				break;
			case "PATCH":
				apiCall = $t.patch(_requestUrl, _requestBody);
				break;
			case "DELETE":
				apiCall = $t.delete(_requestUrl);
				break;
			case "DELETE_WITH_BODY":
				apiCall = $t.deleteWithBody(_requestUrl, _requestBody);
				break;
			default:
				apiCall = $t.get(_requestUrl);
				break;
		}

		if (typeof _beforeHitCallback !== "undefined" && typeof _beforeHitCallback === "function") {
			_beforeHitCallback();
		}

		apiCall.pipe(distinctUntilChanged(), untilDestroyed(typeof _context !== "undefined" ? _context : $t)).subscribe(
			(response: any) => {
				if (typeof _successCallBack !== "undefined" && typeof _successCallBack === "function") {
					_successCallBack(response);
				}
			},
			(error) => {
				if (typeof _failureCallBack !== "undefined" && typeof _failureCallBack === "function") {
					_failureCallBack(error);
				}
			}
		);
	}

	ngOnDestroy() { }
}
