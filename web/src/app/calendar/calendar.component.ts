import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export interface Training {
  month: number,
  date: number,
  time: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar = [];
  trainings: Training[];

  constructor() {
    this.trainings = [
      {month: 9, date: 1, time: '10:00 AM - 2:00 PM'},
      {month: 9, date: 2, time: '9:00 AM - 3:00 PM'}
    ];
  }

  ngOnInit() {
    // Inspired by https://stackoverflow.com/a/39803848.
    const startWeek = moment().startOf('month').week();
    const endWeek = moment().endOf('month').week();

    for (let week = startWeek; week <= endWeek; week++) {
      this.calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => {
          const currentDate = moment().week(week).startOf('week').clone().add(n + i, 'day');
          const currentTrainings = [];

          for (const training of this.trainings) {
            if (training.date === currentDate.date()) {
              currentTrainings.push(training);
            }
          }
          return {currentDate: currentDate, currentTrainings: currentTrainings};
        })
      })
    }

    console.log(this.calendar);
  }
}
