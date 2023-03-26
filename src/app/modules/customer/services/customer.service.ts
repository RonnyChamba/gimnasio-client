import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { typeChangeStatus, typeFilterField } from 'src/app/core/interfaces/types';
import { CustomerFull } from 'src/app/core/models/customer-full';
import { Customer } from 'src/app/core/models/customer-model';
import { paramsPaginator } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  pathApi = environment._APIUrl;

  private refreshUpdateTable = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  getRefreshUpdateTableObservable(): Observable<void> {
    return this.refreshUpdateTable.asObservable();
  }

  save(customerFull: CustomerFull): Observable<any> {
    return this.httpClient.post(`${this.pathApi}/customers`, customerFull);
  }

  saveNewInscription(ide: number, customerFull: CustomerFull): Observable<any> {
    return this.httpClient.post(
      `${this.pathApi}/customers/${ide}/inscriptions`,
      customerFull
    );
  }

  saveAttendance(ide: number): Observable<any> {
    return this.httpClient.post(
      `${this.pathApi}/customers/${ide}/attendances`,{});
  }

  findAll(paramPage: paramsPaginator): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/customers`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || "",
        dateFilter: paramPage.dateFilter || ""
      },
    });
  }

  update(ide: number, customer: Customer): Observable<any> {

    // console.log(ide, customer)
    return this.httpClient.put(`${this.pathApi}/customers/${ide}`, customer);
  }



  updateStatus(ide: number, typeStatus: typeChangeStatus): Observable<any> {

    // console.log(ide, customer)
    return this.httpClient.patch(`${this.pathApi}/customers/${ide}/status`, typeStatus);
  }

  delete(ide: number): Observable<any> {
    return this.httpClient
      .delete(`${this.pathApi}/customers/${ide}`)
      .pipe(tap(() => this.refreshUpdateTable.next()));
  }

  /**
   * Getting an customer with last inscription( incluide modality, transaction, evolution) 
   */
  findByIdeFetch(ide: number): Observable<any> {
    return this.httpClient.get<any>(`${this.pathApi}/customers/${ide}/fetch`);
  }


  findByIde(ide: number): Observable<any> {
    return this.httpClient.get<any>(`${this.pathApi}/customers/${ide}`);
  }

  /**
   *
   * @param valueField  value
   * @param type  : type field by search
   * @returns
   */
  verifyIsExistCustomer(valueField: string, type:  typeFilterField, ide?: number): Observable<boolean> {
    

    return this.httpClient.get<boolean>(`${this.pathApi}/customers/isExist`, {
      params: {
        valueField,
        type,
        ide: !ide? "null": ide
      },
    });
  }
}
