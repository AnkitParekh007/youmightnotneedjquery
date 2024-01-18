import { env } from "./.env";

export const environment = {
	VERSION                            : env.npm_package_version + "-prod",
	PRODUCTION                         : true,
	SERVER_URL                         : "https://apis-live.bluemeteor.com",
	API_REST_BASE_BATH                 : "https://apis-live.bluemeteor.com",
	SOCKET_BASE_BATH                   : "wss://events.bluemeteor.com",
	ENV_NAME                           : "production",
	ENV_SHORT_CODE                     : "prod",
	ENV_SHORT_CODE_ASSET               : "",
	ENV_NAME_IN_PATHS                  : "",
	DEFAULT_LANGUAGE                   : "en-US",
	SUPPORTED_LANGUAGES                : ["en-US", "fr-FR"],
	BASE_HREF                          : "/",
	DOMAIN_NAME                        : "amaze.bluemeteor.com",
	ASSET_BASE_PATH                    : "https://amazeassets.bluemeteor.com/",
	GOOGLE_ANALYTICS_CODE              : "G-3JKM3HQ4Y6",
	CORRESPONDING_BRIDGE_URL           : "https://bridge.bluemeteor.com",
	CORRESPONDING_BRIDGE_LOGIN_PATH    : "https://bridge.bluemeteor.com/#/login",
	CORRESPONDING_BRIDGE_AUTH_URL      : "https://bridgeapis.bluemeteor.com/bridgeRest/rest/v1/login?provider=Google&application=bridge",
	GEN_AI_FEATURE					   : false
};
