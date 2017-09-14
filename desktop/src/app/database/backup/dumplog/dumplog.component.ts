import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dumplog',
  templateUrl: './dumplog.component.html',
  styleUrls: ['./dumplog.component.css']
})
export class DumplogComponent implements OnInit {

  logs: string[];

  constructor() {
    this.logs = [];
  }

  ngOnInit() {
  }

  start(): void {
    let ws = new WebSocket('ws://192.168.99.100:3000/');
    ws.onopen = (e) => {
      console.log('ws is open');
      console.log('ws is now listening to messages');
      ws.onmessage = (e) => {
        console.log(e.data);
        this.logs.push(e.data);
      }

      ws.onclose = (e) => {
        console.log('ws is closed');
      }
    }
  }

}
