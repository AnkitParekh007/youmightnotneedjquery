import { Injectable } from "@angular/core";
import "jquery.fancytree";
import "jquery-ui-dist/jquery-ui.min.js";
import * as _ from "underscore";
import * as $ from "jquery";
import * as is from "is_js";
declare var jQuery: any;

@Injectable({
	providedIn: "root"
})
export class FancyTreeService {
	public nodeFinding = false;
	$t = this;
	utility: any = {
		getTree: function (treeId) {
			const tree = document.getElementById(treeId);
			return $(tree).fancytree("getTree");
		},
		getRootNode: function (treeId) {
			const tree = document.getElementById(treeId);
			return $(tree).fancytree("getRootNode");
		},
		getNode: function (treeId, _nodeKey) {
			const tree = document.getElementById(treeId);
			return !_.isUndefined(_nodeKey) ? $(tree).fancytree("getTree").getNodeByKey(_nodeKey.toString()) : null;
		},
		isRootNode: function (treeId, _nodeKey) {
			const tree = document.getElementById(treeId);
			return !_.isUndefined(_nodeKey) ? $(tree).fancytree("getTree").getNodeByKey(_nodeKey.toString()).data.nodeType == "ROOT" : null;
		},
		getSelectedNodes: function (treeId) {
			const tree = document.getElementById(treeId);
			return $(tree).fancytree("getTree").getSelectedNodes();
		}
	};

	taxonomyTree: any = {
		getTree: function () {
			const tree = document.getElementById("taxonomy-tree");
			return $(tree).fancytree("getTree");
		},
		getRootNode: function () {
			const tree = document.getElementById("taxonomy-tree");
			return $(tree).fancytree("getRootNode");
		},
		getNode: function (_nodeKey) {
			const tree = document.getElementById("taxonomy-tree");
			return !_.isUndefined(_nodeKey) ? $(tree).fancytree("getTree").getNodeByKey(_nodeKey.toString()) : null;
		},
		isRootNode: function (_nodeKey) {
			const tree = document.getElementById("taxonomy-tree");
			return !_.isUndefined(_nodeKey) ? $(tree).fancytree("getTree").getNodeByKey(_nodeKey.toString()).data.nodeType == "ROOT" : null;
		},
		getSelectedNodes: function () {
			const tree = document.getElementById("taxonomy-tree");
			return $(tree).fancytree("getTree").getSelectedNodes();
		}
	};

	constructor() {}

	refreshTreeAndRetainState(treeId, _callBack?: any) {
		const $t = this;
		const tree: any = document.getElementById(treeId);
		const tOpts: any = $(tree).fancytree("getTree")["options"];
		const fTree: any = $t.utility.getTree(treeId);
		const retainState: any = fTree.getPersistData();
		if (tree != null && typeof tOpts !== "undefined") {
			if (tOpts["extensions"] !== "undefined" && tOpts["extensions"].includes("persist")) {
				jQuery("." + treeId + "-gridSearchRefreshIcon").trigger("click");
				const retainExpansionAndSelection = (_nodes: any, _isExapand: boolean) => {
					if (_nodes.length) {
						_nodes.forEach((n: any, nIndex: any) => {
							const cn = $t.utility.getNode(treeId, n);
							if (cn != null) {
								cn.tooltip = cn.data.taxonomyPath;
								cn.renderTitle();
								_isExapand ? cn.setExpanded(true) : cn.setSelected(true);
							}
							if (nIndex == _nodes.length - 1) {
								setTimeout(() => {
									const invisibleRoot = $t.utility.getRootNode(treeId);
									if (invisibleRoot != null) {
										invisibleRoot.render(true, true);
									}
								}, 100);
							}
						});
					}
				};
				setTimeout(() => {
					// let fTree: any = $t.utility.getTree(treeId);
					// let expNodes: any = retainState.expanded[0] != '' ? retainState.expanded[0].split('~') : [];
					// let selNodes: any = retainState.selected[0] != '' ? retainState.selected[0].split('~') : [];
					// $t.utility.getSelectedNodes(treeId);
					// $.when(retainExpansionAndSelection(expNodes, true)).done(function() {
					// 	retainExpansionAndSelection(selNodes, false);
					// 	fTree.clearPersistData();
					// });
					if (_callBack) {
						_callBack();
					}
				}, 3000);
			}
		}
	}

