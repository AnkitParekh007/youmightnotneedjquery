// core
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, NgZone } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { untilDestroyed } from "@app/core";

// services
import { AuthenticationService } from "@app/core/authentication/authentication.service";
import { CookieService } from "ngx-cookie-service";
import { BreadCrumbService } from "@app/components/breadcrumb/breadcrumb.service";
import { AMAZE_PAGE_BREADCRUMBS } from "@app/models/enums/amaze-page-breadcrumbs.enums";
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";

// storage
import {
	AppStore,
	CatalogStore,
	ChannelStore,
	ChannelsDashboardStore,
	DamStore,
	ImportStore,
	StyleGuideReportStore,
	ReportsDashboardStore,
	ReviewDashboardStore,
	ProductSearchStore,
	SocketStore,
	ProductsDashboardStore,
	DashboardStore,
	AssortmentStore,
	LanguageStore,
	DomainsStore,
	GenAiStore
} from "@app/store/stores";

// jquery and extras
import * as $ from "jquery";
import * as _ from "underscore";
import * as moment from "moment";
import * as is from "is_js";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal, { SweetAlertOptions } from "sweetalert2";
import Smartour from "smartour";
import { AMAZE_UI_RESTRICTIONS } from "@app/models/constants/restrictions";
import { AMAZE_STATIC_RESOURCE_BASE_PATH } from "@app/models/helpers/resource-path.helper";
import "@assets/plugins/blockui/jquery.blockUI.js";
import { populate } from "@jsplumb/util";
import { APP_VERSION_INFO } from "@env/version";
declare var jQuery: any;

@Injectable({
	providedIn: "root"
})
export class UiService {
	isLoggedIn$: Observable<boolean>;
	private sidenav: MatSidenav;

	constructor(
		public router: Router,
		private authenticationService: AuthenticationService,
		public cookieService: CookieService,
		private breadCrumbService: BreadCrumbService,
		public snackBar: MatSnackBar,
		public dialogRef: MatDialog,
		public catStore: CatalogStore,
		public channelStore: ChannelStore,
		public channelsDashboardStore: ChannelsDashboardStore,
		public appStore: AppStore,
		public damStore: DamStore,
		public importStore: ImportStore,
		public styleGuideReportStore: StyleGuideReportStore,
		public reportsDashboardStore: ReportsDashboardStore,
		public reviewDashboardStore: ReviewDashboardStore,
		public productSearchStore: ProductSearchStore,
		public socketStore: SocketStore,
		public productsDashboardStore: ProductsDashboardStore,
		public dashboardStore: DashboardStore,
		public assortmentStore: AssortmentStore,
		public domainsStore: DomainsStore,
		public languageStore: LanguageStore,
		private toastrService: ToastrService,
		public genAiStore: GenAiStore,
		public _ngZone: NgZone
	) { }

	setAppVersionInfo(){
		if(typeof APP_VERSION_INFO !== "undefined" && Object.keys(APP_VERSION_INFO).length){
			const rootElement = document.getElementById("amazeRootDiv");
			rootElement.setAttribute("version", APP_VERSION_INFO.version);
			rootElement.setAttribute("environment", APP_VERSION_INFO.branch);
			rootElement.setAttribute("deploy-date", APP_VERSION_INFO.deployDate);
			rootElement.setAttribute("author-date", new Date(APP_VERSION_INFO.authorDate).toLocaleString());
		}
	}

	initDomainHoverPopop(_elem: any, _skuId: any, _attributeValues: any, _thisInstance: any, _domainName?: string) {
		let pophtml = `<div data-sku="${_skuId}" class="row w100 mx-auto domain-details-wrapper">`;
		if (_attributeValues.length) {
			_thisInstance.sharedService.plugins.undSco.each(_attributeValues, (attrVal: any) => {
				pophtml += `<span class="d-block w100 text-left px-0">Properties for Domain <span class="font-weight-bold">${_domainName ? _domainName : attrVal.name}</span> Value: <span class="font-weight-bold">${attrVal.superAttributeValueMaster.superAttributeHeaderValue}</span></span>`;
				if (attrVal.superAttributeValueMaster.superAttributeValuePropsList && attrVal.superAttributeValueMaster.superAttributeValuePropsList.length) {
					const groupedData = _thisInstance.sharedService.plugins.undSco.groupBy(attrVal.superAttributeValueMaster.superAttributeValuePropsList, (entry: any) => {
						return entry.superAttributeProperty.propertyName;
					});
					pophtml += `<table id="sku-domain-details-${attrVal.id}-table" class="table-sm">`;
					Object.keys(groupedData).forEach((key: string, kI: number) => {
						pophtml += `<tr><td class="w40 text-xs text-wrap px-0 align-top ">${key}</td><td width="3" class="align-top">:</td><td class="w100">`;
						for (let i = 0; i < groupedData[key].length; i++) {
							pophtml += `<p class="d-block w100 text-wrap word-wrap">${groupedData[key][i].superAttributePropertyValue}</p>`;
						}
						pophtml += `</td></tr>`;
					});
					pophtml += `</table>`;
				} else {
					pophtml += `<span class="font-italic px-0">No property value found.</span>`;
				}
			});
		} else {
			pophtml += `<span class="font-italic px-0">No property value found.</span>`;
		}
		pophtml + "</div>";
		jQuery(_elem).hover(
			function () {
				if (pophtml != "") {
					let leftCord;
					jQuery('<p class="domainTooltip"></p>').fadeIn(200).html(pophtml).appendTo("body");
					if ((jQuery(this).offset().left + 450) < jQuery('body').width()) {
						leftCord = jQuery(this).offset().left + (jQuery(this).width() - 30)
					} else {
						leftCord = jQuery(this).offset().left - jQuery(this).width() - 450;
						jQuery(".domainTooltip").addClass("reversed");
					}
					jQuery(".domainTooltip").css({
						top: jQuery(this).offset().top,
						left: leftCord
					});
				}
			},
			function () {
				jQuery(".domainTooltip").remove();
			}
		);
	}

