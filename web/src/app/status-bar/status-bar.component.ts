import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  user: Object;

  constructor(private auth: AuthService, private router: Router) {
    this.user = {};
  }

  ngOnInit() {
    this.auth.getData().then((res: Object) => {
      this.user = res;
    })
  }

  logout(): void {
    this.auth.logout();

    // Go back to the main screen now that the user is logged out of the session.
    this.router.navigate(['/sign-in']);
  }

}
