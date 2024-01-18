import { Injectable } from "@angular/core";
import { WebsocketService } from "@app/core/websocket/websocket.service";

@Injectable()
export class AmazeSocketService extends WebsocketService {
	constructor() {
		super({ url: "amaze" });
	}
}
