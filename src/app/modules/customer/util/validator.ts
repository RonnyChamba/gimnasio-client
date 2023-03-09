import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from '../services/customer.service';

// authService se pasa como parámetro al async validator
export function dniOrEmailValidator(
  customerService: CustomerService,
  type: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let field = control.value as string;

    // type input or field
    if (field) {
      if (type == 'DNI' && field.length == 10) {
        return customerService

          .filterByDniOrEmail(field, type)
          .pipe(
            map((isExisting) =>
              isExisting ? { fieldExists: 'Cédula ya esta registrada' } : null
            )
          );
      }

      if (type == 'EMAIL' && field.length >= 6) {
        return customerService

          .filterByDniOrEmail(field, type)
          .pipe(
            map((isExisting) =>
              isExisting ? { fieldExists: 'Email ya esta registrado' } : null
            )
          );
      }
    }

    return new Observable<ValidationErrors | null>();

    //    observable.pipe(map((value) => null));
    //   return observable;
  };
}