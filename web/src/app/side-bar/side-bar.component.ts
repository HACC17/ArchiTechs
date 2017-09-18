import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  roles: FormGroup;

  constructor(private schedulerService: SchedulerService, private userService: UserService,
              private router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this.initializeCheckbox();
  }

  initializeCheckbox(): void {
    this.roles = new FormGroup({
      control: new FormControl(false),
      counting: new FormControl(false),
      delivery: new FormControl(false),
      information: new FormControl(false),
      facility: new FormControl(false),
      precinct: new FormControl(false),
      troubleshoot: new FormControl(false)
    })
  }

  checkOptionsFilterTrainings(): void {
    let isAll = true;
    const roleResults = this.roles.getRawValue();
    for (const role in roleResults) {
      if (roleResults.hasOwnProperty(role)) {
        if (roleResults[role] !== false) {
          isAll = false;
        }
      }
    }

    if (isAll) {
      this.schedulerService.filterTrainings();
    } else {
      this.schedulerService.filterTrainings(roleResults);
    }
  }

  checkboxChange(event): void {
    if (this.roles.get(event.target.id).value) {
      this.roles.patchValue({[event.target.id] : event.target.value});
      this.roles.patchValue({[event.target.id] : event.target.value});

    }
    this.checkOptionsFilterTrainings();
    this.schedulerService.makeCalendar();
  }

  addMonth(): void {
    this.schedulerService.now = this.schedulerService.now.add(1, 'months');
    this.checkOptionsFilterTrainings();
    this.schedulerService.makeCalendar();
  }

  subtractMonth(): void {
    this.schedulerService.now = this.schedulerService.now.subtract(1, 'months');
    this.checkOptionsFilterTrainings();
    this.schedulerService.makeCalendar();
  }

  getPosition(): string {
    if (this.userService.position) {
      if (this.userService.position.name) {
        const result = this.userService.position.name +
          ' (' + this.userService.position.staffingCurrent +
          '/' + this.userService.position.staffingMax +
          ')';
        return result;
      }
    }

    return '';
  }

  apply(): void {
    this.userService.updateUser();
    this.router.navigate(['/main/dialog']);

    setTimeout(() => {
      this.dialogService.addMessage(false, 'Thank you for your interest, we can\'t wait to meet you on the training day!')
    }, 1000);
  }
}
