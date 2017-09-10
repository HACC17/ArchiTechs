import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  isUser: boolean;
  message: string;

  constructor(isUser: boolean, message: string) {
    this.isUser = isUser;
    this.message = message;
  }

  ngOnInit() {
  }

}
