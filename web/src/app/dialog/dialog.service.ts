import { Injectable } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {and} from '@angular/router/src/utils/collection';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class DialogService {

  subject: Subject<string>;
  observable: Observable<string>;
  messages: any;
  isCurrentlyWorking: boolean;

  constructor(private http: Http) {
    this.messages = [];
    this.subject = new Subject();
    this.observable = this.subject.asObservable();
    this.isCurrentlyWorking = false;
  }

  updateRequest(text: string): void {
    this.subject.next(text);
    this.addMessage(true, text);

    if (!this.isCurrentlyWorking) {
      setTimeout(() => {
        this.updateResponse(text);
      }, 500);
    }
  }

  updateResponse(text: string): void {
    // Check if bot is already listening for a message.
    if (!this.isCurrentlyWorking) {

      // The bot is free. Now you can start a new conversation.
      this.classify(text).then((res) => {
        let response = '';

        // Res = classified keyword.
        switch (res) {
          case 'map':
            response = 'Would you like me to show you a map?';

            // We started a conversation here. Keep listening for a reply.
            console.log('Conversation started.');
            this.isCurrentlyWorking = true;
            const subscription = this.observable.subscribe((value) => {
              console.log('Observable triggered.');
              // We still need to understand what the reply is... _Res = classified keyword.
              this.classify(value).then((_res) => {
                if (_res === 'yes') {
                  this.addMessage(false, 'Sure, I\'ll go ahead and do that for you!');
                } else if (_res === 'no') {
                  this.addMessage(false, 'Oh, okay.');
                }

                // Conversation is over.
                console.log('Conversation is over.');
                setTimeout(() => {
                  this.isCurrentlyWorking = false;
                }, 500);
                subscription.unsubscribe();

              });
            });
            break;
          default:
            response = 'Sorry, I did not understand that';
            break;
        }

        this.addMessage(false, response);
      })
    }
  }

  addMessage(isUser: boolean, text: string): void {
    const message = {isUser: isUser, text: text};
    this.messages.push(message);
  }

  classify(text: string): Promise<string> {
    const body = {text: text};
    return this.http.post('/api/web/classifier/classify', body)
      .toPromise()
      .then((res) => {
        console.log(res.text());
        return res.text();
      })
  }
}
