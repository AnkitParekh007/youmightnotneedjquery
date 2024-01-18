import { Directive, Output, EventEmitter } from "@angular/core";
@Directive({
	selector: "[elemRendered]"
})
export class ElemRenderedDirective {
	@Output("elemRendered") elemRendered: EventEmitter<any> = new EventEmitter();
	ngOnInit() {
		setTimeout(() => this.elemRendered.emit(), 10);
	}
}
