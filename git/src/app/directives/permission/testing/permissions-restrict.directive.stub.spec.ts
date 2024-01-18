import { Component } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PermissionsRestrictStubDirective } from "./permissions-restrict.directive.stub";

describe("Permissions restrict stub testing only original template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<ng-template [PermissionsOnly]="'ADMIN'">
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
			declarations: [TestComp, PermissionsRestrictStubDirective]
		});
		fixture = TestBed.createComponent(TestComp);
		comp = fixture.componentInstance;
	});

	it("Should not show component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");
		expect(content).toEqual(null);
	}));
});

describe("Permissions stub testing only then template", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<div *PermissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock"></div>
			<ng-template #elseBlock>
				<div>123</div>
			</ng-template>
			<ng-template #thenBlock> then block </ng-template>
		`
	})
	class TestComponent {
		data: any;
	}

	let fixture: ComponentFixture<TestComponent>;
	let comp;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, PermissionsRestrictStubDirective]
		});
		fixture = TestBed.createComponent(TestComponent);
		comp = fixture.componentInstance;
	});

	it("Should show else component", fakeAsync(() => {
		detectChanges(fixture);
		const content = fixture.debugElement.nativeElement.querySelector("div");

		expect(content).toBeTruthy();
		expect(content.innerHTML).toEqual("123");
	}));
});

describe("Permission stub directive should not show when providing authorised strategy functions", () => {
	@Component({
		selector: "-permissions-test-comp",
		template: `
			<div *PermissionsOnly="['THEN_BLOCK']; else elseBlock; then: thenBlock; authorisedStrategy: 'disable'; unauthorisedStrategy: 'enable'"></div>
			<ng-template #elseBlock>
				<div>123</div>
			</ng-template>
			<ng-template #thenBlock> then block </ng-template>
		`
	})
	class TestComponent {
		data: any;
	}

	let fixture: ComponentFixture<TestComponent>;
	let component;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, PermissionsRestrictStubDirective]
		});
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
	});

	it("Should show else component", fakeAsync(() => {
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
