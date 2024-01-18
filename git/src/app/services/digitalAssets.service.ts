// core
import { Injectable } from "@angular/core";

// Popups
import { AmazeAssetUploaderComponent } from "@app/components/amaze-asset-uploader/amaze-asset-uploader.component";

// servcies
import { UrlService } from "@app/services/url.service";
import { UiService } from "@app/services/ui.service";
import { DialogService } from "@app/components/dialog/dialog.service";
import { MatDialogConfig } from "@angular/material/dialog";

// extras
import * as moment from "moment";
import { ClipboardService } from "ngx-clipboard";
import { saveAs } from "file-saver";
import * as $ from "jquery";
import * as _ from "underscore";
import { AMAZE_COMMUNICATION_MESSAGES } from "@app/models/enums/amaze-communication-messages.enums";
declare var jQuery: any;

@Injectable({
	providedIn: "root"
})
export class DigitalAssetsService {
	private dialogConfig: MatDialogConfig = new MatDialogConfig();
	constructor(public urlService: UrlService, public uiService: UiService, public _clipboardService: ClipboardService, public dialogService: DialogService) {}

	getAssetAuthor(_asset: any) {
		return _asset.createdBy.userFirstName + " " + _asset.createdBy.userLastName;
	}

	checkAssetEffectiveness(_asset: any) {
		return (
			moment(_asset.effectiveEndDate).isSame(moment("2099-12-31")) ||
			moment(_asset.effectiveEndDate).isSame(moment("2099-12-12")) ||
			moment(_asset.effectiveEndDate).isSame(moment("2099-12-11"))
		);
	}

	getAssetValidity(_asset: any) {
		const result: any = {
			isValid: true,
			validMessage: "",
			isExpired: false
		};
		if (this.checkAssetEffectiveness(_asset)) {
			if (moment(_asset.effectiveStartDate).isAfter(moment())) {
				// result.isExpired = true;
				result.isValid = false;
				result.validMessage = "Asset is currently inactive and it will be active on " + moment(_asset.effectiveStartDate).format("MM/DD/YYYY");
			} else {
				result.validMessage = "Asset is currently active and will be active forever";
			}
		} else {
			if (
				moment(_asset.effectiveStartDate).diff(moment(), "days") <= 0 &&
				moment(_asset.effectiveEndDate).diff(moment(), "days") >= 0 &&
				!moment(_asset.effectiveStartDate).isAfter(moment())
			) {
				result.validMessage = "Asset is currently active and will be active through " + moment(_asset.effectiveEndDate).format("MM/DD/YYYY");
			} else {
				if (moment().isBetween(moment(_asset.effectiveStartDate), moment(_asset.effectiveEndDate))) {
					result.validMessage = "Asset is currently active and will be active through " + moment(_asset.effectiveEndDate).format("MM/DD/YYYY");
				} else {
					result.isValid = false;
					if (moment(_asset.effectiveStartDate).isAfter(moment())) {
						// result.isExpired = true;
						result.validMessage = "Asset is currently inactive and it will be active on " + moment(_asset.effectiveStartDate).format("MM/DD/YYYY");
					} else if (moment().isBefore(moment(_asset.effectiveStartDate))) {
						result.isExpired = true;
						result.validMessage = "Asset is currently inactive since it has been expired on " + moment(_asset.effectiveEndDate).format("MM/DD/YYYY");
					} else if (moment(_asset.effectiveStartDate).isBefore(moment()) && moment(_asset.effectiveEndDate).isBefore(moment())) {
						result.isExpired = true;
						result.validMessage = "Asset is currently inactive since it has been expired on " + moment(_asset.effectiveEndDate).format("MM/DD/YYYY");
					}
				}
			}
		}
		return result;
	}

	getFallBackImg(_asset: any, _version?: any) {
		if (!_.isUndefined(_asset) && !_.isUndefined(_asset.type)) {
			const assetType = _asset.type.toLowerCase();
			let version = "/assets/img/digital/";
			let extension = ".png";
			if (typeof _version !== "undefined") {
				if (_version == "dark") {
					version += "placeholders/dark/";
					extension = ".svg";
				} else if (_version == "light") {
					version += "placeholders/light/";
					extension = ".svg";
				} else if (_version == "grey") {
					version += "placeholders/grey/";
					extension = ".svg";
				}
			}
			if (window.origin.indexOf("localhost") !== -1) {
				return window.origin + version + assetType + extension;
			} else {
				return window.origin + version + assetType + extension;
			}
		} else {
			return window.origin + "/assets/img/digital/other.png";
		}
	}

