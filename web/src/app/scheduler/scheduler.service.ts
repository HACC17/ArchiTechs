import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { GoogleApiService } from '../google-api.service';

declare const gapi: any;

@Injectable()
export class SchedulerService {

  user: any;
  calendar: any;
  now: any;
  trainingsOfMonth: any;
  filteredTrainings: any;

  constructor(private http: Http, private gapis: GoogleApiService) {
    this.user = {};
    // So that we don't get undefined error before api call fills it in.
    this.user.training = {};

    this.now = moment();

    this.trainingsOfMonth = [
      {role: 'control', year: 2017, month: 8, date: 1, time: '10a - 2p'},
      {role: 'counting', year: 2017, month: 8, date: 5, time: '9a - 3p'}
    ];

    this.getGoogleEventsList();
  }

  filterTrainings(roles = null): void {
    this.filteredTrainings = this.trainingsOfMonth.filter((element) => {
      // Boolean that tests whether the element meets the requirements to not get filtered out.
      const result = (element.year === this.now.year()) &&
        // Months is 0 indexed in moment.
        (element.month === this.now.month());

      // Now filter by roles, if specified.
      if (roles) {
        for (const role in roles) {
          if (roles.hasOwnProperty(role)) {
            if (element.role === roles[role]) {
              return true;
            }
          }
        }
        return false;
      }

      return result;
    });
  }

  makeCalendar(): Object[] {
    // Inspired by https://stackoverflow.com/a/39803848.
    const calendar = [];
    const startWeek = this.now.startOf('month').week();
    const endWeek = this.now.endOf('month').week();

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
          const day = moment().week(week).startOf('week').clone().add(n + i, 'day');
          const trainingsOfDay = [];

          for (const session of this.filteredTrainings) {
            if (session.month === day.month() && session.date === day.date()) {
              trainingsOfDay.push(session);
            }
          }
          return {day: day, trainingsOfDay: trainingsOfDay};
        })
      })
    }

    this.calendar = calendar;
    return calendar;
  }

  getUser(): Promise<Object> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http.post('/api/web/data/get', user)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
  }

  // Takes the new training schedule and updates it on the database with the user.
  updateUserTraining(training): void {
    this.user.training = training;

    const token = JSON.parse(localStorage.getItem('user')).token;
    const body = {token: token, training: training};
    console.log(body);
    this.http.post('/api/web/data/update-training', body)
      .toPromise()
      .then((res) => {
        return;
      })
  }

  getGoogleEventsList(): void {
    this.gapis.onInitialize(() => {
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if (isSignedIn) {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then((res) => {
          console.log(res.result.items);
        })
      }
    })
  }
}
