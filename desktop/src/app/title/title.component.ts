import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

interface Breadcrumb {
  label: string,
  url: string
}

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];

  constructor(private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    // Update breadcrumb on navigation changes.
    this.router.events
      .filter(event => event instanceof NavigationEnd || event instanceof NavigationStart)
      .subscribe(event => {
        this.breadcrumbs = this.getBreadcrumbs();
      });
  }

  // Figure out the breadcrumb items using the url.
  private getBreadcrumbs(): Breadcrumb[] {
    const urlSegments = this.router.url.split('/')
      .filter(word => word);

    let url = '', label = '', breadcrumb;
    const breadcrumbs = [];

    for(let i = 0; i < urlSegments.length; i++) {
      url += `/${urlSegments[i]}`;
      label = this.makeLabel(urlSegments[i]);

      breadcrumb = { url: url, label: label };
      breadcrumbs.push(breadcrumb);
    }

    return breadcrumbs;
  }

  // Helper class for formatting the breadcrumb items.
  private makeLabel(text: string): string {
    text = text.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return text;
  }
}
