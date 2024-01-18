import { Pipe, PipeTransform } from "@angular/core";
import { AMAZE_STATIC_RESOURCE_BASE_PATH } from "@app/models/helpers/resource-path.helper";

@Pipe({
	name: "staticAsset"
})
export class StaticAssetPipe implements PipeTransform {
	transform(value: string) {
		return (AMAZE_STATIC_RESOURCE_BASE_PATH + value).toString();
	}
}
