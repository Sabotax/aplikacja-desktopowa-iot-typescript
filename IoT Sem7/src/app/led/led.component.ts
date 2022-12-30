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
  current_mode: Boolean = false;
  current_color: Number = 0xFF0000;

  constructor() { }

  ngOnInit(): void {
  }

  set_single(x: Number,y: Number) {
    let panel = document.getElementById(`led${x}${y}`)
    panel?.setAttribute("style",`background-color: #${this.current_color.toString(16)}`)

    console.log(panel)
    console.log(this.current_color)
    console.log(`background-color: #${this.current_color.toString(16)}`)

    //TODO request
  }

  set_all() {

  }

  clear_all() {

  }

  set_color() {

  }

  switch_mode() {

  }

  get_set_colors() {

  }

}
