import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@app/modules/material.module";
import { LoaderComponent } from "@app/shared/loader/loader.component";

// pipes
import { AmazeFilterPipe } from "@app/pipes/amazeFilter.pipe";
import { FilterByNamePipe, FilterByNodeNamePipe } from "@app/pipes/filterByName.pipe";
import { OrderByPipe } from "@app/pipes/orderBy.pipe";
import { RemoveSpacePipe } from "@app/pipes/remove-space.pipe";
import { SelectInputComboFilterPipe } from "@app/pipes/select-input-combo.pipe";
import { SelectInputComboImpureFilterPipe } from "@app/pipes/select-input-combo-impure.pipe";
import { KeysPipe } from "@app/pipes/keys.pipe";
import { SafeHtmlPipe } from "@app/pipes/safeHtml.pipe";
import { FilterPipe } from "@app/pipes/filterBy.pipe";
import { StaticAssetPipe } from "@app/pipes/static-asset.pipe";
import { CustomDatePipe } from "@app/pipes/customDate.pipe";
import { UniqeByPipe } from "@app/pipes/uniqueBy.pipe";
import { TimeAgoPipe } from "@app/pipes/timeAgo.pipe";
import { IntParserPipe } from "@app/pipes/intParser.pipe";
import { PluralByPipe } from "@app/pipes/pluralBy.pipe";

// directives
import { ElemRenderedModule } from "@app/directives/elem-rendered/elem-rendered.module";
import { DigitOnlyModule } from "@app/directives/digit-only/digit-only.module";
import { ClickOutsideModule } from "@app/directives/click-outside/click-outside.module";
import { DialogDraggableTitleModule } from "@app/directives/dialog-draggable-title/dialog-draggable-title.module";
import { ThumbnailModule } from "@app/directives/thumbnail/thumbnail.module";
import { AmazeTooltipModule } from "@app/directives/tooltip-directives/tooltip-directives.modules";
import { UserFullNameModule } from "@app/directives/user-full-name/user-full-name.module";
import { DateFormatModule } from "@app/directives/date-format/date-format.module";
import { DebounceModule } from "@app/directives/debounce-directive/debounce.module";
import { TextHighlightModule } from "@app/directives/text-highlight/text-highlight.module";
import { NoRestrictedCharactersModule } from "@app/directives/no-restricted-characters/no-restricted-characters.module";
import { AlphanumericOnlyModule } from "@app/directives/alphanumeric-only/alphanumeric-only.module";
import { HoverClassModule } from "@app/directives/hover-class/hover-class.module";
import { DetectInactivityModule } from "@app/directives/detect-inactivity/detect-inactivity.module";
import { TrackByModule } from "@app/directives/track-by/track-by.module";
import { IntersectionObserverModule } from "@app/directives/intersection-observer/intersection-observer.module";

// others
import { BreadCrumbModule } from "@app/components/breadcrumb/breadcrumb.module";

@NgModule({
	imports: [CommonModule, FlexLayoutModule, MaterialModule, BreadCrumbModule],
	declarations: [
		AmazeFilterPipe,
		FilterByNamePipe,
		FilterByNodeNamePipe,
		OrderByPipe,
		RemoveSpacePipe,
		LoaderComponent,
		SelectInputComboFilterPipe,
		SelectInputComboImpureFilterPipe,
		KeysPipe,
		SafeHtmlPipe,
		FilterPipe,
		StaticAssetPipe,
		CustomDatePipe,
		UniqeByPipe,
		TimeAgoPipe,
		IntParserPipe,
		PluralByPipe
	],
	exports: [
		AmazeFilterPipe,
		FilterByNamePipe,
		FilterByNodeNamePipe,
		OrderByPipe,
		RemoveSpacePipe,
		SelectInputComboFilterPipe,
		SelectInputComboImpureFilterPipe,
		KeysPipe,
		SafeHtmlPipe,
		FilterPipe,
		StaticAssetPipe,
		CustomDatePipe,
		UniqeByPipe,
		TimeAgoPipe,
		IntParserPipe,
		PluralByPipe,
		BreadCrumbModule,
		ElemRenderedModule,
		DigitOnlyModule,
		ClickOutsideModule,
		DialogDraggableTitleModule,
		ThumbnailModule,
		AmazeTooltipModule,
		UserFullNameModule,
		DateFormatModule,
		DebounceModule,
		TextHighlightModule,
		NoRestrictedCharactersModule,
		AlphanumericOnlyModule,
		HoverClassModule,
		DetectInactivityModule,
		TrackByModule,
		IntersectionObserverModule
	]
})
export class SharedModule {}
