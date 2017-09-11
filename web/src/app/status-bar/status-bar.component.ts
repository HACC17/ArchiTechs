import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  user: Object;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    this.user = {};
  }

  ngOnInit() {
    this.userService.getUser().then((res: Object) => {
      this.user = res;
    })
  }

  logout(): void {
    this.auth.logout();

    // Go back to the main screen now that the user is logged out of the session.
    this.router.navigate(['/auth']);
  }

}
