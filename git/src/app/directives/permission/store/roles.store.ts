import { BehaviorSubject, Observable } from "rxjs";

export class RolesStore {
	public rolesSource = new BehaviorSubject<{}>({});

	public roles$: Observable<{}> = this.rolesSource.asObservable();
}
