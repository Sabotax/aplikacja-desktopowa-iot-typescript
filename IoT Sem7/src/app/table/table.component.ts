import { Component, OnInit } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';
import { TableRow } from '../classes'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [NgFor,NgClass],
  standalone: true
})
export class TableComponent implements OnInit {
  intervalId: any;
  rows: Array<TableRow> = []

  constructor() { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 500);

  }

  fetchData() {
    this.rows.unshift(
      new TableRow(
        String.fromCharCode(this.mockRandomInt()),
        this.mockRandomInt()
      )
    )
  }

  mockRandomInt() {
    let min = 65;
    let max = 128;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
