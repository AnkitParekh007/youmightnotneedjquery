import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
	name: "catalogFilter"
})
export class CatalogFilterPipe implements PipeTransform {
	transform(items: any[], searchText: string): any[] {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}

		searchText = searchText.toLowerCase();
		return items.filter((it) => {
			return it.catalogName.toLowerCase().includes(searchText) || it.catalogDescription.toLowerCase().includes(searchText);
		});
	}
}
