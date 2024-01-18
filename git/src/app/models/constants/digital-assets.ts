import { MineTypeEnum } from "@wkoza/ngx-upload";
import { AMAZE_STATIC_RESOURCE_BASE_PATH } from "@app/models/helpers/resource-path.helper";

export const SUPPORTED_FILE_FORMATS = [
	// Images
	MineTypeEnum.Image,
	MineTypeEnum.Image_Gif,
	MineTypeEnum.Image_Jpeg,
	MineTypeEnum.Image_Png,
	MineTypeEnum.Image_SvgXml,
	MineTypeEnum.Image_Tiff,
	MineTypeEnum.Image_Webp,
	<any>"image/*",
	<any>"image/emf",
	<any>"image/vnd.dwg",
	<any>".dwg",
	<any>"image/wmf",
	<any>"message/rfc822",
	<any>"image/vnd.microsoft.icon",

	// Audios
	MineTypeEnum.Audio,
	MineTypeEnum.Audio_Midi,
	MineTypeEnum.Audio_Mp4,
	MineTypeEnum.Audio_Mpeg,
	MineTypeEnum.Audio_Ogg,
	MineTypeEnum.Audio_Webm,
	MineTypeEnum.Audio_XAac,
	MineTypeEnum.Audio_XAiff,
	MineTypeEnum.Audio_XMpegurl,
	MineTypeEnum.Audio_XMsWma,
	MineTypeEnum.Audio_XWav,
	MineTypeEnum.Audio_Bmp,
	<any>"audio/x-midi",
	<any>"audio/wav",
	<any>"audio/3gpp2",

	// Videos
	MineTypeEnum.Video,
	MineTypeEnum.Video_Threegpp,
	MineTypeEnum.Video_H264,
	MineTypeEnum.Video_Mp4,
	MineTypeEnum.Video_Mpeg,
	MineTypeEnum.Video_Ogg,
	MineTypeEnum.Video_Quicktime,
	MineTypeEnum.Video_Webm,
	<any>"video/x-msvideo",
	<any>"video/mp2t",
	<any>"video/3gpp2",

	// Documents
	MineTypeEnum.Text,
	MineTypeEnum.Text_Css,
	MineTypeEnum.Text_Csv,
	MineTypeEnum.Text_Html,
	MineTypeEnum.Text_Plain,
	MineTypeEnum.Text_RichText,
	MineTypeEnum.Text_Yaml,
	<any>"text/xml",
	<any>"text/vcard-contact",
	<any>"text/calendar",
	<any>"font/otf",
	<any>"font/ttf",
	<any>"font/woff",
	<any>"font/woff2",

	MineTypeEnum.Application,
	MineTypeEnum.Application_Zip,
	MineTypeEnum.Application_Json,
	MineTypeEnum.Application_Pdf,
	MineTypeEnum.Application_Rtf,
	MineTypeEnum.Application_Xml,

	MineTypeEnum.Application,
	MineTypeEnum.Application_AtomXml,
	MineTypeEnum.Application_AtomcatXml,
	MineTypeEnum.Application_Ecmascript,
	MineTypeEnum.Application_JavaArchive,
	MineTypeEnum.Application_Javascript,
	MineTypeEnum.Application_Json,
	MineTypeEnum.Application_Mp4,
	MineTypeEnum.Application_OctetStream,
	MineTypeEnum.Application_Pdf,
	MineTypeEnum.Application_Pkcs10,
	MineTypeEnum.Application_Pkcs7Mime,
	MineTypeEnum.Application_Pkcs7Signature,
	MineTypeEnum.Application_Pkcs8,
	MineTypeEnum.Application_Postscript,
	MineTypeEnum.Application_RdfXml,
	MineTypeEnum.Application_RssXml,
	MineTypeEnum.Application_Rtf,
	MineTypeEnum.Application_SmilXml,
	MineTypeEnum.Application_XFontOtf,
	MineTypeEnum.Application_XFontTtf,
	MineTypeEnum.Application_XFontWoff,
	MineTypeEnum.Application_XPkcs12,
	MineTypeEnum.Application_XShockwaveFlash,
	MineTypeEnum.Application_XSilverlightApp,
	MineTypeEnum.Application_XhtmlXml,
	MineTypeEnum.Application_Xml,
	MineTypeEnum.Application_XmlDtd,
	MineTypeEnum.Application_XsltXml,
	MineTypeEnum.Application_Zip,

	<any>"application/x-abiword",
	<any>"application/x-freearc",
	<any>"application/vnd.amazon.ebook",
	<any>"application/x-bzip",
	<any>"application/x-bzip2",
	<any>"application/x-csh",
	<any>"application/vnd.ms-fontobject",
	<any>"application/epub+zip",
	<any>"application/gzip",
	<any>"application/java-archive",
	<any>"application/ld+json",
	<any>"application/vnd.apple.installer+xml",
	<any>"application/msword",
	<any>"application/ogg",
	<any>"appliction/php",
	<any>"application/x-sh",
	<any>"application/x-shockwave-flash",
	<any>"application/x-tar",
	<any>"application/vnd.ms-excel",
	<any>"application/vnd.ms-excel.sheet.binary.macroenabled.12",
	<any>"application/vnd.ms-excel.sheet.macroenabled.12",
	<any>"application/vnd.ms-excel.template.macroenabled.12",
	<any>"application/vnd.ms-outlook",
	<any>"application/vnd.ms-outlook-pst",
	<any>"application/vnd.ms-powerpoint",
	<any>"application/vnd.ms-word.document.macroenabled.12",
	<any>"application/vnd.ms-word.template.macroenabled.12",
	<any>"application/vnd.oasis.opendocument.text",
	<any>"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	<any>"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
	<any>"application/vnd.openxmlformats-officedocument.presentationml.template",
	<any>"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	<any>"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
	<any>"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	<any>"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
	<any>"application/vnd.oasis.opendocument.presentation",
	<any>"application/vnd.oasis.opendocument.spreadsheet",
	<any>"application/vnd.oasis.opendocument.text",
	<any>"application/vnd.visio",
	<any>"application/x-7z-compressed",
	<any>"application/xhtml+xml",
	<any>"application/xml",
	<any>"application/x-msaccess",
	<any>"application/x-mspublisher",
	<any>"application/x-rar-compressed",
	<any>"application/vnd.mozilla.xul+xml",

	<any>"application/acad",
	<any>"application/arj",
	<any>"application/astound",
	<any>"application/clariscad",
	<any>"application/drafting",
	<any>"application/dxf",
	<any>"application/i-deas",
	<any>"application/iges",
	<any>"application/mac-binhex40",
	<any>"application/msaccess",
	<any>"application/msexce",
	<any>"application/mspowerpoint",
	<any>"application/msproject",
	<any>"application/msword",
	<any>"application/mswrite",
	<any>"application/postscript",
	<any>"application/pro_eng",
	<any>"application/set",
	<any>"application/sla",
	<any>"application/solids",
	<any>"application/STEP",
	<any>"application/vda",
	<any>"application/x-bcpio",
	<any>"application/x-cpio",
	<any>"application/x-csh",
	<any>"application/x-director",
	<any>"application/x-dvi",
	<any>"application/x-dwf",
	<any>"application/x-gtar",
	<any>"application/x-gzip",
	<any>"application/x-hdf",
	<any>"application/x-javascript",
	<any>"application/x-latex",
	<any>"application/x-macbinary",
	<any>"application/x-midi",
	<any>"application/x-mif",
	<any>"application/x-netcdf",
	<any>"application/x-sh",
	<any>"application/x-shar",
	<any>"application/x-shockwave-flash",
	<any>"application/x-stuffit",
	<any>"application/x-sv4cpio",
	<any>"application/x-sv4crc",
	<any>"application/x-tar",
	<any>"application/x-tcl",
	<any>"application/x-tex",
	<any>"application/x-texinfo",
	<any>"application/x-troff",
	<any>"application/x-ustar",
	<any>"application/x-wais-source",
	<any>"application/x-winhelp",
	<any>"model/vnd.dwf",
	<any>"drawing/x-dwf",
	<any>"image/x-dwg"
];

