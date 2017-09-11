import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from './auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('authAnim', [
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
export class AuthComponent implements OnInit {

  // Trick for triggering the leave animation.
  anim: boolean;
  defaultEmailValue: string;
  email: FormControl;

  constructor(private auth: AuthService, private router: Router) {
    this.anim = true;
    // So if user presses back button in browser, they don't have to rewrite the email address.
    this.defaultEmailValue = this.auth.tempEmail;
  }

  ngOnInit() {
    // If the user is logged in already, move to scheduler.
    if (localStorage.getItem('user')) {
      this.router.navigate(['/main']);
    }

    this.email = new FormControl(this.defaultEmailValue);
  }

  submit(): void {
    // Ask AuthService to see if there's an account with entered email.
    // The response object should be a boolean.
    this.auth.hasAccount(this.email.value).then((res) => {

      this.auth.tempEmail = this.email.value;
      this.anim = false;

      setTimeout(() => {
        if (res) {
          this.router.navigateByUrl('/auth/login');
        } else {
          this.router.navigateByUrl('/auth/register');
        }
      }, 500);
    });
  }

}
