import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { GoogleApiService } from '../google-api.service';

declare const gapi: any;

@Injectable()
export class SchedulerService {

  calendar: any;
  now: any;
  positions: any;
  trainings: any;
  filteredTrainings: any;
  googleEvents: any;

  constructor(private http: Http, private gapis: GoogleApiService) {
    this.now = moment();

    this.getPositions();
    // this.trainings = [
    //   {role: 'control', date: new Date('09-16-2017'), time: '10a - 2p'},
    //   {role: 'counting', date: new Date('09-05-2017'), time: '9a - 3p'}
    // ];
    // this.getGoogleEventsList();
  }

  getTrainings(): void {
    this.http.get('/api/web/training/list')
      .toPromise()
      .then((res) => {
        this.trainings = res.json();

        this.filterTrainings();
        this.makeCalendar();
      });
  }

  getPositions(): void {
    this.http.get('/api/web/position/list')
      .toPromise()
      .then((res) => {
        this.positions = res.json();
        console.log(this.positions);
      });
  }

  filterTrainings(roles = null): void {
    this.filteredTrainings = this.trainings.filter((element) => {
      // Boolean that tests whether the element meets the requirements to not get filtered out.
      const date = new Date(element.date);
      const result = (date.getFullYear() === this.now.year()) &&
        // Months is 0 indexed in moment.
        (date.getMonth() === this.now.month());

      // Now filter by roles, if specified.
      if (roles) {
        for (const role in roles) {
          if (roles.hasOwnProperty(role)) {
            if (element.positionName === roles[role]) {
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
      calendar.push(
        Array(7).fill(0).map((n, i) => {
          const day = moment().week(week).startOf('week').clone().add(n + i, 'day');
          const trainings = [];

          for (const training of this.filteredTrainings) {
            const date = new Date(training.date);
            if (date.getMonth() === day.month() && date.getDate() === day.date()) {
              trainings.push(training);
            }
          }
          return {day: day, trainings: trainings};
        })
      );
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
          this.googleEvents = res.result.items;
        })
      }
    });
  }

  // Compares filtered training dates with google events and returns the first non-matching day.
  findBestDate(): Object {
    for (const training of this.filteredTrainings) {
      let match = true;
      for (const event of this.googleEvents) {
        if (new Date(event.start.date) <= training.date && training.date <= new Date(event.end.date)) {
          match = false;
        }
      }

      if (match) {
        return training;
      }
    }

    return null;
  }

}
