import { AMAZE_STATIC_RESOURCE_BASE_PATH } from "@app/models/helpers/resource-path.helper";
import { AMAZE_STATIC_IMG_PATHS } from "@app/models/enums/amaze-static-asset-paths.enums";
import { AMAZE_TERMS } from "@app/models/enums/amaze-terms.enums";

export const AMAZE_DEFAULT_SOURCE_LINK: string = "https://www.bing.com/";

export const AMAZE_DEFAULT_EXTERNAL_SOURCE_LINKS = [
	{
		name: AMAZE_TERMS.SEARCH_WEB,
		link: AMAZE_DEFAULT_SOURCE_LINK,
		image: AMAZE_STATIC_RESOURCE_BASE_PATH + AMAZE_STATIC_IMG_PATHS.SOURCE_LINK_WEB_SEARCH_ICON_IMG,
		isSecure: false
	}
];
