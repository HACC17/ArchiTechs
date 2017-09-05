import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginAnim', [
      transition(':enter', [
        style({transform: 'translateX(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateX(0)', opacity: 1}))
      ]),

      transition(':leave', [
        animate('1s ease', style({transform: 'translateY(-40px)', opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  anim: boolean;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router) {
    this.anim = true;
  }

  ngOnInit() {
    this.password = new FormControl();
  }

  submit(): void {
    const credential = {email: this.auth.tempEmail, password: this.password.value};
    this.auth.login(credential).then((res) => {
      if (res) {
        // Login was successful.
        this.anim = false;

        setTimeout(() => {
          this.router.navigate(['/calendar']);
        }, 500);
        console.log('Login was successful!');
      } else {
        console.log('Login failed.');
      }
    });
  }

}