	removeContextMenu(treeId) {
		setTimeout(function () {
			if (document.getElementById(treeId) != null) {
				const popupNodes = jQuery(document.getElementById(treeId)).find(".fancytree-title");
				if (jQuery(popupNodes).length) {
					jQuery(popupNodes).contextMenu(false);
				}
			}
		}, 100);
	}

	finContextualNode(treeId, _nodeKey, _context) {
		const tree = document.getElementById(treeId);
		let desiredNode: any = null;
		const contextNode = $(tree).fancytree("getTree").getNodeByKey(_nodeKey.toString());

		switch (_context) {
			case "immediateParent":
				desiredNode = $(tree).fancytree("getTree").findRelatedNode(contextNode, "parent");
				break;
			case "topParent":
				desiredNode = $(tree).fancytree("getTree").findRelatedNode(contextNode, "parent");
				break;
			case "immediateChilds":
				desiredNode = contextNode.getChildren();
				break;
			case "allChilds":
				desiredNode = contextNode.getChildren();
				break;
			case "previousSibling":
				desiredNode = $(tree).fancytree("getTree").findRelatedNode(contextNode, "up");
				break;
			case "nextSibling":
				desiredNode = $(tree).fancytree("getTree").findRelatedNode(contextNode, "down");
				break;
			default:
				break;
		}
		return desiredNode;
	}

	checkNodeIsInReview(_node: any) {
		const $t = this;
		let isInReview = false;
		if (_node != null) {
			if (typeof _node.data.taxonomyReviewOperationData !== "undefined" && Object.keys(_node.data.taxonomyReviewOperationData).length) {
				if (["ADD", "UPDATE", "DELETE", "MOVE"].some((v) => _node.data.taxonomyReviewOperationData.operation.includes(v))) {
					isInReview = true;
				}
			}
			if (typeof _node.data.taxonomyReviewDigitalAssetDatas !== "undefined" && _node.data.taxonomyReviewDigitalAssetDatas.length) {
				isInReview = true;
			}
		}
		return isInReview;
	}

	searchNodeInTree(_treeId: string, _nodeData: any, _callBack?: any, _fromPopup?: boolean, _sharedService?: any, _animationDisabled?: boolean, _toSelect?: boolean) {
		const $t = this;
		const requiredNode = $t.utility.getNode(_treeId, _nodeData.id);
		if (typeof _sharedService !== "undefined") {
			const _callBackCall = (_data: any) => {
				$t.loadChildsAndFindNodeHeirarchical(_treeId, _data, _fromPopup, _callBack, _toSelect, _animationDisabled);
			};
			$t.getNodeHierarchyUsingApi(_nodeData, _sharedService, _callBackCall);
		} else {
			$t.loadChildsAndFindNodeHeirarchical(_treeId, $t.getNodeHierarchy(_nodeData), _fromPopup, _callBack, _toSelect, _animationDisabled);
		}
	}

	findParentNode(_treeId: string, _id: any) {
		const $t = this;
		let parentNodeFinding = true;
		let desiredNodeParent = null;
		while (parentNodeFinding) {
			if ($t.utility.isRootNode(_treeId, _id)) {
				desiredNodeParent = $t.utility.getNode(_treeId, _id);
				parentNodeFinding = false;
			} else {
				const pID = $t.utility.getNode(_treeId, _id).data.parentId;
				const pA = $t.utility.getNode(_treeId, pID);
				$t.findParentNode(_treeId, pA.data.id);
			}
		}
		return desiredNodeParent;
	}

	loadChildsAndFindNode(_treeId: string, _pId: any, _id: any, _fromPopup: boolean) {
		const $t = this;
		const pA = $t.utility.getNode(_treeId, _pId);
		$t.nodeFinding = true;
		let desiredNode = null;
		if ($t.nodeFinding) {
			pA.load().done(function () {
				pA.setExpanded($t.nodeFinding);
				pA.visit(function (childNode) {
					if (childNode.data.id == _id) {
						desiredNode = childNode;
						$t.nodeFinding = false;
						$t.scrollTreeNodeToBySearchedNodeId(_treeId, _id, _fromPopup);
					} else {
						if (childNode.data.nodeType != "LEAF") {
							if ($t.nodeFinding) {
								$t.loadChildsAndFindNode(_treeId, childNode.data.id, _id, _fromPopup);
							}
						}
					}
				});
			});
			return desiredNode;
		}
	}

