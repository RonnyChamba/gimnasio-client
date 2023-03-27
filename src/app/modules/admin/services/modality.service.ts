import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modality } from 'src/app/core/models/modality-model';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {

  pathApi = environment._APIUrl;
  constructor(private httpCliente: HttpClient) {
  }

  getModalities() : Observable<any> {

    return this.httpCliente.get<any>(`${this.pathApi}/modalities`);
  }

}
