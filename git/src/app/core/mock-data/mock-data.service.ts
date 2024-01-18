import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { untilDestroyed } from "@app/core";
import { Observable, throwError, defer, from, of } from "rxjs";
import { catchError, delay, distinctUntilChanged, finalize, tap } from "rxjs/operators";
import { BaseConfig } from "@app/core/backend/config";
import * as mockData from "./../../../mocks/data.json";
@Injectable({
	providedIn: "root"
})
export class MockDataService {
	apiurl = '';
	dummyServerHost = "http://localhost:3000/";
	headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
	httpOptions = {
		headers: this.headers
	};

	constructor(private http: HttpClient, private baseConfig: BaseConfig) {}

	private handleError(error: any) {
    	console.error(error);
    	return throwError(error);
  	}

	get checkEnvironmentIsLocal(){
		return this.baseConfig.isLocal;
	}

	serveDataFromJsonFiles(options:any): Observable<any> {
		const { dataName } = options;
		return of(mockData[dataName]).pipe(delay(1000));
	}

	noCacheUrl(url: string): string {
		const timestamp = "_=" + new Date().getTime();
		const prefix = url.indexOf("?") !== -1 ? "&" : "?";
		return this.dummyServerHost + url + prefix + timestamp;
	}

	getEntities(url: any, options?: any) {
		if(this.checkEnvironmentIsLocal){
			url = this.noCacheUrl(url);
			return this.http.get(url, this.httpOptions).pipe(
				catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
				finalize(() => { })
			);
		} else {
			return this.serveDataFromJsonFiles({dataName : url});
		}
	}

	getEntity(url: any, entityId:any, options?: any) {
		if(this.checkEnvironmentIsLocal){
			url = this.noCacheUrl(url);
			url = `${url}/${entityId}`;
			return this.http.get(url, this.httpOptions).pipe(
				catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
				finalize(() => { })
			);
		} else {
			return this.serveDataFromJsonFiles({dataName : url});
		}
	}

	addEntity(url: any, entity:any, options?: any) {
		url = this.noCacheUrl(url);
		return this.http.post(url, JSON.stringify(entity), this.httpOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	updateEntity(url: any, entity:any, options?: any) {
		url = this.noCacheUrl(url);
		return this.http.put(url, JSON.stringify(entity), this.httpOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}

	deleteEntity(url: any, entityId:any, options?: any) {
		url = this.noCacheUrl(url);
		url = `${url}/${entityId}`;
		return this.http.delete(url, this.httpOptions).pipe(
			catchError((error: HttpErrorResponse) => throwError(this.handleError(error))),
			finalize(() => { })
		);
	}
}
