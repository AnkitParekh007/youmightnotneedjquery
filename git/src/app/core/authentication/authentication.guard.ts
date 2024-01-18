import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CredentialsService } from "./credentials.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private router: Router, private credentialsService: CredentialsService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.credentialsService.isAuthenticated()) {
			return true;
		}
		this.router.navigate(["/login"], {
			queryParams: { redirect: state.url },
			replaceUrl: true
		});
		return false;
	}
}
