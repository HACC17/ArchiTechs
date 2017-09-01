import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VolunteersService} from "../volunteers.service";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private service: VolunteersService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    console.log(this.service.findOne(this.id));
  }

}
