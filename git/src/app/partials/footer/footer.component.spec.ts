import { waitForAsync } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@app/core";
import { I18nService } from "@app/core";
import { MockAuthenticationService } from "@app/core/authentication/authentication.service.mock";
import { FooterComponent } from "@app/partials/footer/footer.component";

describe("FooterComponent", () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, TranslateModule.forRoot()],
			declarations: [FooterComponent],
			providers: [
				{
					provide: AuthenticationService,
					useClass: MockAuthenticationService
				},
				I18nService
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
