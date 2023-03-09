
/**
 * Archivo de validadores personales generales
 */
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import * as dayjs from "dayjs";
import { validCedula } from "../valid-cedula";

 export function validaDateBorn(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let dateBorn = dayjs(control.value);

      if (dateBorn.isValid()) {
        let dateToday = dayjs();

        if (dateBorn.isSameOrAfter(dateToday, 'day')) {
          return {
            erroBorn: 'Fecha nacimiento no puede ser igual o superior a hoy',
          };
        }

        let yearDifferent = dateToday.diff(dateBorn, 'year'); //

        if (yearDifferent < 5) {
          return { erroBorn: 'Cliente debe tener almenos 5 años' };
        }

        // console.log("Diferencia de años:  "  + yearDifferent);
        return null;
      }
      return null;
    };
  }

  export function validatorDni(): ValidatorFn {
    return (dni: AbstractControl): ValidationErrors | null => {
    

      if (dni.value && dni.value.match("^[0-9]{10}$") ) {
        let  {status, message} =  validCedula(dni.value)

        if (!status) {
          return {'incorrectDni' : message }
        }
      }
      
      return null;
    };
  }