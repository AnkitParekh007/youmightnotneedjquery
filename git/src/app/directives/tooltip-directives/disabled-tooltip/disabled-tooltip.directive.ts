import { Directive, Input, ElementRef, HostListener } from "@angular/core";
@Directive({
	selector: "[disabled-tooltip]"
})
export class DisabledTooltipDirective {
	@Input() placement: string;
	@Input() disabledTooltipText: string;
	tooltip: HTMLElement;

	constructor(private el: ElementRef) {
		this.tooltip = el.nativeElement;
	}

	@HostListener("mouseenter") onMouseEnter() {
		const $t = this;
		if (!$t.tooltip) {
			jQuery($t.tooltip).webuiPopover({
				title: "",
				content: function (d: any) {
					return '<small class="m-2">' + (typeof $t.disabledTooltipText !== "undefined" ? $t.disabledTooltipText : jQuery($t.tooltip).text()) + "</small>";
				},
				trigger: "hover",
				animation: "pop",
				multi: false,
				placement: typeof $t.placement === "undefined" ? "auto" : $t.placement,
				style: "inverse",
				padding: false,
				arrow: false
			});
		}
	}
	@HostListener("mouseleave") onMouseLeave() {
		const $t = this;
		if ($t.tooltip) {
			jQuery($t.tooltip).webuiPopover("destroy");
		}
	}
}
