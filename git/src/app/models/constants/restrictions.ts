export const AMAZE_UI_RESTRICTIONS = {
	CATALOG_LOCK_RESTRICTIONS: {
		ADVANCED_SEARCH: {
			skuRestrictions: {
				delete: false,
				pfLinkage: false,
				copyValues: false,
				edit: false,
				moveTo: false,
				mirrorTo: false,
				assetLinkage: false,
				add: false,
				moveFrom: false,
				mirrorFrom: false
			}
		},
		SKU: {
			copyValues: false,
			edit: false,
			moveFrom: false,
			mirrorTo: false,
			mirrorFrom: false,
			pfLinkage: false,
			moveTo: false,
			delete: false,
			assetLinkage: false,
			add: false
		},
		ATTRIBUTE_MASTER: {
			attributeMetaTags: {
				delete: true,
				edit: true,
				add: true
			},
			add: false,
			edit: false,
			delete: false,
			attributeGroups: {
				add: false,
				delete: false,
				edit: false
			},
			assetLinkage: false
		},
		EXPORT_FILE: {
			delete: false,
			edit: false,
			add: false
		},
		REPORT: {
			skuValueAndUomUpdate: false
		},
		STYLE_GUIDE: {
			fixForEntireCatalog: false
		},
		TAXONOMY: {
			taxonomyMetaTags: {
				delete: true,
				edit: true,
				add: true
			},
			copiedFrom: false,
			addChild: false,
			taxonomyMetaAttributes: {
				add: true,
				delete: true,
				edit: true
			},
			delete: false,
			deleteHierarchy: false,
			edit: false,
			movedTo: false,
			assetLinkage: false,
			move: false,
			copiedTo: false
		},
		SCHEMA: {
			add: false,
			delete: false,
			edit: false
		},
		VALIDATION_MANAGEMENT: {
			skuValueAndUomUpdate: false
		},
		USER_MANAGEMENT: {
			addUser: true,
			grantRole: true,
			catalogIndependentPrivileges: true,
			editUser: true,
			deleteUser: true
		},
		ROLE_MANAGEMENT: {
			editRole: true,
			addRole: true,
			deleteRole: true
		},
		UOM_MASTER: {
			edit: true,
			add: true,
			delete: true
		},
		PRODUCT_FAMILY: {
			delete: false,
			add: false,
			edit: false,
			assetLinkage: false
		},
		PRODUCT_DETAIL_PAGE: {
			edit: false,
			assetLinkage: false
		},
		BRIDGE_SYNC: {
			syncAction: false
		},
		DA_IMPORTS: {
			edit: false,
			add: false,
			delete: false
		},
		USER_GROUP_MANAGEMENT: {
			addUserGroup: true,
			editUserGroup: true,
			deleteUserGroup: true
		},
		DA_LIBRARY: {
			assetLinkage: false
		}
	},
	REVIEW_RESTRICTIONS: {
		SCHEMA_ADD: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: false,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SKU_AUTHORING_SKU_ADD_DELETE: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: false,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: false,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_EDIT: {
			taxonomyRestriction: {
				addChild: true,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_DIGITAL_ASSET_LINKAGE: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_MOVE: {
			taxonomyRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: true
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: true,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: true
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_ADD: {
			taxonomyRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			childrenTaxonomyTreeRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SCHEMA_DELETE: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: false,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: false,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_DELETE: {
			taxonomyRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			childrenTaxonomyTreeRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		TAXONOMY_HIERARCHY_DELETE: {
			taxonomyRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			childrenTaxonomyTreeRestriction: {
				addChild: false,
				edit: false,
				delete: false,
				move: false,
				movedTo: false,
				copiedFrom: false,
				copiedTo: false,
				assetLinkage: false
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: false,
				pfLinkage: false,
				manageRelations: false
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SKU_AUTHORING_DIGITAL_ASSET_LINKAGE: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: false,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: false,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: false,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SKU_AUTHORING_ATTRIBUTE_VALUES: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: false,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: false,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SCHEMA_UPDATE: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: false,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: false,
				moveFrom: true,
				moveTo: true,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: false,
				edit: false,
				delete: false
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		},
		SKU_AUTHORING_CLASSIFICATION: {
			taxonomyRestriction: {
				addChild: true,
				edit: true,
				delete: false,
				move: false,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			childrenTaxonomyTreeRestriction: {
				addChild: true,
				edit: true,
				delete: true,
				move: true,
				movedTo: true,
				copiedFrom: true,
				copiedTo: true,
				assetLinkage: true
			},
			skuRestriction: {
				add: false,
				edit: false,
				delete: false,
				moveFrom: false,
				moveTo: false,
				mirrorFrom: false,
				mirrorTo: false,
				copyValues: false,
				assetLinkage: true,
				pfLinkage: false,
				manageRelations: true
			},
			skuRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true,
				moveFrom: true,
				moveTo: false,
				mirrorFrom: true,
				mirrorTo: true,
				copyValues: true,
				assetLinkage: true,
				pfLinkage: true,
				manageRelations: true
			},
			schemaRestriction: {
				add: true,
				edit: true,
				delete: true
			},
			schemaRestrictionForchildrenTaxonomyTree: {
				add: true,
				edit: true,
				delete: true
			}
		}
	}
};
