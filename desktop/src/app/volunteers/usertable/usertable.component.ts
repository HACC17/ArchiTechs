import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  users: Object[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get(environment.api + '/volunteers')
      .toPromise()
      .then((res) => {
        this.users = res.json();
        console.log(this.users);
      })
  }

}
