import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InscriptionModel } from '../core/models/inscription-model';

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

}