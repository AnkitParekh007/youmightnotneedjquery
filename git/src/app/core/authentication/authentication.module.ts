import { NgModule } from "@angular/core";
import { AuthModule, AUTH_SERVICE, PUBLIC_FALLBACK_PAGE_URI, PROTECTED_FALLBACK_PAGE_URI } from "ngx-auth";

import { AuthenticationService } from "./authentication.service";

@NgModule({
	imports: [AuthModule],
	providers: [
		{ provide: PROTECTED_FALLBACK_PAGE_URI, useValue: "/login" },
		{ provide: PUBLIC_FALLBACK_PAGE_URI, useValue: "/login" },
		{ provide: AUTH_SERVICE, useClass: AuthenticationService }
	]
})
export class AuthenticationModule {}
