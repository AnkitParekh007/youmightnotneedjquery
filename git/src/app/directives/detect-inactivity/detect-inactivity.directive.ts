import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { throttle, merge } from 'rxjs/operators';

// Options
// [detectInactivity]         - inactivity timeout in minutes (15 minutes by defualt)
// (detectInactivityInterval) - inactivity time interval in mili seconds (1000 ms by default)
// [detectInactivityCallback] - event emitter to handle inactivity callback

@Directive({
  	selector: '[detectInactivity]'
})
export class DetectInactivityDirective {
  	private mousemove = new EventEmitter();
  	private wheelmove = new EventEmitter();
  	private mousedown = new EventEmitter();
  	private keypress = new EventEmitter();
  	private timeoutId: any;
	@Input() detectInactivity: number = 15;
	@Input() detectInactivityInterval: number = 1000;
	@Output() detectInactivityCallback = new EventEmitter();
	@HostListener('document:wheel', ['$event'])
	onWheelmove(event) {
		this.wheelmove.emit(event);
  	}

  	@HostListener('document:mousemove', ['$event'])
  	@HostListener('document:touchmove', ['$event'])
	onMousemove(event) {
		this.mousemove.emit(event);
  	}

  	@HostListener('document:mousedown', ['$event'])
  	@HostListener('document:touchend', ['$event'])
	onMousedown(event) {
		this.mousedown.emit(event);
	}

  	@HostListener('document:keypress', ['$event'])
  	onKeypress(event) {
    	this.keypress.emit(event);
  	}

  	constructor() {
    	this.mousemove
			.pipe(
				merge(this.wheelmove, this.mousedown, this.keypress),
				throttle(() => interval(this.detectInactivityInterval))
			).subscribe(() => {
        		this.reset();
        		this.start();
      		});
  	}

  	public start(): void {
    	this.timeoutId = setTimeout(() => this.detectInactivityCallback.emit(true), this.detectInactivity * 60000);
  	}

  	public reset(): void {
    	clearTimeout(this.timeoutId);
  	}
}
