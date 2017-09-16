import { Component, Input, OnInit } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { UserService } from '../user.service';

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
  address: string;

  mapUrl: string;

  constructor(private userService: UserService) {
    this.mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDp1h_TE51SxS4lLA4jtI9p5ADwsfWVYII&q=Space+Needle,Seattle+WA';
  }

  ngOnInit() {
  }

}
