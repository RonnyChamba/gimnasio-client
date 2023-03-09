import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { CustomerFull } from 'src/app/core/models/customer-full';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  pathApi = environment._APIUrl;
  
  constructor(private httpClient: HttpClient ) {

   }

   save(customerFull: CustomerFull): Observable<any>{
    
    return this.httpClient.post(`${this.pathApi}/customers`, customerFull);
   }

   findByDni(dni: string): Observable<any>{


    return this.httpClient.get(`${this.pathApi}/customers/filter`, {
      params : {
        dni, 
      }
    });
   }

   /**
    * 
    * @param field value 
    * @param type  dni or email
    * @returns 
    */
   filterByDniOrEmail(field: string, type: string): Observable<any>{

    return this.httpClient.get(`${this.pathApi}/customers/filter`, {
      params : {
        field,
        type 
      }
    });
   }


   isAlreadyExistingDni(dni: string): Observable<boolean> {
    
    const data = false;


  

    const fakeExistingEmails = ['1723774640', '1234567890'];

    return of(fakeExistingEmails).pipe(
      // Simulamos un retraso de la respuesta de nuestra supuesta API
      delay(2500),
      map((emails: string[]) => emails.includes(dni))
    );
  }

}