export const META_DATA_FILE_SUPPORTED_FORMATS = [<any>".csv", <any>"application/vnd.ms-excel", <any>"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

export const DIGITAL_ASSET_TYPE_IDENTIFIER = {
	Photos: ["image/*", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/tiff"],
	Videos: ["video/3gpp", "video/h264", "video/mp4", "video/mpeg", "video/ogg", "video/quicktime", "video/webm", "video/x-msvideo", "video/mp2t", "video/3gpp2"],
	Documents: [
		"text/css",
		"text/csv",
		"text/html",
		"text/plain",
		"text/richtext",
		"text/yaml",
		"text/xml",
		"text/vcard-contact",
		"text/calendar",
		"application/pdf",
		"application/rtf",
		"application/xml",
		"application/pdf",
		"application/rdf+xml",
		"application/rss+xml",
		"application/rtf",
		"application/smil+xml",
		"application/xhtml+xml",
		"application/xml",
		"application/xml-dtd",
		"application/xslt+xml",
		"application/x-abiword",
		"application/vnd.amazon.ebook",
		"application/epub+zip",
		"application/msword",
		"application/vnd.ms-excel",
		"application/vnd.ms-excel.sheet.binary.macroenabled.12",
		"application/vnd.ms-excel.sheet.macroenabled.12",
		"application/vnd.ms-excel.template.macroenabled.12",
		"application/vnd.ms-outlook",
		"application/vnd.ms-outlook-pst",
		"application/vnd.ms-powerpoint",
		"application/vnd.ms-word.document.macroenabled.12",
		"application/vnd.ms-word.template.macroenabled.12",
		"application/vnd.oasis.opendocument.text",
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
		"application/vnd.openxmlformats-officedocument.presentationml.template",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		"application/vnd.oasis.opendocument.presentation",
		"application/vnd.oasis.opendocument.spreadsheet",
		"application/vnd.oasis.opendocument.text",
		"application/vnd.visio",
		"application/xhtml+xml",
		"application/xml",
		"application/x-msaccess",
		"application/x-mspublisher",
		"application/vnd.mozilla.xul+xml",
		"application/msaccess",
		"application/msexce",
		"application/mspowerpoint",
		"application/msproject",
		"application/msword",
		"application/mswrite",
		"application/STEP",
		"application/x-director",
		"application/x-dvi",
		"application/x-winhelp"
	],
	CAD_Model: ["application/acad", "application/clariscad", "application/dxf", "application/set", "drawing/x-dwf", "image/x-dwg", "application/x-dwf", "model/vnd.dwf"]
};

export const IMAGE_EDITOR_THEME_OPTIONS = {
	"common.bi.image": "",
	"menu.normalIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-b.svg",
	"menu.activeIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-a.svg",
	"menu.disabledIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-a.svg",
	"menu.hoverIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-c.svg",
	"submenu.normalIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-a.svg",
	"submenu.activeIcon.path": AMAZE_STATIC_RESOURCE_BASE_PATH + "/assets/plugins/tui-image-editor/dist/svg/icon-c.svg",
	"menu.activeIcon.name": "icon-a",
	"menu.normalIcon.name": "icon-b",
	"menu.disabledIcon.name": "icon-a",
	"menu.hoverIcon.name": "icon-c",
	"submenu.normalIcon.name": "icon-a",
	"submenu.activeIcon.name": "icon-c",
	"menu.iconSize.width": "24px",
	"menu.iconSize.height": "24px",

	"submenu.backgroundColor": "#1e1e1e",
	"submenu.partition.color": "#3c3c3c",
	"submenu.iconSize.width": "32px",
	"submenu.iconSize.height": "32px",
	"submenu.normalLabel.color": "#8a8a8a",
	"submenu.normalLabel.fontWeight": "lighter",
	"submenu.activeLabel.color": "#fff",
	"submenu.activeLabel.fontWeight": "lighter",

	"checkbox.border": "1px solid #ccc",
	"checkbox.backgroundColor": "#fff",

	"range.disabledPointer.color": "#414141",
	"range.disabledBar.color": "#282828",
	"range.disabledSubbar.color": "#414141",
	"range.pointer.color": "#fff",
	"range.bar.color": "#666",
	"range.subbar.color": "#d1d1d1",
	"range.value.color": "#fff",
	"range.value.fontWeight": "lighter",
	"range.value.fontSize": "11px",
	"range.value.border": "1px solid #353535",
	"range.value.backgroundColor": "#151515",
	"range.title.color": "#fff",
	"range.title.fontWeight": "lighter",

	"colorpicker.button.border": "1px solid #1e1e1e",
	"colorpicker.title.color": "#fff"
};
