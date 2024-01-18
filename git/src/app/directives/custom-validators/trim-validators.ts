import { Injectable } from "@angular/core";
import { AbstractControl, Validators, ValidatorFn } from "@angular/forms";
import { isBlank, isString } from "./utils";

@Injectable()
export class TrimValidators {
	static required(control: any) {
		return isBlank(control.value) || (isString(control.value) && control.value.trim() == "") ? { required: true } : null;
	}
}

@Injectable()
export class ValidatorHelper {
	/// This is the guts of Angulars minLength, added a trim for the validation
	static minLength(minLength: number): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (ValidatorHelper.isPresent(Validators.required(control))) {
				return null;
			}
			const v: string = control.value ? control.value : "";
			return v.trim().length < minLength
				? {
						minlength: {
							requiredLength: minLength,
							actualLength: v.trim().length
						}
				  }
				: null;
		};
	}

	static isPresent(obj: any): boolean {
		return obj !== undefined && obj !== null;
	}
}
