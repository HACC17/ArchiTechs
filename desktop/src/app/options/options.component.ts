import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  config: FormGroup;
  sent: boolean
  saved: boolean;

  constructor() {
    this.sent = false;
    this.saved = false;
  }

  ngOnInit() {
    this.config = new FormGroup({
      days: new FormControl('1'),
      message: new FormControl('This is a reminder that your training session is coming up soon.')
    });
  }

  sendReminder(): void {
    this.sent = true;
  }

  saveSettings(): void {
    this.saved = true;
    console.log(this.config.get('days').value);
  }

}
