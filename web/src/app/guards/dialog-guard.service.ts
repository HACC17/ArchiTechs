import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SchedulerService } from '../scheduler/scheduler.service';

@Injectable()
export class DialogGuardService implements CanActivate {

  constructor(private schedulerService: SchedulerService, private router: Router) { }

  canActivate(): boolean {
    const result = this.schedulerService.calendar;

    if (result) {
      return true;
    }

    // At this point the user is denied access.
    // Now check if we should reload the page or redirect to auth.
    if (this.router.url === '/main') {
      window.location.reload();
    } else {
      this.router.navigate(['/main']);
    }

    return false;
  }
}
