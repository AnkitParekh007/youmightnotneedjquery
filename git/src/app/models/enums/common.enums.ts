
export enum API_METHODS{
	FETCH_ALL_ENTITIES   = "FETCH_ALL_ENTITIES",
	FETCH_ONE_ENTITY     = "FETCH_ONE_ENTITY",
	CREATE_ENTITY        = "CREATE_ENTITY",
	UPDATE_ENTITY        = "UPDATE_ENTITY",
	DELETE_ENTITY        = "DELETE_ENTITY",
	COPY_ENTITY          = "COPY_ENTITY"
}

export enum ENTITY_OPERATION{
	VIEW   = "VIEW",
	ADD    = "ADD",
	EDIT   = "EDIT",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	COPY   = "COPY",
	PASTE  = "PASTE",
	CLONE  = "CLONE",
	UNDO   = "UNDO"
}

export enum ENTITY_OPERATION_STATE{
	ADDING    = "Adding",
	EDITING   = "Editing",
	UPDATING  = "Updating",
	DELETING  = "Deleting",
	COPYING   = "Copying",
	CLONING   = "Cloning",
	PASTING   = "Pasting",
	REMOVING  = "Removing"
}

export enum ENTITY_OPERATION_POST_SUCCESS_STATE{
	ADDED    = "Added",
	EDITED   = "Edited",
	UPDATED  = "Updated",
	DELETED  = "Deleted",
	COPIED   = "Copied",
	CLONED   = "Cloned",
	PASTED   = "Pasted",
	REMOVED  = "Removed"
}

export enum TREE_NODE_TYPES {
	ROOT = "ROOT",
	BRANCH = "BRANCH",
	LEAF = "LEAF"
}

export enum SORT_DIRECTIONS {
	ASCENDING = "asc",
	DESCENDING = "desc"
}

export enum ATTRIBUTE_DATA_TYPES {
	DATETIME = "DateTime",
	DECIMAL = "Decimal",
	DERIVED = "Derived",
	INTEGER = "Integer",
	RICHTEXT = "RichText",
	STRING = "String"
}

export enum SUPER_ATTRIBUTE_DATA_TYPES {
	DATETIME = "DATETIME",
	DECIMAL  = "DECIMAL",
	INTEGER  = "INTEGER",
	STRING   = "STRING"
}

export enum TREE_CLICK_TARGETS {
	TITLE = "title",
	PREFIX = "prefix",
	EXPANDER = "expander",
	CHECKBOX = "checkbox",
	ICON = "icon"
}

export enum ELEMENT_SCROLL_DIRECTIONS {
	CENTER = "center",
	TOP = "top",
	BOTTOM = "bottom"
}

export enum FANCY_TREE_EXTENSIONS {
	GLYPH = "glyph",
	WIDE = "wide",
	MULTI = "multi"
}

export enum SETIMEOUT_TIMER{
	TIMER_1 = 100,
	TIMER_2 = 200,
	TIMER_3 = 300,
	TIMER_4 = 400,
	TIMER_5 = 500,
	TIMER_6 = 600,
	TIMER_7 = 700,
	TIMER_8 = 800,
	TIMER_9 = 900,
	TIMER_10 = 1000
}

export const NOOP_FUNC = () => {};
