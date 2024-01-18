import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "intParser"
})
export class IntParserPipe implements PipeTransform {
	transform(value: string) {
		if (!value) {
			return [];
		}
		return parseInt(value);
	}
}
