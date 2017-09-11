import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { GoogleApiService } from '../google-api.service';

declare const gapi: any;

@Injectable()
export class SchedulerService {

  // user: any;
  calendar: any;
  now: any;
  trainingsOfMonth: any;
  filteredTrainings: any;

  constructor(private http: Http, private gapis: GoogleApiService) {
    // this.user = {};
    // So that we don't get undefined error before api call fills it in.
    // this.user.training = {};

    this.now = moment();

    this.trainingsOfMonth = [
      {role: 'control', date: new Date('09-01-2017'), time: '10a - 2p'},
      {role: 'counting', date: new Date('09-05-2017'), time: '9a - 3p'}
    ];

    this.getGoogleEventsList();
  }

  filterTrainings(roles = null): void {
    this.filteredTrainings = this.trainingsOfMonth.filter((element) => {
      // Boolean that tests whether the element meets the requirements to not get filtered out.
      const result = (element.date.getFullYear() === this.now.year()) &&
        // Months is 0 indexed in moment.
        (element.date.getMonth() === this.now.month());

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
    let endWeek = this.now.endOf('month').week();

    // December is an exception: manually set endWeek to 52 otherwise it will set it to 1.
    if (this.now.month() === 11) {
      endWeek = 52;
    }

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
          const day = moment().week(week).startOf('week').clone().add(n + i, 'day');
          const trainingsOfDay = [];

          for (const training of this.filteredTrainings) {
            if (training.date.getMonth() === day.month() && training.date.getDate() === day.date()) {
              trainingsOfDay.push(training);
            }
          }
          return {day: day, trainingsOfDay: trainingsOfDay};
        })
      })
    }

    this.calendar = calendar;
    return calendar;
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
