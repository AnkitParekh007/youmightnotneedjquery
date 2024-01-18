import { waitForAsync } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@app/core";
import { I18nService } from "@app/core";
import { MockAuthenticationService } from "@app/core/authentication/authentication.service.mock";
import { HeaderComponent } from "@app/partials/header/header.component";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, NgbModule, TranslateModule.forRoot()],
			declarations: [HeaderComponent],
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
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
