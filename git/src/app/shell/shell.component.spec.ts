import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthenticationService, CredentialsService, CoreModule } from "@app/core";
import { MockAuthenticationService } from "@app/core/authentication/authentication.service.mock";
import { MockCredentialsService } from "@app/core/authentication/credentials.service.mock";
import { ShellComponent } from "@app/shell/shell.component";

describe("ShellComponent", () => {
	let component: ShellComponent;
	let fixture: ComponentFixture<ShellComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, TranslateModule.forRoot(), BrowserAnimationsModule, FlexLayoutModule, CoreModule],
			providers: [
				{
					provide: AuthenticationService,
					useClass: MockAuthenticationService
				},
				{
					provide: CredentialsService,
					useClass: MockCredentialsService
				}
			],
			declarations: [ShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
