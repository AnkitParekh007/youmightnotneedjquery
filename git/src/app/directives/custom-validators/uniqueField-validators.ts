import { AbstractControl, FormArray, FormGroup, ValidatorFn } from "@angular/forms";
import { isBlank, isPresent } from "./utils";

export class UniqueFieldValidators {
	public static uniqueField = (fieldDelimiter: string, fieldEnclsoure: string, caseSensitive: boolean = false): ValidatorFn => {
		return (formArray: FormArray): { [key: string]: boolean } => {
			const controls: AbstractControl[] = formArray.controls.filter((formGroup: FormGroup) => {
				return isPresent(formGroup.get(fieldDelimiter).value);
			});
			const uniqueObj: any = { uniqueFieldDelimiter: true };
			let find = false;

			controls
				.map((formGroup) => formGroup.get(fieldDelimiter))
				.forEach((x) => {
					if (x.errors) {
						delete x.errors["uniqueField"];
						if (isBlank(x.errors)) {
							x.setErrors(null);
						}
					}
				});

			if (controls.length) {
				for (let i = 0; i < controls.length; i++) {
					const formGroup: FormGroup = controls[i] as FormGroup;
					const mainControl: AbstractControl = formGroup.get(fieldDelimiter);
					const val: string = mainControl.value;

					const mainValue: string = caseSensitive ? val : val.toLowerCase();
					controls.forEach((group: FormGroup, index: number) => {
						if (i === index) {
							return;
						}

						const currControl: any = group.get(fieldDelimiter);
						const tempValue: string = currControl.value;
						const currValue: string = caseSensitive ? tempValue : tempValue.toLowerCase();
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