	loadChildAndFindNodeForMultipleNodes(options:any){
		const $t = this;
		const {
			treeId,
			nodeSequences,
			fromPopup,
			anyCallBack,
			toSelect,
			animationDisabled,
			preventTreeEnable,
		} = options;

		if(nodeSequences.length){
			const executeSequentially = (promises) => {
				let result = Promise.resolve();
				promises.forEach(function (currentPromise) {
					result = result.then(currentPromise);
			  	});
			  	return result;
			};
			const promiseFactories  = [];
			for(const [i, item] of nodeSequences.entries()) {
				async function locateNodePromise () {
					return new Promise((res, rej) => {
						$t.loadChildsAndFindNodeHeirarchical(
							treeId,
							item,
							fromPopup,
							function() {
								res(null);
								if (i === promiseFactories.length - 1) {
									anyCallBack();
								}
							},
							toSelect,
							animationDisabled,
							preventTreeEnable
						);
					});
				};
				promiseFactories.push(locateNodePromise);
		  	}
			executeSequentially(promiseFactories);
		}
	}

	loadChildsAndFindNodeHeirarchical(
		treeId: string,
		nodeSequence: any,
		fromPopup: boolean,
		anyCallBack?: any,
		toSelect?: boolean,
		animationDisabled?: boolean,
		preventTreeEnable?: boolean) {

		const $t = this;
		async function sequentialFindingNode(nodeId, isLast) {
			try {
				const expandNode = function (nId) {
					const dfd = jQuery.Deferred();
					try {
						const expandingNode = $t.utility.getNode(treeId, nId);
						if (expandingNode !== null) {
							if (!expandingNode.isLoaded()) {
								$.when(expandingNode.load(true)).then(function () {
									expandingNode.setExpanded(true);
									dfd.resolve(isLast);
								});
							} else {
								expandingNode.setExpanded(true);
								dfd.resolve(isLast);
							}
						}
						return dfd.promise();
					} catch (e) {
						console.error(e);
					}
				};

				return await $.when(expandNode(nodeId)).then(function (isLastNode) {
					if (isLastNode) {
						const lastNode = $t.utility.getNode(treeId, nodeId);
						if (lastNode !== null) {
							if(!_.isUndefined(toSelect)){
								lastNode.setSelected(toSelect);
							} else {
								lastNode.setSelected(true);
							}
							$t.scrollTreeNodeToBySearchedNodeId(treeId, nodeId, fromPopup, animationDisabled);
							if (!_.isUndefined(anyCallBack) && _.isFunction(anyCallBack)) {
								anyCallBack();
							}
						}
						_.isUndefined(preventTreeEnable) ? $t.enableDisableTree(treeId, false) : "";
					}
				});
			} catch (e) {
				console.error(e);
			}
		}
		async function runSequentialFindingNode(sequence) {
			try {
				$t.enableDisableTree(treeId, true);
				if (sequence.length === 1) {
					const ln = $t.utility.getNode(treeId, sequence[0]);
					if (ln !== null) {
						ln.setSelected(!_.isUndefined(toSelect) ? toSelect : true);
						$t.scrollTreeNodeToBySearchedNodeId(treeId, sequence[0], fromPopup, animationDisabled);
						if (!_.isUndefined(anyCallBack) && _.isFunction(anyCallBack)) {
							anyCallBack();
						}
					}
					_.isUndefined(preventTreeEnable) ? $t.enableDisableTree(treeId, false) : "";
				} else {
					for (let i = 0; i < sequence.length; i++) {
						await sequentialFindingNode(sequence[i], i == sequence.length - 1);
					}
				}
			}
			catch(e){
				console.error(e);
			}

		}
		runSequentialFindingNode(_.uniq(nodeSequence));
	}

