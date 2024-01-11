import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { typeFilterField } from 'src/app/utils/types';
import { UserModel } from 'src/app/core/models/person-model';
import { MENU_PADRE } from 'src/app/utils/constants-menu';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  pathApi = environment._APIUrl;

  constructor(private httpCliente: HttpClient) {
  }

  ngOnInit(): void {
  }

  verifyIsExistUser(valueField: string, 
                  type: typeFilterField,
                  typeAction : string,
                  ide: any | null): Observable<boolean> {
    return this.httpCliente.get<boolean>(`${this.pathApi}/users/isExist`,{
        params: {
          valueField,
          type,
          typeAction,
          ide: ide 
        },
      });
  }

  save(model: any, ideUser?: any) : Observable<any>{

  
    if(ideUser){
      console.log("ideUser: ", ideUser);
      console.log("model: ", model);
      return this.httpCliente.put(`${this.pathApi}/users/${ideUser}`, model);
    }

    return this.httpCliente.post(`${this.pathApi}/users`, model);

  }

  findAll() : Observable<any>{
    return this.httpCliente.get<any>(`${this.pathApi}/users`);
  }

  findByIde(ideUser: string) : Observable<any>{
    return this.httpCliente.get<any>(`${this.pathApi}/users/${ideUser}`);
  }

  updateStatus(ide: number, statusCurrent: boolean) : Observable<any>{

  
    // si es true es para desactivar, si es false es para activar
    const path = statusCurrent ? `${this.pathApi}/users/${ide}/inactive` : `${this.pathApi}/users/${ide}/active`;

    return this.httpCliente.patch(path, {});
  }
  updateStatusDelete(ide: number) : Observable<any>{
    return this.httpCliente.put(`${this.pathApi}/users/${ide}/delete`, {});
  }

  findUserCurrent() : Observable<any>{
    return this.httpCliente.get(`${this.pathApi}/users/current`);
  }

  update(model: any) : Observable<any>{
    return this.httpCliente.put(`${this.pathApi}/users`, model);
  }

  countDataByUser(){
    return this.httpCliente.get(`${this.pathApi}/users/countDataByUser`);
  }

  findAllMenuByNemonicoPadre(nemonicoMenuPadre: string){
    return this.httpCliente.get(`${this.pathApi}/users/menus`, {
      params: {
        nemonicoMenuPadre: nemonicoMenuPadre || MENU_PADRE
      }
    })
  }

  findAllMenuByUser(ideUser: number){
    return this.httpCliente.get(`${this.pathApi}/users/menusByUser/${ideUser}`);
  }

}
