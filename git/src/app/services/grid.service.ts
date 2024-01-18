import { Injectable } from "@angular/core";
import * as $ from "jquery";
declare var jQuery: any;
import { GridStore } from "@app/store/stores";

@Injectable({
	providedIn: "root"
})
export class GridService {
	constructor(public gridStore: GridStore) {}

	public setGridStore() {
		this.gridStore.setInitial();
	}

	private get getEntireGridStore() {
		return this.gridStore.getLatest;
	}

	public setGridState(_gridName: string, _newGridState: any): void {
		const gStore = this.getEntireGridStore;
		gStore[_gridName] = _newGridState;
		this.gridStore.setLatest(gStore);
	}

	public getGridState(_gridName): any {
		return typeof this.getEntireGridStore[_gridName] !== "undefined" ? this.getEntireGridStore[_gridName] : {};
	}

	public getGridStateProps(_gridName: string, _newGridStateProp: any): void {
		const innerStore = this.getEntireGridStore[_gridName];
		return innerStore[_newGridStateProp];
	}

	public setGridStateProps(_gridName: string, _newGridStateProp: any, _newGridStatePropValue: any): void {
		const innerStore = this.getEntireGridStore[_gridName];
		innerStore[_newGridStateProp] = _newGridStatePropValue;
		this.setGridState(_gridName, innerStore);
	}

	clearAllFilters(_grid: string, _toReload?: boolean) {
		jQuery(document.getElementById(_grid)).jqGrid("setGridParam", {
			search: false,
			postData: { filters: "" }
		});
		if (typeof _toReload !== "undefined" && _toReload) {
			this.reloadGrid(_grid);
		}
		// remove selection from filter
		const searchSelectionInput = $("#gview_" + _grid + " .ui-search-input").find("input");
		const searchSelectionOption = $("#gview_" + _grid + " .ui-search-input").find("select option:first");
		const searchClearSelection = $("#gview_" + _grid + " .ui-search-clear");
		searchSelectionInput.val("");
		searchClearSelection.css("display", "none");
		searchSelectionOption.prop("selected", "selected");
	}

	clearAllSort(_grid: string, _toReload?: boolean) {
		const p = jQuery(document.getElementById(_grid)).jqGrid("getGridParam");
		p.sortname = "";
		p.sortorder = "asc";
		jQuery(document.getElementById(_grid)).find(".s-ico").hide();
		if (typeof _toReload !== "undefined" && _toReload) {
			this.reloadGrid(_grid);
		}
	}

	clearGridSelection(_grid: string) {
		const selections = jQuery(document.getElementById(_grid)).jqGrid("getGridParam", "selarrrow");
		if (typeof selections !== "undefined" && selections.length) {
			for (let i = 0, il = selections.length; i < il; i++) {
				jQuery(document.getElementById(_grid)).jqGrid("setSelection", selections[i], false);
			}
		}
	}

	refreshGrid(_grid: string, _toReload?: boolean) {
		this.clearAllFilters(_grid);
		this.clearAllSort(_grid);
		if (typeof _toReload !== "undefined" && _toReload) {
			this.reloadGrid(_grid);
		}
	}

	getGridParam(_grid: string, param: any) {
		return jQuery(document.getElementById(_grid)).jqGrid("getGridParam", param);
	}

	getSelectedRows(_grid: string) {
		return jQuery(document.getElementById(_grid)).getGridParam("selarrrow");
	}

	checkRowIsSelected(_grid: string, _rowId: any) {
		const selRowIds = jQuery(document.getElementById(_grid)).jqGrid("getGridParam", "selarrrow");
		return selRowIds.length != 0 && jQuery.inArray(_rowId, selRowIds) >= 0;
	}

	saveGridParameters(_grid: string) {
		const gridInfo: any = new Object();
		const grid: any = jQuery(document.getElementById(_grid));
		gridInfo.url = grid.jqGrid("getGridParam", "url");
		gridInfo.sortname = grid.jqGrid("getGridParam", "sortname");
		gridInfo.sortorder = grid.jqGrid("getGridParam", "sortorder");
		gridInfo.selrow = grid.jqGrid("getGridParam", "selrow");
		gridInfo.page = grid.jqGrid("getGridParam", "page");
		gridInfo.rowNum = grid.jqGrid("getGridParam", "rowNum");
		gridInfo.postData = grid.jqGrid("getGridParam", "postData");
		gridInfo.search = grid.jqGrid("getGridParam", "search");
		jQuery(grid).data("gridState", gridInfo);
	}

	retainGridParameters(_grid: string) {
		const gridInfo: any = new Object();
		const grid: any = jQuery(document.getElementById(_grid));
		gridInfo.url = grid.jqGrid("getGridParam", "url");
		gridInfo.sortname = grid.jqGrid("getGridParam", "sortname");
		gridInfo.sortorder = grid.jqGrid("getGridParam", "sortorder");
		gridInfo.selrow = grid.jqGrid("getGridParam", "selrow");
		gridInfo.page = grid.jqGrid("getGridParam", "page");
		gridInfo.rowNum = grid.jqGrid("getGridParam", "rowNum");
		gridInfo.postData = grid.jqGrid("getGridParam", "postData");
		gridInfo.search = grid.jqGrid("getGridParam", "search");
		return jQuery(grid).data("gridState");
	}

	clearGridParameters(_grid: string) {
		jQuery(document.getElementById(_grid)).data("gridState", null);
	}

	columnChooser(_grid: string, _cbOnChange?: any) {
		const g = jQuery(document.getElementById(_grid));
		g.jqGrid("columnChooser", {
			dialog_opts: {
				height: 500,
				title: "Select Columns",
				done: function (perm) {
					if (perm) {
						g.jqGrid("remapColumns", perm, true);
						const gwdth = g.jqGrid("getGridParam", "width");
						g.jqGrid("setGridWidth", gwdth);
						if (_cbOnChange) {
							_cbOnChange(perm);
						}
					}
				}
			}
		});

		$("#colchooser_" + _grid + " .remove-all").text("Hide All");
		$("#colchooser_" + _grid + " .add-all").text("Show All");
	}

	showHideColumns(gridId: any, colNames: any, toShow: boolean, allAttrs: any) {
		const grid = document.getElementById(gridId);
		if (grid != null) {
			jQuery(grid).jqGrid(toShow ? "showCol" : "hideCol", colNames);
			jQuery(grid).jqGrid("showCol", allAttrs);
		}
	}

	triggerGridToolbar(gridId: any) {
		jQuery(document.getElementById(gridId))[0].triggerToolbar();
	}

	resizeGrid(_gridParent: any, _gridId: any, _offset?: any) {
		const parent = document.getElementById(_gridParent);
		const grid = document.getElementById(_gridId);
		if (parent != null && grid != null) {
			jQuery(parent).resize();
			jQuery(grid).jqGrid("setGridWidth", document.getElementById(_gridParent).clientWidth);
			jQuery(grid).jqGrid("setGridHeight", document.getElementById(_gridParent).clientHeight - (_offset ? _offset : 0));
		}
	}

