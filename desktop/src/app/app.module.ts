import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxElectronModule } from 'ngx-electron';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { UsertableComponent } from './volunteers/usertable/usertable.component';
import { UserdetailsComponent } from './volunteers/userdetails/userdetails.component';
import { VolunteersService } from './volunteers/volunteers.service';


const routes: Routes = [
  {path: '', redirectTo: 'volunteers', pathMatch: 'full'},
  {path: 'volunteers', component: VolunteersComponent},
  {path: 'volunteers/:id', component: UserdetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    VolunteersComponent,
    UsertableComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [VolunteersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
