import { Injectable } from "@angular/core";
import { AMAZE_TERMS } from "@app/models/enums/amaze-terms.enums";

@Injectable({
	providedIn: "root"
})
export class UiLabelsService {
	public terms : any = AMAZE_TERMS;

	constructor() {}
	
	public labelInUpperCase(termName){
		return AMAZE_TERMS[termName].toUpperCase();
	}
	public labelInLowerCase(termName){
		return AMAZE_TERMS[termName].toLowerCase();
	}
	public labelInTitleCase(termName){
		const splitStr = AMAZE_TERMS[termName].toLowerCase().split(" ");
		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(" ");
	}
	public labelInCamelCase(termName){
		return AMAZE_TERMS[termName].replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index == 0 ? word.toLowerCase() : word.toUpperCase();
		}).replace(/\s+/g, "");
	}
}