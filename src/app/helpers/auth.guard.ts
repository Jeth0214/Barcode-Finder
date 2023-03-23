import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }


  canActivate() {
    let currentUser = this.authenticationService.currentUserValue;
    let token = this.authenticationService.tokenValue;
    //console.log('user from auth guard', currentUser);
    if (!currentUser && !token) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
