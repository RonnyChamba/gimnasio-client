import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  
  // MENSAJES //

  public loading(activo: boolean) {
    if (activo) {
      Swal.fire({
        title: 'Espere',
        text: 'Procesando Información',
        icon: 'info',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    } else {
      Swal.close();
    }
  }

  public loadingForm(activo: boolean) {
    if (activo) {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Preparando Formulario',
        icon: 'info',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    } else {
      Swal.close();
    }
  }

  public mensajeErrorLogout(mensaje: string) {
    Swal.close();
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
