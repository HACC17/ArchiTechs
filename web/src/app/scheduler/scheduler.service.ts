import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';

@Injectable()
export class SchedulerService {


  user: Object;
  trainingsOfMonth: any;

  constructor(private http: Http) {
    this.user = {};
    this.trainingsOfMonth = [
      {month: 9, date: 1, time: '10:00 AM - 2:00 PM'},
      {month: 9, date: 2, time: '9:00 AM - 3:00 PM'}
    ];
  }

  makeCalendar(): Object[] {
    // Inspired by https://stackoverflow.com/a/39803848.
    const calendar = [];
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
          const day = moment().week(week).startOf('week').clone().add(n + i, 'day');
          const trainingsOfDay = [];

          for (const session of this.trainingsOfMonth) {
            if (session.date === day.date()) {
              trainingsOfDay.push(session);
            }
          }
          return {day: day, trainingsOfDay: trainingsOfDay};
        })
      })
    }

    return calendar;
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
