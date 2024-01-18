import { AbstractControl } from "@angular/forms";
import { isObject, isString } from "./utils";

export function UserSelectionValidator(control: AbstractControl) {
	const selection: any = control.value;
	const validUser: boolean = !isString(selection) && isObject(selection) && selection.hasOwnProperty("userKey");
	if (!validUser) {
		return { required: true };
	}
	return null;
}
