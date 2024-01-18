import { env } from "./.env";

export const environment = {
	VERSION                            : env.npm_package_version + "-test",
	PRODUCTION                         : false,
	SERVER_URL                         : "https://apis-test.bluemeteor.com",
	API_REST_BASE_BATH                 : "https://apis-test.bluemeteor.com",
	SOCKET_BASE_BATH                   : "wss://events-test.bluemeteor.com",
	ENV_NAME                           : "test",
	ENV_SHORT_CODE                     : "test",
	ENV_SHORT_CODE_ASSET               : "test",
	ENV_NAME_IN_PATHS                  : "-test",
	DEFAULT_LANGUAGE                   : "en-US",
	SUPPORTED_LANGUAGES                : ["en-US", "fr-FR"],
	BASE_HREF                          : "/",
	DOMAIN_NAME                        : "amazetest.bluemeteor.com",
	ASSET_BASE_PATH                    : "https://amazeassets.bluemeteor.com/",
	GOOGLE_ANALYTICS_CODE              : "UA-156509677-2",
	CORRESPONDING_BRIDGE_URL           : "https://bridgetest.bluemeteor.com",
	CORRESPONDING_BRIDGE_LOGIN_PATH    : "https://bridgetest.bluemeteor.com/#/login",
	CORRESPONDING_BRIDGE_AUTH_URL      : "https://bridgeapistest.bluemeteor.com/bridgeRest-test/rest/v1/login?provider=Google&application=bridge",
	GEN_AI_FEATURE                     : true
};
