import { Injectable, ChangeDetectorRef } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class HelperService {
	constructor() {}

	/*
	 ** This method Programmatically run change detection
	 ** And also takes care of the situation if cdr is null or undefined
	 */
	public applyChanges(_cdr: ChangeDetectorRef) {
		if (_cdr !== null && _cdr !== undefined) {
			if (!_cdr["destroyed"]) {
				_cdr.detectChanges();
			}
		}
	}
}
