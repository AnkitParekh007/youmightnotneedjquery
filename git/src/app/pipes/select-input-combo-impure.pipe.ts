import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
	name: "selectInputComboImpureFilter",
	pure: false
})
export class SelectInputComboImpureFilterPipe implements PipeTransform {
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
		if (searchCriteria.searchText && searchCriteria.selectField && Array.isArray(items)) {
			const filterKeys = [searchCriteria.selectField];
			return items.filter((item) => {
				return filterKeys.some((keyName) => {
					return new RegExp(searchCriteria.searchText, "gi").test(item[keyName]) || searchCriteria.searchText === "";
				});
			});
		}
	}
}
