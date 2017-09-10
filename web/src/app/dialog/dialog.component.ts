import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  isOpen: boolean;
  sendInput: FormControl;

  constructor(private dialog: DialogService) {
    this.isOpen = false;
  }

  ngOnInit() {
    this.sendInput = new FormControl();
    // console.log(this.dialog.classify('long SUNW'));
  }

  send(): void {
    // If the input value is not empty...
    if (this.sendInput.value) {
      this.dialog.updateRequest(this.sendInput.value);
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }
}
