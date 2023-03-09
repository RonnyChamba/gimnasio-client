import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modality } from 'src/app/core/models/modality-model';

@Injectable({
  providedIn: 'root'
})
export class ModalityService {

  private  URL ="http://localhost:8015/api/v1/modalities";
  constructor(private httpCliente: HttpClient) {
  }

  getModalities() : Observable<any> {

    return this.httpCliente.get<any>(this.URL);
  }

}
