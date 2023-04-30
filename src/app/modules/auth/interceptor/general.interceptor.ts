import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';


const AUTH = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token as string);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) { // para refrescar el token si se desea implementar
        // const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        // return this.authService.refresh(dto).pipe(concatMap((data: any) => {
        //   console.log('refreshing....');
        //   this.tokenService.setToken(data.token);
        //   intReq = this.addToken(req, data.token);
        //   return next.handle(intReq);
        // }));

        // alert("Su sesión ha finalizado, vuelva iniciar sesión");
        // this.tokenService.logOut();
      }
      else {

        /**
         * Estos dos lineas comentadas es para manejar los errores  generales
         */
        // this.tokenService.logOut();
        // return throwError(err);


        // Dejo que la peticion pase hacia los metodos correspondientes y alla se maneja el error individualmente

      }
      return next.handle(intReq);
    }));

  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set(AUTH, BEARER + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true }];
