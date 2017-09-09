import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SchedulerService } from '../scheduler/scheduler.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  user: Object;

  constructor(private auth: AuthService, private scheduler: SchedulerService, private router: Router) {
    this.user = {};
  }

  ngOnInit() {
    this.scheduler.getUser().then((res: Object) => {
      this.user = res;
    })
  }

  logout(): void {
    this.auth.logout();

    // Go back to the main screen now that the user is logged out of the session.
    this.router.navigate(['/auth']);
  }

}