	animateNode(_node) {
		if (_node != null) {
			_node.setActive(true);
			$(_node.li).addClass("animated flash");
			setTimeout(() => {
				$(_node.li).removeClass("animated flash");
			}, 3000);
		}
	}

	scrollTreeNodeToBySearchedNodeId(_treeId: any, _searchedNodeId: any, _fromPopup: boolean, _disableAnimate?: boolean) {
		let nodeSpanselector: any;
		let nodeLiSelector: any;
		const numberToMinusFromOffset = 240;
		nodeSpanselector = $(document.getElementById(_treeId)).find(".ui-fancytree");
		nodeSpanselector.length > 1 ? (nodeSpanselector = nodeSpanselector[0]) : "";
		if ($(document.getElementById(_searchedNodeId)) != null) {
			$(nodeSpanselector).scrollTop(0);
			const calculatedPosition = _fromPopup
				? $($('[id="' + _searchedNodeId + '"]')[$('[id="' + _searchedNodeId + '"]').length > 1 ? 1 : 0]).offset().top - 100 - $(nodeSpanselector).offset().top
				: $(document.getElementById(_searchedNodeId)).offset().top - numberToMinusFromOffset;
			!_disableAnimate ? $(nodeSpanselector).animate({ scrollTop: calculatedPosition }, 1500) : "";
			nodeLiSelector = $(document.getElementById(_treeId))
				.find("#" + _searchedNodeId)
				.parent();
			$(nodeLiSelector).removeClass("blink");
			setTimeout(() => {
				$(nodeLiSelector).addClass("blink");
			}, 500);
		}
	}

	selectAllChildNodes(_treeId: any, _nodeId: any) {
		const n = this.utility.getNode(_treeId, _nodeId);
		if (n != null) {
			n.setSelected(true);
			n.setExpanded(true);
			n.visit(function (_ch: any) {
				if (_ch != null) {
					_ch.setSelected(true);
				}
			});
		}
	}

	scrollTreeNodeTo(nodeElement: any, treeContainer: any, scrollToPosition: any) {
		let toOffset = nodeElement.offset().top - treeContainer.offset().top + treeContainer.scrollTop();
		if (scrollToPosition == "center") {
			toOffset = toOffset - treeContainer.outerHeight() / 2;
		}
		treeContainer.animate({ scrollTop: toOffset }, 400); // 400 = duration
	}

	hasNodeBeenLazyLoaded(node) {
		return $(node).hasClass("fancytree-lazy");
	}

	getActiveNode(_treeId: any) {
		return $(document.getElementById(_treeId)).fancytree("getActiveNode");
	}

	makeTreeNodeVisible(nodeId: any, _treeId: any): any {
		const foundNode = $(document.getElementById(_treeId)).fancytree("getTree").getNodeByKey(nodeId);
		if (typeof foundNode !== "undefined" && foundNode != null) {
			foundNode.makeVisible();
		}
		return foundNode;
	}

	getNodeHierarchy(_node: any) {
		let nHierarchy = [];
		switch (_node.nodeType) {
			case "ROOT":
				nHierarchy = [_node.id];
				break;
			case "BRANCH":
				nHierarchy = [_node.parentId, _node.id];
				break;
			case "LEAF":
				nHierarchy = [_node.rootId, _node.parentId, _node.id];
				break;
		}
		return nHierarchy;
	}

	getNodeHierarchyUsingApi(_node: any, _sharedService?: any, _callBack?: any) {
		let taxonomySearhHierarchyUrl = _sharedService.urlService.apiCallWithParams("getCatalogNodesSearchHierarchy", {
			"{catalogId}": typeof _node.catalogDomain != "undefined" ? _node.catalogDomain.catalogId : _node.catalog.id,
			"{nodeId}": _node.id
		});
		taxonomySearhHierarchyUrl = _sharedService.urlService.addQueryStringParm(
			taxonomySearhHierarchyUrl,
			"parentNodeKey",
			_node[typeof _node.parentId !== "undefined" ? "parentId" : "rootId"]
		);
		taxonomySearhHierarchyUrl = _sharedService.urlService.addQueryStringParm(taxonomySearhHierarchyUrl, "rootNodeKey", _node.rootId);
		_sharedService.configService.get(taxonomySearhHierarchyUrl).subscribe((response: any) => {
			_callBack(response.length ? response : []);
		});
	}

