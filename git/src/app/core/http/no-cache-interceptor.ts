// src/app/http-interceptors/no-cache-interceptor.ts
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			setHeaders: {
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
				Expires: "Sat, 01 Jan 2000 00:00:00 GMT"
			}
		});
		return next.handle(req);
	}
}
