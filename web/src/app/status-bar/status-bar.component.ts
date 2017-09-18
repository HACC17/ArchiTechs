import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { AnimationService } from '../animation.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  sendInput: FormControl;

  constructor(private auth: AuthService, private userService: UserService,
              private router: Router, private animationService: AnimationService,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.userService.getUser();
    this.sendInput = new FormControl();
  }

  googleLogin(): void {
    this.auth.googleLogin();
  }

  logout(): void {
    this.auth.logout();

    // Go back to the main screen now that the user is logged out of the session.
    this.router.navigate(['/auth']);
    window.location.reload();
  }

  openDialog(): void {
    this.animationService.next('scheduler');
  }

  send(): void {
    console.log('Send was called.');
    // If the input value is not empty...
    if (this.sendInput.value) {
      this.dialogService.updateRequest(this.sendInput.value);
    }
  }
}
