import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('registerAnim', [
      transition(':enter', [
        style({transform: 'translateX(40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateX(0)', opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateX(-40px)', opacity: 0}))
      )
    ])
  ]
})
export class RegisterComponent implements OnInit {

  anim: boolean;
  password: FormControl;
  name: FormControl;
  address: FormControl;
  phoneNumber: FormControl;
  failed: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.failed = false;
    this.anim = true;
  }

  ngOnInit() {
    this.password = new FormControl('', Validators.required);
    this.name = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.phoneNumber = new FormControl('', Validators.required);
  }

  submit(): void {
    if (this.name.hasError('required') || this.password.hasError('required') ||
      this.address.hasError('required') || this.phoneNumber.hasError('required')) {
      this.failed = true;
      return;
    }

    const information = {
      email: this.authService.tempEmail,
      password: this.password.value,
      name: this.name.value,
      address: this.address.value,
      phoneNumber: this.phoneNumber.value,
      position: {},
      work: {},
      training: {}
    }

    this.authService.register(information)
      .then((res) => {
        console.log(res);

        if (res) {
          this.anim = false;

          setTimeout(() => {
            this.router.navigate(['/main']);
          })
        }
      });

    console.log('submit called');
  }

}
