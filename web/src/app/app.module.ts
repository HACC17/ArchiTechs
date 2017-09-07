import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth/auth.service';
import { SchedulerGuardService } from './guards/scheduler-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import {SchedulerService} from './scheduler/scheduler.service';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'auth/login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'auth/register', component: RegisterComponent, canActivate: [AuthGuardService]},
  {path: 'scheduler', component: SchedulerComponent, canActivate: [SchedulerGuardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
    SchedulerGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
