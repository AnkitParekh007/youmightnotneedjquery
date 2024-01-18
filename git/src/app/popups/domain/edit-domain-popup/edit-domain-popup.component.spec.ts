import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { EditDomainComponent } from "@app/partials/popups/domain/edit-domain-popup/edit-domain-popup.component";

describe("EditDomainComponent", () => {
	let component: EditDomainComponent;
	let fixture: ComponentFixture<EditDomainComponent>;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [EditDomainComponent]
		}).compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(EditDomainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
