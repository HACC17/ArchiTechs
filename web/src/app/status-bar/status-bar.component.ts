import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  sendInput: FormControl;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUser();
    this.sendInput = new FormControl();
  }

  logout(): void {
    this.auth.logout();

    // Go back to the main screen now that the user is logged out of the session.
    this.router.navigate(['/auth']);
  }

  openDialog(): void {
    console.log('openDialog called');
    this.router.navigate(['/main/dialog']);
  }

  closeDialog(): void {

  }

}
