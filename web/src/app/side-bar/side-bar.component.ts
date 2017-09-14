import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  roles: FormGroup;

  constructor(private schedulerService: SchedulerService, private userService: UserService) { }

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
      this.roles.patchValue({[event.target.id] : event.target.value});
    }

    this.schedulerService.filterTrainings(this.roles.getRawValue());
    this.schedulerService.makeCalendar();
  }

  addMonth(): void {
    this.schedulerService.now = this.schedulerService.now.add(1, 'months');
    this.schedulerService.filterTrainings(this.roles.getRawValue());
    this.schedulerService.makeCalendar();
  }

  subtractMonth(): void {
    this.schedulerService.now = this.schedulerService.now.subtract(1, 'months');
    this.schedulerService.filterTrainings(this.roles.getRawValue());
    this.schedulerService.makeCalendar();
  }

  getPosition(): string {
    if (this.userService.position) {
      const result = this.userService.position.name +
        ' (' + this.userService.position.staffingCurrent +
        '/' + this.userService.position.staffingMax +
        ')';

      return result;
    }

    return '';
  }

  apply(): void {
    this.userService.updateUser();
  }
}
