import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SchedulerService {

  constructor(private http: Http) { }

  getData(): Promise<Object> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('/api/web/data/get', user)
      .toPromise()
      .then((res: Response) => {
        return res.json();
      })
  }
}
