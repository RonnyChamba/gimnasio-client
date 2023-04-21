import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseAttributes, ExerciseFetch } from 'src/app/core/models/exercise.model';
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

  findAll(page: number, size: number): Observable<any>{
    return this.httpClient.get<any>(`${this.pathApi}/exercises` , {
      params: {
        page,
        size
      }
    });
  }

  findById(id: number): Observable<ExerciseFetch>{
    return this.httpClient.get<ExerciseFetch>(`${this.pathApi}/exercises/${id}`);
  }

  update(id: number, model: FormData): Observable<any>{
    return this.httpClient.put<any>(`${this.pathApi}/exercises/${id}`,model);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.pathApi}/exercises/${id}`);
  }
  
  


}
