import { env } from "./.env";

export const environment: Object = {
	VERSION                            : env.npm_package_version + "-hotfix",
	PRODUCTION                         : false,
	SERVER_URL                         : "https://amazeapishotfix.bluemeteor.com",
	API_REST_BASE_BATH                 : "https://amazeapishotfix.bluemeteor.com",
	SOCKET_BASE_BATH                   : "wss://events-hotfix.bluemeteor.com",
	ENV_NAME                           : "hotfix",
	ENV_SHORT_CODE                     : "hotfix",
	ENV_SHORT_CODE_ASSET               : "hotfix",
	ENV_NAME_IN_PATHS                  : "-hotfix",
	DEFAULT_LANGUAGE                   : "en-US",
	SUPPORTED_LANGUAGES                : ["en-US", "fr-FR"],
	BASE_HREF                          : "/",
	DOMAIN_NAME                        : "amazehotfix.bluemeteor.com",
	ASSET_BASE_PATH                    : "https://amazeassets.bluemeteor.com/",
	GOOGLE_ANALYTICS_CODE              : "UA-156509677-2",
	CORRESPONDING_BRIDGE_URL           : "https://bridgehotfix.bluemeteor.com",
	CORRESPONDING_BRIDGE_LOGIN_PATH    : "https://bridgehotfix.bluemeteor.com/#/login",
	CORRESPONDING_BRIDGE_AUTH_URL      : "https://bridgeapishotfix.bluemeteor.com/bridgeRest-hotfix/rest/v1/login?provider=Google&application=bridge"
};
