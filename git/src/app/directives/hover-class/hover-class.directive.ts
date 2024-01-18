import { Directive, HostListener, ElementRef, Input } from "@angular/core";
@Directive({
	selector: "[hover-class]"
})
export class HoverClassDirective {
	constructor(public elementRef: ElementRef) {}
	@Input("hover-class") hoverClass: any;

	@HostListener("mouseenter") onMouseEnter() {
		const classNames = this.hoverClass.split(" ");
		classNames.forEach((hoverclassName: any) => {
			this.elementRef.nativeElement.classList.add(hoverclassName);
		});
	}

	@HostListener("mouseleave") onMouseLeave() {
		const classNames = this.hoverClass.split(" ");
		classNames.forEach((hoverclassName: any) => {
			this.elementRef.nativeElement.classList.remove(hoverclassName);
		});
	}
}
