import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dane',
  templateUrl: './dane.component.html',
  styleUrls: ['./dane.component.css'],
  standalone: true
})
export class DaneComponent implements OnInit, OnDestroy {
  public chart: any;

  intervalId: any;
  data1: Array<Number> = []
  time1: Array<String> = []

  @Input() IP!: String

  constructor() { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 100);

    this.createChart()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  createChart(){
  
    this.chart = new Chart("myChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.time1, 
	       datasets: [
          {
            label: "Sales",
            data: this.data1,
            backgroundColor: 'blue'
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  fetchData() {
    let fetched = this.mockRandomInt();

    this.data1.unshift(fetched);
    this.time1.unshift(this.getNow())
    if(this.data1.length>50) {
      this.data1.pop()
      this.time1.pop()
    }

    this.chart.update();
  }

  mockRandomInt() {
    let min = 1;
    let max = 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getNow() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return `${hour}:${minute}:${second}`
  }
}
