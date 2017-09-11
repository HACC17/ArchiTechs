import { Component, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { SchedulerService } from '../scheduler/scheduler.service';
import { UserService } from '../user.service';

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

  constructor(private scheduler: SchedulerService, private userService: UserService) {

  }

  ngOnInit() {
    this.scheduler.filterTrainings();
    this.scheduler.makeCalendar();
  }

  updateUserTraining(training): void {
    this.userService.updateUserTraining(training);
  }
}