	freezeUnFreeze(_grid: string) {
		const g = jQuery(document.getElementById(_grid));
		if (g.jqGrid("getGridParam", "frozenColumns")) {
			g.jqGrid("destroyFrozenColumns");
			g.jqGrid("setGridParam", { cellEdit: true });
		} else {
			g.jqGrid("setGridParam", { cellEdit: false });
			g.jqGrid("setFrozenColumns");
			g.jqGrid("setGridParam", { cellEdit: true });
		}
	}

	setAlignment(_grid: string, _align: string, _toReload?: boolean) {
		const colModel = jQuery(document.getElementById(_grid)).jqGrid("getGridParam", "colModel");
		for (let j = 0; j < colModel.length; j++) {
			if (colModel[j].hasOwnProperty("align")) {
				jQuery(document.getElementById(_grid)).setColProp(colModel[j].name, { align: _align });
			}
		}
		if (typeof _toReload !== "undefined" && _toReload) {
			this.reloadGrid(_grid);
		}
	}

	reloadGrid(_grid: string) {
		jQuery(document.getElementById(_grid)).trigger("reloadGrid");
	}

	goToPageFirst(_grid: string) {
		jQuery(document.getElementById(_grid)).trigger("reloadGrid", [{ page: 1 }]);
	}

	reorderGridColumns(_gridId: string, _newOrder: any) {
		jQuery(document.getElementById(_gridId)).jqGrid("remapColumns", _newOrder, true);
	}

	refreshSearchingToolbar(gridId: any, myDefaultSearch: any) {
		const getColumnIndex = function (grid, columnIndex) {
			let cm = grid.jqGrid("getGridParam", "colModel"),
				i = 0,
				l = cm.length;
			for (; i < l; i += 1) {
				if ((cm[i].index || cm[i].name) === columnIndex) {
					return i; // return the colModel index
				}
			}
			return -1;
		};
		const $grid = jQuery(document.getElementById(gridId));
		let postData = $grid.jqGrid("getGridParam", "postData"),
			filters,
			i,
			l,
			rules,
			rule,
			iCol,
			cm = $grid.jqGrid("getGridParam", "colModel"),
			cmi,
			control,
			tagName;

		for (i = 0, l = cm.length; i < l; i += 1) {
			control = $("#gs_" + jQuery.jgrid.jqID(cm[i].name));
			if (control.length > 0) {
				tagName = control[0].tagName.toUpperCase();
				if (tagName === "SELECT") {
					// && cmi.stype === "select"
					control.find("option[value='']").attr("selected", "selected");
				} else if (tagName === "INPUT") {
					control.val("");
				}
			}
		}

		if (typeof postData.filters === "string" && jQuery("#gview_" + gridId).find(".ui-search-toolbar").length) {
			filters = $.parseJSON(postData.filters);
			if (filters && filters.groupOp === "AND" && typeof filters.groups === "undefined") {
				// only in case of advance searching without grouping we import filters in the
				// searching toolbar
				rules = filters.rules;
				for (i = 0, l = rules.length; i < l; i += 1) {
					rule = rules[i];
					iCol = getColumnIndex($grid, rule.field);
					cmi = cm[iCol];
					control = $("#gs_" + jQuery.jgrid.jqID(cmi.name));
					if (iCol >= 0 && control.length > 0) {
						tagName = control[0].tagName.toUpperCase();
						// if (((typeof (cmi.searchoptions) === "undefined" || typeof (cmi.searchoptions.sopt) === "undefined") && rule.op === myDefaultSearch) || (typeof (cmi.searchoptions) === "object" && $.isArray(cmi.searchoptions.sopt) && cmi.searchoptions.sopt[0] === rule.op)) {}
						if (tagName === "SELECT") {
							// && cmi.stype === "select"
							control.find("option[value='" + jQuery.jgrid.jqID(rule.data) + "']").attr("selected", "selected");
						} else if (tagName === "INPUT") {
							control.val(rule.data);
						}
					}
				}
			}
		}
	}

