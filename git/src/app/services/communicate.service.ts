import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class CommunicateService {
	private communicateServiceMap: Map<string, Array<(data: any) => void>> = new Map<string, Array<(data: any) => void>>();

	constructor() {}

	/**
	 * @method send
	 * @property data
	 * @returns void
	 */
	broadcast(event: string, data: any): void {
		const subscribers = this.communicateServiceMap.get(event) || [];
		subscribers.forEach((subscriber) => subscriber(data));
	}

	/**
	 * @method on
	 * @description Subscribes to an event
	 * @var event Event Name
	 * @var callback the function that will return the data of that event
	 */
	on(event: string, callback: (data: any) => void) {
		let subscribers = this.communicateServiceMap.get(event);
		if (subscribers == undefined) {
			subscribers = new Array();
		}
		subscribers.push(callback);
		this.communicateServiceMap.set(event, subscribers);
	}

	/**
	 * @method on 
	 * @description Reset all the maps when no value is passed
	 * @Param _list: when list of string passed (attached brodcasted events), will remove only these from the service map
	 */
	 resetCommunications(_list?: any) {
	 	let list = [];
	 	if (_list) {
	 		Array.isArray(_list) ? list = _list : list.push(_list);
	 		this.communicateServiceMap = new Map([...this.communicateServiceMap].filter(([k, v]) => !list.includes(k)));
	 	} else { 
	 		this.communicateServiceMap.clear();
	 	}
	 }

	ngOnDestroy() {
		this.resetCommunications();
	}
}

// Usage Example
// To broadcast data
// this.sharedService.communicateService.broadcast("server:start", "Server Started");

// To receive data
// this.sharedService.communicateService.on("server:start", (data: any) => {
//   console.log(data);
// });
