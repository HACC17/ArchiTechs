import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VolunteersService} from "../volunteers.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: VolunteersService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
  }

}
