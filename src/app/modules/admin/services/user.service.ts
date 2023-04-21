import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { typeFilterField } from 'src/app/utils/types';
import { UserModel } from 'src/app/core/models/person-model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  pathApi = environment._APIUrl;

  constructor(private httpCliente: HttpClient) {
  }

  ngOnInit(): void {
  }

  verifyIsExistUser(valueField: string, type: typeFilterField): Observable<boolean> {
    return this.httpCliente.get<boolean>(`${this.pathApi}/users/isExist`,{
        params: {
          valueField,
          type,
        },
      });
  }

  save(model: UserModel) : Observable<any>{
    return this.httpCliente.post(`${this.pathApi}/users`, model);

  }

  findAll() : Observable<any>{
    return this.httpCliente.get<any>(`${this.pathApi}/users`);
  }

  updateStatus(ide: number) : Observable<any>{
    return this.httpCliente.patch(`${this.pathApi}/users/${ide}/status`, {});
  }

}
