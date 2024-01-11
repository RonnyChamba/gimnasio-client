import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InscriptionModel } from '../core/models/inscription-model';
import { AttendanceAttributes } from '../core/models/attendance.model';
import { PaginatorDiary } from '../core/models/page-render.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionSrService implements OnInit, OnDestroy {


  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
  }

  updateInscription(ide: number, newData: InscriptionModel): Observable<any>{
    
    return this.httpClient.put(`${this.pathApi}/inscriptions/${ide}`, newData);

  }

  updateDateLeaveAttendance(ide: number, dateLeave: string): Observable<AttendanceAttributes>{
  
    return  this.httpClient.patch(`${this.pathApi}/attendances/${ide}`,  {
      dateLeave: dateLeave
    })
  }

  deleteAttendance(ide: number): Observable<any>{

    return this.httpClient.delete(`${this.pathApi}/attendances/${ide}`);
  }

  findAll(paramPage: PaginatorDiary): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/transactions/data`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || "",
        dateBegin: paramPage.dateBegin || "",
        dateEnd: paramPage.dateEnd || "",
        typeUser: paramPage.typeUser,
        typePay: paramPage.typePay  || "",
        type: paramPage.type  || "",
        typeData: paramPage.typeData
      },
    });
  }

  deleteInscription(ide: number): Observable<any> {
    
    return this.httpClient.delete(`${this.pathApi}/inscriptions/${ide}`);
  }

  userHaveAccessToMenu(nemonicoMenu: string){
    return this.httpClient.get(`${this.pathApi}/users/haveAccessToMenu`,{
      params: {
        nemonicoMenu
      }
    } ) as any;
  }

  updateBusinessInformation(request: any): Observable<any> {
    return this.httpClient.put(`${this.pathApi}/users/businessInformation`,request );
  }

  getBusinessInformation(): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/users/businessInformation`);
  }
}
