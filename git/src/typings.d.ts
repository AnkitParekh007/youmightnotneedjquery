/*
 * Extra typings definitions
 */

declare module "*";

declare module "*.svg?inline" {
	const content: any;
	export default content;
}

declare module "*.svg" {
	const content: any;
	export default content;
}

// Allow .json files imports
declare module "*.json" {
	const value: any;
	export default value;
}

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
	id: string;
}

interface JQueryContextMenuOptions {
	selector: string;
	appendTo?: string;
	trigger?: string;
	autoHide?: boolean;
	delay?: number;
	determinePosition?: (menu: JQuery) => void;
	position?: (opt: JQuery, x: number, y: number) => void;
	positionSubmenu?: (menu: JQuery) => void;
	zIndex?: number;
	animation?: {
		duration?: number;
		show?: string;
		hide?: string;
	};
	events?: {
		show?: (options: any) => boolean;
		hide?: (options: any) => boolean;
	};
	callback?: (key: any, options: any) => any;
	items?: any;
	build?: (triggerElement: JQuery, e: Event) => any;
	reposition?: boolean;
	className?: string;
	itemClickEvent?: string;
}

interface JQueryStatic {
	contextMenu(options?: JQueryContextMenuOptions): JQuery;
	contextMenu(type: string, selector?: any): JQuery;
}

interface JQuery {
	fancytree(): void;
	jqGrid(): void;
	contextMenu(options?: any): JQuery;
	webuiPopover(options?: any): void;
	jsPlumb(options?: any): void;
	tagify(options?:any):void;
}

declare var GoogleMapsLoader: any;
declare var AmCharts: any;
declare var Chart: any;
declare var Chartist: any;
declare const chroma: any;
