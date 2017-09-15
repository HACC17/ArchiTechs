import { Component, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { SchedulerService } from '../scheduler/scheduler.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('calendarAnim', [
      transition(':enter', [
        style({transform: 'translateY(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateX(40px)', opacity: 0}))
      )
    ])
  ]
})
export class CalendarComponent implements OnInit {

  anim: boolean;

  constructor(private schedulerService: SchedulerService, private userService: UserService,
              private router: Router) {
    this.anim = true;
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
    this.userService.position = this.findPosition(training);
    this.schedulerService.filterWorks(training);

    this.anim = false;
    setTimeout(() => {
      this.router.navigate(['/main/scheduler/work']);
    }, 500);
  }

  findPosition(training): Object {
    return this.schedulerService.positions.find((position) => {
      return position.name === training.positionName;
    });
  }

  abbreviatePosition(training): string {
    const temp = training.positionName.split(' ');
    const result = temp.map((token) => {
      return token.charAt(0);
    });

    return result.join('');
  }

}
