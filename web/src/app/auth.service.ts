import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  tempEmail: string;
  token: string;

  constructor(private http: Http) {
    console.log('AuthService constructed.');
    this.tempEmail = '';
  }

  hasAccount(email: string): Promise<Response> {
    const body = {email: email};
    return this.http.post('/api/web/sign-in', body).toPromise();
  }

  // For SignInGuardService.
  canActivateSignIn(): boolean {
    console.log(this.tempEmail);
    return !(this.tempEmail === null || this.tempEmail === '');
  }

}
