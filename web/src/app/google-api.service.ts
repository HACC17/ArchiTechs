import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare const gapi: any;

@Injectable()
export class GoogleApiService {

  isScriptLoaded: boolean;
  isClientInitialized: boolean;

  constructor() {
    this.initializeClient();
  }

  // 1) Check if gapi client is initialized (onInitialize)
  // 2) If it is, then just call the callback function immediately (onInitialize)
  // 3) If it isn't, then first check if script is loaded (onLoad)
  // 4) If the script is loaded, then initialize the client and pass in
  //    the call back function for it to call once it finishes initializing (initializeClient)
  // 5) If the script is not loaded, then load the script (loadGapi)
  // 6) Then initialize the client

  onInitialize(callback: () => any): void {
    if (this.isClientInitialized) {
      callback();
      return;
    }
    this.onLoad(callback);
  }

  initializeClient(): Observable<void> {
    return Observable.create((observer: any) => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          clientId: '1088555954913-v7sq53g14okbbppbl0v24sj4feio27g7.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
          observer.next();
          this.isClientInitialized = true;
        });
      });
    });
  }

  // Inspired by https://github.com/rubenCodeforges/angular2-google-api.
  onLoad(callback: () => any): void {
    if (this.isScriptLoaded) {
      this.initializeClient().subscribe(callback);
      return;
    }
    this.loadGapi().subscribe((res) => {
      this.initializeClient().subscribe(callback);
    });
  }

  loadGapi(): Observable<void> {
    return Observable.create((observer: any) => {
      const node = document.createElement('script');
      node.src = 'https://apis.google.com/js/api.js';
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
      node.onload = () => {
        observer.next();
        this.isScriptLoaded = true;
      };
    });
  }
}