	initDynamicColumnPlugin() {
		(function ($) {
			"use strict";
			$.jgrid.extend({
				addColumn: function (options) {
					// currently supported options: cm (REQUIRED), insertWithColumnIndex, data, footerData, formatFooter, adjustGridWidth
					//                              autosearch, searchOnEnter
					// The current code suppose that there are AT LEAST one (probebly hidden) column in the grid. If one use
					// filter toolbar then the column should be searchable.
					let cmNew = options.cm,
						iCol = options.insertWithColumnIndex,
						columnData = options.data,
						colTemplate,
						soptions;
					if (cmNew == null) {
						return; // error, probably can be changed to throwing of an exception
					}
					colTemplate =
						cmNew.template === "string"
							? $.jgrid.cmTemplate != null && typeof $.jgrid.cmTemplate[cmNew.template] === "object"
								? $.jgrid.cmTemplate[cmNew.template]
								: {}
							: cmNew.template;
					return this.each(function () {
						let $self = $(this),
							self = this,
							grid = this.grid,
							p = this.p,
							colModel = p.colModel,
							idPrefix = p.idPrefix,
							locid = "_id_",
							i,
							rows,
							$row,
							$th,
							$td,
							rowid,
							id,
							formattedCellValue,
							pos,
							rawObject,
							rdata,
							cellProp,
							thTemplate,
							searchElem,
							timeoutHnd,
							$htable =
								p.direction === "ltr"
									? $(grid.hDiv).find(">.ui-jqgrid-hbox>table.ui-jqgrid-htable")
									: $(grid.hDiv).find(">.ui-jqgrid-hbox-rtl>table.ui-jqgrid-htable"),
							$ftableRows =
								p.direction === "ltr"
									? $(grid.sDiv).find(">.ui-jqgrid-hbox>table.ui-jqgrid-ftable tr.footrow")
									: $(grid.sDiv).find(">.ui-jqgrid-hbox-rtl>table.ui-jqgrid-ftable tr.footrow"),
							/*$fhtable = p.direction === "ltr" ?
									$(grid.fhDiv).find(">.ui-jqgrid-hbox>table.ui-jqgrid-htable") :
									$(grid.fhDiv).find(">.ui-jqgrid-hbox-rtl>table.ui-jqgrid-htable"),*/
							iOffset = (p.multiselect === true ? 1 : 0) + (p.subGrid === true ? 1 : 0) + (p.rownumbers === true ? 1 : 0),
							adjustGridWidth = function () {
								let $this = $(this),
									w = $this.outerWidth(false),
									$parent,
									maxCount = 3;
								$this = $this.closest("div");
								$this.width(w);
								w = $this.outerWidth(false);
								$this = $this.closest("div.ui-jqgrid-bdiv");
								$this.width(w);
								if ($this.height() > $this.find(">div").height() && $this.find(">div").height() > 0) {
									do {
										w += 1;
										maxCount -= 1;
										$this.width(w);
									} while ($this.height() > $this.find(">div").height() && maxCount > 0);
								}
								$parent = $this.closest("div.ui-jqgrid-view");
								$parent.find(">.ui-jqgrid-hdiv").width(w);
								$parent.find(">.ui-jqgrid-toppager").width(w);
								w = $this.outerWidth(false);
								$this = $parent;
								$this.width(w);
								$parent = $this.closest("div.ui-jqgrid");
								$parent.find(">.ui-jqgrid-pager").width(w);
								$parent.width($this.outerWidth(false));
							},
							changeSearch = function () {
								self.triggerToolbar();
								return false;
							},
							keypressSearch = function (e) {
								const key = e.charCode || e.keyCode || 0;
								if (key === 13) {
									self.triggerToolbar();
									return false;
								}
							},
							keydownSearch = function (e) {
								const key = e.which;
								switch (key) {
									case 13:
										return false;
									case 9:
									case 16:
									case 37:
									case 38:
									case 39:
									case 40:
									case 27:
										break;
									default:
										if (timeoutHnd) {
											clearTimeout(timeoutHnd);
										}
										timeoutHnd = setTimeout(function () {
											self.triggerToolbar();
											return false;
										}, 500);
								}
							};

						$self.triggerHandler("jqGridBeforeAddColumn", [options]);

						cmNew = $.extend(true, {}, p.cmTemplate, colTemplate || {}, cmNew);
						soptions = $.extend({}, cmNew.searchoptions || {});
						if (cmNew.index === undefined) {
							cmNew.index = cmNew.name;
						}
						if (typeof cmNew.sortable !== "boolean") {
							cmNew.sortable = true;
						}
						if (typeof cmNew.title !== "boolean") {
							cmNew.title = true;
						}
						if (cmNew.resizable === undefined) {
							cmNew.resizable = true;
						}
						if (cmNew.hidden === undefined) {
							cmNew.hidden = false;
						}
						cmNew.width = cmNew.width === undefined ? 150 : parseInt(cmNew.width, 10);
						cmNew.widthOrg = cmNew.width;
						cmNew.lso = "";
						// update colModel and colNames
						if (iCol === undefined && p.treeGrid !== true) {
							iCol = colModel.length - 1 - iOffset;
							colModel.push(cmNew);
							p.colNames.push(cmNew.label || cmNew.name);
						} else {
							if (iCol === undefined) {
								// p.treeGrid === true
								iCol = colModel.length - 6 - iOffset;
							}
							colModel.splice(iCol + iOffset, 0, cmNew);
							p.colNames.splice(iCol + iOffset, 0, cmNew.label || cmNew.name);
						}

						rows = $htable[0].rows;
						for (i = 0; i < rows.length; i++) {
							// TODO: support of frozen columns
							// TODO: support of grouping headers
							$row = $(rows[i]);
							if ($row.hasClass("ui-jqgrid-labels")) {
								thTemplate = grid.headers[grid.headers.length - 1].el;
								$th = $(thTemplate).clone(true);
								$th.attr("id", p.id + "_" + cmNew.name);
								$th.css("display", cmNew.hidden === true ? "none" : "");
								$th.html(
									'<span class="ui-jqgrid-resize ui-jqgrid-resize-' +
										p.direction +
										'" style="cursor: col-resize;">&nbsp;</span><div class="ui-th-div-ie ui-jqgrid-sortable" id="jqgh_' +
										p.id +
										"_" +
										cmNew.name +
										'">' +
										(cmNew.label || cmNew.name) +
										'<span class="s-ico" style="display: none;"><span class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-' +
										p.direction +
										'" sort="asc"></span><span class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-' +
										p.direction +
										'" sort="desc"></span></span></div>'
								);
								$th.css("width", cmNew.width + "px");
								if (iCol === colModel.length - 1) {
									grid.headers.push({
										el: $th[0],
										width: cmNew.width,
										widthOrg: cmNew.width
									});
								} else {
									grid.headers.splice(iCol + iOffset, 0, {
										el: $th[0],
										width: cmNew.width,
										widthOrg: cmNew.width
									});
								}
							} else if ($row.hasClass("ui-search-toolbar")) {
								$th = $(
									'<th class="ui-state-default ui-th-column ui-th-' +
										p.direction +
										'" role="columnheader"><div style="height: 100%; padding-right: 0.3em; padding-left: 0.3em; position: relative;"><table class="ui-search-table" cellspacing="0"><tbody><tr><td class="ui-search-oper" columname="' +
										iCol +
										'" colindex="' +
										iCol +
										'"></td>' +
										'<td class="ui-search-input">' +
										// '<input class="form-control" name="' + (cmNew.label || cmNew.name) + '" id="gs_' + cmNew.name + '" style="padding: 0px; width: 100%;" type="text" value="' +
										// (soptions.defaultValue !== undefined ? soptions.defaultValue : "") +
										// '">' +
										"</td>" +
										'<td class="ui-search-clear"' +
										(soptions.clearSearch === undefined || soptions.clearSearch ? "" : ' style="display:none;"') +
										'><a title="' +
										((typeof $.jgrid.search !== "undefined" ? $.jgrid.search.resetTitle : "Clear Search Value") || "Clear Search Value") +
										'" class="clearsearchclass" style="padding-right: 0.3em; padding-left: 0.3em;">' +
										((typeof $.jgrid.search !== "undefined" ? $.jgrid.search.resetIcon : "x") || "x") +
										"</a></td>" +
										"</tr></tbody></table></div></th>"
								);
								if (soptions.sopt) {
									const odata = [
										{ oper: "eq", text: "equal" },
										{ oper: "ne", text: "not equal" },
										{ oper: "lt", text: "less" },
										{ oper: "le", text: "less or equal" },
										{ oper: "gt", text: "greater" },
										{
											oper: "ge",
											text: "greater or equal"
										},
										{ oper: "bw", text: "begins with" },
										{
											oper: "bn",
											text: "does not begin with"
										},
										{ oper: "in", text: "is in" },
										{ oper: "ni", text: "is not in" },
										{ oper: "ew", text: "ends with" },
										{
											oper: "en",
											text: "does not end with"
										},
										{ oper: "cn", text: "contains" },
										{ oper: "nc", text: "does not contain" }
									];
									const so = soptions.sopt ? soptions.sopt[0] : cmNew.stype === "select" ? "eq" : p.defaultSearch;
									const operands = {
										eq: "==",
										ne: "!",
										lt: "<",
										le: "<=",
										gt: ">",
										ge: ">=",
										bw: "^",
										bn: "!^",
										in: "=",
										ni: "!=",
										ew: "|",
										en: "!@",
										cn: "~",
										nc: "!~",
										nu: "#",
										nn: "!#",
										bt: "..."
									};
									let sot = "";
									for (let o = 0; i < odata.length; o++) {
										if (odata[o].oper === so) {
											sot = operands[so] || "";
											break;
										}
									}
									const st = soptions.searchtitle != null ? soptions.searchtitle : "Click to select search operation.";
									const select =
										"<a title='" + st + "' style='padding-right: 0.5em;' soper='" + so + "' class='soptclass' colname='" + this.name + "'>" + sot + "</a>";
									$th.find(".ui-search-oper")
										.attr("colindex", cmNew.index || cmNew.label)
										.attr("columname", cmNew.index || cmNew.label)
										.append(select);

									const buildRuleMenu = function (elem, left, top) {
										$("#sopt_menu").remove();

										left = parseInt(left, 10);
										top = parseInt(top, 10) + 18;

										const fs = $(".ui-jqgrid-view").css("font-size") || "11px";
										let str =
												'<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:' +
												fs +
												";left:" +
												left +
												"px;top:" +
												top +
												'px;">',
											selected = $(elem).attr("soper"),
											selclass,
											aoprs = [],
											ina;
										let i = 0,
											nm = $(elem).attr("colname"),
											len = self.p.colModel.length;
										while (i < len) {
											if (self.p.colModel[i].name === nm) {
												break;
											}
											i++;
										}
										const cm = self.p.colModel[i],
											soptions = $.extend({}, cmNew.searchoptions);
										if (!soptions.sopt) {
											soptions.sopt = [];
											soptions.sopt[0] = cmNew.stype === "select" ? "eq" : p.defaultSearch;
										}
										$.each(odata, function () {
											aoprs.push(this.oper);
										});
										for (let s = 0; s < soptions.sopt.length; s++) {
											ina = $.inArray(soptions.sopt[s], aoprs);
											if (ina !== -1) {
												selclass = selected === odata[ina].oper ? "ui-state-highlight" : "";
												str +=
													'<li class="ui-menu-item ' +
													selclass +
													'" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' +
													odata[ina].oper +
													'" oper="' +
													operands[odata[ina].oper] +
													'"><table cellspacing="0" cellpadding="0" border="0"><tr><td width="25px">' +
													operands[odata[ina].oper] +
													"</td><td>" +
													odata[ina].text +
													"</td></tr></table></a></li>";
											}
										}
										str += "</ul>";
										$("body").append(str);
										$("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
										$("#sopt_menu > li > a")
											.hover(
												function () {
													$(this).addClass("ui-state-hover");
												},
												function () {
													$(this).removeClass("ui-state-hover");
												}
											)
											.click(function (e) {
												const v = $(this).attr("value"),
													oper = $(this).attr("oper");
												$(self).triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
												$("#sopt_menu").hide();
												$(elem).text(oper).attr("soper", v);
												if (options.autosearch === true) {
													const inpelm = $(elem).parent().next().children()[0];
													if ($(inpelm).val() || v === "nu" || v === "nn") {
														self.triggerToolbar();
													}
												}
											});
									};

									$(".soptclass", $th).click(function (e) {
										const offset = $(this).offset(),
											left = offset.left,
											top = offset.top;
										buildRuleMenu(this, left, top);
										e.stopPropagation();
									});
									$("body").on("click", function (e) {
										if (e.target.className !== "soptclass") {
											$("#sopt_menu").hide();
										}
									});
									$(".clearsearchclass", $th).click(function () {
										let ptr = $(this).parents("tr:first"),
											colname = $("td.ui-search-oper", ptr).attr("columname"),
											coli = 0,
											len = self.p.colModel.length;
										while (coli < len) {
											if (self.p.colModel[coli].name === colname) {
												break;
											}
											coli++;
										}
										let sval = $.extend({}, self.p.colModel[coli].searchoptions || {}),
											dval = sval.defaultValue ? sval.defaultValue : "",
											elem;
										if (self.p.colModel[coli].stype === "select") {
											elem = $("td.ui-search-input select", ptr);
											if (dval) {
												elem.val(dval);
											} else {
												elem[0].selectedIndex = 0;
											}
										} else {
											elem = $("td.ui-search-input input", ptr);
											elem.val(dval);
										}
										$(self).triggerHandler("jqGridToolbarClearVal", [elem[0], coli, sval, dval]);
										if ($.isFunction(self.p.onClearSearchValue)) {
											self.p.onClearSearchValue.call(self, elem[0], coli, sval, dval);
										}
										// ToDo custom search type
										if (options.autosearch === true) {
											self.triggerToolbar();
										}
									});
								}
								searchElem = $.jgrid.createEl.call(this, cmNew.stype || "text", cmNew.searchoptions || {}, "", true, p.ajaxSelectOptions || {}, true);
								$(searchElem)
									.attr("id", "gs_" + cmNew.name)
									.attr("name", cmNew.label || cmNew.name)
									.attr("value", soptions.defaultValue !== undefined ? soptions.defaultValue : "")
									.addClass("form-control")
									.appendTo($th.find(".ui-search-input"));

								if (cmNew.hidden === true) {
									$th.css("display", "none");
								}

								if (options.autosearch !== false) {
									if (cmNew.stype === "select") {
										$(searchElem).change(changeSearch);
									} else if (cmNew.stype === "text" || cmNew.stype === undefined) {
										if (options.searchOnEnter || options.searchOnEnter === undefined) {
											$(searchElem).keypress(keypressSearch);
										} else {
											$(searchElem).keydown(keydownSearch);
										}
									}
								}
								// TODO: update colindex attribute of other elements: rows[i].cells[iCol + iOffset] and later
								// the current implementation don't support autosearch and searchOnEnter of filterToolbar
							}
							if (iCol === colModel.length - 1) {
								$th.appendTo(rows[i]);
							} else {
								if (iCol + iOffset >= 1) {
									$th.insertAfter(rows[i].cells[iCol + iOffset - 1]);
								} else {
									$th.insertBefore(rows[i].cells[iCol + iOffset]);
								}
							}
						}

						rows = this.rows;
						// append the column in the body
						for (i = 0; i < rows.length; i++) {
							// TODO: support of frozen columns
							$row = $(rows[i]);
							if ($row.hasClass("jqgrow") || $row.hasClass("jqfoot")) {
								// $row.hasClass("jqfoot") means grouping summary row
								rowid = $row.attr("id");
								id = $.jgrid.stripPref(idPrefix, rowid);
								pos = iCol + iOffset;
								rawObject = {}; // TODO later
								if (p.datatype === "local" || p.datatype === "jsonstring" || p.treeGrid === true) {
									rawObject = $self.jqGrid("getLocalRow", rowid);
									if (p.treeGrid === true || (p.loadonce === true && p.datatype === "local")) {
										// It's unclear how to detect initial datatype value "jsonstring" or datatype !== "local" with loadonce
										// probably it would be better to introduce datatypeOrg and use it additionally
										rawObject[locid] = id;
									}
									if (rawObject != null && columnData[id] !== undefined && !$row.hasClass("jqfoot")) {
										rawObject[cmNew.name] = columnData[id];
									}
								} else {
									rawObject = $self.jqGrid("getRowData", rowid);
								}
								rdata = rawObject;
								formattedCellValue = $row.hasClass("jqfoot")
									? ""
									: this.formatter(rowid, columnData[id] === undefined ? "" : columnData[id], pos, rawObject, "add");
								cellProp = this.formatCol(pos, i, formattedCellValue, rawObject, rowid, rdata);

								$td = $('<td role="gridcell"' + cellProp + ">" + formattedCellValue + "</td>");
							} else if ($row.hasClass("jqgfirstrow")) {
								$td = $('<td role="gridcell" style="width: ' + cmNew.width + 'px; height: 0px;"></td>');
							} else if ($row.hasClass("jqgroup") || $row.hasClass("ui-subgrid")) {
								$td = $row.find(">td[colspan]");
								$td.attr("colspan", parseInt($td.attr("colspan"), 10) + 1);
								continue;
							}
							if (iCol === colModel.length - 1) {
								$td.appendTo($row);
							} else if (iCol + iOffset >= 1) {
								$td.insertAfter(rows[i].cells[iCol + iOffset - 1]);
							} else {
								$td.insertBefore(rows[i].cells[iCol + iOffset]);
							}
						}

						if ($ftableRows.length > 0) {
							// append the column in the body
							pos = iCol + iOffset;
							rawObject = $self.jqGrid("footerData", "get", options.footerData, options.formatFooter);
							rawObject[cmNew.name] = options.footerData;
							formattedCellValue = options.formatFooter
								? this.formatter("", options.footerData === undefined ? "" : options.footerData, pos, rawObject, "add")
								: options.footerData;
							for (i = 0; i < $ftableRows.length; i++) {
								pos = iCol + iOffset;
								$td = $("<td role='gridcell' " + this.formatCol(pos, 0, "", null, "", false) + ">" + (formattedCellValue || "&#160;") + "</td>");
								if (iCol === colModel.length - 1) {
									$td.appendTo($ftableRows[i]);
								} else if (iCol + iOffset >= 1) {
									$td.insertAfter($ftableRows[i].cells[iCol + iOffset - 1]);
								} else {
									$td.insertBefore($ftableRows[i].cells[iCol + iOffset]);
								}
							}
						}

						if (options.adjustGridWidth !== false && p.frozenColumns !== true) {
							$self.jqGrid("setGridWidth", p.width + $td.outerWidth(), false);
							adjustGridWidth.call(this);
						}

						// destroy search form, edit form, view form, delete form if any exists (probably hidden)
						$("#searchmodfbox_" + $.jgrid.jqID(p.id) + ",#editmod" + $.jgrid.jqID(p.id) + ",#viewmod" + $.jgrid.jqID(p.id) + ",#delmod" + $.jgrid.jqID(p.id)).remove();

						$self.triggerHandler("jqGridAfterAddColumn", [options]);
					});
				}
			});
		})(jQuery);
	}

	applyClassesToGridHeaders(gridId: string) {
		const $grid    = jQuery(document.getElementById(gridId));
		const trHead   = jQuery("thead:first tr", $grid.hdiv);
        const colModel = $grid.getGridParam("colModel");
		const colModelsNumber = colModel.length;
        for (let iCol = 0; iCol < colModelsNumber; iCol++) {
            const columnInfo = colModel[iCol];
            if (columnInfo.headerClass) {
                const headDiv = jQuery("th:eq(" + iCol + ") div", trHead);
                headDiv.addClass(columnInfo.headerClass);
            }
        }
    };

	setLinkedPFPopover(_hoverOn: string, _skuData: any) {
		jQuery("." + _hoverOn).on("mouseover", function (e) {
			const pfLinkedSkuId = parseInt($(this).attr("data-sku"));
			const pfLinkedSkuInfo = _skuData.find((d) => (typeof d.rowData !== "undefined" ? d.rowData.id === pfLinkedSkuId : d.id === pfLinkedSkuId));
			jQuery(this).webuiPopover({
				title: "This SKU is attached to below Product Family",
				placement: "horizontal",
				trigger: "hover",
				content: `<div class="text-wrap text-primary font-weight-bold">${
					typeof pfLinkedSkuInfo.rowData !== "undefined" ? pfLinkedSkuInfo.rowData.productFamily.customerSkuId : pfLinkedSkuInfo.productFamily.customerSkuId
				}</div>`,
				closeable: true,
				animation: "pop",
				width: 300,
				style: "lowIndex",
				type: "html",
				onShow: function ($element) {
					jQuery($element).removeClass("webui-popover-lowIndex");
				},
				onHide: function () {
					jQuery(".webui-popover").remove();
				}
			});
			jQuery(this).webuiPopover("show");
		});
	}

	showSKURelationshipsPopover(_hoverOn: any, _gridId: string, _skuData: any) {
		const $t = this;
		jQuery("." + _hoverOn).on("mouseover", function (e) {
			let _content = "",
				isResultsGrid: boolean = _gridId == "resultsGrid";
			_content += '<div class="text-wrap max-vertical-h-30 flow-auto stylishScroll text-primary font-weight-bold"><ul class="list-group pl-0">';
			const hoveredOnSKUId = parseInt($(this).attr("data-sku"));
			const hoveredOnSKUInfo =
				_gridId == "skuGrid"
					? _skuData.find((d) => d.rowData.id == hoveredOnSKUId)
					: _gridId == "resultsGrid"
					? _skuData.find((d) => d.id === hoveredOnSKUId)
					: _skuData.find((d) => (d.fromGlobal ? d.id === hoveredOnSKUId : d.rowData.id === hoveredOnSKUId));
			for (
				let z = 0;
				z <
				(_gridId == "skuGrid"
					? hoveredOnSKUInfo.rowData.skuTaxonomyRelationships.length
					: _gridId == "resultsGrid"
					? hoveredOnSKUInfo.skuTaxonomyRelationships.length
					: hoveredOnSKUInfo.relationships.length);
				z++
			) {
				if (_gridId == "skuGrid" || _gridId == "resultsGrid") {
					const isSame: boolean =
						hoveredOnSKUId ==
						(isResultsGrid ? hoveredOnSKUInfo.skuTaxonomyRelationships[z].skuTaxonomy.skuId : hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z].skuTaxonomy.skuId);
					_content +=
						'<li class="list-group-item list-group-item-action px-2 py-1"><span class="no-transform badge px-2 align-middle badge-pill badge-primary rounded-pill">' +
						(isResultsGrid
							? hoveredOnSKUInfo.skuTaxonomyRelationships[z].skuRelationship[isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"]
							: hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z].skuRelationship[isSame ? "relationshipVerbiage" : "reciprocalRelationshipVerbiage"]) +
						'</span><small class="ml-2">' +
						(isResultsGrid
							? hoveredOnSKUInfo.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.customerSkuId
							: hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.customerSkuId);
					if (
						(isResultsGrid
							? hoveredOnSKUInfo.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description
							: hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description) != undefined &&
						(isResultsGrid
							? hoveredOnSKUInfo.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description
							: hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description) != ""
					) {
						_content +=
							" : " +
							(isResultsGrid
								? hoveredOnSKUInfo.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description
								: hoveredOnSKUInfo.rowData.skuTaxonomyRelationships[z][isSame ? "relatedToSkuTaxonomy" : "skuTaxonomy"].sku.description);
					}
					_content += "</small></li>";
				} else {
					_content +=
						'<li class="list-group-item list-group-item-action p-1"><span class="no-transform badge p-2 mr-1 mb-1 align-middle badge-pill badge-primary rounded-pill">' +
						hoveredOnSKUInfo.relationships[z].firstSelect.label +
						'</span><small class="ml-2">' +
						hoveredOnSKUInfo.relationships[z].skuTaxoCustomerSkuId +
						"</small></li>";
				}
			}
			_content += "</ul></div>";
			jQuery(this).webuiPopover({
				title:
					'<span class="font-weight-bold">List of SKUs Related to ' +
					'<span class="text-primary"' +
					(typeof hoveredOnSKUInfo.rowData.description !== "undefined" ? ' title="' + hoveredOnSKUInfo.rowData.description + '"' : "") +
					">" +
					hoveredOnSKUInfo.customerSkuId +
					"</span></span>",
				placement: "horizontal",
				trigger: "hover",
				content: _content,
				closeable: true,
				animation: "pop",
				dismissible: true,
				width: 300,
				type: "html",
				style: "lowIndex",
				onShow: function ($element) {
					jQuery($element).removeClass("webui-popover-lowIndex");
				},
				onHide: function () {
					jQuery(".webui-popover").remove();
				}
			});
			jQuery(this).webuiPopover("show");
		});
	}

