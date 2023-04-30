import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // public refresh = new Subject<void>();

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

    // this.refresh.next();
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() != null;
  }


  private getValuesPayload() {
    
    const payload = this.getToken()!.split('.')[1];

    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values;
  }



  public getUsername(): string | null {

    if (!this.isLogged()) {
      return null;
    }

    const valuePayloadRuc = this.getValuesPayload()['sub']

    return valuePayloadRuc;
  }

  public isAdmin(): boolean {

    if (!this.isLogged()) {
      return false;
    }
    const roles = [...this.getValuesPayload()['authorities']];
    return roles.find(autho => autho.authority == 'ROLE_ADMIN')

  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/auth']);

    // this.refresh.next();

  }
}
