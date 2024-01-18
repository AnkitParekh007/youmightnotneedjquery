import { Injectable, OnDestroy } from "@angular/core";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Injectable({
	providedIn: "root"
})
export class AnalyticsService implements OnDestroy {
	constructor(public gaService: GoogleAnalyticsService) {}

	/**
	 * Call to native GA Event
	 *
	 * @param eventCategory -- The object that user interacted with on the page. (e.g. Video)
	 * @param eventAction   -- he type of interaction with the object. (e.g. Play)
	 * @param eventLabel    -- Labels are useful for categorizing events. (e.g. summer campaign)
	 * @param eventValue    -- Value could be a numeric value associated with the object. (e.g. time in seconds for the player to load)
	 */
	public sendEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: any = null) {
		this.gaService.event(eventAction, eventCategory, eventLabel, eventValue);
	}

	ngOnDestroy() {}
}
