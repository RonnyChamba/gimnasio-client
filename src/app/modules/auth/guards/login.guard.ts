import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';
import { URL_INICIO } from 'src/app/utils/constants-url-path';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.tokenService.isLogged()) {
      this.router.navigate([URL_INICIO]);
      return false;
    }
    return true;
  }
}
