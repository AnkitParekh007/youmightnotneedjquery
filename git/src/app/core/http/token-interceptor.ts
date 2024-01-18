import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SharedService } from "@app/services/shared.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public sharedSerivce: SharedService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((httpEvent: any) => {
				// Skip request
				if (httpEvent.type === 0) {
					return;
				}
				let appState = this.sharedSerivce.uiService.getAppStore;
				if (httpEvent instanceof HttpResponse) {
					if (httpEvent.headers.has("x-access-token")) {
						let token = httpEvent.headers.get("x-access-token");
						if (token !== appState.serverParams.token) {
							appState.serverParams.token = token;
							this.sharedSerivce.uiService.syncAppStore(appState);
						}
					}
				}
			})
		);
	}
}
