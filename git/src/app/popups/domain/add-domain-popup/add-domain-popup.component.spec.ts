import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AddDomainComponent } from "@app/partials/popups/domain/add-domain-popup/add-domain-popup.component";

describe("AddDomainComponent", () => {
	let component: AddDomainComponent;
	let fixture: ComponentFixture<AddDomainComponent>;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AddDomainComponent]
		}).compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(AddDomainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
