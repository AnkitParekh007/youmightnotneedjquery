import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
	name: "timeAgo",
	pure: false
})
export class TimeAgoPipe implements PipeTransform {
	transform(date: any) {
		if (!date) return "A long time ago";
		var start = moment(date);
		var end = moment();
		var mins = moment.duration(end.diff(start)).asMinutes();
		if (mins < 1) {
			return "few seconds ago";
		} else if (mins >= 1 && mins < 60) {
			return Math.floor(mins) + " minute" + (Math.floor(mins) != 1 ? "s" : "") + " ago";
		} else if (mins > 60) {
			return (Math.floor(mins / 60) == 1 ? "an" : Math.floor(mins / 60)) + " hour" + (Math.floor(mins / 60) != 1 ? "s" : "") + " ago";
		}
	}
}
