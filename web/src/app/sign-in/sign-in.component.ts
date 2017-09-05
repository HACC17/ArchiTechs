import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  email: FormControl;

  constructor(private auth: AuthService, private router: Router) {
    this.anim = true;
  }

  ngOnInit() {
    this.email = new FormControl();
  }

  submit(): void {
    this.auth.hasAccount(this.email.value).then((res) => {
      const hasAccount: boolean = res.json().hasAccount;

      setTimeout(() => {
        this.anim = false;
        if (hasAccount) {
          this.router.navigateByUrl('/sign-in/login');
        } else {
          this.router.navigateByUrl('/sign-in/sign-up');
        }
      }, 500);
    });
  }

}