	getAssetDownloadPath(_assetLocation: string): string {
		return !_.isUndefined(_assetLocation) ? this.urlService.getAssetBasePath + _assetLocation : this.urlService.getAssetBasePath;
	}

	public getFileExtension(_filename: any) {
		return /^.+\.([^.]+)$/.exec(_filename)[1];
	}

	public downloadFiles(_urls: any, _filenames?: any) {
		const $t = this;

		if (_.isUndefined(_urls) || _.isNull(_urls)) {
			return;
		}
		if (_.isArray(_urls)) {
			_.each(_urls, function (f: any) {
				saveAs($t.getAssetDownloadPath(f.url), f.name + "." + $t.getFileExtension(f.url));
			});
		} else {
			if (_.isString(_urls)) {
				saveAs($t.getAssetDownloadPath(_urls), _filenames + "." + $t.getFileExtension(_urls));
			}
		}
	}

	public downloadFileWithoutPath(_urls: any, _filenames?: any) {
		const $t = this;

		if (_.isUndefined(_urls) || _.isNull(_urls)) {
			return;
		}
		if (_.isArray(_urls)) {
			_.each(_urls, function (f: any) {
				saveAs(f.url, f.name);
			});
		} else {
			if (_.isString(_urls)) {
				saveAs(_urls, _filenames);
			}
		}
	}

	prepareMetaAtttributes(_asset: any) {
		const meta: any = Object.assign({}, _asset.metaAttributes);
		let metas: any = [];
		if (!_.isEmpty(_asset.metaAttributes)) {
			Object.keys(meta).forEach((m: any) => {
				if (m != "" && meta[m] != "") {
					metas.push({
						field: m,
						value: meta[m]
					});
				}
			});
		}
		metas = _.sortBy(metas, function (m: any) {
			return m.field;
		});
		return metas;
	}

	setFileType(_file: any) {
		let result = "OTHER";
		if (_file.file.type.indexOf("image") !== -1) {
			result = "PHOTO";
		} else if (_file.file.type.indexOf("audio") !== -1 || _file.file.type.indexOf("video") !== -1) {
			result = "VIDEO";
		} else if (_file.file.type === "") {
			result = ["dwg", "dwf"].includes(this.getFileExtension(_file.file.name)) ? "CAD Model" : "OTHER";
		} else if (_file.file.type.indexOf("zip") !== -1) {
			result = "OTHER";
		} else if (_file.file.type.indexOf("text") !== -1 || _file.file.type.indexOf("application") !== -1) {
			result = "DOCUMENT";
		}
		return result;
	}

	dataURLtoBlob(dataurl: any) {
		let arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	blobToDataURL(blob: any, callback: any) {
		const a = new FileReader();
		a.onload = function (e: any) {
			callback(e.target.result);
		};
		a.readAsDataURL(blob);
	}

	getFileMimeType(dataurl: any) {
		const arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1];
		return mime;
	}

	srcToFile(src: any, fileName: any, mimeType: any) {
		return fetch(src)
			.then(function (res) {
				return res.arrayBuffer();
			})
			.then(function (buf) {
				return new File([buf], fileName, { type: mimeType });
			});
	}

	getBase64Image(imgUrl: any, callback?: any) {
		const img = new Image();

		// onload fires when the image is fully loadded, and has width and height

		img.onload = function () {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			const dataURL = canvas.toDataURL();
			callback(dataURL);
		};

		// set attributes and src
		img.setAttribute("crossOrigin", "anonymous"); //
		img.src = imgUrl;
	}

