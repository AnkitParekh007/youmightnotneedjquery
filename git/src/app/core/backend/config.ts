import { Injectable, Inject } from "@angular/core";
import { WINDOW } from "@app/core/backend/window.service";
import { environment } from "@env/environment";

@Injectable({
	providedIn: "root"
})
export class BaseConfig {
	@Inject(WINDOW) public window: Window;

	public windowLocation          : any    = window.location;
	public pathname                : string = window.location.pathname;
	public hostname                : string = window.location.hostname;
	public domain                  : string = environment.DOMAIN_NAME;
	public restHost                : string = environment.API_REST_BASE_BATH;
	public socketRestHost          : string = environment.SOCKET_BASE_BATH;
	public isLocal                 : boolean = this.windowLocation.hostname.indexOf("localhost") === 0;
	public env                     : string = environment.ENV_SHORT_CODE.toUpperCase();
	public envName                 : string = environment.ENV_NAME_IN_PATHS;
	public restPath                : string = "";
	public restSocketPath          : string = "";
	public ckbRestPath             : string = "";
	public digitalAssetsBasePath   : string = environment.ASSET_BASE_PATH;
	public globals                 : Object = {};

	constructor() {
		this.init();
	}

	init() {
		this.restPath = this.restHost + "/amazeRest" + this.envName + "/rest/v1";
		this.restSocketPath = this.socketRestHost;
		this.ckbRestPath = this.restHost + "/aiRest/api/v1";
		this.globals = {
			baseRestPath: this.restPath,
			env: this.env,
			envExtension: this.envName,
			isLocal: this.hostname == "localhost" ? "&local=true" : "",
			isProduction: this.hostname.indexOf("localhost") === 0 || this.windowLocation.pathname.indexOf("-") !== -1
		};
	}
}
