import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import {environment} from '../../../../web/src/environments/environment';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  config: FormGroup;
  sent: boolean
  saved: boolean;

  constructor(private http: Http) {
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

    this.http.get('http://architechs.us/api/web/volunteer/send-all')
      .toPromise()
      .then((res) => {
        console.log(res);
      });
  }

  saveSettings(): void {
    this.saved = true;
    const settings = {
      days: this.config.get('days').value,
      message: this.config.get('message').value
    }

    this.http.post('http://localhost:3000/api/file/save-settings', settings)
      .toPromise()
      .then((res) => {
        console.log(res);
      });
  }

}
