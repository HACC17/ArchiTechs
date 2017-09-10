import { Injectable } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Http } from '@angular/http';

@Injectable()
export class DialogService {

  messages: any;

  constructor(private http: Http) {
    this.messages = [];
  }

  updateResponse(text: string): void {
    console.log('updateResponse called');
    this.classify(text).then((res) => {
      let response = '';
      switch (res) {
        case 'buy':
          response = 'Sure, Ill help you buy something!';
          break;
        default:
          response = 'Sorry, I did not understand that';
      }

      this.addMessage(response);
    })
  }

  addMessage(text: string): void {
    const message = {isUser: false, text: text};
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
