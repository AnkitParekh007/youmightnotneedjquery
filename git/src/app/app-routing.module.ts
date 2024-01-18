import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";

const routes: Routes = [
	// Fallback when no prior route is matched
	{
		path: "**",
		redirectTo: AMAZE_ROUTE_PATHS.DEFAULT,
		pathMatch: "full"
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			onSameUrlNavigation: "reload",
			relativeLinkResolution: "corrected"
		})
	],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
