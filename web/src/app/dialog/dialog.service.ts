import { Injectable } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Http } from '@angular/http';

@Injectable()
export class DialogService {

  messages: MessageComponent[];

  constructor(private http: Http) { }

  updateResponse(text: string): void {
    this.classify(text).then((res) => {
      switch (res) {
        case 'buy':

      }
    })
  }

  addMessage(text: string): void {
    const message = new MessageComponent(false, text);
    this.messages.push(message);
  }

  classify(text: string): Promise<string> {
    return this.http.get('/api/web/data/test')
      .toPromise()
      .then((res) => {
        return res.text();
      })
  }
}
