import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  files: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/file')
      .toPromise()
      .then((res) => {
        this.files = res.json();
      })
  }

}
