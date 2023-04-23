import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  Subject, tap } from 'rxjs';
import { typeChangeStatus, typeFilterField } from 'src/app/utils/types';
import { CustomerFull } from 'src/app/core/models/customer-full';
import { Customer } from 'src/app/core/models/customer-model';
import { PaginatorAttendanceAndMembresias, PaginatorCustomer} from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  pathApi = environment._APIUrl;

  private refreshUpdateTable = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

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
      `${this.pathApi}/customers/${ide}/attendances`, {});
  }

  findAll(paramPage: PaginatorCustomer): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/customers`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || "",
        startDate: paramPage.dateBegin || "",
        endDate: paramPage.dateEnd || ""
      },
    });
  }

  /*findAllAttendanceByCustomer(ide: number, filterProperties: PaginatorAttendanceAndMembresias): Observable<any> {

    return this.httpClient.get(`${this.pathApi}/customers/${ide}/attendances`, {
      params: {
        page: filterProperties.page || 0,
        size: filterProperties.size || 5,
        order: filterProperties.order || "dateInto",
        dateBegin: filterProperties.dateBegin || "",
        dateEnd: filterProperties.dateEnd || "",
        typeUser: filterProperties.typeUser
      }
    })

  } */ 
  findAllMembresiasByCustomer(ide: number, filterProperties: PaginatorAttendanceAndMembresias): Observable<any> {

    return this.httpClient.get(`${this.pathApi}/customers/${ide}/data`, {
      params: {
        page: filterProperties.page || 0,
        size: filterProperties.size || 5,
        order: filterProperties.order || "",
        dateBegin: filterProperties.dateBegin || "", // IMPORTANTE ENVIAR VACIO PARA QUE NO DE ERROR SI ESQUE ES NULL
        dateEnd: filterProperties.dateEnd || "", // // IMPORTANTE ENVIAR VACIO PARA QUE NO DE ERROR SI ESQUE ES NULL
        typeUser: filterProperties.typeUser || "",
        typePay: filterProperties.typePay || "",
        typeData: filterProperties.typeData

      }
    })

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
  verifyIsExistCustomer(valueField: string, type: typeFilterField, ide?: number): Observable<boolean> {


    return this.httpClient.get<boolean>(`${this.pathApi}/customers/isExist`, {
      params: {
        valueField,
        type,
        ide: !ide ? "null" : ide
      },
    });
  }

  findByIdeInscriptionFetch(ide: number): Observable<any> {

    return this.httpClient.get<any>(`${this.pathApi}/inscriptions/${ide}`);
  }

  getLasDateBeginInscrition(ide: number): Observable<any>{

    return this.httpClient.get(`${this.pathApi}/customers/${ide}/inscriptions/maxDateBegin`);
  }
}
