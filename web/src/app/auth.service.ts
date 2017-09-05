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

  // Check if account with email exists in database.
  hasAccount(email: string): Promise<Boolean> {
    const body = {email: email};
    return this.http.post('/api/web/sign-in', body)
      .toPromise()
      .then((res: Response) => {
        return res.json().hasAccount;
      })
  }

  // Authenticates user credential and retrieves the jwt token.
  login(credential: Object): Promise<Boolean> {
    return this.http.post('/api/web/sign-in/login', credential)
      .toPromise()
      .then((res) => {
        // Logical operator AND: if both arguments are true, take the second arguments value;
        //  if first argument is false, then take the first argument's value.
        const token = res.json() && res.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('user', JSON.stringify({token: token}));

          // Indicate that the login was successful
          return true;
        } else {
          return false;
        }
      });
  }

  // For SignInGuardService.
  canActivateSignIn(): boolean {
    console.log(this.tempEmail);
    return !(this.tempEmail === null || this.tempEmail === '');
  }

}
