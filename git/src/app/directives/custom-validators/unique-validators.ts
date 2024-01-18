import { AbstractControl, FormArray, FormGroup, ValidatorFn } from "@angular/forms";
import { isBlank, isPresent } from "./utils";
import { Injectable } from "@angular/core";

@Injectable()
export class UniqueValidators {
	public static uniqueBy = (field: string, caseSensitive: boolean = false): ValidatorFn => {
		return (formArray: FormArray): { [key: string]: boolean } => {
			const controls: AbstractControl[] = formArray.controls.filter((formGroup: FormGroup) => {
				return isPresent(formGroup.get(field).value);
			});
			const uniqueObj: any = { uniqueBy: true };
			let find = false;

			controls
				.map((formGroup) => formGroup.get(field))
				.forEach((x) => {
					if (x.errors) {
						delete x.errors["uniqueBy"];
						if (isBlank(x.errors)) {
							x.setErrors(null);
						}
					}
				});

			if (controls.length > 1) {
				for (let i = 0; i < controls.length; i++) {
					const formGroup: FormGroup = controls[i] as FormGroup;
					const mainControl: AbstractControl = formGroup.get(field);
					const val: string = mainControl.value;

					const mainValue: string = caseSensitive ? val : val;
					controls.forEach((group: FormGroup, index: number) => {
						if (i === index) {
							return;
						}

						const currControl: any = group.get(field);
						const tempValue: string = currControl.value;
						const currValue: string = caseSensitive ? tempValue : tempValue;
						let newErrors: any;

						if (mainValue === currValue) {
							if (isBlank(currControl.errors)) {
								newErrors = uniqueObj;
							} else {
								newErrors = Object.assign(currControl.errors, uniqueObj);
							}
							currControl.setErrors(newErrors);
							find = true;
						}
					});
				}

				if (find) {
					return uniqueObj;
				}
			}

			return null;
		};
	};
}
