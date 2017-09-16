import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {

  user: any;
  position: any;

  constructor(private http: Http) {
    this.user = {};
  }

  getUser(): Promise<Object> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('/api/web/volunteer/get', user)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();

        this.getPosition();
        return this.user;
      });
  }

  updateUser(): void {
    const modifiedUser = this.user;
    modifiedUser.position = this.position;
    const body = {
      user: modifiedUser,
      token: JSON.parse(localStorage.getItem('user')).token
    }

    this.http.post('/api/web/volunteer/update', body)
      .toPromise()
      .then((res) => {
        console.log(res);
      });
  }

  getTraining(): string {
    if (this.user.training) {
      return this.user.training.date;
    }

    return '';
  }

  getPosition(): void {
    this.http.post('/api/web/position/get', this.user.position)
      .toPromise()
      .then((res) => {
        if (res) {
          this.position = res.json();
        }
      });
  }

  getWork(): string {
    if (this.user.work) {
      return this.user.work.address;
    }

    return '';
  }

  // Takes the new training schedule and updates it on the database with the user.
  // updateUserTraining(training): void {
  //   this.user.training = training;
  //   this.dateString = new Date(this.user.training.date).toDateString();
  //
  //   const token = JSON.parse(localStorage.getItem('user')).token;
  //   const body = {token: token, training: training};
  //   this.http.post('/api/web/data/update-training', body)
  //     .toPromise()
  //     .then((res) => {
  //       return;
  //     })
  // }

}
