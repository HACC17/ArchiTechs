import { Component, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import * as moment from 'moment';

export interface Training {
  month: number,
  date: number,
  time: string,
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('calendarAnim', [
      transition(':enter', [
        style({transform: 'translateY(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ])
    ])
  ]
})
export class CalendarComponent implements OnInit {

  calendar = [];
  trainingsOfMonth: any;

  constructor() {
    this.trainingsOfMonth = [
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

  }
}
