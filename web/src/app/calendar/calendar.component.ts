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

  constructor(private schedulerService: SchedulerService, private userService: UserService) {

  }

  ngOnInit() {
    if (!this.schedulerService.trainings) {
      this.schedulerService.getTrainings();
    } else {
      this.schedulerService.filterTrainings();
      this.schedulerService.makeCalendar();
    }
  }

  updateTrainingAndPosition(training): void {
    this.userService.user.training = training;

    this.userService.user.position = this.filterPosition(training);
  }

  filterPosition(training): Object {
    return this.schedulerService.positions.find((position) => {
      return position.name === training.positionName;
    });
  }

}
