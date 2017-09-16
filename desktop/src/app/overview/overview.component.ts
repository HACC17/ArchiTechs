import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  show: boolean;
  options: any;
  labels: string[];
  type;
  legend;

  data: any[];

  positions: any;

  constructor(private http: Http) {
    this.show = false;
    this.options = {
      scaleShowVerticalLines: false,
      responsive: false
    };
    this.positions = [];
    this.labels = [];
    this.type = 'bar';
    this.legend = false;
    this.data = [
      {data: [], label: 'Current Staffing'},
      {data: [], label: 'Max Staffing'}
    ];
    this.getPositions();

  }

  ngOnInit() {}

  getPositions(): void {
    this.http.get('http://localhost:3000/api/web/position/list')
      .toPromise()
      .then((res) => {
        this.positions = res.json();
        console.log(this.positions);

        for (const position of this.positions) {
          this.labels.push(position.name);
          this.data[0].data.push(position.staffingCurrent);
          this.data[1].data.push(position.staffingMax);
        }

        this.show = true;

        console.log(this.labels);
        console.log(this.data);
      });
  }
}
