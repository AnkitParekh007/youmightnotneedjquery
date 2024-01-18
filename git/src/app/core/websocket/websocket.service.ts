// core
import { Observable } from "rxjs";
import { share } from "rxjs/operators";

// services
import { AMAZE_SOCKET_URLS } from "@app/core/backend/api.paths";
import { BaseConfig } from "@app/core/backend/config";

export enum Action {
	JOINED,
	LEFT,
	RENAME
}
export enum Event {
	CONNECTING = 0,
	OPEN = 1,
	CLOSING = 2,
	CLOSED = 3
}
export interface ISocketIoConfig {
	url: string;
}

export abstract class WebsocketService {
	public startingMessage: any;
	public socketUrl: string;
	public socket: any;
	public wsObservable: Observable<any>;
	public emptyConfig: ISocketIoConfig = {
		url: ""
	};

	constructor(private config: ISocketIoConfig) {
		this.init();
	}

	public send(message: any) {
		if (typeof this.socket !== "undefined") {
			switch (this.socket.readyState) {
				case Event.OPEN:
					this.socket.send(JSON.stringify(message));
					break;
				case Event.CONNECTING:
				case Event.CLOSING:
				case Event.CLOSED:
					break;
				default:
					break;
			}
		}
	}

	public onMessage(): Observable<any> {
		return new Observable<any>((observer) => {
			this.socket.onmessage = (data: any) => observer.next(data);
		});
	}

	public onEvent(event: any): Observable<any> {
		return new Observable<any>((observer) => {
			this.socket.on(event, () => observer.next());
		});
	}

	public close() {
		if (typeof this.socket !== "undefined") {
			this.socket.close();
		}
	}

	private init() {
		if (this.config === undefined) {
			this.config = this.emptyConfig;
		}
		this.socketUrl = this.socketCall(this.config.url);

		if (this.socket !== undefined) {
			if (this.socket.readyState === Event.OPEN) {
				// this.close();
			}
		} else {
			this.initializeWebSocket(this.socketUrl);
		}
	}

	private initializeWebSocket(url) {
		this.wsObservable = Observable.create((observer) => {
			this.socket = new WebSocket(url);
			this.socket.onopen = (e) => this.socket.send(JSON.stringify(this.startingMessage));
			this.socket.onclose = (e) => {
				if (e.wasClean) {
					observer.complete();
				} else {
					observer.complete();
				}
			};
			this.socket.onerror = (e) => {
				observer.error(e);
			};
			this.socket.onmessage = (e) => {
				observer.next(JSON.parse(e.data));
			};
			return () => {
				this.socket.close();
			};
		}).pipe(share());
	}

	private prependBaseSocketUrl(url:string) {
		return new BaseConfig().restSocketPath + url + "?authCode=" + this.getSocketAuthToken();
	}

	private socketCall(socketName : string) {
		return this.prependBaseSocketUrl(AMAZE_SOCKET_URLS[socketName]);
	}

	private getSocketAuthToken() {
		let token = "";
		const _appStore = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		if (_appStore != null && typeof _appStore.serverParams !== "undefined" && _appStore.serverParams.token != "") {
			token = "customerCode=" + _appStore.serverParams.clientCode + "&accessToken=" + _appStore.serverParams.token + "&authProvider=" + _appStore.serverParams.provider;
			token = btoa(token);
		}
		return token;
	}
}
