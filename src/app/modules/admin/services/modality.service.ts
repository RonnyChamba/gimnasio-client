import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {

  pathApi = environment._APIUrl;
  constructor(private httpCliente: HttpClient) {
  }


  saveModality(modality: any): Observable<any> {
    return this.httpCliente.post<any>(`${this.pathApi}/modalities`, modality);
  }


  getModalities(): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/modalities/fetch`);
  }

  getModalitiesByStatus(status: string): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/modalities/fetchByStatus`, {
      params: {
        status
      }
    });
  }

  existModality(name: string, ide: string): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/modalities/isExist`, {
      params: {
        name,
        ide
      }
    });
  }

  findModalityById(id: number): Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/modalities/${id}`);
  }

  updateModality(modality: any, ide: number): Observable<any> {
    return this.httpCliente.put<any>(`${this.pathApi}/modalities/${ide}`, modality);
  }


  deleteModality(ide: number): Observable<any> {
    return this.httpCliente.delete<any>(`${this.pathApi}/modalities/${ide}`);
  }
}
