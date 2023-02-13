import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSrvService implements OnInit {
  private roles: Map<String, String> = new Map<String, String>;

  constructor() {
    // Por el ciclo de vida del componente debe iniciliazer aqui los roles
    this.initRoles();
  }
  ngOnInit(): void {
    

  }

  get getRoles() {
    return this.roles;
  }
  private initRoles() {
    this.roles.set(Roles.ROLE_USER, 'USER');
    this.roles.set(Roles.ROLE_ADMIN, 'ADMIN');
  }
}


export enum Roles {

  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}