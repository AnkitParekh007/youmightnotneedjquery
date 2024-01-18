import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
	name: "filterByName"
})
export class FilterByNamePipe implements PipeTransform {
	transform(items: any[], searchCriteria: any): any[] {
		if (!items) {
			return [];
		}
		if (!searchCriteria.searchText) {
			return items;
		}
		if (searchCriteria.searchText.length < parseInt(searchCriteria.searchLimit)) {
			return items;
		}
		searchCriteria.searchText = searchCriteria.searchText.toLowerCase();
		return items.filter((it) => {
			return it.name.toLowerCase().includes(searchCriteria.searchText);
		});
	}
}

@Pipe({
	name: "filterByNodeName"
})
export class FilterByNodeNamePipe implements PipeTransform {
	transform(items: any[], searchText: string): any[] {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}

		searchText = searchText.toLowerCase();
		return items.filter((it) => {
			return it.nodeName.toLowerCase().includes(searchText);
		});
	}
}
