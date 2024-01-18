import { AmazeStorageService } from "@app/services/storage.service";

export interface iStore {
	name: string;
	state: any;
	storeService?: AmazeStorageService;
}

export class GenericStore {
	public currentInstance: any;
	private instance: any = {};

	constructor(public store: iStore) {}

	public get getLatest() {
		this.currentInstance = this.store?.storeService?.getOnSessionStorage(this.store.name, true);
		return this.currentInstance;
	}

	public setInitial(): void {
		this.instance = this.store.state;
		this.store.storeService.storeOnSessionStorage(this.store.name, this.instance, true);
		this.currentInstance = this.store.storeService.getOnSessionStorage(this.store.name, true);
	}

	public setLatest(latestValue: any): void {
		const curr = this.store?.storeService?.getOnSessionStorage(this.store.name, true);
		const latest = Object.assign({}, curr, latestValue);
		this.store?.storeService?.storeOnSessionStorage(this.store.name, latest, true);
		this.currentInstance = this.store?.storeService?.getOnSessionStorage(this.store.name, true);
	}

	public resetStore() {
		this.store?.storeService?.storeOnSessionStorage(this.store.name, this.instance, true);
		this.currentInstance = this.instance;
	}

	public updatePartial(propName: string, value: any) {
		const currInst = this.getLatest;
		if (currInst && currInst.hasOwnProperty(propName)) {
			currInst[propName] = value;
			this.setLatest(currInst);
		}
	}
}
