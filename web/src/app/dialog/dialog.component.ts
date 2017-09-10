import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit() {
    console.log(this.dialog.classify('long SUNW'));
  }

}
