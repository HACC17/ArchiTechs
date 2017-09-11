import { Component, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  animations: [
    trigger('schedulerAnim', [
      transition(':enter', [
        style({transform: 'translateY(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateY(40px)', opacity: 0}))
      )
    ])
  ]
})
export class SchedulerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