	setAddedFormulaPopover(_hoverOn: string, _skuData: any) {
		const $t = this;
		jQuery("." + _hoverOn).on("mouseover", function (e) {
			const prepereFormulaView = (_formula: any) => {
				for (let z = 0; z < _formula.formulaSections.length; z++) {
					_content += '<li class="list-group-item mb-1 px-2 py-1 amaze-bg text-truncate">';
					_content += '<span class="font-weight-bold small"><u>' + _formula.formulaSections[z].formulaSectionType.name + "</u></span><br>";
					if (_formula.formulaSections[z].formulaSectionType.name != "Arithmetic Operation") {
						if (_formula.formulaSections[z].sectionArgumentType.name != "Text") {
							_content +=
								'<span class="font-weight-bold small" title="' +
								_formula.formulaSections[z].sectionArgumentType.name +
								'">' +
								_formula.formulaSections[z].sectionArgumentType.name +
								"</span><br>";
						}
						if (_formula.formulaSections[z].sectionArgumentType.name == "Attribute Value" || _formula.formulaSections[z].sectionArgumentType.name == "Attribute Name") {
							_content +=
								'<span class="small text-truncate" title="Attribute : ' +
								_formula.formulaSections[z].attribute.name +
								'"><span class="font-weight-bold">Attribute : </span>' +
								_formula.formulaSections[z].attribute.name +
								"</span> <br>";
							if (_formula.formulaSections[z].formulaSectionType.name == "Substring") {
								_content +=
									'<span class="small"><span class="font-weight-bold"> ' +
									(_formula.formulaSections[z].leftToRight ? "From Beginning" : "From End") +
									"</span> : " +
									_formula.formulaSections[z].startPosition +
									" to " +
									_formula.formulaSections[z].noOfCharacters +
									"</span><br>";
							}
							if (_formula.formulaSections[z].sectionArgumentType.name == "Attribute Value") {
								_content +=
									'<span class="small"><span class="font-weight-bold"> With UoM : </span>' +
									(_formula.formulaSections[z].includeUoM ? "Yes" : "No") +
									"</span><br>";
							}
						}
						if (
							_formula.formulaSections[z].sectionArgumentType.name == "Immediate Parent Taxonomy Node Name" ||
							_formula.formulaSections[z].sectionArgumentType.name == "Taxonomy Node Name" ||
							_formula.formulaSections[z].sectionArgumentType.name == "SKU Item ID"
						) {
							if (_formula.formulaSections[z].formulaSectionType.name == "Substring") {
								_content +=
									'<span class="small"><span class="font-weight-bold"> ' +
									(_formula.formulaSections[z].leftToRight ? "From Beginning" : "From End") +
									"</span> : " +
									_formula.formulaSections[z].startPosition +
									" to " +
									_formula.formulaSections[z].noOfCharacters +
									"</span><br>";
							}
						}
						if (_formula.formulaSections[z].sectionArgumentType.name == "Text") {
							_content += '<span class="small"><span class="font-weight-bold">Text : </span>' + _formula.formulaSections[z].argumentValue + "</span>";
						}
					}
					if (_formula.formulaSections[z].formulaSectionType.name == "Arithmetic Operation") {
						_content += '<span class="small">' + _formula.formulaSections[z].argumentValue + "</span>";
					}
					_content += "</li>";
				}
			};
			const hoveredOnSKUId = parseInt($(this).parent()[0].id == "" ? $(this).attr("data-sku") : $(this).parent()[0].id);
			const hoveredOnAttrId = $(this).attr("data-attr");
			const hoveredOnSKUInfo = _skuData.find((d) => d.rowData.id === hoveredOnSKUId);
			const hoveredOnAttrFormula = typeof hoveredOnAttrId != "undefined" ? hoveredOnSKUInfo["attribute" + hoveredOnAttrId].attribute.formula : undefined;
			const hoveredOnSkuFormula = hoveredOnSKUInfo.rowData.taxonomyNodes[0].formula;
			let _content = "";
			_content += '<div class="text-wrap max-vertical-h-40 flow-auto stylishSlimScroll text-primary font-weight-bold"><ul class="list-group pl-0">';
			prepereFormulaView(typeof hoveredOnAttrId == "undefined" ? hoveredOnSkuFormula : hoveredOnAttrFormula);
			if (hoveredOnSKUInfo.rowData.taxonomyNodes[0].maxCharacterLimit != 0 && typeof hoveredOnAttrId == "undefined") {
				_content += '<li class="list-group-item px-2 py-1 amaze-bg">';
				_content +=
					'<span class="small"><span class="font-weight-bold">Maximum Character limit :</span> ' +
					hoveredOnSKUInfo.rowData.taxonomyNodes[0].maxCharacterLimit +
					"</span>";
				_content += "</li>";
			}
			_content += "</ul></div>";
			jQuery(this).webuiPopover({
				title: "",
				content:
					'<span class="h5">This is ' +
					(typeof hoveredOnAttrId == "undefined" ? "an auto generated SKU title" : "a derived attribute") +
					' using formula <span class="text-primary">' +
					(typeof hoveredOnAttrId == "undefined" ? hoveredOnSkuFormula.formulaName : hoveredOnAttrFormula.formulaName) +
					"</span></span>",
				placement: typeof hoveredOnAttrId == "undefined" ? "auto-right" : "auto-left",
				trigger: "hover",
				closeable: true,
				animation: "pop",
				width: 280,
				style: "lowIndex",
				type: "html",
				onHide: function () {
					jQuery(".webui-popover").remove();
				},
				onShow: function () {
					jQuery(".webui-popover-title").addClass("d-none");
				}
			});
			jQuery(this).webuiPopover("show");
		});
	}

