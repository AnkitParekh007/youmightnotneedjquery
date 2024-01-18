import { Pipe, PipeTransform } from "@angular/core";
import * as underscore from "underscore";

@Pipe({
	name: "uniqueBy"
})
export class UniqeByPipe implements PipeTransform {
	transform(items: any[], key: string) {
		if (!items) {
			return [];
		}
		return underscore.unique(items, (item) => item[key]);
	}
}
