import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
	name: "customDate"
})
export class CustomDatePipe implements PipeTransform {
	transform(value: string): any {
		if (!value) {
			return "";
		} else {
			return moment(value).format("MM/DD/YYYY, hh:mm A");
		}
	}
}
