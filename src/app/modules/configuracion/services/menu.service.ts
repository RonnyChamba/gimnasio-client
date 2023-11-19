import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  pathApi = environment._APIUrl;
  constructor(private httpCliente: HttpClient) {
  }

  
  save(modality: any, ide?: any): Observable<any> {

    if (ide) {
      return this.httpCliente.put<any>(`${this.pathApi}/configuration/menus/${ide}`, modality);
    }

    return this.httpCliente.post<any>(`${this.pathApi}/configuration/menus`, modality);
  }


  getAll(): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/configuration/menus`);
  }

  getById(id: number): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/configuration/menus/${id}`);
  }

  
}
