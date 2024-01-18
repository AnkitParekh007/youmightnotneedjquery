import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextHighlightDirective } from "./text-highlight.directive";

@NgModule({
	imports: [CommonModule],
	declarations: [TextHighlightDirective],
	exports: [TextHighlightDirective]
})
export class TextHighlightModule {
	static forRoot(): ModuleWithProviders<TextHighlightModule> {
		return {
			ngModule: TextHighlightModule
		};
	}
}
