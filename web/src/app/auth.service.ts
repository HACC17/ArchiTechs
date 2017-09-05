import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  hasAccount(email: string): Promise<Response> {
    const body = {email: email};
    return this.http.post('/api/web/sign-in', body).toPromise();
  }
}
