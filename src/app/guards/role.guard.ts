import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TransactionSrService } from '../services/transaction-sr.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MENU_CLIENTE } from '../utils/constants-menu';
import { TokenService } from '../modules/auth/service/token.service';

export const roleGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(TransactionSrService);
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (!route?.data?.['menuId']) {
    return true;
  }

  return new Observable<boolean>((observer) => {

    const nemonicoMenu = route.data['menuId'];

    // si accede al menu cliente y es cliente no se valida, sin embargo existe otro guard que valida 
    // si el cliente tiene acceso a la ruta
    if (tokenService.isCliente()) {
      observer.next(true);
      observer.complete();
    }else{
      authService.userHaveAccessToMenu(route.data['menuId']).subscribe({
        next: (haveAccess: any) => {
          if (!haveAccess) {
            Swal.close();
            Swal.fire({
              title: 'Permisos Insuficientes',
              text: 'No se encuentra autorizado para ejecutar esta operación',
              icon: 'info',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
            router.navigate(['']);
            observer.next(false);
          } else {
            observer.next(true);
          }
          observer.complete();
        },
      });
    }

 
  });
};