	findMissingTreeNodesInNodeHierarchy(nodeHierarchy: any, _treeId: any) {
		let thePathIndex = null;
		let nodeNotFound = true;
		while (nodeNotFound) {
			const treeParentNode = $(_treeId).fancytree("getTree").getNodeByKey(nodeHierarchy.key);
			thePathIndex = -1;
			for (let childIdx = 0; childIdx < nodeHierarchy.children.length; childIdx++) {
				const node = nodeHierarchy.children[childIdx];
				if (node.children.length > 0) {
					thePathIndex = childIdx;
				}
				const treeNode = $(_treeId).fancytree("getTree").getNodeByKey(node.id);
				if (treeNode == null && treeParentNode != null) {
					this.addNodesToTree(nodeHierarchy, treeParentNode);
					nodeNotFound = false;
					break;
				}
			}
			nodeHierarchy = nodeHierarchy.children[thePathIndex];
			if (thePathIndex < 0) {
				nodeNotFound = false;
			}
		}
	}

	refreshNodes(data: any) {
		data.children.forEach(function (nodeData: any, _treeId: any) {
			const node = $(_treeId).fancytree("getTree").getNodeByKey(nodeData.id);
			if (node != null) {
				const title = nodeData.name;
				node.renderTitle();
			}
			const treeNodeId = this.addFancyTreePrefixToId(nodeData.id);
			$(treeNodeId + " span").removeClass("fancytree-selected");
			if (nodeData.children.length) {
				this.refreshNodes(nodeData);
			}
		});
	}

	addNodesToTree(nodeData: any, parentNode: any, position?: any, screen?: any) {
		let nodeIcon: any;

		let checkLazyProp = (data) => {
			if(Object.keys(data)){
				if(data.hasOwnProperty("lazy")){
					return "lazy";
				}else if(data.hasOwnProperty("isLazy")){
					return "isLazy";
				}
			}
		};
		if (typeof screen == undefined && screen != "managePf") {
			nodeIcon = this.getNodeIcon(nodeData[checkLazyProp(nodeData)], nodeData);
		}
		nodeData["childrenTaxonomyNodesInTree"] = 0;
		const pos = position ? position : "firstChild";
		return parentNode.addNode(
			{
				title: nodeData.title,
				key: nodeData.key,
				folder: nodeData[checkLazyProp(nodeData)],
				icon: nodeIcon,
				expand: false, // do not expand since we are lazy loading
				lazy: nodeData[checkLazyProp(nodeData)],
				tooltip: nodeData.taxonomyPath,
				data: nodeData
			},
			pos
		);
	}

	getNodeIcon(isLazy: any, nodeData: any): string {
		let leafIcon = "leaf-node-icon";
		switch (nodeData.nodeType) {
			case "ROOT":
				leafIcon = "root-node-icon";
				break;
			case "BRANCH":
				leafIcon = "branch-node-icon";
				break;
			case "LEAF":
				leafIcon = "leaf-node-icon";
				break;
		}
		return leafIcon;
	}

	isLeafNode(node: any) {
		let isSourceLeafNode = false;
		if (node.lazy != true) {
			isSourceLeafNode = true;
		}
		return isSourceLeafNode;
	}

	checkTreeExpander(clickEvent: any, node: any) {
		if (clickEvent.toElement !== undefined) {
			if (clickEvent.toElement.className == "fancytree-expander") {
				if (node.expanded) {
					node.setExpanded(false); // collapse node
				} else {
					node.setExpanded(true); // expand node
				}
			}
		}
	}

	updateTreeIcon(treeId: any, nodeId: any) {
		try {
			if (nodeId !== null && nodeId !== "") {
				const node = $("#" + treeId)
					.fancytree("getTree")
					.getNodeByKey(nodeId);
				node.icon = this.getNodeIcon(node.lazy, node.data);
				node.renderTitle();

				const parentNode = node.getParent();
				if (parentNode != null) {
					this.updateTreeIcon(treeId, parentNode.data.id);
				}

				const childNodes = node.getChildren();
				if (childNodes != undefined) {
					for (let j = 0; j < childNodes.length; j++) {
						this.updateTreeIcon(treeId, childNodes[j].data.id);
					}
				}
			}
		} catch (err) {
			console.error("updateTreeIcon", "[ Error updating tree icon ] : " + err.message, true);
		}
	}

