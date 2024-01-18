// Angular modules
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ChunkErrorHandler } from "@app/core/http/chunk-error-handler";

// Cancel Request Interceptor
import { HttpCancelService } from "@app/core/http/http-cancel.service";
import { HttpCancelInterceptor } from "@app/core/http/http-cancel.interceptor";

// Translation modules
import { TranslateModule } from "@ngx-translate/core";

// Ui Frameworks modules
import { MaterialModule } from "@app/modules/material.module";
import { PluginsModule } from "@app/modules/plugins.module";

// environment dependency
import { environment } from "@env/environment";

// core and shared modules
import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { LoginModule } from "@app/scenes/authentication/login/login.module";
import { ForgotpasswordModule } from "@app/scenes/authentication/forgotpassword/forgotpassword.module";
import { AuthenticationModule } from "@app/core/authentication/authentication.module";
import { ShellModule } from "@app/shell/shell.module";

// app and routing module
import { AppComponent } from "@app/app.component";
import { AppRoutingModule } from "@app/app-routing.module";

// storage module
import { CookieService } from "ngx-cookie-service";
import { NgxWebstorageModule } from "ngx-webstorage";
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from "ngx-google-analytics";
import { TokenInterceptor } from "@app/core/http/token-interceptor";
import { AmazeAttributeAdderModule } from "@app/components/amaze-attribute-adder/amaze-attribute-adder.module";

@NgModule({
	imports: [
		// core
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register("./ngsw-worker.js", {
			enabled: environment.PRODUCTION
		}),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		TranslateModule.forRoot(),
		AuthenticationModule,
		ForgotpasswordModule,

		// plugins
		MaterialModule,
		PluginsModule,
		CoreModule,
		SharedModule,
		LoginModule,
		ShellModule,

		// Amaze Modules
		AppRoutingModule, // must be imported as the last module as it contains the fallback route
		NgxWebstorageModule.forRoot({
			prefix: "Amaze-storage",
			separator: "--",
			caseSensitive: false
		}),
		NgxGoogleAnalyticsModule.forRoot(environment.GOOGLE_ANALYTICS_CODE),
		NgxGoogleAnalyticsRouterModule,
		AmazeAttributeAdderModule
	],
	declarations: [AppComponent],
	providers: [
		CookieService,
		{
			provide: ErrorHandler,
			useClass: ChunkErrorHandler
		},
		HttpCancelService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpCancelInterceptor,
			multi: true
		},
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
