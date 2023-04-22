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
  
  findByIde(ide: number): Observable<DailyAttributes> {
    return this.httpClient.get<DailyAttributes>(`${this.pathApi}/diaries/${ide}`);
  }

  /**
   * Guardar o actualizar un registro, cuando el ide es null se crea un nuevo registro y si no se actualiza
   * @param model
   * @param ide : number | null : cuando es null se crea un nuevo registro
   * @returns 
   */
  updateOrNew( model: DailyAttributes, ide?: number):  Observable<DailyAttributes>{

    if (ide) {
      return this.httpClient.put<DailyAttributes>(`${this.pathApi}/diaries/${ide}`, model);

    }else   return this.httpClient.post<DailyAttributes>(`${this.pathApi}/diaries`, model);


  }

  delete(ide: number):  Observable<void>{
    return this.httpClient.delete<void>(`${this.pathApi}/diaries/${ide}`);
  }

  sumTotalPrice(): Observable<number>{
    return this.httpClient.get<number>(`${this.pathApi}/diaries/sumTotalPrice`);
  }
}
