import { Component, Input, OnInit } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';
import { getAdvancedDataResponse, Result, TableRow } from '../classes'
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [NgFor,NgClass,HttpClientModule],
  standalone: true
})
export class TableComponent implements OnInit {
  intervalId: any;
  rows: Array<TableRow> = []
  @Input() IP!: String

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  async fetchData() {
    let response = await this.makePostRequest()
    console.log(response)
    if(response.result == "OK") {
      this.rows.unshift(
        new TableRow(this.getNow(), response.data.humidity,response.data.temperatura,response.data.pressure,response.data.orient)
      )
    }
    
  }

  mockRandomInt() {
    let min = 65;
    let max = 128;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async makePostRequest(): Promise<Result<getAdvancedDataResponse>> {
    const url = `${this.IP}/getAdvancedData`;
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

  getNow() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return `${hour}:${minute}:${second}`
  }
}