	base64ArrayBuffer(arrayBuffer) {
		let base64 = "";
		const encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		const bytes = new Uint8Array(arrayBuffer);
		const byteLength = bytes.byteLength;
		const byteRemainder = byteLength % 3;
		const mainLength = byteLength - byteRemainder;

		let a, b, c, d;
		let chunk;

		// Main loop deals with bytes in chunks of 3
		for (let i = 0; i < mainLength; i = i + 3) {
			// Combine the three bytes into a single integer
			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

			// Use bitmasks to extract 6-bit segments from the triplet
			a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
			b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
			c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
			d = chunk & 63; // 63       = 2^6 - 1

			// Convert the raw binary segments to the appropriate ASCII encoding
			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
		}

		// Deal with the remaining bytes and padding
		if (byteRemainder == 1) {
			chunk = bytes[mainLength];

			a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

			// Set the 4 least significant bits to zero
			b = (chunk & 3) << 4; // 3   = 2^2 - 1

			base64 += encodings[a] + encodings[b] + "==";
		} else if (byteRemainder == 2) {
			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

			a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
			b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

			// Set the 2 least significant bits to zero
			c = (chunk & 15) << 2; // 15    = 2^4 - 1

			base64 += encodings[a] + encodings[b] + encodings[c] + "=";
		}

		return base64;
	}

	createThumbnail(file: any) {
		const t = this;
		if (file == null || file == undefined) {
			document.write("This Browser has no support for HTML5 FileReader yet!");
			return false;
		}
		const imageType = /image.*/;
		if (!file.type.match(imageType)) {
			return;
		}
		const reader = new FileReader();
		if (reader != null) {
			reader.onload = function (e: any) {
				t.getThumbnail(e, 100, 100);
			};
			reader.readAsDataURL(file);
		}
	}

	getThumbnail(e: any, thumbWidth: any, thumbHeight: any) {
		const myCan = document.createElement("canvas");
		const img = new Image();
		img.src = e.target.result;
		img.onload = function () {
			myCan.id = "myTempCanvas";
			myCan.width = Number(thumbWidth);
			myCan.height = Number(thumbHeight);
			if (myCan.getContext) {
				const cntxt = myCan.getContext("2d");
				cntxt.drawImage(img, 0, 0, myCan.width, myCan.height);
				const dataURL = myCan.toDataURL();
				if (dataURL != null && dataURL != undefined) {
					const nImg = document.createElement("img");
					nImg.src = dataURL;
					document.body.appendChild(nImg);
				} else {
					alert("unable to get context");
				}
			}
		};
	}

	copyAssetUrl(_asset: any) {
		this._clipboardService.copyFromContent(this.getAssetDownloadPath(_asset.location));
		this.uiService.showMessage("Asset URL Copied Successfully");
	}

	readFileSize(_sizeInBytes: any, _inFull?: boolean) {
		const formatBytes = (bytes: any, decimals?: any) => {
			if (bytes == 0) {
				return "0 Bytes";
			}
			const k = 1024,
				dm = decimals <= 0 ? 0 : decimals || 2,
				sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
				sizeInFull = ["Bytes", "Kilobytes", "Megabytes", "Gigabytes", "Terabytes", "Petabytes", "Exabytes", "Zettabytes", "Yottabytes"],
				i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + (typeof _inFull !== "undefined" && _inFull ? sizeInFull[i] : sizes[i]);
		};
		return formatBytes(_sizeInBytes);
	}

	getImageAssetSize(_asset: any) {
		let sizeResult = "- NA -";
		const formatBytes = (bytes: any, decimals?: any) => {
			if (bytes == 0) {
				return "0 Bytes";
			}
			const k = 1024,
				dm = decimals <= 0 ? 0 : decimals || 2,
				sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
				i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
		};

		const isNum = (_num: any) => {
			return /^\d+$/.test(_num);
		};

		if (Array.isArray(_asset.metaAttributeList)) {
			if (_asset.metaAttributeList.length) {
				const isFileSize = _.find(_asset.metaAttributeList, function (a: any) {
					return a.digitalAssetMetaAttribute.metaAttributeName == "File Size";
				});
				if (!_.isUndefined(isFileSize)) {
					sizeResult = isNum(isFileSize.metaAttributeValue) ? formatBytes(isFileSize.metaAttributeValue) : isFileSize.metaAttributeValue;
				}
			}
		} else if (_.isObject(_asset.metaAttributes)) {
			if (!_.isEmpty(_asset.metaAttributes)) {
				if (_.has(_asset.metaAttributes, "File Size")) {
					sizeResult = isNum(_asset.metaAttributes["File Size"]) ? formatBytes(_asset.metaAttributes["File Size"]) : _asset.metaAttributes["File Size"];
				}
			}
		}
		return sizeResult;
	}

