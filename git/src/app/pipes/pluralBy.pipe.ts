import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "pluralBy"
})
export class PluralByPipe implements PipeTransform {
	transform(value: string, count: any) {
		if (!value) {
			return "";
		}
		var spl = value.split(" ");
		let common = (_index) => {
			spl[_index] = count < 2 ? spl[_index].replace("s", "") : spl[_index];
		};
		if (spl[0] == "SKUs") {
			common(0);
		} else if (spl[1] == "nodes" || spl[1] == "images" || spl[1] == "videos" || spl[1] == "SKUs") {
			common(1);
		}
		return spl.join(" ");
	}
}
