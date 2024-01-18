import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap } from "rxjs/operators";

import { SharedService } from "@app/services/shared.service";

function isEmptyInputValue(value: any): boolean {
	// we don't check for string here so it also works with arrays
	return value === null || value.length === 0;
}

@Injectable({
	providedIn: "root"
})
export class DuplicateAttributeValidators {
	constructor(private sharedService: SharedService) {}

	existingAttrValidator(isEditCase: boolean, initialAttr: string = ""): AsyncValidatorFn {
		return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
			if (isEmptyInputValue(control.value)) {
				return of(null);
			} else if (control.value === initialAttr) {
				return of(null);
			} else {
				return control.valueChanges.pipe(
					debounceTime(500),
					take(1),
					switchMap(() => {
						let apiUrl = this.sharedService.urlService.apiCallWithParams("isAttrDuplicated", {
							"{catalogId}": this.sharedService.uiService.getCatStore.catalogPage.selectedCatalog.catalogKey,
							"{attributeId}": 0,
							"{attributeTerm}": control.value
						});
						if (isEditCase) {
							apiUrl = apiUrl;
						}
						return this.sharedService.configService.get(apiUrl);
					}),
					map((_exists) => {
						return _exists ? { existingAttribute: true } : null;
					})
				);
			}
		};
	}
}
