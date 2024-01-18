import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { NgScrollbarModule } from "ngx-scrollbar";
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from "ng-material-multilevel-menu";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { MdePopoverModule } from "@material-extended/mde";
import { NgxUploadModule } from "@wkoza/ngx-upload";
import { NgxTrimDirectiveModule } from "ngx-trim-directive";
import { ClipboardModule } from "ngx-clipboard";
import { ImgFallbackModule } from "ngx-img-fallback";
import { NgxFileDropModule } from "ngx-file-drop";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { HotTableModule } from "@handsontable/angular";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { AngularSplitModule } from "angular-split";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { PermissionsModule } from "@app/directives/permission";
import { WalkthroughModule } from "angular-walkthrough";
import { AngularResizedEventModule } from "angular-resize-event";
import { NgSelectModule } from "@ng-select/ng-select";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AutofocusFixModule } from "ngx-autofocus-fix";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ToastrModule } from "ngx-toastr";
import { HighchartsChartModule } from "highcharts-angular";
import { CKEditorModule } from "ckeditor4-angular";
@NgModule({
	imports: [
		NgScrollbarModule,
		NgMaterialMultilevelMenuModule,
		NgMultiSelectDropDownModule.forRoot(),
		MdePopoverModule,
		NgxUploadModule.forRoot(),
		NgxTrimDirectiveModule,
		ClipboardModule,
		ImgFallbackModule,
		LazyLoadImageModule,
		HotTableModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		AngularSplitModule,
		RxReactiveFormsModule,
		PermissionsModule.forRoot(),
		NgxFileDropModule,
		WalkthroughModule,
		AngularResizedEventModule,
		NgSelectModule,
		VirtualScrollerModule,
		InfiniteScrollModule,
		AutofocusFixModule.forRoot(),
		SweetAlert2Module.forRoot(),
		ToastrModule.forRoot({
			closeButton: true,
			timeOut: 15000,
			progressBar: true
		}),
		HighchartsChartModule,
		CKEditorModule
	],
	exports: [
		NgxSkeletonLoaderModule,
		NgScrollbarModule,
		NgMaterialMultilevelMenuModule,
		NgxMatSelectSearchModule,
		NgMultiSelectDropDownModule,
		SelectDropDownModule,
		MdePopoverModule,
		NgxUploadModule,
		NgxTrimDirectiveModule,
		ClipboardModule,
		ImgFallbackModule,
		LazyLoadImageModule,
		HotTableModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		AngularSplitModule,
		RxReactiveFormsModule,
		PermissionsModule,
		NgxFileDropModule,
		WalkthroughModule,
		AngularResizedEventModule,
		NgSelectModule,
		VirtualScrollerModule,
		InfiniteScrollModule,
		AutofocusFixModule,
		SweetAlert2Module,
		HighchartsChartModule,
		CKEditorModule
	],
	providers: [MultilevelMenuService]
})
export class PluginsModule {}
