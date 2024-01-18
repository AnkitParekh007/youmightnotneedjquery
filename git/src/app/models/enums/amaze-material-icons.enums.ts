import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatIconRegistry } from "@angular/material/icon";
import { AMAZE_STATIC_RESOURCE_BASE_PATH } from "@app/models/helpers/resource-path.helper";

export enum AMAZE_MATERIAL_ICONS {
	ADD                        = "add",
	ADMIN                      = "admin_panel_settings",
	ADVANCED_SKU_SEARCH        = "find_in_page",
	ALL_CATALOGS               = "layers",
	API_MANAGEMENT             = "dashboard",
	ASSOCIATE_CATALOG_TO_MIL   = "dataset_linked",
	ASSORTMENTS                = "create_new_folder",
	BACK                       = "keyboard_backspace",
	BATCH_EDIT_OPERATIONS      = "compare",
	BATCH_EDIT_TEMPLATE        = "insert_photo",
	BRIDGE_SYNCHRONIZATION     = "next_week",
	CATALOG                    = "chrome_reader_mode",
	CATALOG_EXPORT             = "archive",
	CATALOG_GENERIC            = "assignment",
	CATALOG_IMPORT             = "present_to_all",
	CATALOG_STYLE_GUIDE        = "color_lens",
	CHANNELS                   = "snippet_folder",
	CONFIGURE_CATALOG          = "navigation",
	CONNECTORS                 = "device_hub",
	DIGITAL_ASSET              = "photo_album",
	DIGITAL_ASSET_IMPORT       = "present_to_all",
	DIGITAL_ASSET_LIBRARY      = "photo_album",
	DOMAINS                    = "domain",
	EDIT                       = "edit",
	EXPORT_FILE_LOCATION_SETUP = "move_to_inbox",
	EYE_ICON                   = "visibility",
	FORMULA_MASTER             = "assistant",
	GEN_AI_RULES               = "star",
	GEN_AI_RULES_WHITE         = "gen_ai_rule_white",
	GEN_AI_RULES_BLUE          = "gen_ai_rule_blue",
	GEN_AI_RULES_GREY          = "gen_ai_rule_grey",
	GROUP                      = "people",
	HELP                       = "help_outline",
	IMPORT                     = "present_to_all",
	IMPORT_CATALOG             = "unarchive",
	IMPORT_TEMPLATE            = "layers",
	LOGOUT                     = "power_settings_new",
	MULTI_CHANNEL_DASHBOARD    = "assessment",
	PDP_TEMPLATE               = "book",
	PRODUCT_DASHBOARD          = "pie_chart",
	PRODUCTS                   = "category",
	QUALITY_METRICS            = "bar_chart",
	REALTIME_SYNC_LINKAGES     = "cloud_sync",
	REVIEW_DASHBOARD           = "beenhere",
	ROLE                       = "person_pin",
	SECURITY                   = "settings",
	SKU_ATTRIBUTE_LOCK         = "lock",
	STYLE_GUIDE                = "assignment_turned_in",
	SYNCHRONIZATION_REQUESTS   = "next_week",
	USER                       = "person_add",
	VALIDATION_FAILURE         = "assessment",
	VIEW_FILL_RATE             = "star_half",
	VIEW_MY_PRODUCTS           = "chrome_reader_mode",
	WORKFLOW				   = "lan"
};
@NgModule({  imports: [MatIconModule] })
export class CustomIconModule {
	constructor( private domSanitizer: DomSanitizer, public matIconRegistry: MatIconRegistry ) {
  		this.matIconRegistry
		  	.addSvgIcon("gen_ai_rule_white", this.setSanitizerPath(`${AMAZE_STATIC_RESOURCE_BASE_PATH}/assets/img/gen-ai/gen-ai-btn-24x24-white.svg`))
		  	.addSvgIcon("gen_ai_rule_blue" , this.setSanitizerPath(`${AMAZE_STATIC_RESOURCE_BASE_PATH}/assets/img/gen-ai/gen-ai-btn-20x20-blue.svg`))
		  	.addSvgIcon("gen_ai_rule_grey" , this.setSanitizerPath(`${AMAZE_STATIC_RESOURCE_BASE_PATH}/assets/img/gen-ai/gen-ai-btn-20x20-grey.svg`));
	}

	private setSanitizerPath(url: string): SafeResourceUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
};
