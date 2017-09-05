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
      transition(':enter', [
        style({transform: 'translateY(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
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
    // Ask AuthService to see if there's an account with entered email.
    this.auth.hasAccount(this.email.value).then((res) => {
      // Is there an account? True or false.
      const hasAccount: boolean = res.json().hasAccount;

      this.auth.tempEmail = this.email.value;
      this.anim = false;

      setTimeout(() => {
        if (hasAccount) {
          this.router.navigateByUrl('/sign-in/login');
        } else {
          this.router.navigateByUrl('/sign-in/sign-up');
        }
      }, 500);
    });
  }

}
