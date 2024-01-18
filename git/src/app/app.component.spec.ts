import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

import { CoreModule } from "@app/core";
import { AppComponent } from "@app/app.component";

describe("AppComponent", () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, TranslateModule.forRoot(), CoreModule],
			declarations: [AppComponent],
			providers: []
		}).compileComponents();
	}));

	it("should create the app", waitForAsync(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
