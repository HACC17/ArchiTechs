import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { UsertableComponent } from './volunteers/usertable/usertable.component';

import 'rxjs/add/operator/toPromise';


const routes: Routes = [

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
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
