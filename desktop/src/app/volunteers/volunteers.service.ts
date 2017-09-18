import {Inject, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

export interface Volunteer {
  _id: string,
  first: string,
  last: string,
  dob: string,
  email: string
}

@Injectable()
export class VolunteersService {

  users: Volunteer[];

  constructor(private http: Http) {}
  /*environment.api + '/api/web/volunteer/list'*/
  getVolunteers(): void {
    console.log('getVolunteers called');
    this.http.get('http://architechs.us/api/web/volunteer/list')
      .toPromise()
      .then((res) => {
        console.log(res);
        this.users = res.json();
        console.log(this.users);
      })
  }

  findOne(id: string): Volunteer {
    if (this.users === null) {
      this.getVolunteers();
    }

    for (const user of this.users) {
      if (user._id === id) {
        return user;
      }
    }

    return null;
  }
}
