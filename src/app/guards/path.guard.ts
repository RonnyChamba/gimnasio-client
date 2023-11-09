import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../modules/auth/service/token.service';
import { URL_BASE_AUTH, URL_CLIENTES } from '../utils/constants-url-path';

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
    // console.log(expectedRol);

    // Verificar si hay token
    if (!this.tokenService.isLogged()) {
      this.router.navigate([URL_BASE_AUTH]);
      // // console.log("dentro del aqui")
      return false;
    }

   
    // verifico si un cliente el que esta logeado
    if (this.tokenService.isCliente()) {
      // este nombre cliente se pasa en lo guard, debe llamarse asi tal cual
      this.realRol = 'cliente';
    } else {
      this.realRol = this.tokenService.isAdmin() ? 'admin' : 'user';
    }

    // console.log(this.realRol);
    // console.log(this.tokenService.isLogged())
    // console.log(expectedRol.indexOf(this.realRol))
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) === -1) {

      // console.log("Rol recibido: " + this.realRol);

      // Si es un cliente y quiso acceder alla lo redjo
      if (this.realRol == 'cliente') {
        this.router.navigate([URL_CLIENTES, this.tokenService.getIdPersona()]);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }
    return true;
  }


}
