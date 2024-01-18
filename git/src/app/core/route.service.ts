import { Routes } from "@angular/router";
import { ShellComponent } from "@app/shell/shell.component";
import { AuthenticationGuard } from "@app/core/authentication/authentication.guard";
import { AMAZE_ROUTE_PATHS } from "@app/shell/shell.constants";

/**
 * Provides helper methods to create routes.
 */
export class Route {
	/**
	 * Creates routes using the shell component and authentication.
	 * @param routes The routes to add.
	 * @return {Routes} The new routes using shell as the base.
	 */
	static withShell(routes: Routes): Routes {
		return [
			{
				path: AMAZE_ROUTE_PATHS.DEFAULT,
				component: ShellComponent,
				children: routes,
				canActivate: [AuthenticationGuard],
				data: { reuse: true }
			}
		];
	}
}
