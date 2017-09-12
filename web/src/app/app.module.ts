import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth/auth.service';
import { SchedulerGuardService } from './guards/scheduler-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { DialogService } from './dialog/dialog.service';
import { GoogleApiService } from './google-api.service';
import { UserService } from './user.service';
import { AnimationService } from './animation.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DialogComponent } from './dialog/dialog.component';
import { MessageComponent } from './message/message.component';
import { MainComponent } from './main/main.component';
import { ReversePipe } from './reverse.pipe';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'auth/login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'auth/register', component: RegisterComponent, canActivate: [AuthGuardService]},
  {path: 'main', component: MainComponent, children: [
    {path: '', redirectTo: 'scheduler', pathMatch: 'full'},
    {path: 'scheduler', component: SchedulerComponent},
    {path: 'dialog', component: DialogComponent},
  ]}
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
    SideBarComponent,
    DialogComponent,
    MessageComponent,
    MainComponent,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SchedulerService,
    AuthService,
    AuthGuardService,
    SchedulerGuardService,
    DialogService,
    GoogleApiService,
    UserService,
    AnimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
