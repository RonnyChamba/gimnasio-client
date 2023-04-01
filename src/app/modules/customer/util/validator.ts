import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { typeFilterField, typeOpeFormCustomer } from 'src/app/utils/types';
import { CustomerService } from '../services/customer.service';
import { TypeOperationFormInsCustomer } from 'src/app/utils/utilForm';

import * as dayjs from "dayjs";
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

/**
 * 
 * @param customerService : Servicio para consultas http
 * @param type : EMAIL | DNI | NAME
 * @param ide : Determinar si la busqueda  se realiza sobre todos los elementos o sobre todos pero exento el registro
 * que tenga el ide
 * @returns 
 */
// authService se pasa como parámetro al async validator
export function dniOrEmailValidator(
  customerService: CustomerService,
  type: typeFilterField,
  ide?: number
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let field = control.value as string;

    // type input or field y ademas solo si el usuario interactua con el control se realizen las validaciones
    if (field && (control.touched || control.dirty)) {
      if (type == 'DNI' && field.length == 10) {

        return customerService.verifyIsExistCustomer(field, type, ide)
          .pipe(
            map((value) => value ? { fieldExists: 'Cédula ya esta registrada' } : null)
          );

      }

      if (type == 'EMAIL' && field.length >= 6) {

        return customerService.verifyIsExistCustomer(field, type, ide)
          .pipe(
            map((value) => value ? { fieldExists: 'Email ya esta registrado' } : null)
          );

      }
    }
    // Devuelve un Observable que emite el valor null
    return of(null);

  };
}


export function validDateBegin(
  customerService: CustomerService,
  typeOperation: TypeOperationFormInsCustomer,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    // let field = control.value as string;

    //  solo si el usuario interactua con el control se realizen las validaciones
    if (control.value && (control.touched || control.dirty)) {

      // para nuevo cliente, no realia validación de la fecha inicio de inscripcion
      if (typeOperation.type == "newCliente") return of(null);

      // Cargar modulo previamennte antes de utilizar
      dayjs.extend(isSameOrAfter);

      // Para nueva inscripcion de un cliente y para actualizar una inscripcion
      if (typeOperation.type == "newInscription" || typeOperation.type == "updateInscription") {

        return customerService.getLasDateBeginInscrition(typeOperation.ideCustomer as number)
          .pipe(

            // Retorna mapa: vacio o con una propiedad nombrada maxima 
            map((respDateStr) => {


              if (!respDateStr) return of(null);

              // console.log(respDateStr.maxima)

              let dateBorn = dayjs(control.value);
              let lastDate = dayjs(respDateStr?.maxima);

              if (lastDate.isValid() && dateBorn.isValid()) {

                // Determinar que funcion de date se utilizar para comparar
                let resp = typeOperation.type == "newInscription" ?
                  dateBorn.isAfter(lastDate, "day") :
                  dateBorn.isSameOrAfter(lastDate, 'day');


                return (!resp ? { errorDateBegin: `Fecha seleccionada debe ser ${typeOperation.type == "newInscription" ? 'superior' : 'igual o superior'}  superior a su última fecha de inscripción (${dayjs(lastDate).format('DD-MM-YYYY')} )` } : null)
              } else return of(null);
            }
            ))
      }

    }
    // Devuelve un Observable que emite el valor null
    return of(null);

  };
}
