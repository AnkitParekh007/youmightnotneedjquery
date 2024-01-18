import { ValidationFn } from "./permissions-router-data.model";

export interface Permission {
	name: string;
	validationFunction?: ValidationFn;
}
