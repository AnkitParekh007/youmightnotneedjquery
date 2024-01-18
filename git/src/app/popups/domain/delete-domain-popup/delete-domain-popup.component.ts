import { Component, Inject, OnInit, ChangeDetectorRef, ViewEncapsulation, NgZone, ChangeDetectionStrategy } from "@angular/core";

import { SharedService } from "@app/services/shared.service";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
declare var jQuery: any;

@Component({
	selector: "delete-domain-dialog",
	templateUrl: "./delete-domain-popup.component.html",
	styleUrls: ["./delete-domain-popup.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDomainComponent implements OnInit {
	popupData: any;
	otp: any = "";
	interval: any;
	showOtpView = false;
	isTimeExpired = false;
	isLoading = false;
	labels:any;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private dialogRef: MatDialogRef<DeleteDomainComponent>,
		private cdr: ChangeDetectorRef,
		private sharedService: SharedService,
		private _ngZone: NgZone
	) {
		this.popupData = data.data.data;
		this.labels = this.sharedService.labelsService.terms;
	}

	generateOtp() {
		const $t = this;
		clearInterval($t.interval);
		$t.sharedService.uiService.showApiStartPopMsg("Sending OTP...");
		const apiUrl = $t.sharedService.urlService.apiCallWithParams("generateOtp", {
			"{catalogId}": $t.popupData.catalogData.catalogKey,
			"{domainId}": $t.popupData.domainData.id
		});
		$t.sharedService.configService.put(apiUrl).subscribe(
			(response) => {
				$t.isTimeExpired = false;
				$t.showOtpView = true;
				$t.cdr.detectChanges();
				$t.sharedService.uiService.showApiSuccessPopMsg("OTP Sent Successfully...");
				const tenMinutes = 60 * 10;
				$t.startTimer(tenMinutes);
			},
			(error) => {
				$t.sharedService.uiService.showApiErrorPopMsg(error.error);
			}
		);
		$t.cdr.detectChanges();
	}

	deleteNodeInDatabase() {
		this.popupData.onSubmit(null);
	}

	submit() {
		this.popupData.onSubmit(this.otp);
	}

	startTimer(duration: any) {
		let timer: any = duration;
		let minutes: any;
		let seconds: any;
		this.interval = setInterval(() => {
			minutes = parseInt(String(timer / 60), 10);
			seconds = parseInt(String(timer % 60), 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			jQuery("#time").text(minutes + ":" + seconds);

			if (--timer < 0) {
				clearInterval(this.interval);
				this.isTimeExpired = true;
				this.cdr.detectChanges();
			}
		}, 1000);
	}

	ngOnInit() {
		this.dialogRef.afterClosed().subscribe((result) => {
			clearInterval(this.interval);
		});
	}
	ngAfterViewInit() {}
	ngOnDestroy() {}
}
