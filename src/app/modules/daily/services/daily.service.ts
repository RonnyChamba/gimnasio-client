import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyAttributes } from 'src/app/core/models/daily.model';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyService implements OnInit  {

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {
   
  }

  save(model: DailyAttributes): Observable<DailyAttributes>{

    return this.httpClient.post<DailyAttributes>(`${this.pathApi}/diaries`, model);

  }
  findAll(paramPage: PaginatorDiary): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/diaries`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || "",
        startDate: paramPage.dateBegin || "",
        endDate: paramPage.dateEnd || "",
        typeUser: paramPage.typeUser,
        typePay: paramPage.typePay  || ""
      },
    });
  }
  findByIde(ide: number): Observable<DailyAttributes> {
    return this.httpClient.get<DailyAttributes>(`${this.pathApi}/diaries/${ide}`);
  }

  update(ide: number, model: DailyAttributes):  Observable<DailyAttributes>{


    return this.httpClient.put<DailyAttributes>(`${this.pathApi}/diaries/${ide}`, model);


  }

  delete(ide: number):  Observable<void>{
    return this.httpClient.delete<void>(`${this.pathApi}/diaries/${ide}`);
  }

  sumTotalPrice(): Observable<number>{
    return this.httpClient.get<number>(`${this.pathApi}/diaries/sumTotalPrice`);
  }
}
