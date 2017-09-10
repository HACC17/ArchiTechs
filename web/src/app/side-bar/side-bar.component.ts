import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  roles: FormGroup;

  constructor(private scheduler: SchedulerService) { }

  ngOnInit() {
    this.initializeCheckbox();
  }

  initializeCheckbox(): void {
    this.roles = new FormGroup({
      control: new FormControl(),
      counting: new FormControl(),
      delivery: new FormControl(),
      information: new FormControl(),
      facility: new FormControl(),
      precinct: new FormControl(),
      troubleshoot: new FormControl()
    })
  }

  checkboxChange(event): void {
    if (this.roles.get(event.target.id).value) {
      this.roles.patchValue({[event.target.id] : event.target.id});
    }

    this.scheduler.filterTrainings(this.roles.getRawValue());
    this.scheduler.makeCalendar();
  }

  addMonth(): void {
    this.scheduler.now = this.scheduler.now.add(1, 'months');
    this.scheduler.filterTrainings(this.roles.getRawValue());
    this.scheduler.makeCalendar();
  }

  subtractMonth(): void {
    this.scheduler.now = this.scheduler.now.subtract(1, 'months');
    this.scheduler.filterTrainings(this.roles.getRawValue());
    this.scheduler.makeCalendar();
  }
}
