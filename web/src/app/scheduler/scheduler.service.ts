import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SchedulerService {

  user: Object;

  constructor(private http: Http) {
    this.user = {};
  }

  getData(): Promise<Object> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('/api/web/data/get', user)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
  }
}
