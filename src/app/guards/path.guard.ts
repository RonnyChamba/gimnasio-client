import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../modules/auth/service/token.service';
import { URL_BASE_AUTH } from '../utils/constants-url-path';

@Injectable({
  providedIn: 'root'
})
export class PathGuard implements CanActivate {
 
  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data["expectedRol"];

    // Verificar si hay token
    if (!this.tokenService.isLogged()){
       this.router.navigate([URL_BASE_AUTH]);
      // // console.log("dentro del aqui")
      return false;  
    }


    this.realRol =  this.tokenService.isAdmin()? 'admin':'user';
    this
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
  
}
