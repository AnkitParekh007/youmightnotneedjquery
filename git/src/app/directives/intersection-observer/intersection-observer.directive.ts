import { Directive, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
	selector: '[amazeIntersectionObserver]'
})
export class IntersectionObserverDirective implements AfterViewInit {
	@Output() onIntersection = new EventEmitter<boolean>();

	constructor(private el: ElementRef) { }

	ngAfterViewInit() {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5
		};
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.onIntersection.emit(true);
					observer.unobserve(this.el.nativeElement);
				}
			});
		}, options);
		observer.observe(this.el.nativeElement);
	}
}
