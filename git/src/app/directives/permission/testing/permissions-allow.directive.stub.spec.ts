import { Component } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PermissionsAllowStubDirective } from "./permissions-allow.directive.stub";

describe("Permissions stub testing only original template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<ng-template [PermissionsExcept]="'ADMIN'">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let fixture: any;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp, PermissionsAllowStubDirective]
		});
		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;
	});

	it("Should show the component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permissions stub testing except template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<ng-template [PermissionsExcept]="'ADMIN'">
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let fixture: any;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp, PermissionsAllowStubDirective]
		});
		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;
	});

	it("Should show the component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permissions stub testing only then template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<div *PermissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock"></div>
			<ng-template #elseBlock>
				<div>else block</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let fixture: any;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp, PermissionsAllowStubDirective]
		});
		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;
	});

	it("Should show the component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permissions stub testing except then template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<div *PermissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock"></div>
			<ng-template #elseBlock>
				<div>else block</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>123</div>
			</ng-template>
		`
	})
	class TestComp {
		data: any;
	}

	let fixture: any;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComp, PermissionsAllowStubDirective]
		});
		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;
	});

	it("Should show the component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permission stub directive should show when providing authorised strategy functions", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<div *PermissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock; authorisedStrategy: 'disable'; unauthorisedStrategy: 'enable'"></div>
			<ng-template #elseBlock>
				<div>else block</div>
			</ng-template>
			<ng-template #thenBlock>
				<div>123</div>
			</ng-template>
		`
	})
	class TestComponent {
		data: any;
	}

	let fixture: ComponentFixture<TestComponent>;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, PermissionsAllowStubDirective]
		});
		fixture = TestBed.createComponent(TestComponent);
		comp = fixture.componentInstance;
	});

	it("Should show the component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});
function detectChanges(fixture) {
	tick();
	fixture.detectChanges();
}