	prepareFailureResponse(_response: any) {
		return {
			error: _response.responseJSON,
			statusText: "OK",
			status: _response.status
		};
	}

	setAttributeShowLessMorePopover(_isSchema: boolean, _uds: any) {
		const $t = this;
		const returnBasedOnCase = (_string: string) => {
			let toReturn = "";
			const isLowerCase = _string.includes("attribute") || _string.includes("schema");
			isLowerCase
				? (toReturn = _string.replace(_isSchema ? "attribute" : "schema", _isSchema ? "schema" : "attribute"))
				: (toReturn = _string.replace(_isSchema ? "Attribute" : "Schema", _isSchema ? "Schema" : "Attribute"));
			return toReturn;
		};
		const icons = jQuery("." + returnBasedOnCase("extraAttributeShowMoreTrigger"));
		if (icons.length) {
			setTimeout(() => {
				jQuery($t).webuiPopover("destroy");
				_uds.each(icons, function (t: any, tIndex: any) {
					jQuery(t)
						.webuiPopover("destroy")
						.webuiPopover({
							title:
								"List of Values for " +
								(typeof $(t).attr("data-taxonomy") !== "undefined" ? "schema for Node " + $(t).attr("data-taxonomy") + " and " : "") +
								($(t).hasClass("isDomain") ? "domain " : "attribute ") +
								$(t).attr("data-attribute"),
							placement: "auto",
							trigger: "click",
							closeable: true,
							animation: "pop",
							width: 400,
							type: "html",
							multi: false,
							content: function (data) {
								const attrValueList = $(t).parent("ul").clone(true);
								jQuery(attrValueList).find("li").removeClass("d-none").addClass("d-flex small list-group-item-action");
								jQuery(attrValueList)
									.find("li." + returnBasedOnCase("extraAttributeShowMoreTrigger"))
									.remove();
								let panelHtml = '<div class="' + returnBasedOnCase("schemaLovPopover") + ' min-vertical-h-20">';
								if (jQuery(attrValueList).find("li").length > 5) {
									panelHtml += '<div><div class="input-group input-group-sm mb-2">';
									panelHtml += '<input type="text" class="form-control" placeholder="Search LoV" id="' + returnBasedOnCase("schemaLovPopoverInput") + '">';
									panelHtml += '<div class="input-group-append">';
									panelHtml +=
										'<button title="Sort LoVs" id="' +
										returnBasedOnCase("schemaLovPopoverSortTrigger") +
										'" class="btn btn-outline-primary" type="button"><i class="material-icons">sort</i></button>';
									panelHtml +=
										'<button id="' +
										returnBasedOnCase("schemaLovPopoverClearTrigger") +
										'" class="btn btn-primary" type="button"><i class="fa fas fa-search"></i></button></div>';
									panelHtml += "</div>";
									panelHtml +=
										'<div id="' +
										returnBasedOnCase("schemaLovpopover-no-results") +
										'" class="d-none text-center"><img src="assets/img/empty/noSearch.svg" class=" mt-3 img-fluid w50 d-block mx-auto" /><p class="text-center">No LoVs found. Try a different search</p></div></div>';
								}
								panelHtml +=
									'<ul class="' +
									returnBasedOnCase("schemaLovPopoverList") +
									' p-0 max-vertical-h-50 flow-auto stylishScroll border border-secondary">' +
									jQuery(attrValueList).html() +
									"</ul>";
								panelHtml += "</div>";
								return panelHtml;
							},
							onShow: function () {
								jQuery("#" + returnBasedOnCase("schemaLovPopoverSortTrigger") + " i").removeClass("fa-flip-vertical");
								jQuery("#" + returnBasedOnCase("schemaLovpopover-no-results")).addClass("d-none");
								jQuery("#" + returnBasedOnCase("schemaLovPopoverInput"))
									.on("keyup", function () {
										const value = jQuery("#" + returnBasedOnCase("schemaLovPopoverInput"))
											.val()
											.toLowerCase()
											.trim();
										jQuery("." + returnBasedOnCase("schemaLovPopoverList") + " li")
											.addClass("d-flex")
											.removeClass("d-none");
										if (value != "") {
											jQuery("." + returnBasedOnCase("schemaLovPopoverList") + " li").each(function (k, v) {
												if ($(v).find("div:first-child").text().toLowerCase().trim().indexOf(value) == -1) {
													$(v).removeClass("d-flex").addClass("d-none");
												} else {
													$(v).addClass("d-flex").removeClass("d-none");
												}
											});
											$("#" + returnBasedOnCase("schemaLovPopoverClearTrigger" + " i"))
												.removeClass("fa-search")
												.addClass("fa-times");
										} else {
											$("#" + returnBasedOnCase("schemaLovPopoverClearTrigger" + " i"))
												.addClass("fa-search")
												.removeClass("fa-times");
										}
										if (jQuery("." + returnBasedOnCase("schemaLovPopoverList") + " li.d-flex").length) {
											jQuery("#" + returnBasedOnCase("schemaLovpopover-no-results")).addClass("d-none");
										} else {
											jQuery("#" + returnBasedOnCase("schemaLovpopover-no-results")).removeClass("d-none");
										}
									})
									.val("");
								$("#" + returnBasedOnCase("schemaLovPopoverClearTrigger")).on("click", function () {
									if (jQuery("#" + returnBasedOnCase("schemaLovPopoverInput")).val() != "") {
										jQuery("#" + returnBasedOnCase("schemaLovPopoverInput"))
											.val("")
											.trigger("keyup");
									}
								});
								$("#" + returnBasedOnCase("schemaLovPopoverSortTrigger")).on("click", function () {
									const list = jQuery("." + returnBasedOnCase("schemaLovPopoverList"));
									const listitems = list.children("li").get();
									listitems.sort(function (e1, e2) {
										return $(e1).find("div:first-child").text().toUpperCase().localeCompare($(e2).find("div:first-child").text().toUpperCase());
									});
									list.empty();
									$.each(listitems, function (idx, itm) {
										!$("#" + returnBasedOnCase("schemaLovPopoverSortTrigger") + " i").hasClass("fa-flip-vertical") ? list.append(itm) : list.prepend(itm);
									});
									$("#" + returnBasedOnCase("schemaLovPopoverSortTrigger") + " i").toggleClass("fa-flip-vertical");
								});
							},
							onHide: function () {
								jQuery(".webui-popover").remove();
							}
						});
				});
			}, icons.length);
		}
	}

