import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialUser } from 'src/app/core/models/login-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

   onLogin(credential: CredentialUser): Observable<any> {
    return this.httpClient.post<any>(`${this.pathApi}/auth/login`, credential);
  }

}
