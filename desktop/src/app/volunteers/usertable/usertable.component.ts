import { Component, OnInit } from '@angular/core';
import {VolunteersService} from '../volunteers.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  constructor(private service: VolunteersService) { }

  ngOnInit() {
    this.service.getVolunteers();
  }

}
