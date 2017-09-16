import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormControl } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router) {
    this.anim = true;
  }

  ngOnInit() {
    this.password = new FormControl();
    this.name = new FormControl();
    this.address = new FormControl();
    this.phoneNumber = new FormControl();
  }

  submit(): void {
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
