import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseAttribute } from 'src/app/core/models/expense.model';
import { PaginatorExpense } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }


  save(model: ExpenseAttribute): Observable<any>{

   return this.httpClient.post(`${this.pathApi}/expenses`, model);

  }

  findAll(paramPage: PaginatorExpense): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/expenses`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || "",
        startDate: paramPage.dateBegin || "",
        endDate: paramPage.dateEnd || "",
        typeUser: paramPage.typeUser,
        typePay: paramPage.typePay  || "",
        type: paramPage.type  || ""
      },
    });
  }
  findByIde(ide: number): Observable<ExpenseAttribute> {
    return this.httpClient.get<ExpenseAttribute>(`${this.pathApi}/expenses/${ide}`);
  }

  sumTotalPrice(): Observable<number>{
    return this.httpClient.get<number>(`${this.pathApi}/expenses/sumTotalPrice`);
  }

  
  update( ide: number, model: ExpenseAttribute): Observable<any>{

    return this.httpClient.put(`${this.pathApi}/expenses/${ide}`, model);
 
   }

   delete( ide: number): Observable<any>{

    return this.httpClient.delete(`${this.pathApi}/expenses/${ide}`);
 
   }
   
}
