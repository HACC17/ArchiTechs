import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
  providers: []
})
export class VolunteersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(new Date('09-27-2017'));
  }

}
