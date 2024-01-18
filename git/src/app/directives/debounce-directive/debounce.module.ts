import { NgModule } from "@angular/core";
import { DebounceDirective } from "./debounce.directive";

@NgModule({
	imports: [],
	declarations: [DebounceDirective],
	exports: [DebounceDirective]
})
export class DebounceModule {}
