import { inject, TestBed } from "@angular/core/testing";
import { PermissionsModule } from "../index";
import { PermissionsConfigurationService } from "./configuration.service";
import { PermissionsConfigurationStore } from "../store/configuration.store";

describe("Configuration Service", () => {
	let localService: PermissionsConfigurationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PermissionsModule.forRoot()]
		});
	});

	beforeEach(inject([PermissionsConfigurationService], (service: PermissionsConfigurationService) => {
		localService = service;
	}));

	it("should create an instance", () => {
		expect(localService).toBeTruthy();
	});

	it("should add configuration function", () => {
		expect(localService.getAllStrategies().FUNCTION).toBeFalsy();
		localService.addPermissionStrategy("FUNCTION", () => {});
		expect(localService.getAllStrategies().FUNCTION).toBeTruthy();
	});

	it("should retrieve strategy function", () => {
		expect(localService.getStrategy("FUNCTION")).toBeFalsy();
		localService.addPermissionStrategy("FUNCTION", () => {});
		expect(localService.getStrategy("FUNCTION")).toBeTruthy();
	});

	it("should throw an error when strategy is not defined but user tries to set it as default on authorised method", () => {
		expect(() => localService.setDefaultOnAuthorizedStrategy("FUNCTION")).toThrow();
	});

	it("should throw an error when strategy is not defined but user tries to set it as default on unauthorised method", () => {
		expect(() => localService.setDefaultOnUnauthorizedStrategy("FUNCTION")).toThrow();
	});

	it("should set default unauthorised method with string", () => {
		localService.addPermissionStrategy("FUNCTION", () => {});
		localService.setDefaultOnUnauthorizedStrategy("FUNCTION");
		expect(localService.onUnAuthorisedDefaultStrategy).toBeTruthy();
		expect(localService.onUnAuthorisedDefaultStrategy).toEqual("FUNCTION");
	});

	it("should set default authorised method with string", () => {
		localService.addPermissionStrategy("FUNCTION", () => {});
		localService.setDefaultOnAuthorizedStrategy("FUNCTION");
		expect(localService.onAuthorisedDefaultStrategy).toBeTruthy();
		expect(localService.onAuthorisedDefaultStrategy).toEqual("FUNCTION");
	});
});

describe("Isolated configuration service", () => {
	let localService: PermissionsConfigurationService;
	let localStore: PermissionsConfigurationStore;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PermissionsModule.forRoot({ configurationIsolate: true })]
		});
	});

	beforeEach(inject([PermissionsConfigurationService, PermissionsConfigurationStore], (service: PermissionsConfigurationService, store: PermissionsConfigurationStore) => {
		localService = service;
		localStore = store;
		localStore.onAuthorisedDefaultStrategy = "FUNCTION";
		localStore.onUnAuthorisedDefaultStrategy = "FUNCTION";
	}));

	it("should create an instance", () => {
		expect(localService).toBeTruthy();
	});

	it("should set onAuthrisedDefaultStrategy to undefined", () => {
		expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
	});

	it("should set onUnAuthorisedDefault strategy to undefined", () => {
		expect(localService.onAuthorisedDefaultStrategy).toBeFalsy();
	});
});
