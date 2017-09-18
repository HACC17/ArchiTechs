import { Injectable } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {and} from '@angular/router/src/utils/collection';
import {observable} from 'rxjs/symbol/observable';
import { UserService } from '../user.service';
import { SchedulerService } from '../scheduler/scheduler.service';

@Injectable()
export class DialogService {

  subject: Subject<string>;
  observable: Observable<string>;
  messages: any;
  isCurrentlyWorking: boolean;

  constructor(private http: Http, private userService: UserService,
              private schedulerService: SchedulerService) {
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
          case 'suggest':
            if (!localStorage.getItem('profileImageUrl')) {
              response = 'Please sync with your google account first so I can see your schedule.';
            } else {
              if (!this.userService.getTraining()) {
                response = 'Please schedule a training first.';
              } else {
                const suggestedTraining = this.schedulerService.findBestDate();
                response = 'You seem to be free on ' + suggestedTraining.date + '. ' +
                  'There is a training on that day  for the position: ' + suggestedTraining.positionName + '.';
              }
            }
            break;
          case 'map':
            response = 'Would you like me to show you a map?';

            // We started a conversation here. Keep listening for a reply.
            this.isCurrentlyWorking = true;
            const subscription = this.observable.subscribe((value) => {
              // We still need to understand what the reply is... _Res = classified keyword.
              this.classify(value).then((_res) => {
                if (_res === 'yes') {

                  if (this.userService.getTraining()) {
                    this.addMessage(false, 'Sure, I\'ll go ahead and do that for you!');
                    setTimeout(() => {
                      this.addMessage(false, 'Here it is: ', this.userService.user.training.address + ' Honolulu, HI');
                    }, 500);
                  } else {
                    this.addMessage(false, 'Hold on, please schedule a training first.');
                  }

                } else if (_res === 'no') {
                  this.addMessage(false, 'Oh, okay.');
                } else {
                  this.addMessage(false, 'Sorry, I didn\'t understand that.');
                }

                // Conversation is over.
                setTimeout(() => {
                  this.isCurrentlyWorking = false;
                }, 500);
                subscription.unsubscribe();

              });
            });
            break;
          case 'greeting':
            response = 'Hi, my name is Bert and I\'m here to help you out!';
            break;
          case 'command':
            response = 'You can ask me where to go for your training, or to suggest you a training date that fits your schedule.';
            break;
          default:
            response = 'Sorry, I did not understand that';
            break;
        }

        this.addMessage(false, response);
      })
    }
  }

  addMessage(isUser: boolean, text: string, address?: string): void {
    const message = {isUser: isUser, text: text, address: address};
    this.messages.push(message);
  }

  classify(text: string): Promise<string> {
    const body = {text: text};
    return this.http.post('/api/web/classifier/classify', body)
      .toPromise()
      .then((res) => {
        return res.text();
      })
  }
}
