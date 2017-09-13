import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-work-selection',
  templateUrl: './work-selection.component.html',
  styleUrls: ['./work-selection.component.css'],
  animations: [
    trigger('workAnim', [
      transition(':enter', [
        style({transform: 'translateY(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ])
    ])
  ]
})
export class WorkSelectionComponent implements OnInit {

  constructor(private schedulerService: SchedulerService, private userService: UserService) { }

  ngOnInit() {
  }

}
