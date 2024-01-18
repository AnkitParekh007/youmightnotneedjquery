import { permissionsDirective } from "./permissions.directive";
import { Component } from "@angular/core";
import { PermissionsModule } from "../index";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PermissionsService } from "../service/permissions.service";
import { RolesService } from "../service/roles.service";

enum PermissionsTestEnum {
	ADMIN = "ADMIN" as any,
	GUEST = "GUEST" as any
}

describe("permissionsDirective", () => {
	it("should create an instance", () => {
		// const directive = new PermissionsDirective();
		expect(true).toBeTruthy();
	});
});

describe("Permission directive angular except", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsExcept]="'ADMIN'"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let permissionService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should not show component", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		tick();
		fixture.detectChanges();
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));

	it("Should  show the component", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));

	it("Should show the component", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));

	it("Should hide component when permission added", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");

		permissionService.addPermission(PermissionsTestEnum.ADMIN);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));

	it("Should show component when permission removed", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		permissionService.removePermission(PermissionsTestEnum.ADMIN);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));
});

describe("Permission directive angular only", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsOnly]="'ADMIN'"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let permissionService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		permissionService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
	it("Should not show the component", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));

	it("Should show component when permission added", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		permissionService.addPermission(PermissionsTestEnum.ADMIN);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();

		expect(content2.innerHTML).toEqual("123");
	}));

	it("Should hide component when permission removed", fakeAsync(() => {
		permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");

		permissionService.removePermission(PermissionsTestEnum.ADMIN);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));
});

