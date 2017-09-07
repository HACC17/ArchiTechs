import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';

@Injectable()
export class SchedulerService {

  user: any;
  selectedRole: string;
  currentYear: number;
  currentMonth: number;
  trainingsOfMonth: any;
  filteredTrainings: any;

  constructor(private http: Http) {
    this.user = {};
    // So that we don't get undefined error before api call fills it in.
    this.user.training = {};

    const now = moment();
    this.currentYear = now.year();
    this.currentMonth = now.month();

    this.selectedRole = 'any';

    this.trainingsOfMonth = [
      {role: 'counter', year: 2017, month: 8, date: 1, time: '10:00 AM - 2:00 PM'},
      {role: 'operator', year: 2017, month: 8, date: 5, time: '9:00 AM - 3:00 PM'}
    ];
  }

  filterTrainings(): void {

    this.filteredTrainings = this.trainingsOfMonth.filter((element) => {
      // Boolean that tests whether the element meets the requirements to not get filtered out.
      let result = (element.year === this.currentYear) &&
        // Months is 0 indexed in moment.
        (element.month === this.currentMonth);

      if (this.selectedRole !== 'any') {
        console.log('hello');
        result = element.role === this.selectedRole;
      }

      return result;
    });
    console.log(this.filteredTrainings);
  }

  makeCalendar(): Object[] {
    // Inspired by https://stackoverflow.com/a/39803848.
    const pointOfRef = moment(new Date(this.currentYear, this.currentMonth));
    const calendar = [];
    const startWeek = pointOfRef.startOf('month').week();
    const endWeek = pointOfRef.endOf('month').week();

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
    console.log('updateUserTraining in SchedulerService called');

    this.user.training = training;

    const token = JSON.parse(localStorage.getItem('user')).token;
    const body = {token: token, training: training};
    console.log(body);
    this.http.post('/api/web/data/update-training', body).toPromise();
  }
}
