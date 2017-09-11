import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GoogleApiService } from '../google-api.service';

declare const gapi: any;

@Injectable()
export class AuthService {

  tempEmail: string;

  constructor(private http: Http, private gapis: GoogleApiService) {
    this.tempEmail = '';
  }

  // Check if account with email exists in database.
  hasAccount(email: string): Promise<Boolean> {
    const body = {email: email};
    return this.http.post('/api/web/auth', body)
      .toPromise()
      .then((res: Response) => {
        return res.json().hasAccount;
      })
  }

  // Authenticates user credential and retrieves the jwt token.
  login(credential: Object): Promise<Boolean> {
    return this.http.post('/api/web/auth/login', credential)
      .toPromise()
      .then((res) => {
        // Logical operator AND: if both arguments are true, take the second arguments value;
        //  if first argument is false, then take the first argument's value.
        const token = res.json() && res.json().token;
        if (token) {
          localStorage.setItem('user', JSON.stringify({token: token}));


          // Indicate that the login was successful
          return true;
        } else {
          return false;
        }
      });
  }

  // Prompts user with the google sign in page.
  googleLogin(): void {
    this.gapis.onInitialize(() => {
      gapi.auth2.getAuthInstance().signIn().then((res) => {
        console.log('signed in successfully');
      });
    })
  }

  logout(): void {
    // localStorage.removeItem('user');
    this.googleLogin();
  }

  // For SchedulerGuardService.
  canActivateSignIn(): boolean {
    return !(this.tempEmail === null || this.tempEmail === '');
  }

}
