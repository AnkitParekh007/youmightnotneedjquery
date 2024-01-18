import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
	selector: "[amazeThumbnail]",
	exportAs: "amazeThumbnail"
})
export class ThumbnailDirective implements OnInit {
	@Input("amazeThumbnail") fileItem: FileItem;
	constructor(private renderer: Renderer2, private el: ElementRef) {}

	ngOnInit() {
		const $t = this;
		const imageType = /image.*/;
		const otherThanImages = [
			"unknown",
			"text",
			"archive",
			"audio",
			"video",
			"png",
			"jpg",
			"gif",
			"tiff",
			"svg",
			"ai",
			"psd",
			"dwg",
			"avi",
			"fla",
			"mp2",
			"mp3",
			"mp4",
			"aac",
			"flac",
			"wma",
			"wav",
			"mxf",
			"iso",
			"mdf",
			"nrg",
			"zip",
			"7z",
			"arj",
			"rar",
			"pdf",
			"doc",
			"rtf",
			"txt",
			"xls",
			"xlsx",
			"ppt",
			"pptx",
			"css",
			"csv",
			"html",
			"json",
			"js",
			"xml",
			"dbf",
			"exe"
		];
		if (!$t.fileItem.file.type.match(imageType)) {
			const imgEl = $t.renderer.createElement("img");
			$t.renderer.appendChild($t.el.nativeElement, imgEl);
			$t.renderer.setStyle(imgEl, "width", "100px");
			const ext = /^.+\.([^.]+)$/.exec($t.fileItem.file.name);
			let imgPath = "";
			if (ext == null) {
				imgPath = "assets/img/digital/files/unknown.svg";
			} else {
				if (otherThanImages.indexOf(ext[1]) > -1) {
					imgPath = "assets/img/digital/files/" + ext[1] + ".svg";
				} else {
					imgPath = "assets/img/digital/files/unknown.svg";
				}
			}
			$t.renderer.setProperty(imgEl, "src", imgPath);
			return;
		} else {
			const imgEl = $t.renderer.createElement("img");
			$t.renderer.appendChild($t.el.nativeElement, imgEl);
			$t.renderer.setStyle(imgEl, "width", "100px");
			const img = new Image();
			const reader = new FileReader();
			reader.onloadstart = (evt: any) => {
				$t.renderer.setProperty(imgEl, "src", "assets/img/loader/hourglass.svg");
			};
			reader.onloadend = (evt: any) => {
				img.onload = () => {
					const width = img.width;
					const height = img.height;
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d")!;
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0);
					$t.renderer.setProperty(imgEl, "src", canvas.toDataURL());
				};
				img.src = evt.target.result.toString();
			};
			reader.readAsDataURL($t.fileItem.file);
		}
	}
}

export interface FileItem {
	uploadInProgress: boolean;
	isReady: boolean;
	isSuccess: boolean;
	isCancel: boolean;
	isError: boolean;
	progress: number;
	formData: FormData;
	alias: string;
	file: File;
}
