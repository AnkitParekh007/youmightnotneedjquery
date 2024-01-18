import { Injectable, OnDestroy } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";

@Injectable({
	providedIn: "root"
})
export class PopupService implements OnDestroy {
	public dialogConfig: MatDialogConfig = new MatDialogConfig();
	constructor() {}

	/*
	 ** This method Programmatically run change detection
	 ** And also takes care of the situation if cdr is null or undefined
	 */
	public openAmazePopup(_supportService: any, _title: any, _popComponent: any, _dialogData: any, _onSubmitMethod: any) {
		const configData: any = {
			title: _title
		};
		if (_dialogData && Object.keys(_dialogData).length) {
			Object.keys(_dialogData).forEach((k) => {
				configData[k] = _dialogData[k];
			});
		}
		if (_onSubmitMethod && typeof _onSubmitMethod === "function") {
			configData["onSubmit"] = (fromDialog: any) => {
				_onSubmitMethod(_dialogData, fromDialog);
			};
		}
		this.dialogConfig.data = configData;
		_supportService.dialogService.open(_popComponent, this.dialogConfig);
	}

	ngOnDestroy() {}
}
