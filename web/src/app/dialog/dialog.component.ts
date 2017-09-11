import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';
import { FormControl } from '@angular/forms';
import { animate, trigger, transition, style } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialogAnim', [
      transition(':enter', [
        style({transform: 'translateY(-40px)', opacity: 0}),
        animate('1s ease', style({transform: 'translateY(0)', opacity: 1}))
      ]),

      transition(':leave',
        animate('1s ease', style({transform: 'translateY(-40px)', opacity: 0}))
      )
    ])
  ]
})
export class DialogComponent implements OnInit {

  anim: boolean;
  isOpen: boolean;
  sendInput: FormControl;

  constructor(private dialog: DialogService) {
    this.anim = true;
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

}
