import {Component, Input, OnInit} from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('messageAnim', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1.5s ease', style({opacity: 1}))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {

  @Input()
  isUser: boolean;

  @Input()
  text: string;

  @Input()
  test: Object;

  constructor() {}

  ngOnInit() {
  }

}
