import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnimationService {

  subject: Subject<string>;
  observable: Observable<string>;

  constructor() {
    this.subject = new Subject<string>();
    this.observable = this.subject.asObservable();
  }

  next(value: string): void {
    this.subject.next(value);
  }

}
