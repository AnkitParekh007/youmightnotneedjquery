import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import * as mom from "moment";

@Directive({
	selector: "[dateFormat]"
})
export class DateFormatDirective implements OnInit {
	@Input() dateFormat: any;
	constructor(private _el: ElementRef) {}

	ngOnInit() {
		const dt = mom(this.dateFormat).format("MM/DD/YYYY, hh:mm A");
		const dt_ago = mom(this.dateFormat).fromNow();
		const htmlString = '<span title="' + dt_ago + '" class="d-block w100 text-truncate">' + dt + "</span>";
		this._el.nativeElement.innerHTML = htmlString;
	}
}