	initContextDetailsPopover(_catalogKey: number, _thisInstance: any) {
		if (jQuery(".sku-context-details-trigger").length) {
			jQuery(".sku-context-details-trigger").toArray().forEach(function (elem: any) {
				jQuery(elem).webuiPopover("destroy")
					.webuiPopover({
						title: "<h3 class=\"mb-0\">Context Details</h3>",
						placement: "horizontal",
						trigger: "click",
						closeable: true,
						animation: "pop",
						width: 500,
						type: "html",
						multi: false,
						cache: false,
						content: function () {
							const skuId = jQuery(this).attr("data-sku");
							let pophtml = `<div data-sku="${skuId}" class="row w100 mx-auto pf-wrapper">
								<div id="sku-context-details-${skuId}-loader" class="col min-vertical-h-30">
								<div class="d-flex align-items-center justify-content-center w100 h100">
								<div><img class="img-fluid mx-auto d-block w30 mt-3" src="assets/img/loader/hourglass.svg"/>
								<p class="text-dark text-center">Fetching SKU Context Details...</p></div></div></div>
								<div class="col-12 p-0 d-none min-vertical-h-25 max-vertical-h-35 flow-auto stylishScroll" id="sku-context-details-${skuId}-wrap">
								<table id="sku-context-details-${skuId}-table" class="table table-hover table-bordered m-0 table-sm"></table></div>
								<div class="col-12 p-0 d-none min-vertical-h-30 max-vertical-h-30 flow-auto stylishScroll" id="sku-context-details-${skuId}-no-results">
								<div class="d-flex align-items-center justify-content-center w100 h100">
								<div><img class="img-fluid mx-auto d-block w45 mt-4" src="assets/img/amazu/sad.png"/>
								<p class="text-dark text-center">No SKU context details found</p></div></div></div></div>`;
							return pophtml;
						},
						onShow: function ($elem) {
							let info: any = [];
							const skuId = jQuery($elem).find(".webui-popover-content").children().eq(0).attr("data-sku");
							let url: string = _thisInstance.sharedService.urlService.apiCallWithParams("getSkuContextDetails", {
								"{catalogId}": _catalogKey,
								"{skuId}": skuId
							});
							_thisInstance.sharedService.configService
								.get(url, null, false, true)
								.pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(_thisInstance))
								.subscribe((data: any) => {
									const groupedData = _thisInstance.sharedService.plugins.undSco.groupBy(data, (entry: any) => {
										return entry.contextKey;
									});
									let html = "";
									Object.keys(groupedData).forEach((key: string, kI: number) => {
										if (kI == 0) html += `<tr><td class="w50 p-2 font-weight-bold text-sm amaze-bg-imp">Context</td><td class="w50 p-2 font-weight-bold text-sm amaze-bg-imp">Attributes</td></tr>`;
										let context = data.find((f: any) => f.contextKey == key);
										html += `<tr><td class="w50 p-2 text-xs">${context.contextName}</td><td class="w100 p-0"><table class="w100"><tbody>`;
										for (let i = 0; i < groupedData[key].length; i++) {
											html += `<tr class="w100"><td class="w100 block text-xs text-truncate border-none">${groupedData[key][i].attributeName}</td></tr>`;
										}
										html += `</tbody></table></td></tr>`;
									});
									jQuery(document.getElementById(`sku-context-details-${skuId}-wrap`)).addClass("d-none");
									jQuery(document.getElementById(`sku-context-details-${skuId}-loader`)).removeClass("d-none");
									jQuery(document.getElementById(`sku-context-details-${skuId}-table`)).empty();
									setTimeout(() => {
										if (html != "") {
											jQuery(document.getElementById(`sku-context-details-${skuId}-table`)).append(html);
											jQuery(document.getElementById(`sku-context-details-${skuId}-wrap`)).removeClass("d-none");
										} else {
											jQuery(document.getElementById(`sku-context-details-${skuId}-no-results`)).removeClass("d-none");
										}
										jQuery(document.getElementById(`sku-context-details-${skuId}-loader`)).addClass("d-none");
									}, 500);
								});
						}
					}
					);
			}
			);
		}
	}

	simpleValidateHtmlStr(htmlStr, strictBoolean) {
		if (typeof htmlStr !== "string") {
			return false;
		}

		let validateHtmlTag = new RegExp("<[a-z]+(s+|\"[^\"]*\"s?|'[^']*'s?|[^'\">])*>", "igm"),
			sdom = document.createElement("div"),
			noSrcNoAmpHtmlStr = htmlStr.replace(/ src=/, " svhs___src=").replace(/&amp;/gim, "#svhs#amp##"),
			noSrcNoAmpIgnoreScriptContentHtmlStr = noSrcNoAmpHtmlStr
				.replace(/\n\r?/gim, "#svhs#nl##") // temporarily remove line breaks
				.replace(/(<script[^>]*>)(.*?)(<\/script>)/gim, "$1$3")
				.replace(/#svhs#nl##/gim, "\n\r"), // re-add line breaks
			htmlTags = noSrcNoAmpIgnoreScriptContentHtmlStr.match(/<[a-z]+[^>]*>/gim),
			htmlTagsCount = htmlTags ? htmlTags.length : 0,
			tagsAreValid,
			resHtmlStr;
		if (!strictBoolean) {
			noSrcNoAmpHtmlStr = noSrcNoAmpHtmlStr.replace(/<br\s*\/>/, "<br>");
		}

		if (htmlTagsCount) {
			tagsAreValid = htmlTags.reduce(function (isValid, tagStr): any {
				return isValid && tagStr.match(validateHtmlTag);
			}, true);

			if (!tagsAreValid) {
				return false;
			}
		}

		try {
			sdom.innerHTML = noSrcNoAmpHtmlStr;
		} catch (err) {
			return false;
		}

		if (sdom.querySelectorAll("*").length !== htmlTagsCount) {
			return false;
		}

		resHtmlStr = sdom.innerHTML.replace(/&amp;/gim, "&"); // undo '&' encoding

		if (!strictBoolean) {
			// ignore empty attribute normalizations
			resHtmlStr = resHtmlStr.replace(/=""/, "");
		}

		// compare html strings while ignoring case, quote-changes, trailing spaces
		const simpleIn = noSrcNoAmpHtmlStr.replace(/["']/gim, "").replace(/\s+/gim, " ").toLowerCase().trim(),
			simpleOut = resHtmlStr.replace(/["']/gim, "").replace(/\s+/gim, " ").toLowerCase().trim();
		if (simpleIn === simpleOut) {
			return true;
		}
		return resHtmlStr.replace(/ svhs___src=/gim, " src=").replace(/#svhs#amp##/, "&amp;");
	}

	showNavigationComponents() {
		this.isLoggedIn$ = this.authenticationService.loggedIn;
		this.router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				if (event["url"] == "/login") {
					this.isLoggedIn$.subscribe((evt) => {
						return false;
					});
				} else {
					this.isLoggedIn$ = this.authenticationService.loggedIn;
				}
			}
		});
	}

	sideNavConfigurations() {
		const $this = this;
		const Layout = (function () {
			function e() {
				$(".sidenav-toggler").addClass("active"),
					$(".sidenav-toggler").data("action", "sidenav-unpin"),
					$("body").removeClass("g-sidenav-hidden").addClass("g-sidenav-show g-sidenav-pinned"),
					$("body").append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $("#sidenav-main").data("target") + " />"),
					$this.cookieService.set("sidenav-state", "pinned");
			}
			function a() {
				$(".sidenav-toggler").removeClass("active"),
					$(".sidenav-toggler").data("action", "sidenav-pin"),
					$("body").removeClass("g-sidenav-pinned").addClass("g-sidenav-hidden"),
					$("body").find(".backdrop").remove(),
					$this.cookieService.set("sidenav-state", "unpinned");
			}
			const t = $this.cookieService.get("sidenav-state") ? $this.cookieService.get("sidenav-state") : "pinned";
			$(window).width() > 1200 && ("pinned" == t && e(), "unpinned" == $this.cookieService.get("sidenav-state") && a()),
				$("body").on("click", "[data-action]", function (t) {
					t.preventDefault();
					const n = $(this),
						i = n.data("action");
					n.data("target");
					switch (i) {
						case "sidenav-pin":
							e();
							break;
						case "sidenav-unpin":
							a();
							break;
						case "search-show":
							n.data("target"),
								$("body").removeClass("g-navbar-search-show").addClass("g-navbar-search-showing"),
								setTimeout(function () {
									$("body").removeClass("g-navbar-search-showing").addClass("g-navbar-search-show");
								}, 150),
								setTimeout(function () {
									$("body").addClass("g-navbar-search-shown");
								}, 300);
							break;
						case "search-close":
							n.data("target"),
								$("body").removeClass("g-navbar-search-shown"),
								setTimeout(function () {
									$("body").removeClass("g-navbar-search-show").addClass("g-navbar-search-hiding");
								}, 150),
								setTimeout(function () {
									$("body").removeClass("g-navbar-search-hiding").addClass("g-navbar-search-hidden");
								}, 300),
								setTimeout(function () {
									$("body").removeClass("g-navbar-search-hidden");
								}, 500);
					}
				}),
				$(".sidenav").on("mouseenter", function () {
					$("body").hasClass("g-sidenav-pinned") || $("body").removeClass("g-sidenav-hide").removeClass("g-sidenav-hidden").addClass("g-sidenav-show");
				}),
				$(".sidenav").on("mouseleave", function () {
					$("body").hasClass("g-sidenav-pinned") ||
						($("body").removeClass("g-sidenav-show").addClass("g-sidenav-hide"),
							setTimeout(function () {
								$("body").removeClass("g-sidenav-hide").addClass("g-sidenav-hidden");
							}, 300));
				}),
				$(window).on("load resize", function () {
					$("body").height() < 800 && ($("body").css("min-height", "100vh"), $("#footer-main").addClass("footer-auto-bottom"));
				});
		})();
	}

	mapByKey(_array, mapBy, _extra) {
		const mappedArray = _array.map((val) => {
			const item = Object(val[mapBy]);
			item[_extra] = val[_extra];
			return item;
		});
		return mappedArray;
	}

	preventDefaultBehaviour(_event) {
		_event.preventDefault();
		_event.stopPropagation();
		_event.stopImmediatePropagation();
	}

	scrollToTop(_elem: any) {
		const elem = jQuery(_elem);
		elem.length ? $(elem).animate({ scrollTop: 0 }, 1000) : "";
	}

	scrollToBottom(_elem: any) {
		const elem = jQuery(_elem);
		if (elem.length) {
			$(elem).animate({ scrollTop: $(elem).prop("scrollHeight") }, 1000);
		}
	}

	blockElement(_elem: any, _toShow: boolean, _message?: any, _customCss?: any) {
		if (jQuery(_elem).length) {
			if (_toShow) {
				jQuery(_elem).block({
					message: _message ? _message : null,
					css: {
						border: "none",
						padding: "0.85rem",
						backgroundColor: "#000",
						"-webkit-border-radius": "10px",
						"-moz-border-radius": "10px",
						opacity: 0.5,
						color: "#fff",
						...(typeof _customCss !== "undefined" ? _customCss : {})
					}
				});
			} else {
				jQuery(_elem).unblock();
			}
		}
	}

	scrollToAndHighLightElement(_elemId: any, _message?: any, _messagePosition?: any, _noHighlight?: boolean) {
		const $t = this;
		function smoothScroll(elem, options) {
			return new Promise((resolve) => {
				if (!(elem instanceof Element)) {
					throw new TypeError("Argument 1 must be an Element");
				}
				let same = 0;
				let lastPos = null;
				const scrollOptions = Object.assign({ behavior: "smooth" }, options);
				elem.scrollIntoView(scrollOptions);
				requestAnimationFrame(check);
				function check() {
					const newPos = elem.getBoundingClientRect().top;
					if (newPos === lastPos) {
						if (same++ > 2) {
							return resolve(null);
						}
					} else {
						same = 0;
						lastPos = newPos;
					}
					requestAnimationFrame(check);
				}
			});
		}
		if (jQuery(document.getElementById(_elemId)) != null) {
			smoothScroll(document.getElementById(_elemId), {
				block: "center"
			}).then(() => {
				typeof _noHighlight === "undefined" ? $t.highlightElement(_elemId, _message, _messagePosition) : "";
			});
		}
	}

	setToolbarHoverEvents() {
		const renderedToolbars = jQuery(document).find(".catalog-toolbars:not(.hover-event-binded)");
		if (renderedToolbars.length) {
			setTimeout(() => {
				jQuery(renderedToolbars).addClass("hover-event-binded");
				jQuery(renderedToolbars)
					.find(".col.primary-link:not(.d-none), .col-auto.order-last.primary-link.more-link:not(.d-none)")
					.on("mouseenter", function (e: any) {
						const cur = jQuery(e.currentTarget);
						if (!jQuery(cur).find("button").prop("disabled")) {
							jQuery(cur).addClass("bg-primary curPoint");
							jQuery(cur).find(".material-icons-outlined, .fa, .text-xs").addClass("text-white");
						}
					})
					.on("mouseleave", function (e: any) {
						const cur = jQuery(e.currentTarget);
						jQuery(cur).removeClass("bg-primary curPoint");
						jQuery(cur).find(".material-icons-outlined, .fa, .text-xs").removeClass("text-white");
					});
			}, 1000);
		}
	}

	handleResponseiveToolbar(containerElement: HTMLElement, trigger: MatMenuTrigger) {
		if (!_.isUndefined(containerElement) && !_.isUndefined(trigger) && !_.isNull(containerElement) && !_.isNull(trigger)) {
			const container: HTMLElement = containerElement;
			const parentCurrentWidth = container.getAttribute("containerwidth");
			const proceedResize = typeof parentCurrentWidth === "undefined" ? true : parseInt(parentCurrentWidth) != container.offsetWidth;
			// adapt resizing
			const doAdapt = () => {
				const allItems: NodeListOf<Element> = container.querySelectorAll(".primary-link");
				const primaryItems: NodeListOf<Element> = container.querySelectorAll(".primary-link:not(.more-link)");
				const moreItem: HTMLElement = container.querySelector(".more-link");

				trigger.openMenu();
				trigger.closeMenu();
				moreItem.getElementsByTagName("MAT-MENU")[0].classList.add("secondary-link");

				const secondary: HTMLElement = document.querySelector(".mat-menu-panel.secondary-link .mat-menu-content");
				const secondaryItems: NodeListOf<Element> = secondary.querySelectorAll(".mat-menu-item");

				// reveal all items for the calculation
				allItems.forEach((item) => {
					item.classList.remove("d-none");
				});

				// hide items that won't fit in the Primary
				let stopWidth = moreItem.offsetWidth;
				const hiddenItems = [];
				const primaryWidth = container.offsetWidth;
				primaryItems.forEach((item: HTMLElement, i) => {
					if (primaryWidth >= stopWidth + 60) {
						stopWidth += 60;
					} else {
						item.classList.add("d-none");
						hiddenItems.push(i);
					}
				});
				// Checking if last index is not present in secondary items, if not changing it to the last one
				hiddenItems.forEach((hidden, hI) => {
					hidden > secondaryItems.length - 1 ? (hiddenItems[hI] = secondaryItems.length - 1) : "";
				});
				// toggle the visibility of More button and items in Secondary
				if (!hiddenItems.length) {
					moreItem.classList.add("d-none");
					container.classList.remove("--show-secondary");
				} else {
					container.classList.add("--show-secondary");
					secondaryItems.forEach((item, i) => {
						if (!hiddenItems.includes(i)) {
							item.classList.add("d-none");
						} else {
							item.classList.remove("d-none");
						}
					});
				}
			};
			if (proceedResize) {
				container.setAttribute("containerwidth", container.offsetWidth.toString());
			}
			doAdapt();
		}
	}

	animateCSS(element: any, animationName: any, callback: any) {
		const node = document.querySelector(element);
		node.classList.add("animated", animationName);
		const handleAnimationEnd = function () {
			node.classList.remove("animated", animationName);
			node.removeEventListener("animationend", handleAnimationEnd);
			if (typeof callback === "function") {
				callback();
			}
		};
		node.addEventListener("animationend", handleAnimationEnd);
	}

	dynamicSort(property: any) {
		let sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			return result * sortOrder;
		};
	}

	pluralizeOnCount(count: number, noun: string) {
		return (count > 1 ? noun + "s" : noun).toString();
	}

	pluralizeOnCondition(condition: boolean, noun: string) {
		return (condition ? noun + "s" : noun).toString();
	}

	capitalize(str: string) {
		return str
			.toLowerCase()
			.split(" ")
			.map(function (word) {
				return word[0].toUpperCase() + word.substr(1);
			})
			.join(" ");
	}

	resizePageGridsOnSideNavToggleEvent() {
		const $grids = jQuery("amaze-jqgrid");
		if ($grids.length) {
			jQuery($grids).each(function (k, v) {
				jQuery(v).parent().resize();
			});
		}
	}

	sideNavOperations(_opName: any, sidenav?: any) {
		if (_opName == "set") {
			this.sidenav = sidenav;
		} else {
			if (typeof this.sidenav !== "undefined") {
				switch (_opName) {
					case "open":
						setTimeout(() =>
							$(".amaze-side-nav")
								.find(".material-icons")
								.addClass("material-icons-outlined")
								.removeClass("material-icons")
								.css({ "font-size": "20px", display: "block" })
						);
						return this.sidenav.open();
						break;
					case "close":
						return this.sidenav.close();
						break;
					case "toggle":
						this.sidenav.toggle();
						this.resizePageGridsOnSideNavToggleEvent();
						break;
					case "expand":
						this.toggleAction("Expanded");
						break;
					case "collapse":
						this.toggleAction("Collapsed");
						break;
					case "isOpen":
						return this.sidenav.opened;
						break;
				}
			}
		}
	}

	toggleAction(_status: any) {
		jQuery(".amazeSideNav")
			.removeClass("amazeSideNav" + this.getOpositeStatus(_status))
			.addClass("amazeSideNav" + _status);

		jQuery("#mainMenuImage" + this.getOpositeStatus(_status))
			.removeClass("main-menu-image-visible")
			.addClass("main-menu-image-hidden");

		jQuery("#mainMenuImage" + _status)
			.removeClass("main-menu-image-hidden")
			.addClass("main-menu-image-visible");
	}

	getOpositeStatus(_status: any) {
		return _status && _status === "Expanded" ? "Collapsed" : "Expanded";
	}

	showAttributeMetaDataPopover(elementRef: any, attribute: any) {
		const $t = this;
		let content =
			'<div><div class="row no-gutters metadata-tabs mb-2"><div class="col-6 p-1 amaze-bg active small tab text-center curPoint">Meta Tag</div><div class="col-6 p-1 amaze-bg tab small text-center curPoint">Meta Attribute</div></div>';
		const makeMetaInnerTables = (_isMetaTag: boolean, _metaCollections: any) => {
			let reqHtml =
				'<div class="metaPop"><table id="' +
				(_isMetaTag ? "metaTagTable" : "metaAttributeTable") +
				'" class="animated table table-sm table-bordered table-hover bg-white m-auto mt-1 ' +
				(_isMetaTag ? "" : "d-none") +
				'"><tbody><tr><td class="font-weight-bold">Name</td>' +
				(_isMetaTag ? "" : '<td class="font-weight-bold">Value</td>') +
				"</tr>";
			if (typeof _metaCollections !== "undefined" && _metaCollections.length) {
				_metaCollections.forEach((d: any, i: number) => {
					reqHtml +=
						'<tr><td class="text-wrap align-middle"><div class="text-xs">' +
						(_isMetaTag ? d.attributeMetatagName : d.attributeMetaAttribute.attributeMetaAttributeName);
					("&nbsp &nbsp");

					reqHtml += `<span class="align-middle popup-inception ml-3" data-is-metatag="${_isMetaTag}" data-index="${i}">`;
					if (_isMetaTag) {
						if (d.attributeMetatagDescription) {
							reqHtml += '<i class="material-icons" amaze-tooltip="' + d.attributeMetatagDescription + '">info</i></span></div></td>';
						}
					} else {
						if (d.attributeMetaAttribute.attributeMetaAttributeDescription) {
							reqHtml += '<i class="material-icons" amaze-tooltip="' + d.attributeMetaAttribute.attributeMetaAttributeDescription + '">info</i></span></div></td>';
						}
					}
					if (!_isMetaTag) {
						reqHtml +=
							'<td class="text-wrap">' + (typeof d.schemaMetaAttributeValue !== "undefined" ? d.schemaMetaAttributeValue : d.attributeMetaAttributeValue) + "</td>";
					}
					reqHtml += "</tr>";
				});
			} else {
				reqHtml += '<tr><td class="text-wrap text-center" colspan="' + (_isMetaTag ? "2" : "3") + '">No Data Available</td></tr>';
			}
			reqHtml += "</tbody></table></div>";
			return reqHtml;
		};
		content += makeMetaInnerTables(true, attribute.attributeMetatag);
		content += makeMetaInnerTables(false, attribute.metaAttributes);
		content += "</div>";
		if (
			(typeof attribute.attributeMetatag !== "undefined" && attribute.attributeMetatag.length) ||
			(typeof attribute.metaAttributes !== "undefined" && attribute.metaAttributes.length)
		) {
			jQuery(elementRef).webuiPopover({
				title: "Metadata Info:",
				content: content,
				closeable: true,
				trigger: "hover",
				animation: "pop",
				type: "html",
				multi: false,
				placement: "left",
				width: "350",
				onHide: function () {
					jQuery(".webui-popover").remove();
				},
				onShow: function ($element) {
					$t._ngZone.run(() => {
						jQuery($element)
							.find(".metadata-tabs .tab")
							.on("click", function (e) {
								const currentElem = jQuery(e.currentTarget);
								jQuery(currentElem).parent().find(".tab").removeClass("active");
								jQuery(currentElem).addClass("active");
								const parentSel: any = jQuery(currentElem).parent().parent();
								parentSel.find("#metaTagTable").toggleClass("d-none", jQuery(currentElem).text() != "Meta Tag");
								parentSel.find("#metaAttributeTable").toggleClass("d-none", jQuery(currentElem).text() == "Meta Tag");
							});
						jQuery($element)
							.find(".popup-inception")
							.on("mouseover", function (e) {
								const currentElem = jQuery(e.currentTarget);
								const _isMetaTag = jQuery(this).attr("data-is-metatag");
								const index = jQuery(this).attr("data-index");
								let contentDisc = "";
								let desc = "";
								_isMetaTag == "true"
									? (desc = attribute.attributeMetatag[index].attributeMetatagDescription)
									: (desc = attribute.metaAttributes[index].attributeMetaAttribute.attributeMetaAttributeDescription);
								contentDisc = `<div class="text-wrap text-xs">${desc}</div>`;
								jQuery(currentElem).webuiPopover({
									title: "Description",
									trigger: "hover",
									animation: "pop",
									type: "html",
									multi: true,
									content: contentDisc,
									placement: "right",
									closeable: true,
									width: 300,
									height: "auto"
								});
								jQuery(currentElem).webuiPopover("show");
							});
					});
				}
			});
			jQuery(elementRef).webuiPopover("show");
		}
	}

	highlightElement(_elementId: any, _message: any, _position?: string) {
		const html: string =
			'<div class="row justify-content-around no-gutters position-relative ' +
			(_position ? _position + "--2" : "top--2") +
			' bg-white py-3 px-4 rounded"><div class="col-auto"><img class="img-fluid" width="30" src="' +
			imagesPath.amazu.explain +
			'"></div><div class="col d-flex align-items-center"><p class="small text-dark text-wrap w90 text-left font-weight-bold mb-0 w100 ml-2 max-horizontal-w-25">' +
			_message +
			"</p></div></div>";
		const tour = new Smartour();
		const opts: any = {
			el: ("#" + _elementId).toString(),
			slot: html,
			options: { slotPosition: _position ? _position : "top" }
		};
		try {
			tour.focus(opts);
		} catch (e) {
			console.error(e);
		}
	}

	unHighlightElement() {
		if (document.querySelector(".smartour-layer") != null) {
			(<HTMLElement>document.querySelector(".smartour-layer")).click();
		}
	}

	closeAllWindowPopups() {
		this.dialogRef.closeAll();
		const sweetAlertCancel = document.querySelector(".swal2-cancel") as HTMLElement;
		if (sweetAlertCancel) {
			sweetAlertCancel.click();
		}
	}

	randomIdGeneretor() {
		return Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(2, 10);
	}

	showMessage(msg: any): void {
		this.snackBar.open(msg, "", { duration: 4000 });
	}

	staticAssetPath(_assetPath: any) {
		return typeof (_assetPath !== "undefined") ? AMAZE_STATIC_RESOURCE_BASE_PATH + _assetPath : "";
	}

	showAmazuMsg(_amazuType: any, _message: any): void {
		const amazuImg = imagesPath.amazu[_amazuType];
		let html = "";

		html += '<div class="row no-gutters position-relative bg-white rounded mx-auto">';
		html += '<div class="col-auto"><img class="img-fluid" width="30" src="' + amazuImg + '"></div>';
		html += '<div class="col d-flex align-items-center"><p class="text-dark text-wrap w-auto text-left font-weight-bold mb-0 w100 ml-2">' + _message + "</p></div>";
		html += "</div>";
		const swOptions: SweetAlertOptions = {
			html: html,
			position: "bottom",
			showConfirmButton: false,
			showCancelButton: false,
			timer: 4000,
			customClass: {
				title: "amaze-bg p-1",
				popup: "amaze-bg w-auto"
			}
		};
		Swal.fire(swOptions);
	}

	showSimplePopMsg(msgType: any, msgTitle: any, msg: any): void {
		Swal.fire({
			title: msgTitle, // title of the modal
			text: msg, // description of the modal
			icon: msgType, // warning, error, success, info, and question,
			backdrop: true
		});
	}

	showSimplePopMsgWithHTML(msgType: any, msgTitle: any, msgHtml: any, msg: any): void {
		Swal.fire({
			title: msgTitle, // description of the modal
			text: msg, // title of the modal
			html: msgHtml,
			icon: msgType, // warning, error, success, info, and question,
			backdrop: true
		});
	}

	closePopMsg() {
		Swal.close();
	}

	showApiStartPopMsg(msg: any): void {
		Swal.fire({
			title: msg, // title of the modal
			text: "Please wait ...", // description of the modal
			imageUrl: "assets/img/loader/hourglass.svg",
			imageWidth: 125,
			imageHeight: 125,
			icon: undefined,
			backdrop: true,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			showConfirmButton: false,
			showCancelButton: false
		});
	}

	showApiSuccessPopMsg(msg: any): void {
		Swal.fire({
			title: msg, // title of the modal
			text: "", // description of the modal
			icon: "success", // warning, error, success, info, and question,
			backdrop: true,
			allowOutsideClick: true,
			allowEscapeKey: true,
			allowEnterKey: true,
			timer: 6000,
			customClass: {
				popup: "d-block"
			}
		});
	}

	showApiErrorPopMsg(msg: any): void {
		Swal.fire({
			title: msg, // title of the modal
			text: "", // description of the modal
			icon: "error", // warning, error, success, info, and question,
			backdrop: true,
			allowOutsideClick: true,
			allowEscapeKey: true,
			allowEnterKey: true,
			customClass: {
				popup: "d-block"
			}
		});
	}

	showToastrMsg(_case: string, _msg: string, _title?: string, _options?: any, _callBack?: Function): void {
		// _case options - success, error, info, warning,
		var props = { progressBar: false, messageClass: "text-xs" };
		this.toastrService[_case](_msg, (_title ? _title : null), (_options ?
			{ ..._options, ...props } : props))
			.onTap.subscribe(() => {
				_callBack();
			}
			);
	};

	showLoginLoading() {
		const $t = this;
		jQuery(".login-wrapper").addClass("d-none");
		var html = () => {
			var path = () => {
				const specialDay = $t.checkIsSpecialDay(moment().format("YYYY-MM-DD"));
				var path = "/assets/img/logo/new_03_06_2023/bm_bounce_ball.gif";
				if (typeof specialDay !== "undefined") {
					switch (specialDay) {
						case "Christmas Day":
						case "Christmas Eve":
							path = "/assets/img/logo/new_03_06_2023/bm_christmas_bounce_ball.gif";
							break;
					}
				}
				return path;
			};
			return (
				'<div class="row"><div class="col text-center"><img class="img-fluid m-0 bg-transparent mx-auto" src="' + $t.staticAssetPath(path()) + '" /></div></div>'
				// <h2 class="mt-2 text-primary">Please hold for a while....</h2><p class="text-orange">Logging you into the System.</p></div></div>'
			);
		};
		const swOptions: SweetAlertOptions = {
			html: html(),
			width: "100%",
			background: "#fff",
			backdrop: false,
			grow: "fullscreen",
			showConfirmButton: false,
			showCancelButton: false,
			allowOutsideClick: false,
			timer: 300000,
			padding: 0,
			customClass: {
				container: "bg-transparent shadow-none position-absolute top-0 w100 min-vertical-h-100 d-flex align-items-center",
				popup: "bg-transparent shadow-none",
				htmlContainer: "bg-transparent shadow-none overflow-hidden position-relative top--7"
			},
			willClose: () => {
				setTimeout(() => {
					jQuery(".login-wrapper").removeClass("d-none");
				}, 5000);
			}
		};
		Swal.fire(swOptions);
	}

	getClientCode() {
		const serverParams = sessionStorage.getItem("Amaze-storage--appstate");
		let reqHeaders: any;
		let clientCode = "";
		if (serverParams != null) {
			reqHeaders = serverParams != null ? JSON.parse(JSON.parse(serverParams)) : {};
			clientCode = Object.keys(reqHeaders).length ? reqHeaders.serverParams.clientCode.toString() : "";
		}
		return clientCode;
	}

	getCatalogId(catalog) {
		const $t = this;
		let resultantIdentity = undefined;
		if (is.not.undefined(catalog) && is.not.empty(catalog) && is.not.null(catalog)) {
			if (_.has(catalog, "catalogKey")) {
				resultantIdentity = catalog.catalogKey;
			} else if (_.has(catalog, "catalogId")) {
				resultantIdentity = catalog.catalogId;
			} else if (_.has(catalog, "id")) {
				resultantIdentity = catalog.id;
			}
		}
		return resultantIdentity;
	}

	getParams(url) {
		const params = {};
		const parser = document.createElement("a");
		parser.href = url;
		const query = parser.search.substring(1);
		const vars = query.split("&");
		for (let i = 0; i < vars.length; i++) {
			const pair = vars[i].split("=");
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	}

	setServerParamsForPlugins(_xhr) {
		const serverParams = sessionStorage.getItem("Amaze-storage--appstate");
		_xhr.setRequestHeader("Content-Type", "application/json");
		_xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
		_xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		_xhr.setRequestHeader("Cache-Control", "no-cache");
		_xhr.setRequestHeader("Pragma", "no-cache");
		_xhr.setRequestHeader("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");
		_xhr.setRequestHeader("If-Modified-Since", "0");
		if (serverParams != null) {
			const reqHeaders = JSON.parse(JSON.parse(serverParams));
			_xhr.setRequestHeader("X-Customer-Code", reqHeaders.serverParams.clientCode);
			_xhr.setRequestHeader("X-Timezone", reqHeaders.serverParams.timezone);
			_xhr.setRequestHeader("X-Access-Token", reqHeaders.serverParams.token);
			_xhr.setRequestHeader("X-Oauth-Provider", reqHeaders.serverParams.provider);
		}
	}

	getServerParams() {
		let uploadHttpHeaders: HttpHeaders = new HttpHeaders();
		uploadHttpHeaders = uploadHttpHeaders.set("Content-Type", "application/json");
		uploadHttpHeaders = uploadHttpHeaders.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
		uploadHttpHeaders = uploadHttpHeaders.set("Access-Control-Allow-Origin", "*");
		uploadHttpHeaders = uploadHttpHeaders.set("Cache-Control", "no-cache");
		uploadHttpHeaders = uploadHttpHeaders.set("Pragma", "no-cache");
		uploadHttpHeaders = uploadHttpHeaders.set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");

		const serverParams = sessionStorage.getItem("Amaze-storage--appstate");
		if (serverParams != null) {
			const reqHeaders = JSON.parse(JSON.parse(serverParams));
			uploadHttpHeaders = uploadHttpHeaders.set("X-Customer-Code", reqHeaders.serverParams.clientCode);
			uploadHttpHeaders = uploadHttpHeaders.set("X-Timezone", reqHeaders.serverParams.timezone);
			uploadHttpHeaders = uploadHttpHeaders.set("X-Access-Token", reqHeaders.serverParams.token);
			uploadHttpHeaders = uploadHttpHeaders.set("X-Oauth-Provider", reqHeaders.serverParams.provider);
		}
		return uploadHttpHeaders;
	}

	getSearchLimitGeneral() {
		let searchlimit: any = 1;
		const appInstance: any = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		const count: any = appInstance.amazeParams.find((p: any) => p.parameterCode == "UI_KEYSTROKE_SEARCH_MINIMUM_CHARACTERS_GENERAL");
		if (appInstance && count && count.parameterSetValue) {
			searchlimit = Number(count.parameterSetValue);
		}
		return searchlimit;
	}

	getSearchLimitUom() {
		let searchlimit: any = 1;
		const appInstance: any = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		const count: any = appInstance.amazeParams.find((p: any) => p.parameterCode == "UI_KEYSTROKE_SEARCH_MINIMUM_CHARACTERS_UOM");
		if (appInstance && count && count.parameterSetValue) {
			searchlimit = Number(count.parameterSetValue);
		}
		return searchlimit;
	}

	getTablePaginationCount() {
		let limit: any = 25;
		const appInstance: any = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		const count: any =
			appInstance.amazeParams != null && appInstance.amazeParams.length
				? appInstance.amazeParams.find((p: any) => p.parameterCode == "UI_RECORDS_TO_DISPLAY_PER_PAGE")
				: null;
		if (appInstance && count && count.parameterSetValue) {
			limit = Number(count.parameterSetValue);
		}
		return limit;
	}

	getSpecificTablePaginationCount(gird?) {
		let limit: any = 25;
		const appInstance: any = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		const count: any = appInstance.amazeParams.find((p: any) => p.parameterCode == "UI_RECORDS_TO_DISPLAY_PER_PAGE_SCHEMA");
		if (appInstance && count && count.parameterSetValue) {
			limit = Number(count.parameterSetValue);
		}
		return limit;
	}

	setAmazeTooltips(_position?: any, _onShowCallBack?: any) {
		jQuery("[amaze-tooltip]")
			.webuiPopover("destroy")
			.webuiPopover({
				title: "",
				content: function (d: any) {
					return (
						"<p " +
						($(this).attr("is-title") && $(this).attr("is-title") == "true" ? 'is-title="true"' : "") +
						' class="m-2 small max-horizontal-w-20 text-wrap">' +
						$(this).attr("amaze-tooltip") +
						"</p>"
					);
				},
				trigger: "hover",
				animation: "pop",
				multi: false,
				placement: typeof _position === "undefined" ? "auto-top" : _position,
				style: "inverse",
				padding: false,
				arrow: false,
				onShow: function ($element) {
					jQuery($element).css("top", parseInt(jQuery($element).css("top").replace("px", "")) - 10 + "px");
					typeof _onShowCallBack !== "undefined" ? _onShowCallBack($element) : "";
				},
				onHide: function ($element) {
					jQuery($element).remove();
				}
			});
	}

	hideAmazeTooltips(){
		jQuery("[amaze-tooltip]").webuiPopover("hide");
	}

	removeAmazeTooltips() {
		jQuery("[amaze-tooltip]").webuiPopover("destroy");
	}

	get getAmazeParams() {
		const aP: any = {};
		const appInstance = this.getAppStore;
		if (typeof appInstance !== "undefined" && typeof appInstance.amazeParams !== "undefined") {
			appInstance.amazeParams.forEach((elem: any, index: any, ar: any) => {
				aP[elem.parameterCode] = {
					default: elem.parameterDefaultValue,
					current: elem.parameterSetValue
				};
			});
		}
		return aP;
	}

	get getMaxTitleCharacterLimit() {
		return 250;
	}

	productTitleCharacterLimitValidator(_isSwal: boolean, _elem: any, _gridId?: string, _saveButton?: any) {
		const $t = this;
		var error =
			'<span class="text-danger text-xs text-wrap">' +
			("Product title character limit exceeded. Please enter less than or equal to " + $t.getMaxTitleCharacterLimit + " characters.") +
			"</span>";
		if (_isSwal) {
			jQuery(_elem)
				.find(".view-details-title-input")
				.on("keyup", (_e) => {
					if (_e.currentTarget.value.length > $t.getMaxTitleCharacterLimit) {
						jQuery(_e.currentTarget).addClass("border-danger border-1").removeClass("border-0");
						!jQuery("#sku-title-manipulation-tbl tr:last").hasClass("title-error-msg")
							? jQuery("#sku-title-manipulation-tbl > tbody").append('<tr class="title-error-msg"></tr>')
							: "";
						jQuery("#sku-title-manipulation-tbl tr:last").hasClass("title-error-msg") ? jQuery("#sku-title-manipulation-tbl tr:last").html(error) : "";
						jQuery(_elem).find(".sku-title-manipulation-confirm-button").addClass("ui-state-disabled").attr("style", "background-color: gray !important");
					} else {
						jQuery(_e.currentTarget).removeClass("border-danger border-1").addClass("border-0");
						jQuery("#sku-title-manipulation-tbl tr.title-error-msg").remove();
						jQuery(_elem).find(".sku-title-manipulation-confirm-button").removeClass("ui-state-disabled").attr("style", "background-color: #6438a7 !important");
					}
				});
		} else {
			jQuery(_elem).on("keyup", (_e) => {
				if (_e.currentTarget.value.length > $t.getMaxTitleCharacterLimit) {
					jQuery(_e.currentTarget).addClass("border-danger border-1").removeClass("border-0");
					jQuery("#" + _gridId + "-jqgrid-title-error-msg").length == 0
						? jQuery(_e.currentTarget).after('<span id="' + _gridId + '-jqgrid-title-error-msg">' + error + "</span>")
						: "";
					typeof _saveButton !== "undefined" ? jQuery(_saveButton).addClass("ui-state-disabled") : "";
					typeof _saveButton !== "undefined"
						? !jQuery(_saveButton).hasClass("mat-button-disabled")
							? jQuery(_saveButton).attr("style", "background-color: gray !important")
							: ""
						: "";
				} else {
					jQuery(_e.currentTarget).removeClass("border-danger border-1").addClass("border-0");
					jQuery("#" + _gridId + "-jqgrid-title-error-msg").remove();
					typeof _saveButton !== "undefined" ? jQuery(_saveButton).removeClass("ui-state-disabled") : "";
					typeof _saveButton !== "undefined"
						? !jQuery(_saveButton).hasClass("mat-button-disabled")
							? jQuery(_saveButton).attr("style", "background-color: #6438a7 !important")
							: ""
						: "";
				}
			});
		}
	}

	currentPage() {
		const appState = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		return appState.currentPage;
	}

	public getCatalogDomainGroupedData(_unGroupedCatalogdata: any) {
		const groupedCatalogData = [];
		if (_unGroupedCatalogdata.length) {
			const cdt = _.groupBy(_unGroupedCatalogdata, function (ct: any) {
				return ct.catalogKey;
			});
			Object.keys(cdt).forEach((c) => {
				const gd: any = {};
				gd["catalogKey"] = cdt[c][0]["catalogKey"];
				gd["catalogName"] = cdt[c][0]["catalogName"];
				gd["catalogDescription"] = typeof cdt[c][0]["catalogDescription"] !== "undefined" ? cdt[c][0]["catalogDescription"] : "";
				gd["domains"] = [];
				gd["locked"] = false;
				cdt[c].forEach((cd: any) => {
					cd.id = cd.domainKey;
					gd["domains"].push(cd);
				});
				gd["selectedDomain"] = gd["domains"][0];
				gd["locked"] = gd["domains"].some((e) => e.locked);
				typeof cdt[c][0]["baseLocale"] !== "undefined" ? (gd["baseLocale"] = cdt[c][0]["baseLocale"]) : "";
				groupedCatalogData.push(gd);
			});
		}
		return groupedCatalogData;
	}

	updateBreadCrumbs(moduleName: string, submodules?: any) {
		const catalogStore = this.getCatStore;
		const channelStore = this.getChannelStore;
		const breadCrumb = [];

		if (is.undefined(submodules)) {
			switch (moduleName) {
				case AMAZE_PAGE_BREADCRUMBS.ADVANCED_SKU_SEARCH:
				case AMAZE_PAGE_BREADCRUMBS.API_MANAGEMENT:
				case AMAZE_PAGE_BREADCRUMBS.ATTRIBUTE_VALUE_LOCK:
				case AMAZE_PAGE_BREADCRUMBS.ASSORTMENTS:
				case AMAZE_PAGE_BREADCRUMBS.GEN_AI_RULES:
				case AMAZE_PAGE_BREADCRUMBS.BRIDGE_SYNCHRONIZATION:
				case AMAZE_PAGE_BREADCRUMBS.CATALOG_EXPORT_TEMPLATES:
				case AMAZE_PAGE_BREADCRUMBS.CATALOG_EXPORTS:
				case AMAZE_PAGE_BREADCRUMBS.CATALOG_IMPORTS:
				case AMAZE_PAGE_BREADCRUMBS.CATALOGS:
				case AMAZE_PAGE_BREADCRUMBS.CHANNELS_DASHBOARD:
				case AMAZE_PAGE_BREADCRUMBS.CHANNELS:
				case AMAZE_PAGE_BREADCRUMBS.CONNECTORS:
				case AMAZE_PAGE_BREADCRUMBS.DASHBOARD:
				case AMAZE_PAGE_BREADCRUMBS.DIGITAL_ASSET_IMPORT:
				case AMAZE_PAGE_BREADCRUMBS.DIGITAL_ASSETS_LIBRARY:
				case AMAZE_PAGE_BREADCRUMBS.DOMAINS:
				case AMAZE_PAGE_BREADCRUMBS.EXTERNAL_FILE_LOCATION_STEUP:
				case AMAZE_PAGE_BREADCRUMBS.FORMULA_MASTER:
				case AMAZE_PAGE_BREADCRUMBS.HELP_CENTER_DOWNLOADS:
				case AMAZE_PAGE_BREADCRUMBS.IMPORT_TEMPLATES:
				case AMAZE_PAGE_BREADCRUMBS.LOOKUP_TABLE_MASTER:
				case AMAZE_PAGE_BREADCRUMBS.PHOTO_BATCH_EDIT_OPERATIONS:
				case AMAZE_PAGE_BREADCRUMBS.PHOTO_BATCH_EDIT_OPERATIONS:
				case AMAZE_PAGE_BREADCRUMBS.PHOTO_BATCH_EDIT_TEMPLATES:
				case AMAZE_PAGE_BREADCRUMBS.PRODUCT_DETAIL_PAGE_TEMPLATES:
				case AMAZE_PAGE_BREADCRUMBS.PRODUCTS_DASHBOARD:
				case AMAZE_PAGE_BREADCRUMBS.QUALITY_METRICS:
				case AMAZE_PAGE_BREADCRUMBS.REVIEW_DASHBOARD:
				case AMAZE_PAGE_BREADCRUMBS.ROLE_MANAGEMENT:
				case AMAZE_PAGE_BREADCRUMBS.STYLE_GUIDE_REPORT:
				case AMAZE_PAGE_BREADCRUMBS.USER_GROUPS_MANAGEMENT:
				case AMAZE_PAGE_BREADCRUMBS.USER_MANAGEMENT:
				case AMAZE_PAGE_BREADCRUMBS.USER_PROFILE:
				case AMAZE_PAGE_BREADCRUMBS.VALIDATION_FAILURE_MANAGEMENT:
				case AMAZE_PAGE_BREADCRUMBS.WORKFLOW:
					breadCrumb.push({
						url: AMAZE_ROUTE_PATHS.DEFAULT,
						label: moduleName
					});
					break;
				case AMAZE_PAGE_BREADCRUMBS.CATALOG_EXPORTS_CREATE_NEW_EXPORT:
					breadCrumb.push(
						{
							url: `/${AMAZE_ROUTE_PATHS.EXPORTS_EXPORT_FILE}`,
							label: AMAZE_PAGE_BREADCRUMBS.CATALOG_EXPORTS
						},
						{
							url: AMAZE_ROUTE_PATHS.DEFAULT,
							label: AMAZE_PAGE_BREADCRUMBS.CATALOG_EXPORTS_CREATE_NEW_EXPORT.split("/")[1]
						}
					);
					break;
				case AMAZE_PAGE_BREADCRUMBS.CATALOG:
					if (is.not.null(catalogStore)) {
						breadCrumb.push(
							{
								url: `/${AMAZE_ROUTE_PATHS.CATALOGS}`,
								label: AMAZE_PAGE_BREADCRUMBS.CATALOGS
							},
							{
								url: AMAZE_ROUTE_PATHS.DEFAULT,
								label: catalogStore.catalogsPage.selectedCatalog.catalogName,
								isCatalogName: true
							}
						);
					}
					break;
				case AMAZE_PAGE_BREADCRUMBS.CHANNEL:
					if (is.not.null(channelStore)) {
						breadCrumb.push(
							{
								url: `/${AMAZE_ROUTE_PATHS.CHANNELS}`,
								label: AMAZE_PAGE_BREADCRUMBS.CHANNELS
							},
							{
								url: AMAZE_ROUTE_PATHS.DEFAULT,
								label: channelStore.channelsPage.selectedChannel.name
							}
						);
					}
					break;
				case AMAZE_PAGE_BREADCRUMBS.CHANNEL_ATTRIBUTE_MAPPING:
					if (is.not.null(channelStore)) {
						breadCrumb.push(
							{
								url: `/${AMAZE_ROUTE_PATHS.CHANNELS}`,
								label: AMAZE_PAGE_BREADCRUMBS.CHANNELS
							},
							{
								url: AMAZE_ROUTE_PATHS.CHANNEL.replace(":channelId", channelStore.channelsPage.selectedChannel.id),
								label: channelStore.channelsPage.selectedChannel.name
							},
							{
								url: "",
								label: (channelStore.channelAttributeMappingPage.mapping.isGlobalAttrMapping ? "Global " : "") + "Attribute Mapping"
							}
						);
					}
					break;
				case AMAZE_PAGE_BREADCRUMBS.CHANNEL_DASHBOARD:
					if (is.not.null(channelStore)) {
						breadCrumb.push(
							{
								url: `/${AMAZE_ROUTE_PATHS.CHANNELS}`,
								label: AMAZE_PAGE_BREADCRUMBS.CHANNELS
							},
							{
								url: "/" + AMAZE_ROUTE_PATHS.CHANNEL.replace(":channelId", channelStore.channelsPage.selectedChannel.id),
								label: channelStore.channelsPage.selectedChannel.name
							},
							{
								url: "",
								label: "Dashboard"
							}
						);
					}
					break;
			}
		} else {
			switch (moduleName) {
				case AMAZE_PAGE_BREADCRUMBS.CONNECTOR:
					breadCrumb.push(
						{
							url: `/${AMAZE_ROUTE_PATHS.CONNECTORS}`,
							label: AMAZE_PAGE_BREADCRUMBS.CONNECTORS
						},
						{
							url: AMAZE_ROUTE_PATHS.DEFAULT,
							label: submodules.connectorName
						}
					);
					break;
			}
		}
		this.breadCrumbService.updateBreadcrumb(breadCrumb);
	}

	userNameFormatter(_user: any) {
		return _user ? jQuery.jgrid.htmlEncode(_user.userFirstName + " " + _user.userLastName) : "";
	}

	dateFormatter(_date: any) {
		return {
			agoTime: moment(_date).fromNow(),
			dateTime: moment(_date).format("MM/DD/YYYY, hh:mm")
		};
	}

	public convertToCamelCase(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index == 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, "");
	}

	public convertToTitleCase(str) {
		const splitStr = str.toLowerCase().split(" ");
		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(" ");
	}

	public get setInputPlaceHolderBasedOnAmazeParam() {
		return `Please enter minimum ${this.getAmazeParams["UI_KEYSTROKE_SEARCH_MINIMUM_CHARACTERS_GENERAL"].current} characters to search`;
	}

	public formatSearchInputPlaceHolderBasedOnAmazeParam(placeHolderText: string) {
		if (typeof placeHolderText === "undefined" || placeHolderText === "") {
			return `Please enter minimum ${this.getAmazeParams["UI_KEYSTROKE_SEARCH_MINIMUM_CHARACTERS_GENERAL"].current} characters to search`;
		} else {
			const limitRegExp = /{minimum}/gi;
			return placeHolderText.replace(limitRegExp, this.getAmazeParams["UI_KEYSTROKE_SEARCH_MINIMUM_CHARACTERS_GENERAL"].current);
		}
	}

	getRandomColor(): string {
		const color = Math.floor(0x1000000 * Math.random()).toString(16);
		return "#" + ("000000" + color).slice(-6);
	}

	getRandomLightColor(): string {
		return "hsl(" + 360 * Math.random() + "," + (25 + 70 * Math.random()) + "%," + (85 + 10 * Math.random()) + "%)";
	}

	getRandomDarkRolor(): string {
		const lum = -0.25;
		let hex = String("#" + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, "");
		if (hex.length < 6) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		let rgb = "#",
			c,
			i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
			rgb += ("00" + c).substr(c.length);
		}
		return rgb;
	}

	getRandomBgAndTextColor(): any {
		const R = Math.floor(Math.random() * 256);
		const G = Math.floor(Math.random() * 256);
		const B = Math.floor(Math.random() * 256);

		const bg = "rgb(" + R + "," + G + "," + B + ")";
		const C = [R / 255, G / 255, B / 255];
		for (let i = 0; i < C.length; ++i) {
			if (C[i] <= 0.03928) {
				C[i] = C[i] / 12.92;
			} else {
				C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
			}
		}
		const L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];
		const clr = L > 0.179 ? "white" : "white";
		return {
			background: bg,
			color: clr
		};
	}

	getRandomDarkBgAndLightTextColor(): any {
		return {
			background: this.getRandomDarkRolor(),
			color: "white"
		};
	}

	getNodeNameFromPath(_nodePath: string) {
		let result = "";
		if (_nodePath != "") {
			result = _.last(_nodePath.split(">"));
		}
		return result;
	}

	addClassAndRemoveInDelay(elem: any, className: string, delay: number) {
		const $element = $(elem),
			$class = className;
		jQuery($element).addClass($class);
		setTimeout(() => {
			jQuery($element).removeClass($class);
		}, delay);
	}

	deepEquals(ar1: any, ar2: any) {
		let still_matches,
			_fail,
			_this = this;
		if (!((_.isArray(ar1) && _.isArray(ar2)) || (_.isObject(ar1) && _.isObject(ar2)))) {
			return false;
		}
		if (ar1.length !== ar2.length) {
			return false;
		}
		still_matches = true;
		_fail = function () {
			still_matches = false;
		};
		_.each(ar1, function (prop1, n) {
			let prop2;
			prop2 = ar2[n];
			if (prop1 !== prop2 && !_this.deepEquals(prop1, prop2)) {
				_fail();
			}
		});
		return still_matches;
	}

	isHTML(str: string) {
		const a = document.createElement("div");
		a.innerHTML = str;
		for (let c = a.childNodes, i = c.length; i--;) {
			if (c[i].nodeType == 1) {
				return true;
			}
		}
		return false;
	}

	isValidJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	checkKeyExistenceInObject(object: any, key: any) {
		const $t = this;
		// hasr => has recursive
		const hasr = function (_object: any, _key: any) {
			try {
				if (_.has(_object, _key)) {
					return true;
				} else {
					if (_object instanceof Object) {
						for (const subobject in _object) {
							const recursive = hasr(_object[subobject], _key);
							if (recursive) {
								return true;
							}
						}
					}
				}
				return false;
			} catch (e) {
				console.error(e);
			}
		};
		return hasr(object, key);
	}

	findValueByProperty(obj: any, key: any) {
		const $t = this;
		let result: any;
		if (!_.isObject(obj) || _.isNull(obj) || _.isUndefined(obj)) {
			result = "";
		} else {
			for (const property in obj) {
				if (obj.hasOwnProperty(property)) {
					if (property === key) {
						result = obj[key];
						break;
					} else if (typeof obj[property] === "object") {
						result = $t.findValueByProperty(obj[property], key);
						if (typeof result !== "undefined") {
							break;
						}
					}
				}
			}
		}
		return result;
	}

	public abortAll() {
		jQuery(function () {
			jQuery.xhrPool = [];
			jQuery.xhrPool.abortAll = function () {
				jQuery(this).each(function (i, jqXHR) {
					//  cycle through list of recorded connection
					jqXHR.abort(); //  aborts connection
					jQuery.xhrPool.splice(i, 1); //  removes from list by index
				});
			};
			jQuery.ajaxSetup({
				beforeSend: function (jqXHR) {
					jQuery.xhrPool.push(jqXHR);
				}, //  annd connection to list
				complete: function (jqXHR) {
					const i = jQuery.xhrPool.indexOf(jqXHR); //  get index for current connection completed
					if (i > -1) {
						jQuery.xhrPool.splice(i, 1);
					} //  removes from list by index
				}
			});
		});
	}

	checkElementInViewport(_element: any, _offsetLeft?: any) {
		const $t = this;
		var position = _element.getBoundingClientRect();
		var left = typeof _offsetLeft !== "undefined" ? _offsetLeft : 0;
		if (
			position.top >= 0 &&
			position.left >= left &&
			position.right <= (window.innerWidth || document.documentElement.clientWidth) &&
			position.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		) {
			return true;
		} else {
			return false;
		}
	}

	checkElemFullyVisibleInContainer(element: HTMLElement, container: HTMLElement) {
		try {
			if (is.null(element) || is.null(container)) {
				return false;
			}
			const elemRect = element.getBoundingClientRect();
			const containerRect = container.getBoundingClientRect();
			const bottomPosition = elemRect.top + 25;
			return elemRect.top >= containerRect.top && elemRect.left >= containerRect.left && bottomPosition <= containerRect.bottom && elemRect.right <= containerRect.right;
		} catch (e) {
			console.error(e);
		}
	}

	groupItemsForLoop<T>(data: Array<T>, n: number): Array<T[]> {
		let group = new Array<T[]>();
		for (let i = 0, j = 0; i < data.length; i++) {
			if (i >= n && i % n === 0) j++;
			group[j] = group[j] || [];
			group[j].push(data[i]);
		}
		return group;
	}

	setTaxoPathOnPopHead(_taxoPath: any, _uiWidth?: any) {
		const wClass = _uiWidth ? "mxw" + _uiWidth : "mxw55";
		return '<span title="' + _taxoPath + '" class="secondary-title primary-color mx-1 text-truncate d-inline-block align-bottom ' + wClass + '">' + _taxoPath + "</span>";
	}

	initUserInactivtyCheck() {
		const appInstance: any = JSON.parse(JSON.parse(sessionStorage.getItem("Amaze-storage--appstate")));
		let $timeoutTimer,
			$logoutTimer,
			$countDownTimer,
			$timeCounterInterval,
			$startTime,
			$elapsedTime,
			$elapsedCounterTime,
			$timeDiff,
			$forceTime = 60000,
			$amazeSession = appInstance.amazeParams.length
				? parseInt(appInstance.amazeParams.find((p: any) => p.parameterCode == "BROWSER_SESSION_TIMEOUT").parameterSetValue) * 60000
				: 30 * 60000;
		const startTimer = (type?: any) => {
			clearTimeout($timeoutTimer);
			clearTimeout($logoutTimer);
			$startTime = new Date().getTime();
			$elapsedTime = 0;
			$elapsedCounterTime = 0;
			switch (type) {
				case "logout":
					$countDownTimer = Math.floor($forceTime / 1000);
					$logoutTimer = setTimeout(function () {
						checkTimer(type);
					}, 100);
					break;
				default:
					$timeoutTimer = setTimeout(function () {
						checkTimer(type);
					}, 100);
					break;
			}
		};

		const checkTimer = (type) => {
			$elapsedTime += 100;
			$timeDiff = new Date().getTime() - $startTime - $elapsedTime;
			switch (type) {
				case "logout":
					if ($elapsedTime === $forceTime) {
						logout();
					} else {
						$elapsedCounterTime += 100;
						if ($elapsedCounterTime === 1000 && $countDownTimer !== 0) {
							$countDownTimer -= 1;
							$elapsedCounterTime = 0;
						}
						$logoutTimer = setTimeout(function () {
							checkTimer(type);
						}, 100 - $timeDiff);
					}
					break;
				default:
					if ($elapsedTime === $amazeSession) {
						showTimeoutModal();
					} else {
						$timeoutTimer = setTimeout(function () {
							checkTimer(type);
						}, 100 - $timeDiff);
					}
					break;
			}
		};

		const showTimeoutModal = () => {
			startTimer("logout");
			$("body").on("focus click mousemove mousedown keyup scroll keypress", function () {
				startTimer("logout");
			});
			Swal.fire({
				title: "Session Timeout",
				html: "<p>You are being timed out due to inactivity. <br> Please choose to stay signed in or log-out. <br> Otherwise, you will be logged out automatically in <b class='h1 d-block text-center mt-1 mb-0 text-warning font-weight-bold' id='uiTimer'></b> seconds.</p>",
				icon: "warning",
				timer: $forceTime,
				allowEscapeKey: false,
				allowOutsideClick: false,
				allowEnterKey: false,
				timerProgressBar: true,
				showCancelButton: true,
				confirmButtonText: "Stay logged In",
				cancelButtonText: "Log out",
				customClass: {
					popup: "p-0",
					title: "px-5",
					confirmButton: "bg-primary text-white mat-flat-button py-0 thin-btn rounded-pill",
					cancelButton: "bg-danger text-white mat-flat-button py-0 thin-btn rounded-pill ml-2",
					actions: "amaze-bg m-0 py-3"
				},
				willOpen: function () {
					$timeCounterInterval = setInterval(() => {
						const content = Swal.getHtmlContainer();
						if (content) {
							content.querySelector("#uiTimer").textContent = Math.floor(Swal.getTimerLeft() / 1000).toString();
						}
					}, 100);
				},
				willClose: function () {
					clearInterval($timeCounterInterval);
				}
			}).then((result) => {
				if (result.isConfirmed) {
					init();
				} else if (result.dismiss === Swal.DismissReason.cancel || result.dismiss === Swal.DismissReason.timer) {
					logout();
				}
			});
		};

		const logout = () => {
			const $logoutURL = window.location.origin + window.location.pathname + "#/login";
			clearTimeout($timeoutTimer);
			clearTimeout($logoutTimer);
			if (window.location.hash != "#/login") {
				Swal.close();
				window.location.replace($logoutURL);
			}
		};

		const init = () => {
			startTimer();
			$("body").on("focus click mousemove mousedown keyup scroll keypress", function () {
				startTimer();
			});
		};
		init();
	}

	initDoneTypingEvent() {
		(function ($) {
			$.fn.extend({
				donetyping: function (callback, timeout) {
					timeout = timeout || 1e3; // 1 second default timeout
					let timeoutReference,
						doneTyping = function (el) {
							if (!timeoutReference) {
								return;
							}
							timeoutReference = null;
							callback.call(el);
						};
					return this.each(function (i, el) {
						const $el = $(el);
						// Chrome Fix (Use keyup over keypress to detect backspace)
						// thank you @palerdot
						$el.is(":input") &&
							$el
								.on("keyup keypress paste", function (e) {
									// This catches the backspace button in chrome, but also prevents
									// the event from triggering too preemptively. Without this line,
									// using tab/shift+tab will make the focused element fire the callback.
									if (e.type == "keyup" && e.keyCode != 8) {
										return;
									}

									// Check if timeout has been set. If it has, "reset" the clock and
									// start over again.
									if (timeoutReference) {
										clearTimeout(timeoutReference);
									}
									timeoutReference = setTimeout(function () {
										// if we made it here, our timeout has elapsed. Fire the
										// callback
										doneTyping(el);
									}, timeout);
								})
								.on("blur", function () {
									// If we can, fire the event since we're leaving the field
									doneTyping(el);
								});
					});
				}
			});
		})(jQuery);
	}

	determineReviewOperationCanPerform(_domain: any, _nodeOperation: string) {
		const domainReviewModeInformation: any = this.getDomainReviewModeInformation(_domain);
		if (_nodeOperation.includes("TAXONOMY_ADD")) {
			return domainReviewModeInformation.taxonomy.add;
		} else if (_nodeOperation.includes("TAXONOMY_EDIT")) {
			return domainReviewModeInformation.taxonomy.edit;
		} else if (_nodeOperation.includes("TAXONOMY_MOVE")) {
			return domainReviewModeInformation.taxonomy.move;
		} else if (_nodeOperation.includes("TAXONOMY_DELETE")) {
			return domainReviewModeInformation.taxonomy.delete;
		} else if (_nodeOperation.includes("TAXONOMY_DIGITAL_ASSET_LINKAGE")) {
			return domainReviewModeInformation.taxonomy.linkage;
		} else if (_nodeOperation.includes("TAXONOMY_HIERARCHY_DELETE")) {
			return domainReviewModeInformation.taxonomy.hierarchyDelete;
		}
	}

	determineNodeReviewClasses(_fancyTreeServiceInstance: any, _treeId: string, _domain: any, _node: any, _reviewMatrixRestrictions: any) {
		const $t = this;
		let reviewClasses = "",
			reviewText = "",
			nodeReviewInfo: any = {},
			nodeRestrictions: any = {};

		const identifyNodeReviewType = (_nodeData: any) => {
			const reviewTypeInfo: any = {
				type: "",
				text: "",
				classes: ""
			};
			const domainReviewModeInformation: any = $t.getDomainReviewModeInformation(_domain);
			if (typeof _nodeData.taxonomyReviewOperationData !== "undefined" && Object.keys(_nodeData.taxonomyReviewOperationData).length) {
				if (["ADD", "UPDATE", "DELETE", "MOVE", "DELETE_HIERARCHY"].some((v) => _nodeData.taxonomyReviewOperationData.operation.includes(v))) {
					switch (_nodeData.taxonomyReviewOperationData.operation) {
						case "ADD":
							if (domainReviewModeInformation.taxonomy.add) {
								reviewTypeInfo.type = "TAXONOMY_ADD";
								reviewTypeInfo.text = "Node is pending approval for addition";
								reviewTypeInfo.classes = "green TAXONOMY_ADD underReviewNode";
							}
							break;
						case "UPDATE":
							if (domainReviewModeInformation.taxonomy.edit) {
								reviewTypeInfo.type = "TAXONOMY_EDIT";
								reviewTypeInfo.text = "Node name has been modified and is under review";
								reviewTypeInfo.classes = "purple TAXONOMY_EDIT underReviewNode";
							}
							break;
						case "MOVE":
							if (domainReviewModeInformation.taxonomy.move) {
								reviewTypeInfo.type = "TAXONOMY_MOVE";
								reviewTypeInfo.text = "Node has been moved and is under review";
								reviewTypeInfo.classes = "orange TAXONOMY_MOVE underReviewNode";
							}
							break;
						case "DELETE":
							if (domainReviewModeInformation.taxonomy.delete) {
								reviewTypeInfo.type = "TAXONOMY_DELETE";
								reviewTypeInfo.text = "Node is pending approval for deletion";
								reviewTypeInfo.classes = "red TAXONOMY_DELETE underReviewNode";
							}
							break;
						case "DELETE_HIERARCHY":
							if (domainReviewModeInformation.taxonomy.hierarchyDelete) {
								reviewTypeInfo.type = "TAXONOMY_HIERARCHY_DELETE";
								reviewTypeInfo.text = "Node Hierarchy is pending approval for deletion";
								reviewTypeInfo.classes = "maroon TAXONOMY_HIERARCHY_DELETE underReviewNode";
							}
							break;
					}
				}
			} else {
				if (typeof _nodeData.taxonomyReviewDigitalAssetDatas !== "undefined" && _nodeData.taxonomyReviewDigitalAssetDatas.length != 0) {
					if (domainReviewModeInformation.taxonomy.linkage) {
						reviewTypeInfo.type = "TAXONOMY_DIGITAL_ASSET_LINKAGE";
						reviewTypeInfo.text = "Node is pending approval for Digital Asset Linkage";
						reviewTypeInfo.classes = "blue TAXONOMY_DIGITAL_ASSET_LINKAGE underReviewNode";
					}
				}
			}
			return reviewTypeInfo;
		};

		switch (_node.data.nodeType) {
			case "ROOT":
				nodeReviewInfo = identifyNodeReviewType(_node.data);
				if (nodeReviewInfo.type != "") {
					reviewText = nodeReviewInfo.text;
					reviewClasses = nodeReviewInfo.classes + " isRoot underSelfReview ";
					nodeRestrictions["reviewRestrictions"] = _reviewMatrixRestrictions[nodeReviewInfo.type];
					nodeRestrictions["reviewUiRestrictions"] = reviewClasses;
				}
				break;
			case "BRANCH":
			case "LEAF":
				nodeReviewInfo = identifyNodeReviewType(_node.data);
				if (nodeReviewInfo.type != "") {
					reviewText = nodeReviewInfo.text;
					reviewClasses = nodeReviewInfo.classes + " underSelfReview ";
					reviewClasses += _node.data.nodeType == "BRANCH" ? " isBranch " : " isLeaf ";
					nodeRestrictions["reviewRestrictions"] = _reviewMatrixRestrictions[nodeReviewInfo.type];
					nodeRestrictions["reviewUiRestrictions"] = reviewClasses;
				} else {
					const parentNode = _fancyTreeServiceInstance.utility.getNode(_treeId, _node.data.parentId);
					if (parentNode != null) {
						const parentNodeReviewInfo = identifyNodeReviewType(parentNode.data);
						if (parentNodeReviewInfo.type != "") {
							reviewText = "Parent node of this node is under review";
							reviewClasses = parentNodeReviewInfo.classes + " underParentReview ";
							reviewClasses += _node.data.nodeType == "BRANCH" ? " isBranch " : " isLeaf ";
							reviewClasses = reviewClasses.replace(/orange|purple|red|green|blue/gi, function (matched) {
								return "black";
							});
							nodeRestrictions["reviewRestrictions"] = _reviewMatrixRestrictions[parentNodeReviewInfo.type];
							nodeRestrictions["reviewUiRestrictions"] = reviewClasses;
						} else {
							if (typeof parentNode.data.reviewRestrictions !== "undefined") {
								reviewText = "Parent node of this node is under review";
								reviewClasses = parentNode.data.reviewUiRestrictions;
								nodeRestrictions["reviewRestrictions"] = parentNode.data.reviewRestrictions;
								nodeRestrictions["reviewUiRestrictions"] = parentNode.data.reviewUiRestrictions;
							}
						}
					}
				}
				break;
		}
		return {
			class: reviewClasses,
			text: reviewText,
			restrictions: nodeRestrictions
		};
	}

	getDomainReviewModeInformation(_domain: any) {
		const $t = this;
		const selectedDomainReviewInfo: any = {
			taxonomy: {
				add: false,
				edit: false,
				move: false,
				delete: false,
				linkage: false,
				hierarchyDelete: false
			},
			sku: {
				add_delete: false,
				attribute_change: false,
				move: false,
				linkage: false
			},
			schema: {
				add: false,
				edit: false,
				delete: false
			}
		};
		if (_domain.reviewModeActive) {
			if (_domain.reviewerConfigurations.length) {
				_domain.reviewerConfigurations.forEach((_mode: any) => {
					switch (parseInt(_mode.userActionKey)) {
						case 97:
							selectedDomainReviewInfo.taxonomy.add = true;
							break;
						case 98:
							selectedDomainReviewInfo.taxonomy.edit = true;
							break;
						case 99:
							selectedDomainReviewInfo.taxonomy.move = true;
							break;
						case 100:
							selectedDomainReviewInfo.taxonomy.delete = true;
							break;
						case 104:
							selectedDomainReviewInfo.taxonomy.linkage = true;
							break;
						case 127:
							selectedDomainReviewInfo.taxonomy.hierarchyDelete = true;

						case 93:
							selectedDomainReviewInfo.sku.attribute_change = true;
							break;
						case 94:
							selectedDomainReviewInfo.sku.move = true;
							break;
						case 95:
							selectedDomainReviewInfo.sku.linkage = true;
							break;
						case 96:
							selectedDomainReviewInfo.sku.add_delete = true;
							break;

						case 101:
							selectedDomainReviewInfo.schema.add = true;
							break;
						case 102:
							selectedDomainReviewInfo.schema.edit = true;
							break;
						case 103:
							selectedDomainReviewInfo.schema.delete = true;
							break;
					}
				});
			}
		}
		return selectedDomainReviewInfo;
	}

	getCatalogLockStatusForAction(_catalogLock: boolean, _actionPath: string) {
		let canPerform = true;
		const catLockRestrictions =
			typeof this.getAppStore !== "undefined" ? this.getAppStore.restrictions["cataloglockRestrictions"] : AMAZE_UI_RESTRICTIONS["CATALOG_LOCK_RESTRICTIONS"];
		const findInnerIndexValue = (obj: any, is: any, value?: any) => {
			if (typeof is == "string") {
				return findInnerIndexValue(obj, is.split("."), value);
			} else if (is.length == 1 && value !== undefined) {
				return (obj[is[0]] = value);
			} else if (is.length == 0) {
				return obj;
			} else {
				return findInnerIndexValue(obj[is[0]], is.slice(1), value);
			}
		};
		if (_catalogLock) {
			canPerform = findInnerIndexValue(catLockRestrictions, _actionPath);
		}
		return canPerform;
	}

	checkIsSpecialDay(date: any) {
		const $t = this;
		const _holidays = {
			M: {
				// Month, Day
				"01/01": "New Year's Day",
				"07/04": "Independence Day",
				"11/11": "Veteran's Day",
				"11/28": "Thanksgiving Day",
				"11/29": "Day after Thanksgiving",
				"12/22": "Christmas Eve",
				"12/23": "Christmas Eve",
				"12/24": "Christmas Eve",
				"12/25": "Christmas Day",
				"12/26": "Christmas Day",
				"12/27": "Christmas Day",
				"12/28": "Christmas Day",
				"12/29": "Christmas Day",
				"12/30": "Christmas Day",
				"12/31": "New Year's Eve",
				"1/1": "New Year's Day"
			},
			W: {
				// Month, Week of Month, Day of Week
				"1/3/1": "Martin Luther King Jr. Day",
				"2/3/1": "Washington's Birthday",
				"5/5/1": "Memorial Day",
				"9/1/1": "Labor Day",
				"10/2/1": "Columbus Day",
				"11/4/4": "Thanksgiving Day"
			}
		};
		const diff = 1 + (0 | ((new Date(date).getDate() - 1) / 7));
		const memorial = new Date(date).getDay() === 1 && new Date(date).getDate() + 7 > 30 ? "5" : null;
		return _holidays["M"][moment(date).format("MM/DD")] || _holidays["W"][moment(date).format("M/" + (memorial || diff) + "/d")];
	}

	setClampClickTransition() {
		var elems = jQuery(".three-line-clamp-truncate").toArray();
		if (elems.length) {
			elems.forEach((elem) => {
				jQuery(elem).on("click", function (e) {
					jQuery(e.currentTarget).toggleClass("three-line-clamp-truncate");
				});
			});
		}
	}

	convertExcelReferenceStyle(_value: any) {
		const _toR1C1 = !/^\d+$/.test(_value);
		let answer: any = _toR1C1 ? 0 : "";
		if (_toR1C1) {
			for (let p = 0; p < _value.length; p++) {
				answer = _value[p].charCodeAt() - 64 + answer * 26;
			}
		} else {
			let r;
			while (_value > 0) {
				r = (_value - 1) % 26;
				_value = Math.floor((_value - 1) / 26);
				answer = String.fromCharCode(65 + r) + answer;
			}
		}
		return answer;
	}

	syncCatStore(_newStore: any): void {
		this.catStore.setLatest(_newStore);
	}
	syncChannelStore(_newStore: any): void {
		this.channelStore.setLatest(_newStore);
	}
	syncChannelsDashboardStore(_newStore: any): void {
		this.channelsDashboardStore.setLatest(_newStore);
	}
	syncAppStore(_newStore: any): void {
		this.appStore.setLatest(_newStore);
	}
	syncDamStore(_newStore: any): void {
		this.damStore.setLatest(_newStore);
	}
	syncImportStore(_newStore: any): void {
		this.importStore.setLatest(_newStore);
	}
	syncStyleGuideReportStore(_newStore: any): void {
		this.styleGuideReportStore.setLatest(_newStore);
	}
	syncReportDashboardStore(_newStore: any): void {
		this.reportsDashboardStore.setLatest(_newStore);
	}
	syncReviewDashboardStore(_newStore: any): void {
		this.reviewDashboardStore.setLatest(_newStore);
	}
	syncProductSearchStore(_newStore: any): void {
		this.productSearchStore.setLatest(_newStore);
	}
	syncSocketStore(_newStore: any): void {
		this.socketStore.setLatest(_newStore);
	}
	syncProductsDashboardStore(_newStore: any): void {
		this.productsDashboardStore.setLatest(_newStore);
	}
	syncDashboardStore(_newStore: any): void {
		this.dashboardStore.setLatest(_newStore);
	}
	syncAssortmentStore(_newStore: any): void {
		this.assortmentStore.setLatest(_newStore);
	}
	syncDomainsStore(_newStore: any): void {
		this.domainsStore.setLatest(_newStore);
	}
	syncGenAiStore(_newStore: any): void {
		this.genAiStore.setLatest(_newStore);
	}
	syncLanguageStore(_newStore: any): void {
		this.languageStore.setLatest(_newStore);
	}
	setCatStore() {
		this.catStore.setInitial();
	}
	setChannelStore() {
		this.channelStore.setInitial();
	}
	setChannelsDashboardStore() {
		this.channelsDashboardStore.setInitial();
	}
	setAppStore() {
		this.appStore.setInitial();
	}
	setDamStore() {
		this.damStore.setInitial();
	}
	setImportStore() {
		this.importStore.setInitial();
	}
	setStyleGuideReportStore() {
		this.styleGuideReportStore.setInitial();
	}
	setReportsDashboardStore() {
		this.reportsDashboardStore.setInitial();
	}
	setReviewDashboardStore() {
		this.reviewDashboardStore.setInitial();
	}
	setProductSearchStore() {
		this.productSearchStore.setInitial();
	}
	setSocketStore() {
		this.socketStore.setInitial();
	}
	setProductsDashboardStore() {
		this.productsDashboardStore.setInitial();
	}
	setDashboardStore() {
		this.dashboardStore.setInitial();
	}
	setAssortmentStore() {
		this.assortmentStore.setInitial();
	}
	setGenAiStore() {
		this.genAiStore.setInitial();
	}
	setDomainsStore() {
		this.domainsStore.setInitial();
	}
	setLanguageStore() {
		this.languageStore.setInitial();
	}
	get getCatStore(): any {
		return this.catStore.getLatest;
	}
	get getChannelStore(): any {
		return this.channelStore.getLatest;
	}
	get getChannelsDashboardStore(): any {
		return this.channelsDashboardStore.getLatest;
	}
	get getAppStore(): any {
		return this.appStore.getLatest;
	}
	get getDamStore(): any {
		return this.damStore.getLatest;
	}
	get getImportStore(): any {
		return this.importStore.getLatest;
	}
	get getStyleGuideReportStore(): any {
		return this.styleGuideReportStore.getLatest;
	}
	get getReportsDashboardStore(): any {
		return this.reportsDashboardStore.getLatest;
	}
	get getReviewDashboardStore(): any {
		return this.reviewDashboardStore.getLatest;
	}
	get getProductSearchStore(): any {
		return this.productSearchStore.getLatest;
	}
	get getSocketStore(): any {
		return this.socketStore.getLatest;
	}
	get getProductsDashboardStore(): any {
		return this.productsDashboardStore.getLatest;
	}
	get getDashboardStore(): any {
		return this.dashboardStore.getLatest;
	}
	get getAssortmentStore(): any {
		return this.assortmentStore.getLatest;
	}
	get getGenAiStore(): any {
		return this.genAiStore.getLatest;
	}
	get getDomainsStore(): any {
		return this.domainsStore.getLatest;
	}
	get getLanguageStore(): any {
		return this.languageStore.getLatest;
	}
	resetStores(_storeName: string) {
		this[_storeName].resetStore();
	}
	updatePartialStore(_storeName: string, _storePropertyName: string, _storePropertyValue: any) {
		this[_storeName].updatePartial(_storePropertyName, _storePropertyValue);
	}
}

