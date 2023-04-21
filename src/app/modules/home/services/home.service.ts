import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

  countRegister(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.pathApi}/home/count`);
  }

}
