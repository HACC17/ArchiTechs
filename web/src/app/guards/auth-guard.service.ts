import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const result = localStorage.getItem('user')

    if (result) {
      return true;
    }

    // At this point the user is denied access.
    // Now check if we should reload the page or redirect to sign-in.
    if (this.router.url === '/sign-in') {
      window.location.reload();
    } else {
      this.router.navigate(['/sign-in']);
    }

    return false;
  }
}
