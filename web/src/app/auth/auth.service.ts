import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GoogleAuthService } from 'ng-gapi';

@Injectable()
export class AuthService {

  tempEmail: string;

  constructor(private http: Http, private googleAuth: GoogleAuthService) {
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
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        if (auth.isSignedIn) {
          return;
        }

        auth.signIn().then((res) => {
          console.log(auth.currentUser.get().getBasicProfile());
          localStorage.setItem('googleUser', res.getAuthResponse().access_token);
        });
      });
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
