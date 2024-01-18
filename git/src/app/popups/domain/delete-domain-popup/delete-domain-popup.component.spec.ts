import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DeleteDomainComponent } from "@app/partials/popups/domain/delete-domain-popup/delete-domain-popup.component";

describe("DeleteDomainComponent", () => {
	let component: DeleteDomainComponent;
	let fixture: ComponentFixture<DeleteDomainComponent>;
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [DeleteDomainComponent]
		}).compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(DeleteDomainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
