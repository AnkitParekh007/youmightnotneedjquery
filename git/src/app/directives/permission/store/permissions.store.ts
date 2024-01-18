import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class PermissionsStore {
	public permissionsSource = new BehaviorSubject<{}>({});
	public permissions$: Observable<{}> = this.permissionsSource.asObservable();

	constructor() {}
}
