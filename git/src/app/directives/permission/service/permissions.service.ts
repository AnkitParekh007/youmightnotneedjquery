import { Inject, Injectable, InjectionToken } from "@angular/core";

import { BehaviorSubject, from, Observable, ObservableInput, of } from "rxjs";
import { catchError, first, map, mergeAll, switchMap } from "rxjs/operators";

import { Permission } from "../model/permission.model";
import { ValidationFn } from "../model/permissions-router-data.model";
import { PermissionsStore } from "../store/permissions.store";

import { isBoolean, isFunction, transformStringToArray } from "../utils/utils";

export interface PermissionsObject {
	[name: string]: Permission;
}

export const USE_PERMISSIONS_STORE = new InjectionToken("USE_PERMISSIONS_STORE");

@Injectable()
export class PermissionsService {
	public permissions$: Observable<PermissionsObject>;
	private permissionsSource: BehaviorSubject<PermissionsObject>;

	constructor(@Inject(USE_PERMISSIONS_STORE) private isolate: boolean = false, private permissionsStore: PermissionsStore) {
		this.permissionsSource = isolate ? new BehaviorSubject<PermissionsObject>({}) : permissionsStore.permissionsSource;
		this.permissions$ = this.permissionsSource.asObservable();
	}

	/**
	 * Remove all permissions from permissions source
	 */
	public flushPermissions(): void {
		this.permissionsSource.next({});
	}

	public hasPermission(permission: string | string[]): Promise<boolean> {
		if (!permission || (Array.isArray(permission) && permission.length === 0)) {
			return Promise.resolve(true);
		}

		permission = transformStringToArray(permission);
		return this.hasArrayPermission(permission);
	}

	public loadPermissions(permissions: string[], validationFunction?: ValidationFn): void {
		const newPermissions = permissions.reduce((source, name) => this.reducePermission(source, name, validationFunction), {});
		this.permissionsSource.next(newPermissions);
	}

	public addPermission(permission: string | string[], validationFunction?: ValidationFn): void {
		if (Array.isArray(permission)) {
			const permissions = permission.reduce((source, name) => this.reducePermission(source, name, validationFunction), this.permissionsSource.value);

			this.permissionsSource.next(permissions);
		} else {
			const permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);

			this.permissionsSource.next(permissions);
		}
	}

	public removePermission(permissionName: string): void {
		const permissions = {
			...this.permissionsSource.value
		};
		delete permissions[permissionName];
		this.permissionsSource.next(permissions);
	}

	public getPermission(name: string): Permission {
		return this.permissionsSource.value[name];
	}

	public getPermissions(): PermissionsObject {
		return this.permissionsSource.value;
	}

	private reducePermission(source: PermissionsObject, name: string, validationFunction?: ValidationFn): PermissionsObject {
		if (!!validationFunction && isFunction(validationFunction)) {
			return {
				...source,
				[name]: { name, validationFunction }
			};
		}
		return {
			...source,
			[name]: { name }
		};
	}

	private hasArrayPermission(permissions: string[]): Promise<boolean> {
		const promises: Observable<boolean>[] = permissions.map((key) => {
			if (this.hasPermissionValidationFunction(key)) {
				const validationFunction = this.permissionsSource.value[key].validationFunction;
				const immutableValue = { ...this.permissionsSource.value };

				return of(null).pipe(
					map(() => validationFunction(key, immutableValue)),
					switchMap((promise: Promise<boolean> | boolean): ObservableInput<boolean> => (isBoolean(promise) ? of(promise as boolean) : (promise as Promise<boolean>))),
					catchError(() => of(false))
				);
			}

			// check for name of the permission if there is no validation function
			return of(!!this.permissionsSource.value[key]);
		});

		return from(promises)
			.pipe(
				mergeAll(),
				first((data) => data !== false, false),
				map((data) => data !== false)
			)
			.toPromise()
			.then((data: any) => data);
	}

	private hasPermissionValidationFunction(key: string): boolean {
		return !!this.permissionsSource.value[key] && !!this.permissionsSource.value[key].validationFunction && isFunction(this.permissionsSource.value[key].validationFunction);
	}
}
