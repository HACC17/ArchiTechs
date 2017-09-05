import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class SignInGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(): boolean {
    return this.auth.canActivateSignIn();
  }
}
