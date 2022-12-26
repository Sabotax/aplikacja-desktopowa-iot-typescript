import { Component, OnInit } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css'],
  imports: [NgFor,NgClass],
  standalone: true
})
export class LedComponent implements OnInit {
  loop07: Array<Number> = [0,1,2,3,4,5,6,7]

  constructor() { }

  ngOnInit(): void {
  }

}
