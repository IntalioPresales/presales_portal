import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Globals } from './Globals';
import { AuthServiceService } from './Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private globals: Globals,
    private myRoute: Router, private auth: AuthServiceService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // ----------------------------
    // @ UNCOMMENT ON LOCALHOST (@HASAN)
    // ----------------------------
    if (this.globals.isLoggedIn) {
    // if (this.globals.isLoggedIn && this.auth.authenticated) {

      if (this.globals.currentusertype == "admin" && (state.url == "/navigatepresales" || state.url == "/main" || state.url == "/viewwondata" || state.url == "/viewsubmitteddata" || state.url == "/viewactivedata" || (state.url == "/main" && this.globals.currentuser.firstname == 'Antoine'))) {
        return true;
      }
      else if (this.globals.currentusertype == "user" && (state.url == "/navigate" || state.url == "/main" || state.url == "/viewsubmitteddata")) {
        return true;
      }
      else if (this.globals.currentusertype == "user-cm" && (state.url == "/navigatecm" || state.url == "/viewwondata" || state.url == "/viewsubmitteddata" || state.url == "/main" || state.url == "/viewactivedata" || state.url == "/dashboard")) {
        return true;
      }
      else if (state.url == "/viewopportunity" && this.globals.opportunitydata) {
        return true;
      }
      else {
        return false;
      }
    } else {
      this.myRoute.navigate(['/']);
      return false;
    }
  }

}
