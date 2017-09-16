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
import { DatabaseComponent } from './database/database.component';
import { BackupComponent } from './database/backup/backup.component';
import { DumplogComponent } from './database/backup/dumplog/dumplog.component';
import { FilelistComponent } from './database/backup/filelist/filelist.component';
import { OptionsComponent } from './options/options.component';


const routes: Routes = [
  {path: '', redirectTo: 'volunteers', pathMatch: 'full'},
  {path: 'volunteers', component: VolunteersComponent},
  {path: 'volunteers/:id', component: UserdetailsComponent},
  {path: 'database', component: DatabaseComponent, children: [
    {path: '', redirectTo: 'backup', pathMatch: 'full'},
    {path: 'backup', component: BackupComponent}
  ]},
  {path: 'options', component: OptionsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    VolunteersComponent,
    UsertableComponent,
    UserdetailsComponent,
    DatabaseComponent,
    BackupComponent,
    DumplogComponent,
    FilelistComponent,
    OptionsComponent
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
