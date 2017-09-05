import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('signInAnim', [
      transition('void => *', [
        style({transform: 'translateY(40px)'}),
        animate('1s ease', style({transform: 'translateY(0)'}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateX(-40px)', opacity: 0}))
      )
    ])
  ]
})
export class SignInComponent implements OnInit {

  // Trick for triggering the leave animation.
  anim: boolean;

  constructor(private auth: AuthService) {
    this.anim = true;
  }

  ngOnInit() {
  }

  submit(): void {

  }

}
