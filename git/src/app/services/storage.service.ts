import { Injectable } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { delay, distinctUntilChanged } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AmazeStorageService {
	isAvailable: boolean;

	constructor(private localSt: LocalStorageService, private sessionSt: SessionStorageService) {
		this.isAvailable = this.storageAvailable();
	}

	storageAvailable(): boolean {
		try {
			const storage = window["localStorage"],
				x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return (
				e instanceof DOMException &&
				// everything except Firefox
				(e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === "QuotaExceededError" ||
					// Firefox
					e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
				// acknowledge QuotaExceededError only if there's something already stored
				window.localStorage &&
				window.localStorage.length !== 0
			);
		}
	}

	public storeOnLocalStorage(propName: string, propValue?: any, isComplex?: boolean): void {
		if (this.isAvailable) {
			if (typeof isComplex !== "undefined" && isComplex) {
				this.localSt.store(propName, JSON.stringify(propValue));
			} else {
				this.localSt.store(propName, propValue);
			}
		}
	}

	public getOnLocalStorage(propName: string, isComplex?: boolean): any {
		if (this.isAvailable) {
			return typeof isComplex !== "undefined" && isComplex ? JSON.parse(this.localSt.retrieve(propName)) : this.localSt.retrieve(propName);
		}
	}

	public clearLocalStorage(propName: string): void {
		if (this.isAvailable) {
			this.localSt.clear(propName);
		}
	}

	public clearCompleteLocalStorage(): void {
		if (this.isAvailable) {
			this.localSt.clear();
		}
	}

	public storeOnSessionStorage(propName: string, propValue?: any, isComplex?: boolean): void {
		if (this.isAvailable) {
			if (typeof isComplex !== "undefined" && isComplex) {
				this.sessionSt.store(propName, JSON.stringify(propValue));
			} else {
				this.sessionSt.store(propName, propValue);
			}
		}
	}

	public getOnSessionStorage(propName: string, isComplex?: boolean): any {
		if (this.isAvailable) {
			return typeof isComplex !== "undefined" && isComplex ? JSON.parse(this.sessionSt.retrieve(propName)) : this.sessionSt.retrieve(propName);
		}
	}

	public clearSessionStorage(propName: string): void {
		if (this.isAvailable) {
			this.sessionSt.clear(propName);
		}
	}

	public clearCompleteSessionStorage(): void {
		if (this.isAvailable) {
			this.sessionSt.clear();
		}
	}

	public startObservingOnSessionStorage(_propName: string, _callback?: any): void {
		this.sessionSt
			.observe(_propName)
			.pipe(delay(1), distinctUntilChanged())
			.subscribe((result) => {
				if (typeof result !== "undefined" && this.isValidJson(result)) {
					if (typeof _callback !== "undefined") {
						_callback(result);
					}
				}
			});
	}

	isValidJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
}
