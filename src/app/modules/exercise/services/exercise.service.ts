import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

  save(model: FormData): Observable<any>{


    return this.httpClient.post<any>(`${this.pathApi}/exercises`,model);
  }

}
