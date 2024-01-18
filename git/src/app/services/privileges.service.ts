import { Injectable, OnDestroy } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { UiService } from "@app/services/ui.service";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class PrivilegesService implements OnDestroy {
	public permissionsServiceInstance: any;
	public rolesServiceInstance: any;

	constructor(public uiService: UiService, public sessionStorageService: SessionStorageService) {}

	public initiatePermissionsModule(_permissionsServiceInstance: any, _rolesServiceInstance: any) {
		this.permissionsServiceInstance = _permissionsServiceInstance;
		this.rolesServiceInstance = _rolesServiceInstance;
	}

	setPermissions() {
		const $t = this;
		$t.sessionStorageService
			.observe("appstate")
			.pipe(
				debounceTime(1000),
				map((resp) => JSON.parse(resp).authorization.userPrivilegeCodes),
				distinctUntilChanged()
			)
			.subscribe((_permissions) => {
				if (_permissions.length && !$t.uiService.deepEquals(_permissions, Object.keys($t.permissionsServiceInstance.getPermissions()))) {
					$t.permissionsServiceInstance.flushPermissions();
					$t.permissionsServiceInstance.addPermission(_permissions);
				}
			});

		$t.sessionStorageService
			.observe("appstate")
			.pipe(
				debounceTime(1000),
				map((resp) => JSON.parse(resp).catalogsList),
				distinctUntilChanged()
			)
			.subscribe((_catalogPermissions) => {
				if (_catalogPermissions.length != 0) {
					_catalogPermissions.forEach((c: any, cIndex: any) => {
						$t.rolesServiceInstance.addRole("CATALOG-PERMISSION-" + c.catalogKey, c.privileges);
					});
				}
			});
	}

	setUserPermissions(_permissions: any) {
		const $t = this;
		if (_permissions.length) {
			$t.permissionsServiceInstance.addPermission(_permissions);
			$t.refreshPermissions(_permissions);
		}
	}

	setCatalogPermissions(_catPermissions: any) {
		const $t = this;
		if (_catPermissions.length) {
			$t.permissionsServiceInstance.addPermission(_catPermissions);
			$t.refreshPermissions(_catPermissions);
		}
	}

	setIndividualCatalogPermissions(_catId: any, _catPermissions: any) {
		const $t = this;
		if (_catPermissions.length) {
			$t.refreshPermissions(_catPermissions);
		}
	}

	checkPermission(_permission: string) {
		const privCodes = this.uiService.getAppStore.authorization.userPrivilegeCodes;
		return typeof privCodes !== "undefined" && privCodes.length ? privCodes.includes(_permission) : false;
	}

	refreshPermissions(_newPermissions) {
		let newValues = _newPermissions;
		const existingPermissions = Object.keys(this.permissionsServiceInstance.getPermissions());
		if (existingPermissions.length) {
			newValues = newValues.concat(existingPermissions);
		}
		newValues = newValues.filter((v, i, a) => a.indexOf(v) === i);
		this.permissionsServiceInstance.loadPermissions(newValues);
	}

	checkCatalogLevelPermission(_permission: string, _catalogId: any) {
		const $t = this;
		const catalog = $t.uiService.getAppStore.catalogsList.find((cat) => cat.catalogKey == _catalogId);
		return catalog.privileges.includes(_permission);
	}

	isAccessible(permissions: any, isProductListing?: boolean) {
		const $t = this;
		if ($t.uiService.getCatStore != null && $t.uiService.getAppStore != null) {
			var permission = []
			if (typeof isProductListing !== "undefined" && isProductListing) {
				permission = $t.uiService.getProductsDashboardStore != null ? $t.uiService.getProductsDashboardStore.catalogState.selectedCatalog.privileges : [];
			} else {
				permission = typeof $t.uiService.getAppStore.authorization.userPrivilegeCodes !== "undefined"
					? [...$t.uiService.getCatStore.catalogPage.currentCatalogPrivilegeCodes, ...$t.uiService.getAppStore.authorization.userPrivilegeCodes]
					: $t.uiService.getCatStore.catalogPage.currentCatalogPrivilegeCodes;
			}
			if (permission) {
				const allowed = [];
				permissions.forEach((p) => allowed.push(permission.includes(p)));
				return !allowed.includes(false);
			}
		}
		return false;
	}

	isCatalogAccessibleForUser(catalogKey: any, permissions: any) {
		const $t = this;
		if (catalogKey && $t.uiService.getAppStore != null) {
			const contextCatalogPrivilegeCodes = $t.uiService.getAppStore.catalogsList.find((catalog: any) => catalog.catalogKey === catalogKey)["privileges"];
			const permission =
				typeof $t.uiService.getAppStore.authorization.userPrivilegeCodes !== "undefined"
					? [...contextCatalogPrivilegeCodes, ...$t.uiService.getAppStore.authorization.userPrivilegeCodes]
					: contextCatalogPrivilegeCodes;
			if (permission) {
				const allowed = [];
				permissions.forEach((p) => allowed.push(permission.includes(p)));
				return !allowed.includes(false);
			}
		}
		return false;
	}

	isChannelAccessible(permissions: any, channelId?: number) {
		const $t = this;
		let contextPrivilegeCodes: any = [];
		if ($t.uiService.getChannelStore !== null) {
			if (typeof channelId !== "undefined") {
				contextPrivilegeCodes = $t.uiService.getChannelStore.channelsPage.channels.find(f => f.amazeChannelId == channelId).privileges;
			} else {
				contextPrivilegeCodes = typeof $t.uiService.getChannelStore.channelPage.currentChannel !== "undefined" ? $t.uiService.getChannelStore.channelPage.currentChannel.privileges : [];
			}
			const permission = [
				...(typeof contextPrivilegeCodes !== "undefined" ? contextPrivilegeCodes : []),
				...(typeof $t.uiService.getAppStore.authorization.userPrivilegeCodes !== "undefined" ? $t.uiService.getAppStore.authorization.userPrivilegeCodes : [])
			];
			if (permission.length) {
				const allowed = [];
				permissions.forEach((p) => allowed.push(permission.includes(p)));
				return !allowed.includes(false);
			}
		}
		return false;
	}

	ngOnDestroy() {}
}
