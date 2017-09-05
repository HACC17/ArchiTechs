import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';

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
        animate('1s ease', style({transform: 'translateX(-40px)', opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  password: FormControl;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.password = new FormControl();
  }

  // submit(): void {
  //   const credential = {email: this.auth.tempEmail, password: this.password.value};
  //   const result = this.auth.login(credential);
  // }

}
