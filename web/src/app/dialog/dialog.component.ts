import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';
import { FormControl } from '@angular/forms';
import { animate, trigger, transition, style } from '@angular/animations';
import {SchedulerService} from "../scheduler/scheduler.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialogAnim', [
      transition(':enter', [
        style({transform: 'translateY(-40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateY(-40px)', opacity: 0}))
      )
    ]),

    trigger('barAnim', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1s ease', style({opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({opacity: 0}))
      )
    ])
  ]
})
export class DialogComponent implements OnInit {

  anim: boolean;

  constructor(private dialog: DialogService, private schedulerService: SchedulerService) {
    this.anim = true;
  }

  ngOnInit() {
    if (localStorage.getItem('profileImageUrl')) {
      this.schedulerService.getGoogleEventsList()
    }
  }

}
