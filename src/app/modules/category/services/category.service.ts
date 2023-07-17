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

  persistCategory( ide: number, model: CategoryAttribute): Observable<any>{

    if (ide && ide>0){
      return this.httpClient.put(`${this.pathApi}/categories/${ide}`, model);
    }

    return this.httpClient.post(`${this.pathApi}/categories`, model);

    
 
   }
   
   delete( ide: number): Observable<any>{

    return this.httpClient.delete(`${this.pathApi}/categories/${ide}`);
 
   }

   existsByName(name: string, ide: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.pathApi}/categories/isExists`,
    
    {
      params: {
        name: name,
        ide: ide ? ide.toString() : "0",

        isNewOrUpdate: ide ? "false" : "true" // new is true, update is false
      }
    }
    
    );

   }
  

}
