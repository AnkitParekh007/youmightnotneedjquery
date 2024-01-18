import { env } from "./.env";

export const environment = {
	VERSION                            : env.npm_package_version + "-pg",
	PRODUCTION                         : false,
	SERVER_URL                         : "https://apis-playground.bluemeteor.com",
	API_REST_BASE_BATH                 : "https://apis-playground.bluemeteor.com",
	SOCKET_BASE_BATH                   : "wss://events-playground.bluemeteor.com",
	ENV_NAME                           : "playground",
	ENV_SHORT_CODE                     : "pg",
	ENV_SHORT_CODE_ASSET               : "pg",
	ENV_NAME_IN_PATHS                  : "-playground",
	DEFAULT_LANGUAGE                   : "en-US",
	SUPPORTED_LANGUAGES                : ["en-US", "fr-FR"],
	BASE_HREF                          : "/",
	DOMAIN_NAME                        : "amazeplayground.bluemeteor.com",
	ASSET_BASE_PATH                    : "https://amazeassets.bluemeteor.com/",
	GOOGLE_ANALYTICS_CODE			   : "UA-156509677-3",
	CORRESPONDING_BRIDGE_URL           : "https://bridgeplayground.bluemeteor.com",
	CORRESPONDING_BRIDGE_LOGIN_PATH    : "https://bridgeplayground.bluemeteor.com/#/login",
	CORRESPONDING_BRIDGE_AUTH_URL      : "https://bridgeapispg.bluemeteor.com/bridgeRest-playground/rest/v1/login?provider=Google&application=bridge",
	GEN_AI_FEATURE                     : true
};
