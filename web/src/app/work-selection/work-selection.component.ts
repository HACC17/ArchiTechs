import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { SchedulerService } from '../scheduler/scheduler.service';

@Component({
  selector: 'app-work-selection',
  templateUrl: './work-selection.component.html',
  styleUrls: ['./work-selection.component.css'],
  animations: [
    trigger('workAnim', [
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
export class WorkSelectionComponent implements OnInit {

  anim: boolean;

  constructor(private schedulerService: SchedulerService,
              private router: Router, private userService: UserService) {
    this.anim = true;
  }

  ngOnInit() {
    console.log('init work selection');
  }

  updateWork(work): void {
    this.userService.user.work = work;

    this.anim = false;
    setTimeout(() => {
      this.router.navigate(['/main/scheduler']);
    }, 500)
  }
}
