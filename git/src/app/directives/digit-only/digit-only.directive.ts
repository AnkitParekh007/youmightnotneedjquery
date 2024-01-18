import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
	selector: "input[digitOnly]"
})
export class DigitOnlyDirective {
	inputElement: HTMLElement;
	private navigationKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "Home", "End", "ArrowLeft", "ArrowRight", "Clear", "Copy", "Paste"];
	constructor(public el: ElementRef) {
		this.inputElement = el.nativeElement;
	}

	showNumberMessage(){
		// let it happen, don't do anything
		const $t = this;
		jQuery($t.inputElement).webuiPopover('destroy');
		jQuery($t.inputElement).webuiPopover({
			title: "",
			content: function (d: any) {
				return `<small class="m-2 d-block">Please type a numbers only</small>`;
			},
			trigger: "manual",
			animation: "pop",
			multi: false,
			placement: "auto",
			style: "inverse",
			padding: false,
			arrow: false
		});
		jQuery($t.inputElement).webuiPopover('show');
		setTimeout(() => jQuery($t.inputElement).webuiPopover('destroy'), 3000);
	}

	@HostListener("keydown", ["$event"])
	onKeyDown(e: KeyboardEvent) {
		if (
			this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
			(e.key === "a" && e.ctrlKey === true) || // Allow: Ctrl+A
			(e.key === "c" && e.ctrlKey === true) || // Allow: Ctrl+C
			(e.key === "v" && e.ctrlKey === true) || // Allow: Ctrl+V
			(e.key === "x" && e.ctrlKey === true) || // Allow: Ctrl+X
			(e.key === "a" && e.metaKey === true) || // Allow: Cmd+A (Mac)
			(e.key === "c" && e.metaKey === true) || // Allow: Cmd+C (Mac)
			(e.key === "v" && e.metaKey === true) || // Allow: Cmd+V (Mac)
			(e.key === "x" && e.metaKey === true) // Allow: Cmd+X (Mac)
		) {
			this.showNumberMessage();
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
			this.showNumberMessage();
		}
	}

	@HostListener("paste", ["$event"])
	onPaste(event: ClipboardEvent) {
		event.preventDefault();
		const pastedInput: string = event.clipboardData.getData("text/plain").replace(/\D/g, ""); // get a digit-only string
		document.execCommand("insertText", false, pastedInput);
	}

	@HostListener("drop", ["$event"])
	onDrop(event: DragEvent) {
		event.preventDefault();
		const textData = event.dataTransfer.getData("text").replace(/\D/g, "");
		this.inputElement.focus();
		document.execCommand("insertText", false, textData);
	}
}
