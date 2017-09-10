import { Injectable } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Http } from '@angular/http';

@Injectable()
export class DialogService {

  messages: any;

  constructor(private http: Http) {
    this.messages = [];
  }

  updateRequest(text: string): void {
    this.addMessage(true, text);
    this.updateResponse(text);
  }

  updateResponse(text: string): void {
    console.log('updateResponse called');
    this.classify(text).then((res) => {
      console.log(res);
      let response = '';
      switch (res) {
        case 'buy':
          console.log('hello');
          response = 'Sure, Ill help you buy something!';
          break;
        default:
          response = 'Sorry, I did not understand that';
          break;
      }

      this.addMessage(false, response);
    })
  }

  addMessage(isUser: boolean, text: string): void {
    const message = {isUser: isUser, text: text};
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
