import { ValidationFn } from "./permissions-router-data.model";

export interface Role {
	name: string;
	validationFunction: ValidationFn | string[];
}
