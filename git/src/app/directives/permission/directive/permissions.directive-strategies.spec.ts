import { Component, Renderer2, TemplateRef } from "@angular/core";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PermissionsPredefinedStrategies } from "../enums/predefined-strategies.enum";
import { PermissionsModule } from "../index";
import { PermissionsConfigurationService } from "../service/configuration.service";
import { PermissionsService } from "../service/permissions.service";

enum PermissionsTestEnum {
	ADMIN = "ADMIN" as any,
	GUEST = "GUEST" as any
}

describe("Permission directive angular only configuration", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable component when default method is defined", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);
		configurationService.setDefaultOnAuthorizedStrategy(disable);
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should show the component when predefined show strategy is selected", fakeAsync(() => {
		configurationService.setDefaultOnAuthorizedStrategy(PermissionsPredefinedStrategies.SHOW);
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual(correctTemplate);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		configurationService.setDefaultOnAuthorizedStrategy(PermissionsPredefinedStrategies.REMOVE);
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBe(null);
	}));

	it("Should disable component when default unauthorized method is defined", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);
		configurationService.setDefaultOnUnauthorizedStrategy(disable);
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should show the component when predefined default unauthorized show strategy is selected", fakeAsync(() => {
		configurationService.setDefaultOnUnauthorizedStrategy(PermissionsPredefinedStrategies.SHOW);
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual(correctTemplate);
	}));

	it("Should remove the component when predefined default unauthorized remove strategy is selected", fakeAsync(() => {
		configurationService.setDefaultOnUnauthorizedStrategy(PermissionsPredefinedStrategies.REMOVE);
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBe(null);
	}));
});

describe("Permission directive angular strategies configuration passed by template", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'; authorisedStrategy: 'remove'; unauthorisedStrategy: 'show'" permissionsUnAuthorisedStrategy="show">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should hide the component when predefined hide strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toEqual(null);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual(correctTemplate);
	}));
});

describe("Permission directive angular strategies configuration passed by template except", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsExcept="'ADMIN'; authorisedStrategy: 'remove'; unauthorisedStrategy: 'show'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should hide the component when predefined hide strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toEqual(null);
	}));

	it("Should show the component when predefined remove strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual(correctTemplate);
	}));
});

describe("Permission directive angular strategies as function configuration passed by template", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'; authorisedStrategy: disabled; unauthorisedStrategy: disabled">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable the component when disabled function is passed", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));
});

describe("Permission directive angular strategies as function configuration passed by template except permissions", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsExcept="'ADMIN'; authorisedStrategy: disabled; unauthorisedStrategy: disabled">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable the component when disabled function is passed", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));
});

describe("Permission directive angular strategies as function passed in configuration except permissions", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsExcept="'ADMIN'; authorisedStrategy: 'disable'; unauthorisedStrategy: 'disable'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable the component when disabled function is passed", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));
});

describe("Permission directive angular strategies as function passed in configuration except permissions", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'; authorisedStrategy: 'disable'; unauthorisedStrategy: 'disable'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable the component when disabled function is passed", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toEqual(true);
	}));
});

describe("test predefined strategies", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'; authorisedStrategy: 'show'; unauthorisedStrategy: 'remove'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should disable the component when disabled function is passed", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
	}));

	it("Should remove the component when predefined remove strategy is selected", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toEqual(null);
	}));
});

describe("test predefined strategies normal behavior", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<button *permissionsOnly="'ADMIN'; unauthorisedStrategy: 'disable'; authorisedStrategy: 'enable'">
				<div>123</div>
			</button>
		`
	})
	class TestComp {
		data: any;

		public disabled(templateRef: TemplateRef<any>) {
			templateRef.elementRef.nativeElement.nextSibling.setAttribute("disabled", true);
		}
	}

	let permissionService;
	let fixture;
	let comp;
	let configurationService: PermissionsConfigurationService;
	const disable = "disable";
	let renderer: Renderer2;
	const correctTemplate = "<div>123</div>";
	const disableFunction = (tF: TemplateRef<any>) => {
		renderer.setAttribute(tF.elementRef.nativeElement.nextSibling, "disabled", "true");
	};
	const enableFunction = (tF: TemplateRef<any>) => {
		renderer.removeAttribute(tF.elementRef.nativeElement.nextSibling, "disabled");
	};
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()],
			providers: [Renderer2]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
		configurationService = fixture.debugElement.injector.get(PermissionsConfigurationService);
		renderer = fixture.debugElement.injector.get(Renderer2);
	});

	it("Should show the component when predefined strategy is present", fakeAsync(() => {
		configurationService.addPermissionStrategy(disable, disableFunction);
		configurationService.addPermissionStrategy("enable", enableFunction);

		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("button");
		expect(content).toBeTruthy();
		expect(content.disabled).toBe(true);

		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("button");

		expect(content2).toBeTruthy();
		expect(content2.disabled).toBeFalsy();
	}));
});

function detectChanges(fixture) {
	tick();
	fixture.detectChanges();
	tick();
	fixture.detectChanges();
}