	updateTreeOptions(treeId: any, newOptionName: any, newOptionValue: any) {
		$("#" + treeId).fancytree("option", newOptionName, newOptionValue);
	}

	setNodeSelection(treeId: any, nodeId:string, selection:boolean) {
		const node = this.utility.getNode(treeId, nodeId);
		if(node !== null){
			node.setSelected(selection);
		}
	}

	changeNodeSelectionModeInTree(treeId: any, newMode: number = 2) {
		const $t = this;
		const invisibleRoot = $t.utility.getRootNode(treeId);
		const $tree = $t.utility.getTree(treeId);
		if (invisibleRoot !== null) {
			const allTopNodes = invisibleRoot.children;

			if(is.not.undefined(allTopNodes) && is.not.empty(allTopNodes)){
				const newSelectionMode : any = {
					checkbox : true,
					selectMode : 2
				};
				switch(newMode){
					case 1:
						newSelectionMode.checkbox   = "radio";
						newSelectionMode.selectMode = newMode;
						break;
					case 2:
					case 3:
						newSelectionMode.checkbox   = true;
						newSelectionMode.selectMode = newMode;
						break;
				}
				$t.updateTreeOptions(treeId, "checkbox", newSelectionMode.checkbox);
				$t.updateTreeOptions(treeId, "selectMode", newSelectionMode.selectMode);

				allTopNodes.forEach((node, nodeIndex) => {
					const cn = $t.utility.getNode(treeId, node.key);
					if (cn !== null) {
						cn.checkbox = newSelectionMode.checkbox;
						cn.renderTitle();
					}
					if (nodeIndex == allTopNodes.length - 1) {
						setTimeout(() => {
							invisibleRoot.render(true, true);
						}, 100);
					}
				});
			}
		}
	}

	enableDisableTree(_treeId: any, _toDisable: boolean) {
		if (document.getElementById(_treeId) != null) {
			if (typeof $(document.getElementById(_treeId)).fancytree("getTree") !== "undefined") {
				$(document.getElementById(_treeId)).fancytree("getTree").enable(!_toDisable);
			}
		}
	}

	setInReviewNodesPopover(_nodeSpan: any) {
		if (jQuery(_nodeSpan).find(".fancytree-title").hasClass("underReviewNode")) {
			let colorClass = jQuery(_nodeSpan).find(".fancytree-title").attr("class");
			colorClass = colorClass.replace("fancytree-title", "").replace("underReviewNode", "");
			jQuery(_nodeSpan)
				.find(".fancytree-title")
				.prev(".fancytree-custom-icon")
				.addClass(colorClass)
				.webuiPopover("destroy")
				.webuiPopover({
					container: "body",
					title: "Under Review",
					placement: "auto",
					trigger: "hover",
					closeable: true,
					animation: "pop",
					offsetLeft: 20,
					width: 300,
					type: "html",
					multi: false,
					content: function (data) {
						return jQuery(_nodeSpan).find(".fancytree-title.underReviewNode").attr("data-review-text");
					}
				})
				.on("click", function (e) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
				});
		}
	}

	checkPendingTaxonomyReview(_sharedService: any, _catalogId: any, _catalogDomainId: any, _nodeId: any, _operationName: any) {
		const $t = this;
		let url = _sharedService.urlService.apiCallWithParams("checkPendingTaxonomyReview", {
			"{catalogId}": _catalogId,
			"{nodeId}": _nodeId,
			"{operationName}": _operationName
		});
		url = _sharedService.urlService.addQueryStringParm(url, "catalogDomainId", _catalogDomainId);
		return _sharedService.configService.get(url);
	}

	checkNodeisInvisibleBridgeRootNode(node:any){
		const isInVisibleRootNodePresent : boolean = (is.all.empty([node.title, node.breadCrumb, node.name]) && is.not.empty(node.children));
		return isInVisibleRootNodePresent;
	}
}
