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
    const ws = new WebSocket('ws://architechs.us/api/websocket');
    ws.onopen = (e) => {
      console.log('ws is open');
      console.log('ws is now listening to messages');
      ws.onmessage = (ee) => {
        console.log(ee.data);
        this.logs.push(ee.data);
      }

      ws.onclose = (ee) => {
        console.log('ws is closed');
      }
    }
  }

}
