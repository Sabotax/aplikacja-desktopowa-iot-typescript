import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient, } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { getBasicDataResponse, Result } from '../classes';

@Component({
  selector: 'app-dane',
  templateUrl: './dane.component.html',
  styleUrls: ['./dane.component.css'],
  imports: [HttpClientModule],
  standalone: true
})
export class DaneComponent implements OnInit, OnDestroy {
  public chart: any;

  intervalId: any;
  data1: Array<Number> = []
  data2: Array<Number> = []
  data3: Array<Number> = []
  time1: Array<String> = []

  @Input() IP!: String

  constructor(private http: HttpClient) { }

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
            label: "Temperatura [C]",
            data: this.data1,
            backgroundColor: 'red'
          },
          {
            label: "Pressure [bar]",
            data: this.data2,
            backgroundColor: 'blue'
          },
          {
            label: "Humidity [%]",
            data: this.data3,
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  async fetchData() {
    //let fetched = this.mockRandomInt();
    let fetched = await this.makePostRequest()
    console.log(fetched)
    if(fetched.result == "OK") {
      let obiekt_input = fetched.data
      this.data1.unshift(obiekt_input.temperatura);
      this.data2.unshift(obiekt_input.pressure);
      this.data3.unshift(obiekt_input.humidity);
      this.time1.unshift(this.getNow())
      if(this.data1.length>50) {
        this.data1.pop()
        this.time1.pop()
      }
  
      this.chart.update();
    }
    else {
      console.log("result err")
    }
    
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

  async makePostRequest(): Promise<Result<getBasicDataResponse>> {
    const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/getBasicData';
    let data = null
    try {
      const response = await this.http.post(url, data).toPromise();
      //console.log(response)
      return new Result(response)
      // handle the response
    } catch (error) {
      // handle the error
      //console.log(error)
      return new Result(error)
    }
  }
}
