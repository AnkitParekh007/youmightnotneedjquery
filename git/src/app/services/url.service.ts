// all dummy Urls
// till the actual APis get developed
import { Injectable, Inject } from "@angular/core";
import { WINDOW } from "@app/core/backend/window.service";
import { urls } from "@app/core/backend/urls";
import { AMAZE_SOCKET_URLS } from "@app/core/backend/api.paths";
import { BaseConfig } from "@app/core/backend/config";
import * as is from "is_js";

@Injectable({
	providedIn: "root"
})
export class UrlService {
	public get getAssetBasePath() {
		return this.baseConfig.digitalAssetsBasePath;
	}
	@Inject(WINDOW) public window: Window;
	constructor(private baseConfig: BaseConfig) {}

	public simpleApiCall(_urlName: any) {
		const requiredUrl: string = urls[_urlName] ? urls[_urlName] : _urlName;
		return this.prependBaseUrl(requiredUrl);
	}

	public apiCallWithParams(_urlName: any, _params: any) {
		const requiredUrl: string = urls[_urlName];
		return this.prependBaseUrlAndReplaceParams(requiredUrl, _params);
	}

	public simpleCkbApiCall(_urlName: any) {
		const requiredUrl: string = urls[_urlName];
		return this.baseConfig.ckbRestPath + requiredUrl;
	}

	public ckbApiCallWithParams(_urlName: any, _params: any) {
		let requiredUrl: any = urls[_urlName];
		if (Object.keys(_params).length) {
			for (const [key, value] of Object.entries(_params)) {
				requiredUrl = requiredUrl.replace(key, value);
			}
		}
		return this.baseConfig.ckbRestPath + requiredUrl;
	}

	public addQueryStringParm(url: any, name: any, value: any) {
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

	public addQueryStringParmMultiple(url: any, name: any, value: any) {
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
			add("&");
		}
		return url;
	}

	public addQueryStringParmInBulk(url: any, params: any) {
		const $t = this;
		let newUrl = url;
		if (is.not.undefined(params)) {
			if (is.array(params) && is.not.empty(params)) {
				params.forEach((param: any) => {
					newUrl = $t.addQueryStringParm(newUrl, param.key, param.value);
				});
			} else if (is.object(params) && is.not.empty(params)) {
				Object.keys(params).forEach((param: any) => {
					newUrl = $t.addQueryStringParm(newUrl, param, params[param]);
				});
			}
		}
		return newUrl;
	}

	public removeQueryStringParm(url: any, name: any) {
		let rtn = url.split("?")[0],
			param,
			params_arr = [],
			queryString = url.indexOf("?") !== -1 ? url.split("?")[1] : "";
		if (queryString !== "") {
			params_arr = queryString.split("&");
			for (let i = params_arr.length - 1; i >= 0; i -= 1) {
				param = params_arr[i].split("=")[0];
				if (param === name) {
					params_arr.splice(i, 1);
				}
			}
			rtn = rtn + "?" + params_arr.join("&");
		}
		return rtn;
	}

	public socketCall(socketName: string) {
		let requiredUrl = "";
		switch (socketName) {
			case "taxonomy":
				requiredUrl = AMAZE_SOCKET_URLS.TAXONOMY_EVENTS;
				break;
			default:
				break;
		}
		return this.prependBaseSocketUrl(requiredUrl);
	}

	public fixedEncodeURIComponent() {
		const _fn = encodeURIComponent;
		window["encodeURIComponent"] = function (str) {
			return _fn(str).replace(/[!'()*]/g, function (c) {
				return "%" + c.charCodeAt(0).toString(16);
			});
		};
	}

	private prependBaseUrl(_url: any) {
		return this.baseConfig.restPath + _url;
	}

	private prependBaseUrlAndReplaceParams(_url: any, _urlParams: any) {
		if (Object.keys(_urlParams).length) {
			for (const [key, value] of Object.entries(_urlParams)) {
				_url = _url.replace(key, value);
			}
		}
		return this.baseConfig.restPath + _url;
	}

	private prependBaseSocketUrl(_url: any) {
		return this.baseConfig.restSocketPath + _url;
	}
}
