import { Directive, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Directive({
	selector: "[debounce]"
})
export class DebounceDirective implements OnInit, OnDestroy {
	@Input() debounceEvent: string | string[];
	@Input() debounceEventDelay = 3000;
	@Output() debounceOnEvent: EventEmitter<any>;
	private subscriptions: Subscription[];

	constructor(private el: ElementRef) {
		this.debounceOnEvent = new EventEmitter<any>();
		this.subscriptions = new Array<Subscription>();
	}
	ngOnInit() {
		if (!Array.isArray(this.debounceEvent)) {
			this.subscriptions.push(this.subscribeTo(this.debounceEvent));
		} else {
			this.debounceEvent.forEach((e) => {
				this.subscriptions.push(this.subscribeTo(e));
			});
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
	private subscribeTo(event: string): Subscription {
		return fromEvent(this.el.nativeElement, event)
			.pipe(distinctUntilChanged(), debounceTime(this.debounceEventDelay))
			.subscribe(($event) => {
				this.debounceOnEvent.emit($event);
			});
	}
}

// Refrence
// This is a list of parameters for the directive:

// 1.debounceEvent
// Name : debounceEvent
// Type : string | string[]
// Required : yes
// Description : This should be set first and represent the event or group or events that should be debounced.

// 2.debounceEvent
// Name : debounceEventDelay
// Type : number
// Required : no
// Default value : 3000
// Description : Delay of the event in miliseconds.

// 3.debounceEvent
// Name : debounceOnEvent
// Type : function($event: any) => void
// Required : yes
// Description : A handler that will get all the info from the event.

// Usage Examples
// Debounce one event
// Debounce the "keyup" event and call "myHandler" when it is done.
// <input
//   type="text"
//   debounce
//   [debounceEvent]="'keyup'"
//   (debounceOnEvent)="myHandler($event)"
// >

// Debounce multiple events
// Debounce "keyup" and "change" events and call "myHandler" when any of this is done.
// <input
//   type="number"
//   debounce
//   [debounceEvent]="['keyup', 'change']"
//   (debounceOnEvent)="myHandler($event)"
// >

// Change the delay
// Change the delay to execute "myHandler" to 1000 miliseconds. Works with multiple events.
// <input
//   type="text"
//   debounce
//   [debounceEvent]="'keyup'"
//   [debounceEventDelay]="1000"
//   (debounceOnEvent)="myHandler($event)"
// >
