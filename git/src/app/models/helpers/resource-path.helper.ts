import { environment } from "@env/environment";

export const GET_AMAZE_STATIC_RESOURCE_BASE_PATH = (): string => {
	const oldName = "https://amaze[env]-bm-cdn-asset[assetVersion].bluemeteor.com";
	return oldName.replace("[env]", environment.ENV_SHORT_CODE_ASSET).replace("[assetVersion]", (Math.floor(Math.random() * 6) + 1).toString());
};

export const AMAZE_STATIC_RESOURCE_BASE_PATH: string = GET_AMAZE_STATIC_RESOURCE_BASE_PATH();
