import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Check if user is already logged in.
    if (localStorage.getItem('user')) {
      this.router.navigate(['/scheduler']);
      return false;
    }

    // Now check if the user entered an email already at the auth screen.
    const result = this.auth.canActivateSignIn();
    if (result) {
      return true;
    }

    // At this point the user is denied access.
    // Now check if we should reload the page or redirect to auth.
    if (this.router.url === '/auth') {
      window.location.reload();
    } else {
      this.router.navigate(['/auth']);
    }

    return false;
  }
}
