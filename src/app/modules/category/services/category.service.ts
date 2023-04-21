import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryAttribute } from 'src/app/core/models/category.model';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

  save(model: CategoryAttribute): Observable<any>{

    return this.httpClient.post(`${this.pathApi}/categories`, model);
 
   }

   findAll(paramPage: PaginatorDiary): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/categories`, {
      params: {
        page: paramPage.page,
        size: paramPage.size,
        valueSearch: paramPage.valueSearch || ""
      },
    });
  }

  findAllSingle(): Observable<any> {
    return this.httpClient.get(`${this.pathApi}/categories/single`);
  }

  findByIde(ide: number): Observable<CategoryAttribute> {
    return this.httpClient.get<CategoryAttribute>(`${this.pathApi}/categories/${ide}`);
  }

  update( ide: number, model: CategoryAttribute): Observable<any>{

    return this.httpClient.put(`${this.pathApi}/categories/${ide}`, model);
 
   }
   
   delete( ide: number): Observable<any>{

    return this.httpClient.delete(`${this.pathApi}/categories/${ide}`);
 
   }
  

}