	setAttributeShowLessMoreMetaDataPopover(_isSchema: boolean, _uds: any) {
		const $t = this;
		const returnBasedOnCase = (_string: string) => {
			let toReturn = "";
			const isLowerCase = _string.includes("attribute") || _string.includes("schema");
			isLowerCase
				? (toReturn = _string.replace(_isSchema ? "attribute" : "schema", _isSchema ? "schema" : "attribute"))
				: (toReturn = _string.replace(_isSchema ? "Attribute" : "Schema", _isSchema ? "Schema" : "Attribute"));
			return toReturn;
		};
		const icons = jQuery('[class^="' + returnBasedOnCase("extraAttributeShowMoreMeta") + '"');
		if (icons.length) {
			setTimeout(() => {
				jQuery($t).webuiPopover("destroy");
				_uds.each(icons, function (t: any, tIndex: any) {
					const metaVB = t.classList[0].includes("MetaTag") ? "Tag" : "Attribute";
					jQuery(t)
						.webuiPopover("destroy")
						.webuiPopover({
							title: "Meta " + metaVB + "s for " + (jQuery(t).hasClass("isDomain") ? 'domain ' : 'attribute ') + $(t).attr("data-attribute"),
							placement: "auto",
							trigger: "click",
							closeable: true,
							animation: "pop",
							width: 400,
							type: "html",
							multi: false,
							content: function (data) {
								const attrValueList = $(t).parent("ul").clone(true);
								jQuery(attrValueList).find("li").removeClass("d-none").addClass("d-flex small list-group-item-action");
								jQuery(attrValueList).find("span.meta-popup-inception").removeClass("d-none");
								jQuery(attrValueList)
									.find("li." + returnBasedOnCase("extraAttributeShowMoreMeta") + metaVB + "Trigger")
									.remove();
								let panelHtml = '<div class="' + returnBasedOnCase("schemaMetaPopover") + ' min-vertical-h-20">';
								if (jQuery(attrValueList).find("li").length > 5) {
									panelHtml += '<div><div class="input-group input-group-sm mb-2">';
									panelHtml +=
										'<input type="text" class="form-control" placeholder="Search Meta ' +
										metaVB +
										(metaVB == "Attribute" ? " And Value" : "") +
										'" id="' +
										returnBasedOnCase("schemaMetaPopoverInput") +
										'">';
									panelHtml += '<div class="input-group-append">';
									panelHtml +=
										'<button title="Sort Meta ' +
										metaVB +
										's" id="' +
										returnBasedOnCase("schemaMetaPopoverSortTrigger") +
										'" class="btn btn-outline-primary" type="button"><i class="material-icons">sort</i></button>';
									panelHtml +=
										'<button id="' +
										returnBasedOnCase("schemaMetaPopoverClearTrigger") +
										'" class="btn btn-primary" type="button"><i class="fa fas fa-search"></i></button></div>';
									panelHtml += "</div>";
									panelHtml +=
										'<div id="' +
										returnBasedOnCase("schemaMetapopover-no-results") +
										'" class="d-none text-center"><img src="assets/img/empty/noSearch.svg" class=" mt-3 img-fluid w50 d-block mx-auto" /><p class="text-center">No ' +
										metaVB +
										" found. Try a different search</p></div></div>";
								}
								panelHtml +=
									'<ul class="' +
									returnBasedOnCase("schemaMetaPopoverList") +
									' p-0 max-vertical-h-50 flow-auto stylishScroll border border-secondary">' +
									jQuery(attrValueList).html() +
									"</ul>";
								panelHtml += "</div>";
								return panelHtml;
							},
							onShow: function ($element) {
								jQuery("#" + returnBasedOnCase("schemaMetaPopoverSortTrigger") + " i").removeClass("fa-flip-vertical");
								jQuery("#" + returnBasedOnCase("schemaMetapopover-no-results")).addClass("d-none");
								jQuery("#" + returnBasedOnCase("schemaMetaPopoverInput"))
									.on("keyup", function () {
										const value = jQuery("#" + returnBasedOnCase("schemaMetaPopoverInput"))
											.val()
											.toLowerCase()
											.trim();
										jQuery("." + returnBasedOnCase("schemaMetaPopoverList") + " li")
											.addClass("d-flex")
											.removeClass("d-none");
										if (value != "") {
											jQuery("." + returnBasedOnCase("schemaMetaPopoverList") + " li").each(function (k, v) {
												if (
													$(v)
														.find("span" + (metaVB == "Tag" ? ":first-child" : ""))
														.text()
														.toLowerCase()
														.trim()
														.indexOf(value) == -1
												) {
													$(v).removeClass("d-flex").addClass("d-none");
												} else {
													$(v).addClass("d-flex").removeClass("d-none");
												}
											});
											$("#" + returnBasedOnCase("schemaMetaPopoverClearTrigger" + " i"))
												.removeClass("fa-search")
												.addClass("fa-times");
										} else {
											$("#" + returnBasedOnCase("schemaMetaPopoverClearTrigger" + " i"))
												.addClass("fa-search")
												.removeClass("fa-times");
										}
										if (jQuery("." + returnBasedOnCase("schemaMetaPopoverList") + " li.d-flex").length) {
											jQuery("#" + returnBasedOnCase("schemaMetapopover-no-results")).addClass("d-none");
										} else {
											jQuery("#" + returnBasedOnCase("schemaMetapopover-no-results")).removeClass("d-none");
										}
									})
									.val("");
								$("#" + returnBasedOnCase("schemaMetaPopoverClearTrigger")).on("click", function () {
									if (jQuery("#" + returnBasedOnCase("schemaMetaPopoverInput")).val() != "") {
										jQuery("#" + returnBasedOnCase("schemaMetaPopoverInput"))
											.val("")
											.trigger("keyup");
									}
								});
								$("#" + returnBasedOnCase("schemaMetaPopoverSortTrigger")).on("click", function () {
									const list = jQuery("." + returnBasedOnCase("schemaMetaPopoverList"));
									const listitems = list.children("li").get();
									listitems.sort(function (e1, e2) {
										return $(e1).find("span:first-child").text().toUpperCase().localeCompare($(e2).find("span:first-child").text().toUpperCase());
									});
									list.empty();
									$.each(listitems, function (idx, itm) {
										!$("#" + returnBasedOnCase("schemaMetaPopoverSortTrigger") + " i").hasClass("fa-flip-vertical") ? list.append(itm) : list.prepend(itm);
									});
									$("#" + returnBasedOnCase("schemaMetaPopoverSortTrigger") + " i").toggleClass("fa-flip-vertical");
								});
								$t.attrSchemaMetaPopupInception($element);
							},
							onHide: function () {
								jQuery(".webui-popover").remove();
							}
						});
				});
			}, icons.length);
		}
	}

