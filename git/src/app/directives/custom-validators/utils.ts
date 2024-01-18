import { ValidatorFn } from "@angular/forms";

export const isNil = (value: any): value is null | undefined => {
	return value === null || typeof value === "undefined";
};

export const isObject = (value: any): boolean => {
	return value && value.constructor === Object;
};

export const isBlank = (value: any): boolean => {
	return isNil(value) || (isObject(value) && Object.keys(value).length === 0) || value.toString().trim() === "";
};

export const isPresent = (value: any): boolean => {
	return !isBlank(value);
};

export const isString = (value: any): boolean => {
	return typeof value === "string";
};

export const isNum = (value: any): boolean => {
	return !isNaN(value);
};

export function conditionalValidator(predicate: Function, validator: ValidatorFn, errorNamespace?: string): ValidatorFn {
	return (formControl => {
		if (!formControl.parent) {
			return null;
		}
		let error = null;
		if (predicate()) {
			error = validator(formControl);
		}
		if (errorNamespace && error) {
			const customError = {};
			customError[errorNamespace] = error;
			error = customError
		}
		return error;
	})
};