describe("Permission directive angular roles only", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsOnly]="'ADMIN'"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	const awesomePermissions = "AWESOME";
	let PermissionsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when key of role is the same", fakeAsync(() => {
		rolesService.addRole("ADMIN", [awesomePermissions]);
		PermissionsService.addPermission(awesomePermissions);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
	it("should show the component when permissions array is the same ", fakeAsync(() => {
		rolesService.addRole("ADMIN", [awesomePermissions]);
		PermissionsService.addPermission(awesomePermissions);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));

	it("should hide the component when user deletes all roles", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermissions);
		rolesService.addRole("ADMIN", [awesomePermissions]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");

		rolesService.flushRoles();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("should hide the component when user deletes one role", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermissions);
		rolesService.addRole("ADMIN", [awesomePermissions]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");

		rolesService.removeRole("ADMIN");
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("should hide the when there is no two permissions", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermissions);
		rolesService.addRole("ADMIN", [awesomePermissions, "noSUch permissions"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));
});
describe("Permission directive angular roles only array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsOnly]="['ADMIN', 'GUEST']"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	let PermissionsService;
	const awesomePermission = "AWESOME";
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when key of role is the same", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermission);
		rolesService.addRole("ADMIN", [awesomePermission]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
	it("should show the component when there is permission ", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermission);
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));

	it("should hide the component when user deletes all roles", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermission);
		rolesService.addRole("ADMIN", [awesomePermission]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");

		rolesService.flushRoles();
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("should hide the component when user deletes one roles", fakeAsync(() => {
		PermissionsService.addPermission(awesomePermission);
		rolesService.addRole("ADMIN", [awesomePermission]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");

		rolesService.removeRole("ADMIN");
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));
});

describe("Permission directive angular roles except", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsExcept]="'ADMIN'"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	let PermissionsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should hide the component when key of role is the same", fakeAsync(() => {
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));
	it("should show the component when permissions array is the same ", fakeAsync(() => {
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));

	it("should show the component when user deletes all roles", fakeAsync(() => {
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);

		rolesService.flushRoles();
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));

	it("should show the component when user deletes one role", fakeAsync(() => {
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);

		rolesService.removeRole("ADMIN");
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});
describe("Permission directive angular roles except array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template [permissionsExcept]="['ADMIN', 'GUEST']"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	let PermissionsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should not show the component when user have permissions", fakeAsync(() => {
		PermissionsService.addPermission("Awesome");
		rolesService.addRole("ADMIN", ["Awesome"]);

		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));
	it("should show when there is no such permission", fakeAsync(() => {
		rolesService.addRole("ADMIN", ["Awesome"]);
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content.innerHTML).toEqual("123");
	}));

	it("should show the component when user deletes all roles", fakeAsync(() => {
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);

		rolesService.flushRoles();
		PermissionsService.flushPermissions();
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));

	it("should show the component when user deletes one roles", fakeAsync(() => {
		PermissionsService.addPermission("SOMETHING");
		rolesService.addRole("ADMIN", ["SOMETHING"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);

		rolesService.removeRole("ADMIN");
		detectChanges(fixture);

		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permission directive angular testing different selectors *permmisionsOnly", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsOnly="['ADMIN']"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	let PermissionsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when key of role is the same", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("ADMIN", ["AWESOME"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");

		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should hide the component when key of role is the same", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("GG", ["Awsesome"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));
});

describe("Permission directive angular testing different selectors *permmisionsExcept", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsExcept="['ADMIN']"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should show the component when key of role is the same", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("Guest", ["Awsesome"]);
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should hide the component when key of role is the same", fakeAsync(() => {
		rolesService.addRole("ADMIN", ["Awsesome"]);
		tick();
		fixture.detectChanges();

		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));
});

describe("Permission directive angular testing different async functions in roles", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsOnly="'ADMIN'"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		// rolesService.addRole('ADMIN', () => {
		//     return Promise.resolve(null);
		// });
		rolesService.addRole("ADMIN", () => {
			return true;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("ADMIN", () => {
			return false;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.resolve(true);
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise rejects", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));
});

describe("Permission directive angular testing different async functions in roles via array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsOnly="['ADMIN', 'GUEST']"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	let PermissionsService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		// rolesService.addRole('ADMIN', () => {
		//     return Promise.resolve(null);
		// });
		rolesService.addRole("ADMIN", () => {
			return true;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise returns false value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("ADMIN", () => {
			return false;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.resolve(true);
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise rejects", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should  show the component when one of the promises fulfills ", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		rolesService.addRole("GUEST", () => {
			return Promise.resolve(true);
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should  show the component when one of the promises fulfills with 0 value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		rolesService.addRole("GUEST", () => {
			return Promise.resolve(null);
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when all promises fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		rolesService.addRole("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when one of promises returns true", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("GUEST", () => {
			return true;
		});

		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when 1 passes second fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("GUEST", ["AWESOME"]);

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when one rejects but another one fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		rolesService.addRole("ADMIN", () => {
			return Promise.reject();
		});
		PermissionsService.addPermission("AWESOME");
		rolesService.addRole("GUEST", ["AWESOME"]);

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));
});

describe("Permission directive angular testing different async functions in permissions via array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsOnly="['ADMIN', 'GUEST']"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		// rolesService.addRole('ADMIN', () => {
		//     return Promise.resolve(null);
		// });
		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise returns false value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("ADMIN", () => {
			return false;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(true);
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise rejects", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should  show the component when one of the promises fulfills ", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(null);
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should  show the component when one of the promises fulfills with 0 value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(null);
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.resolve(null);
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when all promises fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when one of promises returns true", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("GUEST", () => {
			return true;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when all promises fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.resolve(true);
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when one rejects but another one fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		PermissionsService.addPermission("GUEST", () => {
			return true;
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when one rejects but another one fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when functions with name and store fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", (name, store) => {
			expect(store[name].name).toBeTruthy();
			return name === "ADMIN";
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));
});

describe("Permission directive angular testing different async functions in permissions via string", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <div *permissionsOnly="'ADMIN'"><div>123</div></div> `
	})
	class TestComp {
		data: any;
	}

	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		// rolesService.addRole('ADMIN', () => {
		//     return Promise.resolve(null);
		// });
		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise returns false value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("ADMIN", () => {
			return false;
		});
		detectChanges(fixture);
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when promise returns truthy value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(true);
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when promise rejects", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should  show the component when one of the promises fulfills ", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(null);
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.resolve(true);
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should  show the component when one of the promises fulfills with 0 value", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(null);
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when all promises fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.reject();
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when one of promises returns true", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should not show the component when all promises fails", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return Promise.resolve(true);
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when one rejects but another one fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));

	it("Should show the component when functions with name and store fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
		PermissionsService.addPermission("ADMIN", (name, store) => {
			expect(store[name].name).toBeTruthy();
			return name === "ADMIN";
		});

		PermissionsService.addPermission("GUEST", () => {
			return Promise.reject();
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();
		fixture.detectChanges();
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("<div>123</div>");
	}));
});

describe("Permission  directive angular testing  different only and accept together async functions in permissions via string", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: ` <ng-template permissionsOnly="ADMIN" permissionsExcept="MANAGER"><div>123</div></ng-template> `
	})
	class TestComp {
		data: any;
	}

	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when permission except not available and only fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));

	it("Should NOT show the component when permission except fulfills", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return true;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should NOT show the component when permission except fulfills even when only also fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return true;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when permission except fulfills with function that returns false and only fullfiles", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return false;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));
});

describe("Permission  directive angular testing  different only and accept together async functions in permissions via array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsOnly]="['ADMIN', 'GUEST']" [permissionsExcept]="['MANAGER']">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should show the component when permission except not available and only fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		tick();
		tick();
		tick();

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));

	it("Should NOT show the component when permission except fulfills", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return true;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should NOT show the component when permission except fulfills even when only also fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return true;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when permission except fulfills with function that returns false and only fullfiles", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		PermissionsService.addPermission("MANAGER", () => {
			return false;
		});

		PermissionsService.addPermission("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));
});

describe("Permission  directive angular testing  different only and accept together async functions in roles via array", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsOnly]="['ADMIN', 'GUEST']" [permissionsExcept]="['MANAGER']">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should show the component when role except not available and only fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));

	it("Should NOT show the component when role except fulfills", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("MANAGER", () => {
			return true;
		});

		rolesService.addRole("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should NOT show the component when role except fulfills even when only also fulfils", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("MANAGER", () => {
			return true;
		});

		rolesService.addRole("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toEqual(null);
	}));

	it("Should show the component when role except fulfills with function that returns false and only fullfiles", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("MANAGER", () => {
			return false;
		});

		rolesService.addRole("ADMIN", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual("123");
	}));
});

describe("permissionsOnly Directive testing else block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<div *permissionsOnly="['FAILED_BLOCK']; else elseBlock">main</div>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should fail and show else block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));

	it("Should add element remove element and show then block", fakeAsync(() => {
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);

		rolesService.addRole("FAILED_BLOCK", () => {
			return true;
		});

		detectChanges(fixture);

		const content3 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content3).toBeTruthy();
		expect(content3.innerHTML).toEqual("main");

		rolesService.removeRole("FAILED_BLOCK");
		detectChanges(fixture);

		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));
});

describe("permissionsOnly Directive testing then block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<div *permissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock">main</div>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should fail and show then block", fakeAsync(() => {
		rolesService.addRole("THEN_BLOCK", () => {
			return true;
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`thenBlock`);
	}));
});

describe("permissionsExcept Directive testing else block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<div *permissionsExcept="['MAIN_BLOCK']; else elseBlock">main</div>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock> thenBlock </ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Should fail when adding role and show then block", fakeAsync(() => {
		rolesService.addRole("MAIN_BLOCK", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));

	it("Should fail when adding permissions and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual(`main`);

		PermissionsService.addPermission("MAIN_BLOCK", () => {
			return true;
		});

		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));
});

describe("permissionsExcept Directive testing then block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<div *permissionsExcept="['THEN_BLOCK']; else elseBlock; then: thenBlock">main</div>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
	});

	it("Should fail and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`thenBlock`);
	}));
});

describe("permissionsExcept Directive with permissionsOnly testing then block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="'FAIL_BLOCK'" [permissionsOnly]="'ONLY_BLOCK'" [permissionsElse]="elseBlock"> </ng-template>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except Should fail and show then block", fakeAsync(() => {
		PermissionsService.addPermission("FAIL_BLOCK");
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));

	it("Only Should fail and show then block", fakeAsync(() => {
		rolesService.addRole("SOME_BLOCK", () => {
			return true;
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));
});

describe("permissionsExcept Directive with permissionsOnly testing else block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="'FAIL_BLOCK'" [permissionsOnly]="'ONLY_BLOCK'" [permissionsElse]="elseBlock"> </ng-template>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except Should fail and show then block", fakeAsync(() => {
		PermissionsService.addPermission("FAIL_BLOCK");
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));

	it("Only Should fail and show then block", fakeAsync(() => {
		rolesService.addRole("SOME_BLOCK", () => {
			return true;
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));
});

describe("permissionsExcept Directive with permissionsOnly testing then block success", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="'FAIL_BLOCK'" [permissionsOnly]="'ONLY_BLOCK'" [permissionsElse]="elseBlock" [permissionsThen]="thenBlock"> </ng-template>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		PermissionsService.addPermission("ONLY_BLOCK");
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`thenBlock`);
	}));

	it("Except and only should success with role and show then block", fakeAsync(() => {
		rolesService.addRole("ONLY_BLOCK", () => {
			return true;
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`thenBlock`);
	}));
});

describe("permissionsExcept Directive with permissionsOnly testing else block", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="'FAIL_BLOCK'" [permissionsOnly]="'ONLY_BLOCK'" [permissionsElse]="elseBlock"> </ng-template>
			<ng-template #elseBlock>
				<div>elseBlock</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>thenBlock</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except Should fail and show then block", fakeAsync(() => {
		PermissionsService.addPermission("FAIL_BLOCK");
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));

	it("Only Should fail and show then block", fakeAsync(() => {
		rolesService.addRole("SOME_BLOCK", () => {
			return true;
		});
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`elseBlock`);
	}));
});

describe("Ngx Permissions Only Directive when no permission specified should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsOnly]="">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions Except Directive when no permission specified should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions Except Directive when no permission is empty array specified should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsOnly]="[]">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions Except and only Directive when no permission specified should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="" [permissionsOnly]="">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions Except and only Directive when no permission specified as array should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="[]" [permissionsOnly]="[]">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions only Directive when no permission specified as array should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsOnly]="[]">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});

describe("Ngx Permissions except Directive when no permission specified as array should return true", () => {
	@Component({
		selector: "ngx-permissions-test-comp",
		template: `
			<ng-template [permissionsExcept]="[]">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let rolesService;
	let PermissionsService;
	let fixture;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp],
			imports: [PermissionsModule.forRoot()]
		});

		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;

		rolesService = fixture.debugElement.injector.get(RolesService);
		PermissionsService = fixture.debugElement.injector.get(PermissionsService);
	});

	it("Except and only should success and show then block", fakeAsync(() => {
		detectChanges(fixture);
		const content2 = fixture.debugElement.nativeElement.querySelector("div");
		expect(content2).toBeTruthy();
		expect(content2.innerHTML).toEqual(`123`);
	}));
});
function detectChanges(fixture) {
	tick();
	fixture.detectChanges();
	tick();
	fixture.detectChanges();
}
