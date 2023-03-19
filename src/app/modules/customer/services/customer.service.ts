import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { CustomerFull } from 'src/app/core/models/customer-full';
import { Customer } from 'src/app/core/models/customer-model';
import { paramsPaginator } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) {}

  save(customerFull: CustomerFull): Observable<any> {
    return this.httpClient.post(`${this.pathApi}/customers`, customerFull);
  }

  findAll ( paramPage: paramsPaginator): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/customers`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch:paramPage.valueSearch as string,
        typeFilter: paramPage.typeFilter
      }
    });
  }
  
  
  // findByDni(dni: string): Observable<any> {
  //   return this.httpClient.get(`${this.pathApi}/customers/filter`, {
  //     params: {
  //       dni,
  //     },
  //   });
  // }

  /**
   *
   * @param valueField  value
   * @param type  : type field by search
   * @returns
   */
  verifyIsExistCustomer(valueField: string, type: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.pathApi}/customers/isExist`, {
      params: {
        valueField,
        type,
      },
    });
  }

}
