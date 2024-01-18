import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
	selector: "input[noRestrictedChars]"
})
export class NoRestrictedCharactersDirective {
	allowedChars: any = [".", "_", "-", "(", ")", " ", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Shift", "Control"];
	inputElement: HTMLElement;
	timer: any;
	constructor(public el: ElementRef) {
		this.inputElement = el.nativeElement;
	}

	showWarningMessage() {
		$(this.inputElement).parent().find("#error-message").length == 0
			? $(this.inputElement)
					.parent()
					.append('<span id="error-message" class="text-danger text-wrap">An Asset Name can only contain the following special characters: - _ . ( )' + "</span>")
			: "";
		clearTimeout(this.timer);
		$(this.inputElement).parent().find("#error-message").length == 1
			? (this.timer = setTimeout(() => {
					$(this.inputElement).parent().find("#error-message").remove();
			  }, 3500))
			: "";
	}

	@HostListener("keydown", ["$event"]) onKeyDown(e: KeyboardEvent) {
		if (
			!this.allowedChars.includes(e.key) &&
			!(
				(e.keyCode > 64 && e.keyCode < 91) ||
				(e.keyCode > 97 && e.keyCode < 123) ||
				(!e.shiftKey && e.keyCode > 47 && e.keyCode < 58) ||
				(e.shiftKey && (e.keyCode == 48 || e.keyCode == 57))
			)
		) {
			e.preventDefault(); // allow input of allowed characters
			this.showWarningMessage(); // Display the warning message
		}
	}

	@HostListener("paste", ["$event"]) onPaste(event: ClipboardEvent) {
		event.preventDefault();
		const pastedInput: string = event.clipboardData.getData("text/plain").replace(/[^ a-zA-Z_.\-()0-9]/g, ""); // replace not allowed characters
		document.execCommand("insertText", false, pastedInput);
		this.showWarningMessage();
	}

	@HostListener("drop", ["$event"]) onDrop(event: DragEvent) {
		event.preventDefault();
		const textData = event.dataTransfer.getData("text").replace(/[^ a-zA-Z_.\-()0-9]/g, "");
		this.inputElement.focus();
		document.execCommand("insertText", false, textData);
		this.showWarningMessage();
	}
}
