import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VolunteersService} from '../volunteers.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  // Forms.
  basicInformation: FormGroup;

  id: string;

  constructor(private route: ActivatedRoute, private service: VolunteersService) { }

  ngOnInit() {
    this.initializeForms();

    this.id = this.route.snapshot.params.id;

    console.log(this.service.findOne(this.id));
  }

  initializeForms(): void {
    this.basicInformation = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dob: new FormControl(''),
      email: new FormControl('')
    })
  }

}
