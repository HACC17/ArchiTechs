import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { SignInGuardService } from './guards/sign-in-guard.service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import {SchedulerService} from "./scheduler/scheduler.service";

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-in/login', component: LoginComponent, canActivate: [SignInGuardService]},
  {path: 'sign-in/register', component: RegisterComponent, canActivate: [SignInGuardService]},
  {path: 'scheduler', component: SchedulerComponent, canActivate: [AuthGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    StatusBarComponent,
    SchedulerComponent,
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
    SchedulerService,
    AuthService,
    AuthGuardService,
    SignInGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
