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
    setTimeout(() => {
      this.updateResponse(text);
    }, 500);
  }

  updateResponse(text: string): void {
    console.log('updateResponse called');
    this.classify(text).then((res) => {
      console.log(res);
      let response = '';
      switch (res) {
        case 'buy':
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
    const body = {text: text};
    return this.http.post('/api/web/data/classify', body)
      .toPromise()
      .then((res) => {
        return res.text();
      })
  }
}
