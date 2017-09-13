import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

  user: any;
  dateString: string;

  constructor(private http: Http) {
    this.user = {};
    // So that we don't get undefined error before api call fills it in.
    this.user.training = {};
    this.dateString = '';
  }

  getUser(): Promise<Object> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('/api/web/volunteer/get', user)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        // The date property is stored to json as string, so convert it back to date object.
        // this.dateString = new Date(this.user.training.date).toDateString();
        return this.user;
      });
  }

  // getTraining(): string {
  //   if (!this.user.training) {
  //     return '';
  //   }
  //
  //   const date = new Date(this.user.training.date).toDateString;
  //   const time = this.user.training.time;
  //
  // }

  // Takes the new training schedule and updates it on the database with the user.
  updateUserTraining(training): void {
    this.user.training = training;
    this.dateString = new Date(this.user.training.date).toDateString();

    const token = JSON.parse(localStorage.getItem('user')).token;
    const body = {token: token, training: training};
    this.http.post('/api/web/data/update-training', body)
      .toPromise()
      .then((res) => {
        return;
      })
  }

}
