import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxElectronModule } from 'ngx-electron';
import { HttpModule } from "@angular/http"

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { UsertableComponent } from './volunteers/usertable/usertable.component';

import 'rxjs/add/operator/toPromise';


const routes: Routes = [
  {path: '', redirectTo: 'volunteers', pathMatch: 'full'},
  {path: 'volunteers', component: VolunteersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    VolunteersComponent,
    UsertableComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