	formatDateWithoutTimezone(_d: any) {
		if (!_.isNull(_d) && !_.isUndefined(_d) && moment(_d).isValid()) {
			const date = new Date(_d);
			const userTimezoneOffset = date.getTimezoneOffset() * 60000;
			return new Date(date.getTime() - userTimezoneOffset).toISOString();
		} else {
			return "";
		}
	}

	cachhingImages() {
		/*
		 * cacheImage: a jQuery plugin
		 *
		 * Licensed under the MIT:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		(function ($) {
			$.extend($, {
				cacheImage: function (src, options) {
					if (typeof src === "object") {
						$.each(src, function () {
							$.cacheImage(String(this), options);
						});
						return;
					}
					const image = new Image();
					options = options || {};

					$.each(["load", "error", "abort"], function () {
						// Callbacks
						const e = String(this);
						if (typeof options[e] === "function") {
							$(image).bind(e, options[e]);
						}
						if (typeof options.complete === "function") {
							$(image).bind(e, options.complete);
						}
					});
					image.src = src;
					return image;
				}
			});
			$.extend($.fn, {
				cacheImage: function (options) {
					return this.each(function () {
						$.cacheImage(this.src, options);
					});
				}
			});
		})(jQuery);
	}

	prepareAssetIconPopup(_elements: any, _assetData?: any, _uiCase?: any, _detailsBtnCallBack?: Function, _allPfData?: any) {
		const $t = this;
		const icons = jQuery(_elements);
		if (icons.length) {
			$t.cachhingImages();
			jQuery($t).webuiPopover("destroy");
			_.each(icons, function (t: any, tIndex: any) {
				let n: any;
				let reqAssets: any;
				switch (_uiCase) {
					case "taxonomyTree":
						n = $.ui.fancytree.getNode(t.parentElement.parentElement.parentElement);
						reqAssets = n.data.digitalAssets;
						break;
					case "skuGrid":
					case "resultsGrid":
						n = jQuery(t).closest("tr").attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString()).digitalAssets;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "attributeGrid":
					case "attributeGrpGrid":
						n = jQuery(t.parentElement.parentElement).attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString()).digitalAssets;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "proFamGrid":
						n = jQuery(t.parentElement.parentElement).attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString());
						if (reqAssets == undefined || (reqAssets && reqAssets.length == 0)) {
							reqAssets = _allPfData.find((a: any) => a.id.toString() == n.toString()).digitalAssets;
						} else {
							reqAssets = reqAssets.digitalAssets;
						}
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
				}
				jQuery(t)
					.webuiPopover("destroy")
					.webuiPopover({
						title: "Linked Digital Assets",
						placement: _uiCase == "attributeGrid" || _uiCase == "attributeGrpGrid" || _uiCase == "proFamGrid" ? "auto" : "auto-right",
						trigger: "hover",
						closeable: true,
						animation: "pop",
						width: 400,
						type: "html",
						multi: false,
						content: function (data) {
							let carHtml = "";
							carHtml +=
								'<div id="miniCarousel' +
								reqAssets[0].id +
								'" class="flow-hidden w100"><div class="row no-gutters d-flex align-items-center min-vertical-h-30 max-vertical-h-45 w100 mx-auto">';
							if (reqAssets.length > 1) {
								carHtml +=
									'<div class="col-1 text-center order-first"><a class="miniPrev curPoint disabled mx-auto"><i class="material-icons">arrow_back_ios</i></a></div>';
								carHtml +=
									'<div class="col-1 text-center order-last"><a class="miniNext curPoint mx-auto"><i class="material-icons">arrow_forward_ios</i></a></div>';
							}
							carHtml += '<div class="' + (reqAssets.length > 1 ? "col-10" : "col-12") + '"><div class="miniCarousel">';
							_.each(reqAssets, function (_asset: any, _assetIndex: any) {
								carHtml += '<div class="miniSlide animated fadeIn">';
								carHtml += '<p class="my-2 row no-gutters d-flex align-items-center">';
								carHtml +=
									'<span class="col-8 text-truncate small font-weight-bold" title="' + _asset.digitalAsset.name + '">' + _asset.digitalAsset.name + "</span>";
								carHtml +=
									'<span title="Primary Asset" class="col-2 text-right" style="padding-right:2px;">' +
									(_asset.primary ? '<i style="font-size:1.5rem" class="material-icons text-primary">star</i>' : "") +
									"</span>";
								carHtml +=
									'<span title="Asset is ' +
									($t.getAssetValidity(_asset.digitalAsset).isValid ? "Active" : "Inactive") +
									'" class="col-2 text-right active-icon-inactive" style="padding-right:2px;">' +
									($t.getAssetValidity(_asset.digitalAsset).isValid
										? '<i style="font-size:1.5rem" class="material-icons-outlined text-success">timer</i>'
										: '<i style="font-size:1.5rem" class="material-icons-outlined text-danger">timer</i>') +
									"</span>";
								carHtml += "</p>";
								carHtml +=
									'<div data-type="' +
									_asset.digitalAsset.type +
									'" class="miniImgWrap img-thumbnail min-vertical-h-20"><div style="height:200px;width:250px;background-position:center;background-repeat:no-repeat;background-size:100%" class="d-block mx-auto miniDetailsImg" data-src="' +
									$t.getAssetDownloadPath(_asset.digitalAsset.thumbnailLocation) +
									'"></div></div>';
								carHtml += '<p class="my-2 row no-gutters d-flex align-items-center">';
								const currentIndex = _assetIndex + 1;
								carHtml +=
									'<span class="col-6">' + (reqAssets.length > 1 ? "<span>" + currentIndex + "/" + reqAssets.length + "</span>" : "<span></span>") + "</span>";
								carHtml +=
									'<span class="col-6 text-right"><a class="miniDetails curPoint btn btn-sm bg-primary text-white my-2 rounded-pill px-4">View Details</a></span>';
								carHtml += "</p>";
								carHtml += "</div>";
							});
							carHtml += "</div></div></div></div>";
							return carHtml;
						},
						onShow: function () {
							let slideIndex = 1;
							const total_slides = jQuery("#miniCarousel" + reqAssets[0].id).find(".miniSlide");
							jQuery(".miniPrev").addClass("disabled");
							jQuery(".miniNext").removeClass("disabled");
							const showSlides = function (_n: any) {
								let i;
								const slides = jQuery("#miniCarousel" + reqAssets[0].id).find(".miniSlide");
								if (_n > slides.length) {
									slideIndex = 1;
								}
								if (_n < 1) {
									slideIndex = slides.length;
								}
								for (i = 0; i < slides.length; i++) {
									jQuery(slides[i]).addClass("d-none");
								}
								jQuery(slides[slideIndex - 1]).removeClass("d-none");
								const isImg = true;
								if (isImg) {
									const imgPath = jQuery(slides[slideIndex - 1])
										.find(".miniDetailsImg")
										.attr("data-src");
									jQuery(slides[slideIndex - 1])
										.find(".miniDetailsImg")
										.css("background-image", "url(" + imgPath + ")");
									jQuery.cacheImage(imgPath);
								}
							};
							const plusSlides = function (_n: any) {
								showSlides((slideIndex += _n));
								jQuery(".miniPrev").removeClass("disabled");
								jQuery(".miniNext").removeClass("disabled");
								if (slideIndex == total_slides.length) {
									jQuery(".miniNext").addClass("disabled");
								}
								if (slideIndex == 1) {
									jQuery(".miniPrev").addClass("disabled");
								}
							};
							const currentSlide = function (_n: any) {
								showSlides((slideIndex = _n));
							};
							showSlides(slideIndex);
							jQuery(".miniPrev").on("click", function () {
								plusSlides(-1);
							});
							jQuery(".miniNext").on("click", function () {
								plusSlides(1);
							});
							jQuery(".miniDetails").on("click", function () {
								_detailsBtnCallBack(reqAssets, n);
								jQuery(".webui-popover").remove();
							});
						},
						onHide: function () {
							jQuery(".webui-popover").remove();
						}
					});
			});
		}
	}

	prepareReviewAssetIconPopup(_elements: any, _assetData?: any, _uiCase?: any, _detailsBtnCallBack?: Function, _allPfData?: any) {
		const $t = this;
		const icons = jQuery(_elements);
		if (icons.length) {
			$t.cachhingImages();
			jQuery($t).webuiPopover("destroy");
			_.each(icons, function (t: any, tIndex: any) {
				let n: any;
				let reqAssets: any;
				switch (_uiCase) {
					case "taxonomyTree":
						n = $.ui.fancytree.getNode(t.parentElement.parentElement.parentElement);
						reqAssets = n.data.taxonomyReviewDigitalAssetDatas;
						break;
					case "resultsGrid":
					case "skuGrid":
						n = jQuery(t).closest("tr").attr("id");
						var entry = _assetData.find((a: any) => a.id.toString() == n.toString());
						reqAssets = (entry.rowData ? entry.rowData : entry).skuReviewDigitalAssetDatas;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "schemaGrid":
						n = jQuery(t).closest("tr").attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString()).rowData.digitalAssets;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "attributeGrid":
						n = jQuery(t.parentElement.parentElement).attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString()).digitalAssets;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "proFamGrid":
						n = jQuery(t.parentElement.parentElement).attr("id");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString());
						if (reqAssets == undefined || (reqAssets && reqAssets.length == 0)) {
							reqAssets = _allPfData.find((a: any) => a.id.toString() == n.toString()).digitalAssets;
						} else {
							reqAssets = reqAssets.digitalAssets;
						}
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
					case "ecommerceView":
						n = jQuery(t).attr("data-sku");
						reqAssets = _assetData.find((a: any) => a.id.toString() == n.toString()).rowData.skuReviewDigitalAssetDatas;
						n = _assetData.find((a: any) => a.id.toString() == n.toString());
						break;
				}
				jQuery(t)
					.webuiPopover("destroy")
					.webuiPopover({
						title: "Digital " + (reqAssets.length > 1 ? "Assets" : "Asset") + " Under Review",
						placement: _uiCase == "attributeGrid" ? "auto-left" : "horizontal",
						trigger: "hover",
						closeable: true,
						animation: "pop",
						width: 400,
						type: "html",
						multi: false,
						content: function (data) {
							let carHtml = "";
							carHtml +=
								'<div id="miniCarousel' +
								reqAssets[0].digitalAsset.id +
								'" class="flow-hidden w100"><div class="row no-gutters d-flex align-items-center min-vertical-h-30 max-vertical-h-45 w100 mx-auto">';
							if (reqAssets.length > 1) {
								carHtml +=
									'<div class="col-1 text-center order-first"><a class="miniPrev curPoint disabled mx-auto"><i class="material-icons">arrow_back_ios</i></a></div>';
								carHtml +=
									'<div class="col-1 text-center order-last"><a class="miniNext curPoint mx-auto"><i class="material-icons">arrow_forward_ios</i></a></div>';
							}
							carHtml += '<div class="' + (reqAssets.length > 1 ? "col-10" : "col-12") + '"><div class="miniCarousel">';
							_.each(reqAssets, function (_asset: any, _assetIndex: any) {
								carHtml += '<div class="miniSlide animated fadeIn">';
								carHtml += '<p class="my-2 row no-gutters d-flex align-items-center">';
								carHtml +=
									'<span class="col-8 text-truncate small font-weight-bold" title="' + _asset.digitalAsset.name + '">' + _asset.digitalAsset.name + "</span>";
								carHtml +=
									'<span title="Primary Asset" class="col-2 text-right" style="padding-right:2px;">' +
									(_asset.primary ? '<i style="font-size:1.5rem" class="material-icons text-primary">star</i>' : "") +
									"</span>";
								carHtml +=
									'<span title="Asset is ' +
									($t.getAssetValidity(_asset.digitalAsset).isValid ? "Active" : "Inactive") +
									'" class="col-2 text-right active-icon-inactive" style="padding-right:2px;">' +
									($t.getAssetValidity(_asset.digitalAsset).isValid
										? '<i style="font-size:1.5rem" class="material-icons-outlined text-success">timer</i>'
										: '<i style="font-size:1.5rem" class="material-icons-outlined text-danger">timer</i>') +
									"</span>";
								carHtml += "</p>";
								carHtml +=
									'<div data-type="' +
									_asset.digitalAsset.type +
									'" class="miniImgWrap img-thumbnail min-vertical-h-20"><div style="height:200px;width:250px;background-position:center;background-repeat:no-repeat;background-size:100%" class="d-block mx-auto miniDetailsImg" data-src="' +
									$t.getAssetDownloadPath(_asset.digitalAsset.thumbnailLocation) +
									'"></div></div>';
								carHtml += '<p class="my-2 row no-gutters d-flex align-items-center">';
								const currentIndex = _assetIndex + 1;
								carHtml +=
									'<span class="col-3">' + (reqAssets.length > 1 ? "<span>" + currentIndex + "/" + reqAssets.length + "</span>" : "<span></span>") + "</span>";
								// carHtml += '<span class="col-6 text-right"><a class="miniDetails d-none curPoint btn btn-sm bg-primary text-white my-2 rounded-pill px-4">View Details</a></span>';
								carHtml +=
									'<span class="col-9 text-right"><small>Modification type : </small><span class="miniDetails badge badge-primary my-2 rounded-pill px-3 font-weight-bold">' +
									_asset.operation +
									"</span></span>";
								carHtml += "</p>";
								carHtml += "</div>";
							});
							carHtml += "</div></div></div></div>";
							return carHtml;
						},
						onShow: function () {
							let slideIndex = 1;
							const total_slides = jQuery("#miniCarousel" + reqAssets[0].digitalAsset.id).find(".miniSlide");
							jQuery(".miniPrev").addClass("disabled");
							jQuery(".miniNext").removeClass("disabled");
							const showSlides = function (_n: any) {
								let i;
								const slides = jQuery("#miniCarousel" + reqAssets[0].digitalAsset.id).find(".miniSlide");
								if (_n > slides.length) {
									slideIndex = 1;
								}
								if (_n < 1) {
									slideIndex = slides.length;
								}
								for (i = 0; i < slides.length; i++) {
									jQuery(slides[i]).addClass("d-none");
								}
								jQuery(slides[slideIndex - 1]).removeClass("d-none");
								const isImg = true;
								if (isImg) {
									const imgPath = jQuery(slides[slideIndex - 1])
										.find(".miniDetailsImg")
										.attr("data-src");
									jQuery(slides[slideIndex - 1])
										.find(".miniDetailsImg")
										.css("background-image", "url(" + imgPath + ")");
									jQuery.cacheImage(imgPath);
								}
							};
							const plusSlides = function (_n: any) {
								showSlides((slideIndex += _n));
								jQuery(".miniPrev").removeClass("disabled");
								jQuery(".miniNext").removeClass("disabled");
								if (slideIndex == total_slides.length) {
									jQuery(".miniNext").addClass("disabled");
								}
								if (slideIndex == 1) {
									jQuery(".miniPrev").addClass("disabled");
								}
							};
							const currentSlide = function (_n: any) {
								showSlides((slideIndex = _n));
							};
							showSlides(slideIndex);
							jQuery(".miniPrev").on("click", function () {
								plusSlides(-1);
							});
							jQuery(".miniNext").on("click", function () {
								plusSlides(1);
							});
							jQuery(".miniDetails").on("click", function () {
								_detailsBtnCallBack(reqAssets, n);
								jQuery(".webui-popover").remove();
							});
						},
						onHide: function () {
							jQuery(".webui-popover").remove();
						}
					});
			});
		}
	}

	fromAssetUrlToDataUrl(_url: string, _cb: any) {
		const xhrRequest = new XMLHttpRequest();
		xhrRequest.onload = () => {
			const reader = new FileReader();
			reader.onloadend = () => {
				_cb(reader.result);
			};
			reader.readAsDataURL(xhrRequest.response);
		};
		xhrRequest.open("GET", _url);
		xhrRequest.responseType = "blob";
		xhrRequest.send();
	}

	checkFileSubType(_asset: any, _subType: any) {
		return _asset.location.includes("." + _subType);
	}

	openNewAssetUploader(uploadDetails: any) {
		this.dialogConfig.data = {
			title: "Upload New Digital Asset",
			uploadDetails: uploadDetails,
			sharedServiceInstance: uploadDetails.sharedServiceInstance,
			damServiceInstance: uploadDetails.damServiceInstance,
			digitalAssetsServiceInstance: uploadDetails.digitalAssetsServiceInstance,
			onSubmit: (fromDialog: any) => {
				uploadDetails.sharedServiceInstance.communicateService.broadcast(AMAZE_COMMUNICATION_MESSAGES.DIGITAL_ASSETS_UPLOADED, fromDialog);
			}
		};
		uploadDetails.sharedServiceInstance.dialogService.open(AmazeAssetUploaderComponent, this.dialogConfig, true, true);
	}
}
