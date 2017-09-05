import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';
import { SignInGuardService } from './guards/sign-in-guard.service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import {AuthGuardService} from "./guards/auth-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-in/login', component: LoginComponent, canActivate: [SignInGuardService]},
  {path: 'sign-in/register', component: RegisterComponent, canActivate: [SignInGuardService]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    SignInGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
