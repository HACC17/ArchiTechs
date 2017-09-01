import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    let app = this.el.nativeElement.querySelector('.app');
    this.renderer.setStyle(app, 'height', (window.innerHeight - 30) + 'px');

    window.onresize = () => {
      this.renderer.setStyle(app, 'height', (window.innerHeight - 30) + 'px');
    };
  }
}