	attrSchemaMetaPopupInception(_element?: any) {
		const element = typeof _element !== "undefined" ? jQuery(_element).find(".meta-popup-inception") : jQuery("li.meta-popup-inception");
		element.toArray().forEach((elem) => {
			jQuery(elem).on("mouseover", function (e) {
				const currentElem = jQuery(e.currentTarget);
				const isMetaTag = jQuery(this).attr("data-is-metatag") === "true";
				const description =
					'<tr><td class="w35"><div class="col-12 px-0 text-wrap text-xs">Description: </div></td><td class="w65"><div class="col-12 px-0 text-wrap text-xs">' +
					(typeof jQuery(this).attr("data-desc") !== "undefined" ? jQuery(this).attr("data-desc") : "No description found.") +
					"</div></td></tr>";
				jQuery(currentElem).webuiPopover({
					title: "",
					trigger: "hover",
					animation: "pop",
					type: "html",
					multi: true,
					content:
						'<table class="table-bordered w100 table-sm tBl-Fix"><tbody>' +
						(isMetaTag
							? '<tr><td class="w35"><div class="col-12 px-0 text-wrap text-xs">Relevance: </div></td><td class="w65"><div class="col-12 px-0 text-wrap text-xs">' +
							  jQuery(this).attr("data-relevance") +
							  "</div></td></tr>" +
							  description
							: description) +
						"</tbody></table>",
					placement: "auto",
					closeable: true,
					width: 300,
					height: "auto",
					onShow: function ($element) {
						jQuery($element).find(".webui-popover-content").addClass("pr-0");
					},
					delay: {
						hide: 0
					}
				});
				jQuery(currentElem).webuiPopover("show");
			});
		});
	}
}