export const imagesPath = {
	amazu: {
		explain:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEhCAYAAAA6ZO9gAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAQABJREFUeAHsvQmAZVV1LrzPubeGnouhoaG76WIQBEEKR8SB4o8mGmNs4vAANXSbaOIMec9ML3nAy/TyYgLoi3Gkm2cUf8cifzQJmlioIIhDoQIqGItZ5uq5pnvP/6219rD2OedWV1XfW+M9VffsNe+1197r7rPPdI1pb+0ItCPQjkA7Au0IzCYCyWyUFoNO/0n/0F/NkvdU0mRrJU0NSnzSEZQDHRVzxaeHtg8vlHZsfcaOPpPUt05O1M6s1U1PLcluzLLJga/c/Y6hheLjcvVjSSbIS3o/eGUlNZdQYlQlMSg5XJJQSYly6ae+95s757Pjt/Xt6NmfJTtq9WxrrV43KM2kLS0+aLJk++Dw24bn08/lXPeSS5AX9X7g8opJL9MJEZKEZxFJFGRQR5qetfO2N8zLtzQlx3gl/VqtZvo4GWqF5EDC1JEw2UglSc9qJ8n8pGk6P9W2ptaze6/sNfXksiRJDP7xkZIQjTMdLmTGfLE1nhzcaq3ScWWSpX30DQXvaOf9zfndM1Gr7Ti4xbZEKyKwpBKkWq9uo8FFGw06N/gCxdLDYOzd9txP9rUisFPZ3Hb2db1pmsBXSQqfHOw3+SgblfxJTP8LNn9gqyW3izmMwJJKkCxLzpVBJyPLwblvZAy6kDzVSjrnAy/Nsq0uCaivVSLwLEIE57MrU5OdO4fjol2VjcCSShA/0GwC0NALNBmIMvhoAMpnPkZCmmQ94gf8yyUD+aMTmPwXz5M5n+m46mW+W1oJgta4b1xX0giMBiGnjBt089X7aSEJJJUb+y9JMl/+Lt96l1aCZOmQDH0Zbu6bmAYXzyT5ZKHMMWaQdnO6JdlIlLSMqOSw/pJP7DdKnK3mts2pn+3KzJJKECx8r5aBpwYbCETjmYQKO/gkZczwx265cHCuxwEuYA64gc8pyn6FZBB/4zaYNL1xrv1s14cvpqUUBLpWgGsgV1Gb9ABk2BJCAknLt/Xv6JnrGHzolguHEfohcVIS2B0SUkl0nchAh74x/PaBufazXd8SSxDq0K/+5+9eisORnTzIMNgkIWS+kD1JJWZ8smZqtXpvx4EVc36N4bdf8KlLavVaX5ZxLkTJIN4pvxMzgrNz5xO9vc19BCpzX2Xra/zZk/98/cnrX3VvJUl60yTdgEMvHKGk+FBi1M2+8QlTx20dlDygPf05x71m1/ce+PwtrffMmLec88m+Wi354jguoY9OTKJK8i2hi5amjj2VtOeyng0m1forvnpP+1aTueibsjowRJb2thW3dFSN6cPH3Deyf6TDJF/r6qj0dOOOxa5q1QA2ndXKSKWSnffRm1t72wkdzlUOdH1tbLLWNzZRM2OTk0iSGifrupVdO3F/WA/ux+qpZfUbx7PawJfveGt7YT7Pw3PJJ0g+vi887v9c0llJr+zqkOToprJaMR2V6lBtxYHzdg5uH8nrNAv/rbOv2zExWduGBDFjmD0oOagcq9cGbr73Xe3DqGYFuol2ltQifTpxuem+d16FGwAHcH+TmcDhFq1FJnCPOa0JKqPdV07Hxmxk3nL2dduw5tlGdVGddKhHPozX6sOdyeT22dhs67Q+AssuQSiklWR8O5JjmJPEDlgauFiXbKOB3Oyw07oDSXmlSw4qOTmQJFktOX9w+NKWzVrNbstys7csE4QG5GRizpdvcppB6BtdynqWXUkDulkDgdYd9VqyA3X0uDpwmMX1oa5Lb36w/VBUs2LdCjvLMkEokDcPv2MI3+qXum9yKuWbvY4BXdnRrOsjdNgGu3161qAzWBOZGaDDvVZ0attm8yKwbBOEQsjrkZqsR3hN0OT1yG+94FP0pOA2Tg6aNcKhFdYd4+11R/PGccssLesEoajyegQLZZ5JaADbJMmybBsN8NlG/nfxzEe9ZnDWSmxycpDt9rpjtiGdF71lnyC0HsHyfLubQWgg8yEQBjKu3O2ggT6bnpnIsi9O1uo9ZMslB9VRz+pXtNcds4no/Ogs+wShsH9z+F2DOM17hSQGfcvToK4ZGuCTWTLjx3J/+/mfvhK6fSX2Br9537sun5+ubtc6mwi0E8RGjQYuBvUgD2p7qEXf/JNZrY8G/HSDS4dl0LnEzRq0/pBEqY90VCbaFwOnG8gFItdOENURlWTifAzoET79S0lCZ5vosMjUL5nOeoQOxzIclvG6wx5a8aldPlzL2tc7VKwXC9hOENVTdj1CSSKHWRjYLkmmsx6hdQeSg95CIlfK7YKf1h3ffOBdg6qqNrhIItBOkFxH0Xpksla7gpPEDXSUuGYy5XqE1x31DNc7bHKgJBuTk/X2uiMX48WEthOkpLdoPTJRywbdlW9aQxBco/XI2dddnlcBrR+8S/Shmb3XaqTaXnfkw7Wo8HaCNOiuSjLm1yN+TcGnabPLKCGcGt9KgkMrmxD20IxmD5518NrQ9n1WLlaLsVx2t7u/aNMH+uuJeQ8ebeV3U/lHXdF7DNuSOjN6GpGeTrQ0esiJea5UPJaCIJUiY+1aGsj0H9UFuQFTr1zxqaHWPo9CbWpvM4sA9dWy2c7Z/P5tGLY7aOT6QVoyYCkgPLi1nKXR8GaeK70Mc2hHHCsDmPiWJjxLY3skKTgKk6TmvH/8zpsGCW5vCyMCy+YQq7/3yh4MxytptLpBKQM3HrDULUzXcpYGjh/ssQxzaEcSVgYw2ZhucpAc3vS+MIZF2wsXgWWTILVatR+jFUmiB66FLY2CEg98Gu5Cw94P9liGObQjCSsDeKbJIfK9257ziX7yo70tjAgsmwTJEtO3oJMD44GSqr0trAgsmwTBS03Ut7qF1aCMZ4U5njmsH5we9HaJ9rZgIrBsEoReAcZJgNDz4Y8tqScWSnLIBNLOEOqThbItowRBIiDqCzs5EtNOj4WSGuLHsukP/ibAV7RLEmr+wpo5ZIG/sIZH25vlM4OgpQs9OSR924NyIUVg+SRI3Qy4s0QLceag5CC/MKUPL6QBstx9oS/VBbud0/v3famp98zWwfzxY5JWvohh2EMDkTa3HtFwlEQ058g/zz40gklV9GVAM8XLKHkGSVrkIznrAHF1fXhJ9fAju/dsZyW1y7dDsYqgF/aA+dcfv2WwKNimTCcC0oPTkWyRDN0bVUuTviQzZ+IVzr2opg+j0CZFcC9AyhEQi3SheLoHRC+HWmMy2JXlCIx0PMJDPpJziEtAh7uyoGFteZNOUJUusRSJwYJOZKvADXGSH+IZTpLsdjzcNdQ13jk4MNy6163m/V5seDGSLW4B3fIxXqvgbSHJq1FVPz58dZur9d54IHQsC9gd2EHCMYTi6R4Qfg71hhoPZmfXi3qg3BbNBjmdRhpWroE4a7UgMQrOSf28H8L+2loyOfCvP26/SV4Haqo+0nKHDMtdtMnFeLn/NmfMV54DPOoEXQlGkScUT/eAKOVQawnDr5xRtO/lCt//zqspbHnlyJkc1dshoNWJEeoOEDsAlCmZGcqS7Oov//itO5m+zHe5KDU/GnQHLUbQe/CDF33Ouq80B3jUCboSjCJPKJ7uAVHKodbSwkwM35ISpwskS/A6Lka+hXlA8GAnQMwBmqOIQmbodxSvrnZXrxoYWr6HYKWxsSE+pILXFom5DBX0O0O+shzgUSdIpSUWeULxdA+Icg61FqeZGJFy62cMrq7BVBa5UohHgevC5eNmGx7oCmIeTBStiJani28j+KmhK750129d5Wwup9LHolmNljVGB16T0+hQKlQZIFU7iEV6oHjIA6KbQ0EUSoPxF9ehlBunBSwqOeUxbOUYFs1RvQrTGxgr6ES2CtxQc44V0AA5YUXxPhHg6TnfiI7P0GRa377cftTHxySK1CwR+7QevWiNz0J54wx4LHSErgfsIOEYgeIhD4hMDgVRKLk+dgbjOpRyYZB7DVhUcooMWzmGRXNUr8L0BsYKOpGtAjfUnGMFNEAkrDDvjwM8L+ebpztBlDj7dcU/3fmWyxVpSYNlMZhVg8857gOXY51xGSl7owx4LNB1DWAHCccIFA95QGRyqK8118fOYFyHVy4McS9PQLmtEh1rz5uNrNj2lRgrlY9sFSU8xQNSWUADRI1WWM4rxcv51kjHieHHRwcrXZXzl8PapFEsCsFsRJBDqio9CbfVG2PAY+WdBHaQcNaFEtEjZAqdnFxs0WJepmSQaxEv56xQWaJj5UrFnUYJs4TkGya8ooSneEB8C2iAKLAKE0G19zw34i3P05UsgbGYlxrBD6SeN3DH9qGc+JJCfWtn0ypOjnr1a7jIJ2eo2FowGSBlHcQiXSgRPUIa6EAmJ+YriugeKRnkVoNFvJw3AyCno2QUqBVEo4RZQvINEF5RwlM8IFUFNEAUDIVFPhHiefGID/ScRizmtbU8znQt7SQJrc4F52AoJccEkgNykhwqbKVGQSzShRLRI6SBDmRyYt7diO6R3CD30taOl1MM1BCRFaJArSAaJcwSElcs9FKu1F3CCqQAkbDCcj4pNB7xjXUiYwEJEGwGZAQ/ZL1kZ5LQTBXHg4FxcgQTAVIWQCzShRLRI6SBDmRyYr6iiO6R3CD30taOl1MM1BCRFaJArSAaJcwSElcs9FKu1F3CKtUBsUSUfYvorUkMXfcIHkhbkkkyq7t5ZeZIMHOEbos6hLoIBOqXmE6YDEBPF5LvVIUyzRkq2hJ2JO8RqiM30IM1OaYmWbU5DU/2tqQNnp7XKXFMqQZpEEW0lMtxIj4DQUvodu/J3paneCAywRUSRbaIp4ixWJAKEIQVokBnuQen9b+29Rk77NGEM774yxknCH5nHAtySo4oZiESiJ4MhEByklFgFaJApSSGirZEJNLxiBvmyowFWcTLBX5BQ8koMCgAYp0Sx0rlQRTRUq6MuxKWkHIMoCXVsm9B0gkRRbbAcxSUTsyTglSARI6djEGrFSThF+6SznZs7duBZFk624wS5JzNf78NTd8WwqICAWKx80QykleIAguGirZEJNLxSGGYe3ss4uU8GX0uf56iZBTo2QQ0KzGcfWojjEabkHIMoAePRyzkLFAZbbEYWE5SQxFZSThLSsfas5y+dLJOZzSXzEYtndbW3/sPvZP12vchHH9DUIAKFoTi6R4QwRxqtTH8yhnMj1geoSFbvjWyVdCwBhrZIeusUyJQIEW2Ctzga5FleTkG0BzFNzbQY6FA96ICRGKxVIQpRIHWmFB4X2SyDJPx89ZfuGNp3Joy7RkEPwlA3wwhORCJ4rcahUeGIAdKUBtc6WymewoBkIehxgNa9FjF26M66K+4sU8ljIKGteVNFk1JHcVGcr1RFZGtokVP8UCoTEg5BtCSalkpSMZCgR5sO4VgK5aKMIUo0BoTCu+LTFdN6I80uQyHWr1WeVEX00qQF9OhVWL6uaUIUAi4a7sKIJFyQcyhVglDFobIVtkW6XikMMy9KvtUYqugYW15k95CAFin2Mh8s3w7xVbRoqd4QNdB6jkG0JJqWclLuoYSAZunCxr2ka1YKsIUokBl2XoZM309EZkR3vVUagb34y3+jVoz5UandCfrHT9HT4QHm7yGqHsjHhCBHGq1EPByBne2N02Al5NOingWaWzLK4ukRXPUyCTXUiJQIEW2Clztds6+Q3M6QHMUJxjouYY2lI8YERJskXXFUmDEYHrMLPrlbYmgFscF5PM+96Ptg15pEQIHnUHqpnoJ+iaXHBQG+81CjRbUNz+HWjolBn28mAcK8p5AddBfcSM75bZyGtaWN5kzJXTosMGYWdCJbBW4IQw5VkADxDUBLanWsaTduYbmLHiHY7FYKsIUokDYCRhDAQ11RFIOEcEScYPXvV7mlRcpQO1quNHsUcswe/i1h4h7JQ+IiRxq7dLgC1Ws37fRHDZ6lFk5scZ01VYgiBmY+JCMhRFYSxN6xnySw0Yy+DBmYSKLncAPNLEhOha29qJ6SIHs6rpBYrtUD21cWhkLk9/iX+AHWqgvb1fqamQ32GK9Ql1Kz9dvaeTnIWx13ImIX/vlX+alHwXKgHNItE3VoQWelWM67fCTDp8bWryzSHj1hQ6AhWumYxtGhV+Y+2B4QARzqNWOE+PwA0ebLSOnms7JbjOeHDAPJ/eYJ5OHIKs6FqAd+mIDncMbVxBgL6PpJOgGMkCfMDk612cd9gObZGhT+k5OasXeNzIHQ80PfrZBu+Crg5mi/XX2bIkXVlg7UAeNyNo/FoN/zo5VU7jzy3HIj3gTTo6vUJp7V3evNYevPNys7uo0WWdmDoxPmtGJSTE0k8RwVdd4Fhl06GIrVXiKrr94y9//HNReL+QBkc2hIApFxZEFT3zimWb9vk1mb/KE+V76b+bu5DYxsMz2NABtiLjljPsYAIsCGnMdM4jkY21xZS9UV9DyfuS1RCcxx/ZsMiesf5rp7ljBv8+4b3wCs4lX87U4gO2EaizZtiHNzvrs0OK867fhDNLfi58qy0wvtzTX8BwKEaHEHSwxOuWx55jDDhxl7k6/bW5JB8y4OSCMZbTnYeKDlhv4iF0cN8VnHYVzzCxueS6MtgcEBRLhoIq4UEmowBcB0cf+4ZEH+XPyhlPN5sN7TQWvx999YMzzHZBTAzlvGZR6cjEYQ05nMZUNF+lZPb2Y2yrt5TYRqFCLSQfHnSwh6H3yGeaw/UfzjPH19LpllRw0jPmPAsNBcxSJDWVFfNJC8TnQCmcDFrc8Msog9wIgtseF4kjVcgKCpEUraJI8MPKRrWm+kO5+5MeGPpU0MSs7O8gEb6wR1EATJCJZWRyCbrPgoisaJ0hqtrrWFBttg4GCY+sEbUnc1eNrzTG7jzf3pj80X698KiexdFEexhQUCREPVqa52NgBSWwn5PmsJ1jEJ3Nsj3fOtOizPbEU7BGEP2tPavK1EMo8SQxGvZ/OOCcOI8bc/+S95vE9j5qujorpqMjPSFgWWeKP7MUW7y2BXcBJngv6dvQr7qIBSxOkH6/8RAv41C61M2zAXIfEDBaxMWF4w+4TuLwlpUfUl/4WBiS1VQYj7WUDxHFTOMvI8JKYirRISCTD+La4tcxarh/sAJU67Z4VxbbzhPwQe+KL98v6KmacdM5PoHf94kdmsj5pujvdUbn2SazxXsjeK8ep1/lFgQ5dNGVpgsD7rS5E0hJgvkOKbbMx8aLVrMOs37vJ/BTrjr3Jk0WFJUOxA8oOSBmeRHObDEZiy+YGIDAOmuU7Noj8B558uwd5gliJeVKTGJE9y1s/RNLKkxb3ncJdPVQv2wv1EImIosMg72q1SfOLXQ+aKtYieNTWeUPCslnzoRbHoJIr6deUxQKXJgjOfJ8rDeCGUW5wQPKNioLhkcSsPXAki96b/iCvsiRwN5x44FO7aUDxn22eHZDMZ5LiczAVzpG1OMdQAunDSXy2x4WtheRtrdYeVROsEpfkQSG+3TxflIXPlkSA+bauYI2otCXm8b2PMUSHWX5ztljCUy3ga6Qm0FHJotvcfJl3HC+QdoHJsyhUavNIkF+F9QdtD6f3KMH5AzdvOcq84tefZ45Defozj/eO/OgHPzf33fuoufnrd5gf3U5ntKfeuIW+vTKEgga4iuei5EmW6XE37DwBXyzrVppzXnyaecYze83ZLz4VpoW5e9c+c+cP7zW3fOMu/jDd6knhjViWwtmKFg79JL5b3KuU8C1v1/6nWCWltmiTYkjtlQ1v1xhah3x6kV00LCQIXT1H43tUaz2o2uoDREBE99Jm3s9aXfCm88wFb/p/zDkveYbyKoCaTsnykQ/8s/n0J74WBCzELfSNzLcXuOeRguIzXeFsT4RFR+DNW9ab3/vj15jXvcFO3LZeXfzKrz3HmD8yZveu/eaaD/4rPv/GsJPR9ogW1drAD0u2JiINGNC49dlXRvbLNqVTKlDpLdNayDQ1Vzo3uwtTIbXVt9cjFAwVEKe+AEqaMQZu+DPz/o++q2Fy5N2kmYXk/+Pbf2tOP/N4bjG3j0YeNz7XXhpA/HGWFJ9jpHA2YHEyRzZt7H7vj19rvnXH+6dMDlcDlTTLXPJHv2G++aMrzWvf8GLrg9gjvq6VqmUfbV2e7/z2fpCWcKFgdSxudZnP8iyY26lagyss41Cxzz9vkdNd2GhhBtHuSqMsxSMumFpSYB8/L1uUaTWFBvcXb/ifZt26VVFVd915p/nKDV8xVO7evZt5zz/7bPP8s5+Pz9lelhKF9P/0vTvM/4vZpNBaGkBemgCF2wAEvkC8DzvWXwv/PvMvf4rDqS2RtQcfeAB+3gA/7zIPAKbt1NNOM6eddqp56S//slm7Vg5fKVHe9w9v5UOx977to8ELW7nyChYsZnkeZ+u0A0P+LUUEeR92JJLbVC05Zg5lPdwoc2bOwIJHCwmSpvV+/NJRcNyDKhiBy5BPjBx9rtGy5KDB9hf/88/8YNM+3XrLLYxu2rTJvPuS95jfeO1rGafkev9H3snDipKEB5SPA4nkYtEoMbyOAG5PgzufHJQYfw4/yd/85vw05r3mNfDxv/+PP/WJ8tqLMIvg771v/2jRL+en8sODVMk0kp3FaAdbevMRiMk5KaWBunDuq/TQXUktOLDkEMv6SA3nxlMofDiiBtC4sGMjotdSubntiGxjRG8lQodVeuagWeJtb/0d/tA3MSVBo434v//f3mvecMGFfnYh2T/7m218uBXaqGLB8QEOpg+VjZTExVEd3+Io/u7DvxvNHF/43OfMuS96MScHzRZTbZ+HbD9kaSZ022suepF5zx+ez34IzfrlXHB+OQXy2fotnUw+0h82cZ5hUVd7FvDDwgKuxgh1NbG9UFcgLxaoPEEkUiFoudbYGOaoFCD5298phzCdZkVBplWED2D94A6rKDlosNPA/+SnrzP3DP/cDH7zG+Z7P7jd/In69s37Qt/UOknoMOjqj7wDYq5lBCI4PLjsgALP8xl0OFGFw/JASPX1WIjzghs82ig5aOb43+/7G/bz//vyl7gkvxslC7XvVb/6ymi2ec8fbjWnnbEFdcAvqtjXrvxknsK5XSLJSsS3ml6f/eadWbfiMDJsau4uayvL1THH7tgI+eHq0szFBZckCF0EKm8YBZ4++U3kA6NWmWCRI+pzM4O88CWnR4vxP8BsQBsNMr2+oOP3bW9+s/mHj3yY+WU7+mammcdtdMr1v7ypXxrecABBmgMjcZNISLA4ZnbYUcJd9tdvcqZ5gNPMRX66wzvHJL+nShKSo3bSoZnb/uSvLgQYesP54ZLG4SLjXLZ+Wk3iMZ/JApN9gqoVuRfL3dVLtGizOuJBxFm0SEmCFNvCnVyIBoeRu8NrkAw+B7pkBlltjvCsVgLv/ZP/4s3TMTx9ppopaPDRsXyjjWYS+mZ323/949fZYUMUaWSIicWZYwMApk4Mp0UzB60/aKNZgAY4+dFopqCEprVRo41sUIK57fkverrZdJxcpCUHXGIIXyWOdd4NZCqlXdgDJD2PM8REPCOymk3V63Uu/c7qiB1P9UCw5kmLBpgyQWwcC40JobYsGwEdiD0rnjTH1E8q6DabQGsPfT2DFuS06ZmjrE46ezXV9v6rrvZsuk5BMwm32w4GGkDyJxAPKOYpHBY4JjaQr3vjS7zNndfs4CR56S+/zNPKgJfhzNVUGyVzWMTjpWVve5kkBitJjzg/7egXnzTf+W0TI9Ji36VN61b08BOG3h/W89Y92QFiB5gHHGfxlIUEIUJ5YrgBQa21m214WftpHUKL9FavQ16oLgLS4ZE7NepcbFRunGLRTjpkR59R4iSMBhBJoeWguXhRhIjm9vxNzDpCPftFdHVcNjdDudO2jj6b8guf+7xXO+2M4wA7DwRyDgqVRC0fRZgtgt/MZx5B8kdaa5EgNTwkROo8O7Ed4sSbWAfNA8IvDLZYbUFiRZ8LFB0i2wbb8Fz7fQOJvnel3KTY6lmEZhC30XUOt9Hhx1TbrbfcOhWbeXQtwm10vULa6xqPuACk6LiR4PnC8PIkI7eOiDVaN7hE1mejXF261GsMTdewnkGe98JTpF6ftc5D5Sf5zYlLtNh7Uo7bJXyaPWijBbpYZDTauRrEgcAieedFoC4OqJAOwe3QLE+zEfCB8AwBWMN2DB1i0bYlO0OYLdkn9qq3GNeDiQ5hGm2UPO4bvJEM0fXA23TcelBo9JQPID9biEg0IOTbNtTkkoMoU/lJ/B1TtIP4tGl7TEAfuD5yEOPsu+PIwGe+ZERJYoBr+/Pw1bK24RmEK5Gds0alr9TyyTbbt/hiLEoTJGqWioAD8w1leRtkx6ulE2Zk9SNmS735CSL+YQ+H3KldqlcPlPdfdVVpElByNLpw6HwvL6U+qltGgh0PdgCRjvPL88GTb2rh0j6/kc+0WC+b8SiJd15zTV7loDh5aL2TQc8ui99uz+1g/0r8ppZwu6Qqkj181RGG3nhCbzkJ1oWvQmJ5pCFeWAmhl442LbHw4MKVdO+iap8CPZsADkIJ05FGVj1i1u07yjyt/jx+Jj1SngWSr4/wXbjT1W10MVAfONEZns/j+Nwt2GkQfhVnuHQiOd2DldIm1+3AbCMdXeuHpBAqaVlxLeZhuvhHs5W+lYRwPYN54WkBqI8rDLVGfgKJcNhkXJR8Dc7rtSvWma4q3kYzWYvbIUYK8p5ggZzZPHtB4+UJYhuea79vCAeuhJkn7Vr1qKGr6k/LkCDm215/pkBcn+s2sXLHD4bNK171PEZOxf1K+e1QBppLLLL5wH2PYXCghbaRUoQWFwdk4LGOGiVlV/UpaWczW5BveXs6QSM/gUQ4dHWbyFYcXeDwe/2aDcQyNbwvizfVNMLzOiJEug5avGVh0iMCtausbRQIPfW6ZpfKg1jHBcMn1z5ojslONKvN4U58miXXpuqzuNcWXx64Vx7iIbIe0F7sEACdcHf88D4OirQ1tJjiIQOSaCQifxZhHlFu/eaPmUQ7OoOWH9SeOQtAt/vbN/0UtSk/aJTSP/lpOVQFY5bnceYTZuXBp5lj/Zqj8LgtXiInhkWAZOyfJ1iAzZLsEtgKCVLWpnwwnUwuXkLmzpDg0f6xnnuZ/qz6rzi1KUsXdAoy9ZfHnRYYMiiFcPM3wj1JdMGt0UU3pz7dkgawvgZxKx5WIl/YKdpbP5w956cTCQOSJISrkyR/5dzZmU35G699jVf78Y/u5/rIDx6otm4SEO8lfowwTXwjvuhYviVsOoxOGxsz4WYPwKJB1uKN6yuSQ72u0lhtQWNTJggHQqIcNUICrUiW4DpEukL449UD5sk1D/E6ZKqbF6O6YC/uBGAwLoOO7DpuYmgG+ZZKkqmuPCuPDwpqOw/c9zie6LMziPXDGXCeyChwmBslFrfx+cJ1Nzk13PKy3d+R64mzAGj20DPIJz78Hz4xXD9w9dw5HFgVPeunj63FrUR3R5c5ErMHLc7prXGudZGbZNJ+IjoQskY6DNkiL7PQ8dIE4UBwq2P3C22M2l7gutCYRw7/GRt6frY1NsjhQ22+LtcFZIs24RFbNsdnFtjC/9u/+KwT4G/9qW4j8YIK6Orq4kF2woknMpUGnP6Gv/qvvsg+Uu20OS8Y52Y7CrODBPOCxhc+dZN/CpAuEP41blCc6XbKKacY+tBGNugmR7fdhsOrh+6n0+vKT46twi2PdOIvHd0uMXHcESeQGC/OnU0m0A4mfbd5ogDSbNlzdVJ9TmpxoJW8myce+ev9oNHHb7apHneNjgIRuI4tMYVQrTLJtA0HTuS3nDyVPAwcf95wboDZgc98tqv4rKNw2KFv+HNecpqhW0JoowH+9Ru/bh5/LKxPmGF3dOj0a696lek76yw8k34vH5aRzskYeHSm65prdxpKGtpo5viTS3cyrGulBsmMRlTZmM++A7eNEx3is4J54tHd5qWvPIsVTkRC0qGcvsDJDLsj3q/+2ivN6WfQqfLETExMmBe95MXmmGOPMaOjo+Z9V/5ddEj57os/ZB6HfeeHc0x8cF5av0NwRZ6ESYT9x2ndlUeYjYdt5hdZR9c+pBnOtHZX1O3eFSTAZkVy+AcPfeHaSGmBI6UziPNZNUxIliBFgRsCkWMR+jjWIuPVUfP8+lbTmazgqLmOIz5t8TeaGPEDjDqUOo//WJo0eBwS6/d+90PRtzPdCavXEKThNrdOoSSgWYMuMI6NjfE3Mum52z/o+W/3tB7VS/9cWD/EnvWJ/SOKxUVUcJK36l+47mbz1S9/nwR5o5mKZgFXp6NTefwJx3v0lFNONk899ZR59NFHTaVSMR/52MeiQ6sP/s2XzE9+9CDqsRVBM3hCCPkgHzHquFaeePxn8BbFqtl8xPH8Ymx60ztvJBZMC83uQbaazpYwhB6JLjqkkCBEKDTMEqQocIN8jhXQBKd7a+aBo+7AvVnd5pfq22xAKV7SadyxHL7QUdQhvmNZkgTEKncWgRantcjrX/FnUZLQbe30yZ8x0hflHHziiScU1gWUHHfZtQf7wV5zpVwveyruBJxcoo0GHH8EJT/lD+9eeOcOcxcvpoVHSULPgeQPDZ96asQpm6dGRjiJTj/9DPNf3/tevKFli+dd/+lbDCUIhcLVQiVtLimc10GCmCxgdUiatgQvrT4JZ6+6zASue9CZK461MKM9q4sRa0vYQo9EFy1CbYm2l5/84cuxHruMiZYrRUGUQ6PlnKEgGSAnd+zjJ5sjdm02Q+kN5vb0q04FpetSBmPc1sTWwi7U7yDw6J6pz3wZj6Ta28pdBXTPk3smnWh0SCWnWzdGhynE45kDj7B+5Uvf014RCxv8jJql/CY/5F9ECWENhwac/Pu///TfzNNP32yZUtBsRtdu7sR9YOQzzSIvfvGLzTgOr87t7y/MNJQc//3d/5e8iuyELxwhe74X8xQIWL9QHL32GH5ZNR1WTdRqkU2HWGln2JFzHngyAxKzdPDa2y46L+YsbEzaqnzkBDGSIFEglIxX8oAwAxog5gDVlJMeeJ7pHl9tbko/a+5Jvht4duQFWYF4H3ZBniD5t96xkNmM+6b+9kO/E90gqNyfEqRTsX/2R5+SmcNL2sEk5kHVg4uEyv0I4gJ5nORJC8U7f/9V5h34zHTbs+uA+RMkxn/8yw+CKuzFnimMq1Q4a1lc3DFruteZUzacxreT0FVzuakkMg/ECtuCuAoMwhaSLnUSyaJLkMIi/YQjXtWDw6wLJHSuYdJawpjigRyduVYHBQWHPzZYrtiFe7R69h5tjq2djJfL/dQcSHC7CASDWYGcPhsBN+KTPNn3VAclWGjvN5/71Ddwce4uswkLd7nR0NVeXtJi/G+u+Kz5cyTH44/uskJkE3++Yot7E8QTPomINyQj7RYHLa79JL+tUbqwd/2nv8Uz3sbNR5qu7vAGdTaZ21FiXPOBr5j3/s41vOZgNvtA9YgX2g/njOZ6PjtKFujN7avNyUefyq8VHce6QyeHiFlhr0Na8mEf1I7p2Lk2BlYyfPtDn7824AsforZE28uf/tF+nPj+miZ6IQ8IN6ABoqgpTJth2PG6x9eY3of6zGQ2Yb6SfszQmS3SZH7YKR2riUIgi7MW7XK48oLObtGzGJu2HGmej9JJUlLQGTA6lHoQZdi0H0QNQ49laEB6YYE8bv3wuJZkYp4D3JLosOt555xsnn7GZhx6bTJr1uLpQ/Aeuu8J8+D9T5jv3Hy3ue2mu0PNqs1E1F6JzYgiEr56AWi/snOVORkzRyWt8Cldvu7B0tg557yepxAz2lgk7Io8k1y187aLLo0YCxxRzRZPdYJ4pgdEJqABojgqrNBsz1Od2j222vQ+jCSpT5ivVj7uk4SUvbw1HOHWOtOUvcJwUDyxGayIWYVzncA9SQCPNvDD821dHreGggvanpXyRdDyfirStNvFOgVpjla5H+XJIVVbByI/2FRhZ6sFXQlbqYiSmCt2fvsNlxcMLGBC4SxW92h1iBrlG61a6OnMtQwUFHyLFZpKdOaxUJAiaKxrr7n32CE+rfjS+pvNCdmzlGVIQCfYJg3pfNrz9E1MSxUOo8yT6d3irEf2WFj4jBCfrVl7ChdR4Tfyg+2RXand7dkmk22FXIfURHv+50LqllqFL+0iisVJmBHIsh8WZ5tWn0jsg3hgFUSC6mEVkWVRa69n1eHRzCE/2GklvCD5IR+xG/ZMD7vAsPLE8hvLZeG0nGcsbKCQIAPD20fyEeG2cTsCRDIUeKLkNyfFPBYKUo7ndEY795r7jr3dJNXEvCA735yRnceGxbaTlo7nva1UONLpZEuqAU4Ab8ITHRFwlIjvqkBL5E+4ZFAGpMUVXwZxkCfIRcL54XHmWD4K5mt54osSqzirYlN47IdzQ/khZpyGEwDOvrNh2tk/4osDxKffIDxx/cn+sEoe8yC+iFlpRgnWG4uEnWZpdaFbe1TgR1KHIuFFgBQSxPrMDbFto5bZjxTSyVZSFUoKKsDoY7eI54goSYRmkuFN3zX7u3chQfrNL2XbzCpzGEuxnrMFROzIngRkMCgcEvJHTMtnCptjYhhARFPyjAJHfWSRDWi+9UPXJvpUD31KOMwQnlh1lqUeVuSaiCs8rhl6Yo8wqYUlXBXE9xpC9O1iO8QlPdGmesiVKi4C0mL8mHUb+WzV2ATOVtGKPAhrkLXdjkXCzpG5VOrBFoiBDqiWLroZpPx5EGNGJLwqBraxiuJBCoLfqBfUFmOBEYvJhcT7jvmBOXLkOHPUSK95efZW86P0RvPTRJ4jyfujBw9Z9XxbocdtlYx7Z4pc6knPtpDHrbMed3wmFKhSI8jCCXzvpyJFnrCOYsKCxxhQONdi8Vgo6BAk/yx9xGqc0TtsC88adJ2Dr5J7XeevuK/3oa+UsBWIKAoJYIB23vaGRTeDlCYIBt+NOM/XzzFA+0ITddg0vShUqlMQC1IOeqLnPrN31RNmw2NPM2dN/LI53pxpvp98xTxm7rWd7STFFz9kmOwx62hxABW0I4LSt/bIkIgEQRkwCufaLI5CoBw/jDLwA09U8xSFs6jCbV2WzBjVGFlEXQFPcH1jDWaMTfgN9DU8W9Ct63ymygoFWWvOWfUMD9jaYzlVmQJjHWgsuuSgVpYmSFZPhpKUbm8u3wIdUEA0GCvGYuAFpQAF8ljnPnPfxiFzxMhm07PnGNNff4N5LLnX3Gm+iUS5D9pKi8GIwoYs2fqR4+cGEAl5i3Ygezxw7NFQngPckqTQ/MCTOgKPcZU0BT6L5vxGRUFFbAWLgOSfTGGjxMAPqeJQihKDNp411Evfgi6z/S5fh2MU5BUhgAEiPcaENOzsLKayPEHSiaG0JHdC0wEFRINx22Mx8IJSgCKykjDmiZ77zVNrH+YkOWLPRnNu/SKzPxnB47vfMfcmd5hJMxbVx8PJGxbAo2RZ/q1Ojt8gMfKDJdISBGYt4C0DV6QCPxhlDc9nHY95awQEFTEczAOSf5anGw17Vh5mjsJjsis65S2O9Koef9Mh2WLJ4i5fh5MoyCtCAANEeozFpBudvcVUxk1Qnr/ylI8+hVb2ECkIAQqIBpWmKASxAMW2IsMltkSP99il9QoSZYNZs+9IU6118pXeh5O7MaPcb54wD5hdgGQrGWDQF2vBA2fXcQr8IMBmhW+lUEQ4JDxuRaQmjRT98lwGGvBjodAOO5qJ3YkbC3tWHo5Xg67h5KC6ad1dp3WGnTG8GWLmNjFVlChQFCGAASKzjMUkrg0/23bex265cJCRRbQraYp4/6unfOSLaNRWxsJXi6CNGghrwWCASDzCFKJAa1UovC8yWWbF2BpOFLoaX63JrRnjySgnCSXLBGaWXdnj/lt3N+AJ/CCcN6fao2pj2/nBEvGBRLhrV2RPJGxjoNBg4JMAi5bwvYlQ25quddYk3Raykq8d0SEUwSmugOMUKvPpMIrWF/HVcKuaK/JtdWxffQkh8AJEYozFJKfNvI/felEDrhdbkEDpIRZ5mqRYqBubINb1Ri1U44M0rbQUEaYQBUY6TI+Z3p4jj3btMaPde1ivc2KFoYTpwlX5tbXDzZGTeKO8HSwZlxg4pAiY/sQ9KoGxQYG5khIa22A7YoO+m+XlBdCz9rxdlpM6hCaw12F50sPGdQXYy0yrLtHLElls0yxBCcF1ivVcL1ii43G7XTQDr0BRhAAGiDQZi0neoCIPeuIiAxomSJZmg0ldmqgaGjVvLhKjUDcTgl8THQcMfczqR71vHTgEq+BDvZfWU9M5uYKGJg9Kb48GKNNoJyckfMIQiTYn7AYt0+ygbgQ7nRyfavPxcnVbGaci9RMRdTiirRspALL12SeDFXKy0FQgGYq2uZgx4voFQ703Ro4sIiRuT87xV536sZ+D1Jsjh45mRmwiwhSiQGgFjKGA+qoKJCVY4FktJeLtUF2l8pZYytM6OYEcKvWA2KAW5nsdD3g1ADkiUYokUfDSVkDJKdDLOmCmiRHbKsFiElcTkyxmC/ys31kfvXnxXQOhhjW6km5jmw1YgAsKdOg8ar2NgIU8plgKjKS8La/EVbDFiKQEY1siT3umF5g0ZEuGLeTIZD2bNI+M32t2TT5h9tZ28We8PhZ0cvZyqHeWr16zB8EfB3kdDzg15xkxwuabGkgeEhPWkLKnQC/rALFXlChQLCGml2AxiauJSRZTBYSGF2tyUAMbHmJx6w2tQ8wlFOiwBSRAlqsICgQzYLGtMqvOltIJYhHEEkHMKaralDjktOiTE4+Y/V2PmeNO7TbfvvUOJShgZ9pt6ENbFX8rKvLjMYSvqdKCWaytBL2SxGH09XiAtEgjRxCy+tKxBFWIhtVT6gpU0tYrZhYlChRLiOklWEzi+mKSxeJC5LIk+pKNnF0ESNzOEod//bSPPQUyTvcG0QBZBUVQIJgBm2liBM2iU8wrCDQYfpAriMLkPft/YF629Rnmf/3vN0cV3HXX/WYPHriijR68+jFwt916S3g7ItGJr7culVSUNJQ8bltblXvLCF9TRTixNYoJ80SC97oBZW3x8swsShQolhDTS7CYpD0Sv5xjpfas64v48IpaEH/12WZHRZLsxJrxEqIV4qUICowkGw2CWJ5UhFKgU8V2Y14kMIUOWJGoM8KlcDZtsj9Xpninnho/I/7Sl53lue989697WAP5RPr2rT/x7LvuvM8m0n5OPEpAvVESnbDqVJ9MUYtUAxSo1aWNzCxKFCiWEOgBckaZUiTnYmkF4sKZ8CVONQx/bJGuPVwjDpogqUmvxVl1ThBWygUvRgO2UBODPQxuujgcUrkWT/497/nyMjcypOGpDFMiXbvjK+aubz5uVvFsYx1T/ikwMsX0sCvyNMUaCbYC5MQamJpVYiib1zp4sZYHWaQbM3DH9iGcXxziSNm4UuE+0vCAUWKUJUeQsKGyggW6iiTzIgFBIhLJWwKbVPoOlCUx9kqR1hcPPKAfs3XSc1dSIp162nF2EMI55Z8CI4eYHnZFnqZYI8FWgJxYA1PaFYjGhopWnLW4xLfvzpiy+LCDJgg1CWdqruaSYAL8FkJlx7vnOCBIWEorEgOmY7+kLpcYrn+dT1TSQlsfCmneXMKUpLzItw0oxMs6w/Swi1ws6FhCoAfIKTKlSM6FygrEhTMxZZlgcf6hWy4cnlJoETCnlSADd/zWTsRoJLQnRLZZieEs6m95983leL5+SyjQWcClBbglAo60ptKDNyo+Pu9J8u9f+b5Z23FYmavSGmoGO+0891GIdRyb5CFCHw1pLI4xCyodJUm2InsiO5097kDgL9XpyC5kmYOuQbzzibka91hc5nAOskNUKR2jCaGrFNWDzC0qMb8B2Xa+N2EBSgwPOsiXnmcpdIhFZ5Pe9M6/NFtOPxzXqWtm3ZpV5synn2QS3LqxZdOx+Gw0ycQ4l1s24xaWJm9f/PxNZmxv3azqCWe7XBUhvnnP3eC3koodwACRFGMxyVUTYsYUK4SigbjXmxLIkqGP3XrB4JQyi4Q5/QSppleZiew96LiesrYVAmp7uEC3ykwvMIXQgNyg02aWGFw9KiCtY7p6zZ4nR8ztNw2bXQluValPmn/+V7ztkW7lSBOT4R24tNU7cNsKtgRvGuw9doM5bvMmxo/fcKTZYuEtoPfipdJuO/c5fQ5sWH7g/f9k1ncFHRJslBiNYsI6voZYirGYNJUkZ0UDca83HSBZIrMHtXVG8fiN0z9+Oe4o8rNIqYEFkBgNGwXf8ryf7hsyeyZHzIPVn+HWcNzThSRJ8DF1vHYzow/ugaJbxqGYVapIHCQNEqdexV3ESWrqnXIxcaqBc+YpJ5meNfLQUs+a1aYPs9Tun4+bf/n898xZPefwGmQpJAbFgE7tfvyWC4+fKh6LiTf9GQStqmMWSSaz9wDsiQYaI0KJ6CoSSiRPLQxaRyi3pQZ5TiCHhnpKEsMxN3efZO7c+x2zvrbRPJzc48jFErNKOoEHtFDSMKhwSWLAKVGqeEYFCWTwoaTJ0tRkoNF2+09iu1/FuuOY0WPMKWvO4JcolH1PFdqiCAEMENXDWEwiMm8xGZglxHQnPfsSi9orZq+98DTlGGKafv34F9ePnnbUr6/AEO1nFYouf/XJoC0LthJRtZB8iQ4LS98VbQUd7lwlYNWUfQtSYjRIDqfTUcGdv7jqvW9it6lmHeYAnipJaNawicAJYJMBB13FOpiCebU2adLJcZOOHzCVA3tNZf8eU907wnA6tl94WM90pevMhrFjzVFdx5qNK3qhrRpisYjiHI14iujoMQlU2WIyMOov+c/V7DQOqRzEQ1GXHpKFBaY8oxmEfKdZJK1lFyPKvUAbBpk6psiUpCBWtLFwiTgLKR0r53RzqCPDkNIJVGvNEpTy0V2bzIHaXvyUEvEy86T5Tyt06AUlDn3M+KhZ1XEsfsr0OLOqiteurjo5Mq7cEboiBDBAJMRYTPI2A9lCceHlmgxc0WR7825uRjMIecuzyNFb70W88YLr4kY0+pKKk4MGbMmgtXIFcTardHICOTQ4QYnRIDm8jgdETdDEHNax3ozXR/Hsdg3333SaAxndgiaHUzKbUJMazSDBhUbQus4TTU/X0zk5Tlv7LFO1Nzjm3JG4ERFb4AXI02NSJC/qViAuWK4VO0RmJ9YeS+LUro7PtK6DaAWCP//D7QMoBgl2G/eD7QxHoy6Wv0BhaMpOUzo5ezlUjILISTHLxJBhKKaOX3mqObJzg1mVHGmOrpyKRJGfYct5PyO0mq4wR614rlmLBKHrHS45Cm2xBEenUqeIx5wA82UXkywWF0q6BWCWjNS6R5fUoZWL0owPsZxirWK2V2p4ZRXd6UudEW00yEs2EEvpLKp0ckI5VAyzrVKOtWbrz4moWqyANWfl6MbBrsoK8+CBn5sNHWeaPbWHzJ7sATw/MhHJHwxJMUOs6dhiVuND8OaVJ5hNK44vtt/WG7tZgsUkrj4mWSwuDuZmc/hp/Yqdg3hl7RLc4hjPsIGvfeaOS6ByZVBrMPxQS+OKlE5OKIdKNWyrlMN8z/GAU8sRrNN8OGhhXezHmuS+/Xeb3TgFXMcLhvZN/sLsqz2MX12iZ+FxQKHPYpGiPfrqSFfzWmNVdSMnBs0ax698Gh9aafsuILFXJVhMYhMxyWJxEVXVYoQW5ue1uI55Mx/HehZuvPaMHV/DMU5/qSEQS+lcj02MEoESEhtSqVTw1Ot4QEQa6TRKDNISE7KnBHlw9Odm9wStSXCSAk8iTmR7zDgSBS/VYVpCq5Z0jenAh2YL2g7vXG+O6d5s1iFBos36F7tZgsUkNhGTLBYXUVUtR3BoVU2ys5bCPVeNYjXrQyxncLJizu+om58D73E0GmFxZ3oOgMWRGK4Bazt6MMjPMmNYwFOSUMI4WLeKZgp6YIoSguBuwNFWOpDjKDEWk9hETLJYXERVzRWSpfXtH/rWRcNzVd981BPHfpYevLZvRz/egIKZZG4SI3I6Qnz6FVoy3RnDJQYZyJn2Npkedp5eqmONBFsBcooNTOXqjw0VrThrc1RmyVW432pJLsx1BGd8mlcrO/jOX1w/fPoxr6bzSP2OFkqaMfBHPZrr1RISy8ip2pywVffUnLKtJVRrIaq3UXIEHRIK/ikwssf0sCvyNMUaCbYC5MQamNKuQDQ2VLTirM1hKTcjnj+HNc5bVbM6zVvm7WeGtl8OOp3+5c0NvoWWGDLAxDvrqIxBII0GH9PDThpo9wUdSwj0ADlFphTJufqtQFw4E/NXYt0xueLAefPnwNzW3LQEIbfHk2w7hhl+wg29ajtWN6eExHJzMWNI3cqDclC7yzOPJLgSthIRxSEoHaghUnH0g39hWEmyRR+ra6ud3wLJkVRq5y3VU7plwaX4N3Xb2rejp8uk34fRXme4tBIQOZGckCoj+QiZQicn58wJ2TJzMjnUqahDsqJERFFIAANEBhmLSaEeD3lJVmggHknPBwK/tn/0lgt3zkfd81VnS/ridX07+vCyh6/BeDiz5VoI4mJLjEKQFCGAAaKmMhaTXASEl8cg20DcS84nAN+WXXJQvFvWJxchSWo6SXC80KiyiB4hDZIJMjkxP3aEbrk5oRwadDzDA8yLsThagRcgUmIsJrEtz8tjkG0g7iXnG4B/izY5Lujb0VtJzVZ88GWNr+0kGcaLmwd33rJ9eDpxbWnfcJIk6ddSkxRnEngXVa4QARXBtQSkEipzI52cUA511uyhVJFboChCAANEBhmLSaEeD1lJK9dAPJKebwQ+LrrkuKjvI314AOFi/ELBVqxvexMkhlvncklf1lkyiCdGt+88yIslWt5HlCRZUvkaOtonSVSpQgRUBDc6QCqhMjfSUUIKdFZ8yQvlEosFHUUIYIDIIGMxKdTjIStp5RqIR9ILAYGfiyY5Xt/3wa2mnp4bkgJJQInARy4lCYKeA2+kUjfnfXSKHxedk76ySfJFVNbLHZ+rVdAckQRBKqEqE5arhBTIcnrXTgwdjalhxHHBJ8drzvjAVhw24QIczxR4ylUnhYYbJghpjKSV7LxGL9ieajxNHcEZcrfh7NY4DreQtn1OVSovcQGkEiqrRTpKSIHOvC/nIjHi+i0WF96fBQ3gVC6OP85fiD+XtrXvyh78VNhWk1RejdDS4RPGiR38DOuk0PAUCSJ6DW+4jPu1xT3HSZJWrkSl20pTAIxGDgndcpWQAgvezzQxYlslWEzi+mKSxeKi4NeCJeAKOa5zbG/0bToffr/86Vf2dph6P/IASZFKUuhkaE6C4LUC5b9hcsg3K84kaDuH+JmB7W941j/ejvvD/W3yMpDLLclYK444SylVaidGaVimJNKbECdWHNi+EC4Cvvzpf9WbZEgGWmibGtawNFNM1eNTNm1azKye4nDNDOWF5zRBXOWf/N4br3rjcz4xhEcqaF3S4+i6lHDYoKjYKFCLM9xOjEJIpku44qO3XnD5dIVbIfeyp/1FHydEkvbjAZw+zoepOrv5TpxbZnJuXch5QIdck5XqDpApe3kTh6xbyjsFOtEgz8yiRIFiCTG9BItJoR5fc2yoRNxLLmQgwzus8PNo58/XIdVLT7q8nxbZGWaLNE16eZ6wswWvLxg+yBqjSYdYeGvoCO5Ozj280/iQf0779Y3P/gSmU4NEsddL1IhTYOQT08OuyNMUayS2VYLFJLYQkywWF7qmxQPjdnXcdDjnj8q+uPdyJEP2agx7Wk/gzFNJAtABFSXHXCYIeg4nJuLuBq1AmK8eptmkVu1EkmQ8mzRyjOlhF7lb0LGEQA+QU2RKkZwLjBWIC2dicZVYiOMs1aVzdZaqv/fynnEzvjXN+HRsvyQF0mKqBFhACTIva5CyEWUX8Odve84n+utZsgMx6tVyPDbDTrNygxmswkC2BKXVwJRTtZKxoaIVZXChg3L69mocRlzealf7ei/p6a5146gge/V4fZzPPLW6zlbZXzAJ4hq48ztvGgR8/Jue+8ltSZbRKeEeGbXF4VmgWEKgB8jZZ0qRvHQTgxo+B4dTZ2+4pBfrya2YGS5OJnGti3/fveI7DqYAADERSURBVCTQriMWSbmgW0CHXaaz8xKc7XoP4unPdkVOKySAAaJ+8JgHQu/EJIvFRRBeZBAW4Tvxiu0rWvVShb6Nl/Th0AkzRYJrFKYvrBvc+oHK8ot0i+UQKx4fC3QAcKJ0dNLa5DJ8etlN5XkAA0QyjMUkVvW8PAbZBuJecsEDdCiFxMDbRq5uRWL0rX97Xz2tXIwBTonR2ygBZIG9eBIEXyalb6VfcIdYZQPQrk92Usdve96nkCj0bmDcauCFA0QkxmLSVJKs0EDc6y10gDqYfpdjsnt0Z7Mv9p16xNvoNOyrKSnqONO42GNV1pcpnbwo2RZFgmi/d377ogHgA9vOvg5XW2tbcQ6dkqWPZJZdYmC2wE+dDeBaxtXN/Lnl3p5tPd2Vjq14euJcBJW+iJZkUtCY8VuSXe9hBSyJLwNKljTLqCMvxjcpJ4trY9xAYJYQ0530wi95psBtIXgn1Y0f/xZ/WTTFaUqKDpNuxW0dPFPg4GjqU7F8jaLxIdRiO8TCTHF82SHpYh0nDQcFrVcqnV396L9zMZj6IYiEWbyJQQmBNgzi8On2apN/ORZJ0WtMja5RXIy1hCyyESs3uKdcSC+hBEH7B3CrTelrjBbdIRYGy5SbXa/wYZgT/O2zr+uvJxnOuPCV+nNx2hOnjrNopnGy81XyzIBksOW98GMQ64mhZq8nNq66qK9SoVfFJhfjZ+Y4KearzQul3ql+kXfJzSAzDfpbzvlkH+7k7JmpXrPk5+KK9sZVr8OXAa3VcM9TkvS6GYLLRjPBcjnEMsngx2+96LxG/bnkZpBGDW1En68b9Rr50yx6T8/Wnu5xPHuTpf1ZRknhl1/NqmJJ2KklyfapGrLsE2Sq4CxW3oburb3Zgcr3scqet5lxccQuu/RgL21YMAnS14ur5rh/h863Z/Wsp5rWcJycYaKXjb4BaeMCu1I68ach53WtQYeTUYHpHM70bLEJa4AL7Cwa+0L2cvWVyvEhT5C1KlTE9nQ9ileQy/GIT9v45KgZw2fv6G7zi10Pmb1j+I3GZbRlidm549Y3XnWwJs95guDuzt4azpxU0sqWSlLB02KdQ0+OHdeT1urbOpN9poLf3EjTmh9kDnCDSRokA5hhrGo9jwC03OPg0cZJ4+DAZUW+ZUjErKzX9lRW9WRKW9mYZOlSBMRC3gbjNnsLPE8QIIcqj23bvIBue04XNTPFy6q4kFdJBT9BvcocsXqN2bBus9k3tssMP/6fZteBEe/zkgWSZOfOW9+4fTrt8+GbjvChyNBtzxP1scuSpHJJit8Qr+AenZpZbfZObqCfzDQdCX6DnDfVkda7yEn7Det88TwGlK6z5gVowESIxqRmO4AJUZKMCB6oDFk04gGxZOuBxZuRHDnDHi2xzbwgEPsEumdJy00lTUx3R9U8vucX5ieP3An+kr0OsvPa235zu++cgwBNfXl1o7ro9ucD9QNfwzfvJU5mrL7O7J042qxIdk87OeTsi7OgOpl7Oxr+PADUeOcOZ02SxYdVginMMoESICdLlEBlyKJSBMRC3jLjJQOYBEKVkRXvX7CFtgWEbXu0xDbzgoDynCrVLWEvmF/HHaH7xydMz6qjzLO3PM9UK3N+cMHtat0uw10H9e0zSQ7yZU4SpGOi44s4lOlzjZ/MVprR2pFmZbobDtQtWQ1w27m+j9GFegCTgucxoHQdzwuQrEXiguslkrat1LgSr8vStt7ITkAiXe+HUAs8T8jxgXoWQ9R2W7n2geBDTA5qG5uw9qmYmMTPYOOXeU8++lRb2+Iv8MW8E/l+1idu275zpq1p+dfEczf+3jYctfc7xzKkxGhto1mR7kH3hKN57iM1EAI41QAhq9TNYSvasdy4YAWRtQy2FOyQUW3ZS1lAioB4vjXBeMkAJnYY8JEVqlC1xfKk8I55FEY8HNXpRHN8CGt55iqCAs1EvW7WrTjCHNuz2Ty86wFncLGVI5nJdtZrlas/PTS99/CWNbDlCYKnA99TUdEfz44yncloceZQMgFENwaE/fcoA/EgsCTfTs+1Sl4XEiIbKAESptf1st6sHWhWA0Wk6+WFWuB5guJbmme5GgKBK/doC5ODqqa2j2Mm2Xx4r3kUa5I6EmaRbMPwcwAnaq6/bugtg83wuaUJQmsPM063dEjXZjhHVcvW4gcud1vf7TD0Pe8kiQ2eogvFqwnfoswryFpCXLAGk5TxSBXIbJPD27G2PW79DFUKh/dWKMhaXiAEn21DcyyJridq76EAumcxGhM0T2SFQnM7vtzMUWs3mF+MPEQ1L9AtG0YLB0xSv/YzQ+8YaraTLU2Q6qjpy9Qqh5KjIxm3bZiv5JjeACEneaioESSgJaBQrABPmRyRBW8g2LH8QOBYeRS2Peyj6BwlguJDsCgbEyN+zjbxapg5jlqzABMkM0Pw79p6dXJgYOjSYWp5q7aWJkg9Nf26E+i0bncyibbEyaFlmBcTQkeDroYAxyR8K0uIPJ9l47AxT9lWII8mr8seup2zS6XVyNn2dpZQclBraRZZ0bnKVCqVBXCYlQ3glpkb03o2MPDjS4bJv7nYWpogOEG1RZ8nywyeODDjMszCWFPtxBD1o03IHgWgBzBxi7LBqNez1hsmB9tla1bSpoEyIKAleHkR92JlyeFlRSrI5nRt4un2eFl2Ld/yvI+K7+v0zZG4KYMK5CBq3MMWqNUzs6pztdmDK+5zvmVmAKdmr+/o6qCZYmTO60eFLU0QnFrv8wHn1nWgs3CIZYkxD50cE5wYy6shwJaKssFozkzjAQJBkQ0aDAU05oOuWAGe6+TQTsALj+b8I2+Z5wVi/yngihVgSySu5rd6gGLGGkF9A3is9/obfvIHA62ubzr2W5ogiC4W6HrD2RAffE1HR+R6glEvGzNjWdWJEIsl7RBRRA96WU8R3YBaW0KI63T1eCNxvZ5sdV1TBVWylm/pJKZAIKpt1kbsh+JDMdIFxrgiKhCmNaZ0LVlZdt63pMSp2GGc7h+o16s3/vvP/nhBJIVuaMsSpG/DJf26IoITM4qzWB2mmkwoFroi7quoY/MdFcsqLmzkzACPiZ7vyZ4S1Sm+qj3ETnvWUebUZx9ltjytx6xa02FOBT7Vdtf3HjP7946b++7eZe776Yi56/uPAp9QPkrduj3BG1gGI8KF5KuMuBCMZS1XERU4o+TAzaNm94FdBR3vyOyAYcwWA1ktu3Zw+LKh2ZmYG62WJYjJanh5WCVqRcXsxf1XR+C4ziUIOlL1nActEA0CWNKyNCS0vIdtjcxVRA8CENhTBA8o4+uPWW2ec+5G85z+jZwcUUOmgZz6rPUs9eyXbPTS9909Yr739YfMN748bB5/eH/UHlU9NzTCYSG0XbWbLEMwlrV8RVQg7GhM6VpyZB20A+P7vP+HCFAiXEuPtw4OXz58iLbmTL1lCYL1x5m5vsDjCQdwbh1Jw52BrlB95UELRB2FcMSyXpptKYwDN9UgENmgwVBAzTMwS7ziglM4OZrdC8dh9qHP1t86DTPLiLnhM/eYbyJZfPXWGY9bB0Lbc1GBYCxr+YqowPLkUAKRddArqHjP+CHdBj+IQ6jr60l94Jbh/zXc7HjOhT0VnuZWd+bR7/x+mlT73J27aVpBgqRmzDzDrMaFwtDpqpOtN1FHwa1YVrkMUGHcAJ0cEc/LBipDFj331443r33L6Wb9MauaG4iDWKOZ5KZ/GTYD19xJLS1pjzOQ4/n25Pi2PbZwzBklh4t3BXddP/DUf/KFQoorf8jHCC68OXEAR2XXd1cmMFNcNeIdWKRAPo5Na8aZR78rS3GIVUyQE82airtYqAY4e5IbBPDGdRY5FnEhn3d+NslxGmYMSgxaY8zn9vgv9pvrrr7dfP8b4ap1aHvUcm543HbLt8SYRzGMKYwpkrauRTtw/eOuh283ew7QFxqk6FNIkGQE5AHMN9fXOmuDQ0sgKfQ4UGHS5EODn4HXU1bTCmaQYoJMmI2mK+3EQn0yDHDbY3lndGfpTiTFomygBAjt8LKBStCqtZ2cGK+44ORDa2yTtX/y/cfMx//yO+YJJIxsUctVe1zFlm+bF1oJPpCctsRNCWm+jjdZ76pWzLd+diN0Cr/hMYzXBA3ikOD6oYeuQnIs3a0laxDcXdLXKGS4l9dMZqtwywldUcfGnaW7yZIbdCLJK5aYUD0b8bxsoBLUe8ph5m3/4/lmy8k9UtkC2p9y1npz+Y6XmmuQJN//xsNxW317nMM2brZ5oZXgs2xEEVuKpKOuQsjGSWzv+F7cEcu3deCqejaEl8rd21GvDw49+sEh58FSL1uSIOidMxsFroLHaidwRy9v3Fm6m3y+eHXPtR2r+ldMqJ6NeEC8rrVG/HNfdby5+NJnmZU4VbtQt5WrO8w7//IF5qufvcd8+v0/EDe5Pdpj2zrbaFso2YgSJYdwAl+FkPWJQ+vFNZ1rd971+Icv1bUuN7hFCTLVDDIhj0hx/8RD2JJ8H3iu7UtbMF9kAyVAYAPxutYa8V/71tP5sMqSFnzx0tedZChZrvmr78oA922xrY0L4TZouzMgKlYRGmXJwdHDYQC9zXHBB6nFDqp7bZtYU2L6p7Y2gSkbx7VKiGFF8APc0hRL9FTPah4xvS7sE48+b7vs+YsqOVxoznnFFnPZNb/EiUI0bptrFONOUhDdduKQqOxcwRSiliSHNYyCF/ZpfdkcSnFASnZNTxBaoJfUE5GqOMzi6yGWqjuRSL6TbV/agqVFNlACxIpBV1AeFZQcdBq3FVvXN//BrPrUm0317v9ohXm2ufmkdebtOOTyyWFrmqrtJMJ8KyRF0FDfL2wtH3N6L+9SfameDd+0iqYnCGo9aILQ1ZCJTI7uuKNCv4UBHnWstIVJqmeVGo8G38kQF1msOZAYrUqO6n23ma5vftBUUK740p+YZGzPtII+G6FT+o402/742V71YG137ScFiUvQUCFkez5uVoQKfAaZucx3TU8QBL/3YDGt4JHbyXq1wRQPbdVRzhZ3oupZKyJsIL6TnTpozz13E5+tcjaaXdLs4bZkdI/pvO0fHdqS8pyXH2detf1UFx6po6ztxLEB0nFhsqWLsoob2xE1mj2w3ehklnPZ9ATJ6vVzDxbQFDcr1v3bTETad6TtQFswU5IjWNU8GgheFyLMw46uiNOp3FZtNHvQzKG3zu98oqWzCNX1qm1PNydjNuENA7nQdmLYAGkeky2ddVnMCzoVZtH6A288X/brDwpG8xPETO9nBejBqbp9Htd3JPqLukz3I/MUwYMA6IvO6zo9K0DrjlaeytWzBwWStrmYRaiet/3F2WhbZy5OxMFm26/jwmRLZxkW4+CxfI7Fce1o8JNkTn+5lE1NkKf3/G4vIt4zneDxYRZuXPQdaftL606ZHCwYupYhi/4qbjZs5a0jZbOH83suZhE69fv6d57hqnQ5MfPkgIUQQTEnXzrpSNmvLfkKlxHQ1ARJKvWDLtBdbKvpATwbYi/DoJcKHUUURfSgJ3uKiFl0Fb5Z6d6qVm5ls4erb65mkRdgPUKHWj4KFvBfONYhGvBuI1B/6SgWi7gZGdc/2odXNmjNTRD8jJfrjIOVFT6TJbe+FzqKul0RPejJniJiATW/eelZLT20mmr2cG2ei1mE6vKziG1/lBwUKxUXAYkoXioWE0QWFgS4UaTa+6YmSD2rHXSB7kKeJnjHOx4aKXQUURTRg57sKSIWUHMUFuatOqXr/J5q9nAyczWLbML1kRe84jiutpAczhmUEiIfQB1e0WUBKyXFoFJf1mBTEwTDfdozCEW9Aw9QTdIDVHbjby/pIKZ4EIDAnlJIDuK8psWHVtOZPVxb5moWeeXFT0csQlwIVJiFA1HzyFc3czi/yRb9NqLDl3vZtAShnxFG8HtmEtAKfvJgsi4JYqd2VqdO9B0JQGBPETygwBM+q7MQZg/X/rmaRY7YsNKf9qXBrsJi4UDUPPKzmBwc+OFm/3Coi8liLJuWIN3V6oxmDwpWNR3nGSSfHD6Qvm9D1zJkUSrct+e5rzzeq7UCmMns4eqfq1nk7F/ZHK03qH4JEfYCuMK5VpocJIpfAm7PHj5KzbwOUjf9yu60QDrEqulDLK3l+9b2MHgMWVSKgLR69uj8zsyvks/VLHI2zmitwKlft/nYhPA4Fpd65iARK2YSPCuLC4TL/g5eHaymzSB40XHDZ0B0hXm4nsmDU66TmA9E8EBlyKIRDwgtzlv58FOK3/Cr/nR2NyPO1Sxy5guPcaFDiaBEsQpRzyeH5wSVQU9rA028kp5M/xqIjjsdZk3gviy/cUdR79oedpBFpQgIQfR6nlZudEPibDeaRWabXDOp82l9R4QvlRCeyMRBkwMCc/G77ZFTCxxpygxCC3S0s3c2be1I6RFc6wY61q0pnC3u66jDA2Khg77EzdmaTUmzR8cPr5+Nqtc5lATzRg4CyAyCiITwRBqyzhOmixsLeBVEvr3+iGJGSFMSpGpmvkB3nlTdmSzuqNB1BDFmSVIExEJsppW3lTRjcDcjyVy8GpW0BjnimJXM1rEheDonQUiufYNiMbpNSRCT1vuLpqdH4UMszCB65uAO5p4VG4yrr0bBhUd37bbqpsRmDuxmJNrBIrrpxLUuSiwqcQzRChDYQAS3VMLbC/RCiJuTIHUzqwW68yb1ryK1nWb7jPiFTnRKltfKF701c1A3M9lUCCKQrqy7jeMmiw4m+ZASgI/gngoccPsQy4XPl81JEJP1eouzAGgWGccFQ+6u0GdxJ4KuWB6mF7+1YmvFgG5mwpW1eeOJkiCcF42SA4oSxxBNEqVPe4FejGqTEuTgj9kWqw6UKn6WbZzOZIU+izuROjCIB1gNAsVuCtiKwdyKpNONpXWIhCREy0MWkMJTrTxbGdS22rBE4JAT5KSebf2HGszOCj2CG1yJOhFI6E4F2+Q4EmuQZm+tHMitSDzX/ihuIPq4WaDA1/T24ZULY1SGURmRp4/Up/GShoNZq/Cdvbr7Qs9ZiE142CYH4a1Yg7RyELcy+Q7fsMKHOsRKSIJ7qp45JLbtBbqPnQYOOUHw3OwhLdCdMyleRYofaQRquxJF6E4HE9HynWKTy1YOYOdqqxLw8KNzp3ltAHXECLYhZHcEx779DizXPVF56AlS+Jm1yP60kU6+YOju7I3VfAcLECVOLHnoWKsGr/aslUloQ+S+UdzXDVfPPC/gRZjXfgeW7qEAH3qCNOEQi9ypphNyJkt1INEFxd7SNZu+Celnzpq1tXLg5n1sRSLec/sTUk0UK0F4b+kkFECGBkWxvc9H4JASpLfnjf15g7PFO+hUby08PEV2pFOxt71pC67CHSbQLzU1a2vFoG3kW8uS0YZLYqX2KngBBCTIjY38XO70Q0oQU0t6mxXASlrDm7Lwsn27cb+5LABN+lGYgUxUzbHKsyhaNmCn8KUVCRmiIRDvA1FFC0T5b99iMkUfHVKC4Dfmm7JAd/5V8EK5Gt92AkrIAtWpmiy9/vjDzfmRyVYMVteuRmWzk/KeH9hDLBsxjpCEiV0IICD5Z3r7HViNeugQb1bEvTszfoqwsSt4Rh3rEL4eMs3koA5vRoI0e6BO1cY8r5mJeQA/M80j3+1DRqgvmTg5MH2034GV7xSFH9IMAjv9ytYhg1347cIJ+4Qh9a3qXzWhCNXx7sJPlh3q1sxBOlNfmpmcD/5sN1fPsXEBAiWAgOQ/uNl+B1aIRQk06wTpXXVRU2cP8o1mkLFa/LshRA8TinS173ALHMpCvZkDlHydzdasBKWzWBwSH6CDJIc4e+NsfF4uOrNOEIzjpidImtSxBolDP1Vy0Digz4+/N/tZ5FAHZ33dsWb8uW80Wfea2PEZYM1I0lkmB3k5OANXl53orBMEl72bukB3kefDLHtf1sGSQ3QSM9vDrEMZmJQYB17552bv2/7NjP7SH3A59qK3zzpRDjVRf3TzL/R0YQ+r7FcICoLKtvY7sMqiEmizT5AmXSAMrghEh1kTSJDS5Aj9bdWk2+m3xffzAjVvbWp8NoNSJ8bEGa/2FWRda8zYi94260Q5lGQlJ3548yPeF4kK9oV4eREGMFm334EVh6SAHUKCzOwtioWaGxA600lOEGH7rvZfgUIhruVZwve+/lADi+Vk+jWomTxr3igx8tYPJVFmk7BUPy3On3xEflfdRwwAwTY8eTcZb78DqzQsEXFWCdLbfUEvrPRElpqEhEMs39W+l0NnW14gmBs+c/eMPJjur0FNNzHylc8mUWY7i3z9iz/n6n3EAKjQ5F3zePsdWD4UDYFZJUgtbc3s4bzM7EutuZNtT4cOFygcgonW/bjl5MfTPOVLswe9r2qqbbaJkbc500TpnOEbVOjaB60/bFQ4M0Ks8t4U8MECpU2IIjCrBMnS5l4gjDwC0lGZxOle3Jdlezp0uB0GgcCqDr3py/fmTZXiNHvQ+6rKNjobRYvtfW/+nNFrjDLZmdB0otBZr0Yb/awbveZ0uhvNHv4CIQLhYjEd/fYjtgeP0uwSJDPnHtz07CW66YJhXbo6dLjFA4EHg0cxpdz0L/eag10TaTR7uMSgs1K02KYB3YqN7LqzXo0ScDo/sUC+UWLI4RWiIP/Td7n9BOG0YjWrBMHrL5p+DUR7SzMIn8nyREkDfVjlE4NkwHD4p9//A69VBtDMoWePuUqMvC9THcIlux7Mi5fiMnvg1a0zTQ5Ya78DqzSkBaJ652eBV0rYwAv0rCULdFdhJxJk3D+jPv3kIH1ah9Bp37NefKwzF5U0MOkQig5jJo97rlzka9FsEVXcAHGJQj7RWSxaqI9NcQjmzDz5yAHzb5/AiYlZJAfZaL8Dy0Vy6nLGCWKqplfdlT619UPg0nPq3Pu0lxxhawpkRoRb2Wv+8jvmrz/7CkM/dlm20SHUmHlbGWveaC5RpuvAp9+Hl7Cj8fn2T1e//Q6s6UVqxodYaX32b1GcnksiJQt1fcFQDQYaFeqwytl1ibR/76S55i+/68hLrqRDK7q1fdbJgYi0F+jTGxYzThCcgm3JLSZ5d+kwa8z++hTx/GBgIKw5nJ5LDpIkkSEcZt2MRftS2+ii4MCH7gzxmF0DB2entvy0ZpwgCFFLF+iuCzqS+lUTNUkL2YPDwMGTw9m45q++a+6/Z5dDF31JZ60++Pu3HGpytF8xOoORMKME6enZSovz3hnYn51oZkY6ug5cgYX6SEgOguLkYEoQiAcO6MR637u/viSSxCXH6CzuOct3QnuBno9IY3xGCdI9OvufOWjsQgknMVcPDF06UqsnQ/jlKox0yQLZizzDnhAnDmWGY9FNjO979zcWdZK45HjIPhBVErGZkdrvwJp2vGaUILDaP23LsxTMTDZsqvWrWD0xN9L1ENrcgPewJzRODlaEJg2wv33P4kySpicHgtJ+B5aMjOnsZ5Qgc7FAz9JkO80e5DySZWg094Qh58U0k4NSx8nTTEJJ8tOhx6cTlwUhQwtyWnM0beaQVg0uiMYtEidmlCBoU28r24WEuPSff3TpoKsD7yofokdw3eYGu+BTzxzMJQVWksLNJP/+uZ85kwu2/BGe72hBclB7b1ywjV6AjoXRNw3ncHtCy85gJfX6zi/d9V45tLK+3DJ84fB4LRkmdFbJYe3YHBEMyGf/zw/N313yTXuTnxVaIAUlMZ3GveaK75hmLMjzzWrfYpKPyNT4jBJkalOz5+LXua/48k//cHuZhXqWDmGx7mcCAvIDXuN+5rDGNI8UnTYdav33C24w/7GAZpOf4eLf3779G3wDYuR3WWBmSWu/A2tmgZvprSbDMN87syoaS+ORz5Gknmz/15/90UBDKbyWH6d7t1YrcutJNHB4wAfN6SYHaZAd+rb+7N//0Hzr3+4zr3/HGeZpfUcGY3MI0X1VdOuIuzoetbGZftA7sG69YLiZJpe6rZklSJpcipXzF5sRFCTHzqxWu/SG4T/lBfkUNgfH68llK/13PyRziUG6UyeHmzekFj8ALfDgPbvNlZfeZE5Ggpz98s3m7F85TgRbvKcZ49s3PGBuw6esTU2vvv0OrBmHdEYJ8uj+zw8cu/L156OWK/HpnXFtUMCZsJ1pll4x+PPLh6ejP2lGh8YmO03SRTMItiYnh04dOuy6+/bHzZev/Yl55guPQaJsNvqHMcWBQ9vTbPFDPAF42w3327NT0iCbq4dm/ODaNx5cpC2hIzDrftmIF8d1pGlvWqn24ZbCc9M07UuTSk+apKaSVgyVwE2aVobSxAxV0o4buyvdA4PDlx9sxtD+MfzcLdf9vHfdWG8rk4MqCvdziQuUPEdsWGme+aINZhN+IPNpZx5hDgc+k40O4+jQ6Wd4qRuVdOo2BB2Q/M/E5KHInte+SXFm4Qt9NTO9OZV+7nHX7Th27fi2rgoOzPxmv/tVCxSIwa4xHoeiacl65iBGThzjFoJe1lfKAK1ViEW/Kss/nOnYVv4ezEKkTMlACaJtWxHmqyqchZaWeAfWYTsHt8/4C6qlTi1w4zM6xJqvtmAyuld+ns0lSBOTAyM2DFoHB6LmUftpsLsfqrnbveqTGRIdkQ/7hZIciFz7HVjSRTPaL4jTvAfzGL8bMoLrIVZsfpPDpRA54zxyQEgLy/MCStZOG4p1sOY3hY/6hptiaJkZWRQzCIbX0IT9gU8eWGp0KXBmh1VQjHS54wNR84glM0GgeiiokJSz4sCAOyiSZ2J7t4AjsChmEDqTNTpp3/ruR2Y0BsuTg2StfLTmyA1SEQlEq+K7bYkkx42+QW1g2hFYFAkyNLx9BPdkDUzyLCJjXg/i0gW5EtDJQYNdscJ3viVqHkVxiSQHXiVgdk57VLQFfQQWRYKQt6mpX/vUaCUa3ESfaXKQjtskGbBf4smB9g5+6JYLh1272+X0I7BoEuTbwxcN7BlPB+lQizca1/L17lvL49wOdiLmZw4vyDyRmE5ykElvFoCHLcR4IMb8SF57MDewPe93xdzUtvRqWTQJIqGvX/rY/spIHUNQD37iFQdpGLG5PLIDOIzcICm16MOqiBdUXI0l9YoN9iiSd/S5K/GKY5NkyVXti4Ozj/miSpDbht8wNFE32x/eWzX4hV2/8SC2I5kKnTwzTw6xQMatSakHiOA5vhIKICD5F9152Nvw7PzYrRdcOg/VL5kqQ58uoiY9r/dTW6tpuuPoVRM9K6r0NSnOSxGaNJPkYC2lEKzANhDBA5WhgMZ80BVrziNrvzx2XnPrhdvnvPIlVuF89uMhhfLs3ut6MQp3rOqs96/rqhtOFDUs1VjnevysYlusG86wUtA8Mil4oCpRa5sKy/fyzJrTHSUG7jgYSdLs0mtuuXDnnFa+RCsLvb5IG3j2Sdf1p3VzcTXNtq6omp4q7tdyjdIDmRNEDV4nQ812ckxTMi45RFbtlQxThcURJFsKFRrvqaKY5+Us4HERFa1GPCdMScGSyZBJ6teasbGdO4fa91tJ8A5978J86JYWgIVznvbJPtxK36NdcbcKrO2e7Nh05FPrnnbsk71HH77/5NXdYxurSX3lZJaOjk9UnxqbqDyxf7Jj9+RYZf94rTo2mZnJrJ7U8MF7JJKMbrbHL5Zg0YuLMfTTJShBThIwcbcybmauVTrSekelUu/sqNS7Ojrq3Z2V2spKWl9ZrdRX0aeSZoSvQBJ1IGETPINvr+zgF1eypFbL0t0HxqsPjOxd+dP7n+j5z188vu6JPfu6RifqHXXdJoJdu5g+OTrUTop8hJqDL6kEaRQSXqV8+NnVR+rHHYbBe1JSrZ5uMpQmOZxenVJPs30Y8nsw3vfh8d9RnP0Zx8udJ7NKxgOzYmr4q5gKRjHyJTH04z6gcMZQpRlup8QH9jCS6x3InE7U2Y0M6EIKdeObvQv8rjQ1HbBYQZ00oU0a/Oo1Mg0plqyA6Srk9qPCe+HD92EHb6c2Dx15/z/tSy6HZHublwhEX0Tz4sEcVIpvgSw77IR6+hhOEqc9+DnYejdGJv6TDRioa/D1TV/RqzGo1/IBGn6vHd/yNEFg4GdpPakCRYksSuqUB8iqhFBKL4xw5Fgd0nSog6dgeHqxzYK5OvIv2QvBp5AO41AZxZxzAImzPzH1CQisgKGjUMHR0O9C6nUCX1PNOlYm46NVc9rr4P5n5yBK7SrKIrAsEoQb/vrP1td/+NljT5nq42mNxmTH/qRSfxwL26Mw4A9DMqzDAF2dZvWVGLz4xjedGPk4FDJVfJBDGPmYJDgfMOqROJRLmEayGvTwKzYZPgYPf2QTEBrlRMjMAaTaftD2YppCktTxu2/JHtjegwOqfZiP6HUUPUlWOb6WZHjcJTkS81MHUm5FPRvv6qAnz+58DCLtbb4isGwSBKMsy37nu5OHffjZ+x8bn6wl3WvHknplLwbvASTJBI1+zARdmCNoQOKHRRIcItU7AVeQDbjHhRgY0kgWmjEwkJE/hpKjBphmghRHZMiWZJKnmCSZqGXZaAXJgYQYSU1tN3i78Rz+7iTp2FtNa2MTSVKpZNWVmElqWMRgkoGTcAim6xkWLKYTn/Y2rxFYNglCUeYkeet3J9df8Yxk96b1oxPZJH6w12AMp3iOtr4as8MKjH8kBxbNyA7QxzF3YNqg4yYavXTMJddWKVtAoZkEyZLS6+1qSB6qgxYonaCvBI1yis6rdUF5Ncb82nrasQ/jH7NHx1iF1ivG4PHEyiZc+VyDmYv+95l6fXdaT/dNTlQnzWnr20lCnTdP27JKEI4xzQ871qeTk7WV+Mo+GmP4BIziE/EK4MNxMgoDFusJvBEIgxuHRDiEyugEFmhA6GwWpwBGPX3VU84QnoCJlKJ8oBzEEoOzaCV0VwHFHzZeo/DPZo1DYxR1jKE+HFUlqzEjrcKxFuXYLswZD0+m6YNY4Yzs7nxs7LDXDVLetbd5isDyS5DLTfJ4fW1HWqmtrdTTDRjAx2GcH4uhvwKjexzjfbep4VCIvslTcwAjfxwHVpMVWqNTJtAJJTrAwlspaOrAYMeNxnXMQgnelIp1i0m7kQ50BmsFBn837HRDpgvZ1AVlml0otSZAm+BkQt7BGt2C+TjOBzwG/r1dZvKhiQMTu3s3rMdRmKThPI2PZV/tskuQz+Ks0Eufegrf8etwaqrehbNPdBqWFsb0RBYtvSeTSjKGbDiAqyCj+Hanty7gsgiWF1hl04jB4MfyPKsgoaCDLU2qGOQ4JCNuHTEFhDkDyVcBrwNIN2hIFFrb0IDnBT3NTjTjkMV9MDkG/IlaWntkbKzy1BNP/mz08Hff0Z49KKTzuC27BHndnZ/NHlvfj0X6xBhOpdIhzRMYoKswiFfJkZCpIhHWYOTSdQtahNM5X5yqzWp0JCV9RSsXJAnNHthArkAClAzXMnANBNc/MMN0Ik2wbselkyTBTJSNUcogaSaRNDjdC73EdIOCl37h7BeSBkdh45ipRivd2fhpp52Gp/DvsPWRdHubjwgsuwQxl5ts1/tXTKzFMf6kqd1foRkkw3ogMUfh8GgNHR5hsNLhFg6HeIGNRTouc1OSYDqxf3KlhGYAWpfQAkOmD6jatQplG2Yj5NcohCg59kN9HzJtb72WjCK1cBExOwqq65FZHZiecB4r6UQ9HR2dUOHJZj6GRLtOHYFllyAYeVm2YfXkw0+N7sFx1kO1jv+/vTPZkaMIwnDW0tssHstmwGNAQogTV7hw4wU42q/jeQfewn4AxG1ewFdzAR+w8Hib6b27upZMvj+qe2QjcbVL6kypp/bqVlb8FcsfEeNC3oQSf6JGL3yJtBPJcnQ6TYbYN7Di4gEV4vUIvJGBMrBQFoi8BijQPWULoU7kpCDrAZPMlYAAMypZoUII7/oJ9xwDIPWlKol9HXOXPs7LMedmporMkRGdEkdXZsCeS1d+zEf7HZCGZ5fz0uX1ou/rGREkkXlgxPeBAj5J2kfo0SCmBdRwqEKwlX5SoCjWgAUiUGQg/25dwo55BLhg5qU/BByMqASCUaZWAvnow232iASUxrhH7Oo+TSfvA6A7BJGHIKvBVV8BrwUESNFc+cZhCn60+Yhf9L8zsHcaRDOhN34QvzDfONi8HGE9BhifId53EWL8D7Kw0ARIeYkDUkF11Lz9a66SZoD7MH9eLxdFpbDS0gz9IsadPCvlVJkDj6lGJAtNwxBq5OgDLoCAxcZ3wY0ADm7K4WssrDfEAF4n/Xy2mk2qO+cCWxyfegb2EiC7SafoigzEbETS7i2ElSxgz5IwrYFAeVPiKnCuAQnOPA47LjfSL8UCylLcb/g8gUKAEEBw0NtYmMq4xMb3QRFGnELAQABNBFI2XA3uTEPxFckEu2yGVnqJ1rlMmmr252xQfQ1ydr8zLj/dDOw1QPx845Pjfh2aDP4jFIh8ARBIFrS3vpx08RnyQ1hIoHHTOSb7ST6HJJ4DFuViTXvACVEwR3ajse+SckWxgvgVlEyyYT9Vw9yfAMAWaDXYUTax/uX1fOLGxc/nF5CTcXRhBvYXINj4m7Nf6pGluYdXCP0LVMQQaZazTTTLQfh5OeuaI/kSAwQZTsPhUrAlKMCNACqZXvJFyMdS1EoouRkyyeSvAIywQvUsuQ5AuBHK6ITsrx7KqMQEAzS+8nldfzM6BT9c/95Nbu4WVz76DOwvQM5dODufl9PPD6dumP+D23GE43EEKG5hR52gNHDWE3EUfXSE/Al8Bou9GgPCOmJsvoSAQVxWIMFfke+yjWbpado6Dj5Sv0D1zFnq//bK8RgR+gJqMuHcBp6+rDzO+fg5m3F0ZQb2FiC8oFESF35ePCgOs2Lh894SU0iONJFXI+/I5EV7KGcRDoTzpQ00duYPp1rkiuxdRXl1R/PH5eDLeRdrLlMMBt0PcOQVGTtghxJVCCXDt6A5CHjhtAczrwZNU7pL5SyaDtHlcXziGdhbgNi8P6J66deFP6D8QtYRNRs9GAnMqYBjrZe/RkqY12gOzCd5HbsBjEyQwRl+Bh9pg91xLeWoKx0Fcyw5BFdop3TNOQBLkS67BhbfT8iOfKPkxKXrF7fc79wrjq7MwO6BduX3fPTf8d29I3BR81YnBSTz+Ap+wzue1A+9/Bmt0FsIFwTgw2MoId0IPktSSWDBOcvYdwAhzdACrC20kiZhjgGORX4FmK3Zxn6QUpH/uMgzNyn75XJ8+bx251F7aNq7MvYaIGbKPHvrB+tModwJOuANiHgHBhYIvzQGJpaE3pGr5Q7Zpw9p8u02yyO2YcTdkc7RMa4ndcVA0yamKNlRVYVUEwIIpdDDhcihJ/cKBUYIbNk0yUrmVZt/FQHSFXDod+w1QNoHceFXt5YFRMUkpBlknbtGeFWvgRybHyHfQU0YFMGSSbrVCtIeN9vavzuG+bRdt4CYTC/MKdhyOef6TnwQaSc4FpXjugVJWOuGoWNxdGsGIkAeUTU1PKmqCiFVpZ9MLCM+LLxrQo9UK3RrjjqPD8da2beq6bAlmoAKkp1JppcOXAjHZXqpYlDVhYSIk53mOQAmMrUgIv0E3+OKZPpF4UaVe/Ak+h9MWpdGBAgSrNBq3VvXuONk9YqzUGqJOeY6ClxMm+i5mQZA4LVH6/YRgHSQk298EzY1t1IZYMGWgAagtMDhgqDOJmP2Xcv/OHMvBbw4OjYDew8QZDI4WgINqqMyyZslb/QxUj1jt8g/CT5lsUS1nD7OzC1kXs0cWLd92m+pJZxsZhhLmWEa0joVf6VtAJ38coWxCBkHR+15Mq6zdNYjeqXfYL+lvS7+7cgM7D1A7DnAqheuUBnsnNjUFerhGhAoW1cAYY5ICxEnQkEU3F4LBswoHOzW76A7CefxwakXaG62dQNpG2EC/QA9aOuQgxxQR5XpINRLmjlG84oJ6uKIANFTOYdVvxzWZe3X5IFMEeUpArzmyNZxlgvCR0Tg1g6ShcXOdkjwzU1RhaHlWAkkAg8fA480izqbSPOwCBuyuiZcMqHofPXFJItFIDYx3fsTAcIzMdPme9f081TpIjR3AyQkDrJURq/e/gy5F7bKH8vqtZ5YHFCyog4IL5pPaRMcdSo9ttscbLWLyEciWixgzwEIYOxVfu2u1xQS7r6Hq+PozAxEgOwehZIXZeoQUUJUrxDwMToC/sIiVQKAIr9i1a2ACtNJPIbe/EpW1DFFoHTezYcVaSAJf3uc/lmcK800Redc0y9uVm1qQHiha+Po4AxEgOweynkb7qUeg7rx9B18+SvMKdrwBBz2ZMFp4iwIA+M70DOLfWgYaRmtA6qU45CA24/WtV/Hud7Oo+WonwAaeomGl6id10mezu7Uk8o9itqDOerkkJ0cBzMg+ynAqve+GqxpN31FT7e/Edu77EWRJCecoK7spLfDgrPkzWJqA+vKqgjRH0Ymmp9Cf16AoMrBJYErtfShZBezLFURVvKW4t6/uOfLrGwWTw/L+sdoXnVWBiNAPng0F342+2k9unv3TVLmf2AaiTR8QcufE6RbNSGCEa46JSEqYVdalnJzaSIHXCxPizJDfAwaNtDBnYiXQrnrtmaENF6vxhBh7FOqB7P8cjp9t/xh9jQy6B88g25t6JHH8d4MhMcPstfFdJjO8+M0H912vfokd+khjXfhPZKM5lgWljKufNsqzi7P8NnZlt+h2g4QVFKsTgM6DwFI/+sGmoPmvLQaKlxWL9xqtTg9PV0nD59EgLw3/11bjQD5zxNBwBP3+EHqnrns9bfT3nDR62dDn6/hNhKfp4c5KqEUX9iOUJch0IX9oM7Dkgalo2Myg2le2hyGpqYAKhSD4I+nIbscpuEI1iMv/Nmmbty932r3EEihk3b3isvuzcC/PChxjwqdpDAAAAAASUVORK5CYII=",
		angry: "data:image/png;base64,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",
		angry2: "data:image/png;base64,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",
		happy: "data:image/png;base64,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",
		sad: "data:image/png;base64,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",
		surprised:
			"data:image/png;base64,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",
		worried:
			"data:image/png;base64,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"
	}
};
