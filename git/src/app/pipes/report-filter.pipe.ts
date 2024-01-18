import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "reportFilter"
})
export class ReportFilterPipe implements PipeTransform {
	transform(items: any[], searchText: string): any[] {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}

		searchText = searchText.toLowerCase();
		return items.filter((it) => {
			return it.reportName.toLowerCase().includes(searchText) || it.reportCode.toLowerCase().includes(searchText);
		});
	}
}
