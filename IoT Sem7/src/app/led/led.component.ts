import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgFor,NgClass } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, } from '@angular/common/http';
import { getPixelsResponse,Result } from '../classes';
@Injectable()
@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css'],
  imports: [NgFor,NgClass,HttpClientModule],
  standalone: true
})
export class LedComponent implements OnInit {
  loop07: Array<Number> = [0,1,2,3,4,5,6,7]
  current_mode: Boolean = false;
  current_color: String = "FF0000";
  
  led_grid: Array<Array<HTMLElement>> = [[],[],[],[],[],[],[],[]]

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    for(let i = 0; i<8;i++) {
      for(let j = 0; j< 8; j++) {
        this.led_grid[i].push(document.getElementById(`led${i}${j}`)!)
      }
    }
    this.get_pixels();
    this.current_color = ((document.getElementById("input_color") as HTMLInputElement).value).replace("#","")
  }

  change_color(event: Event) {
    let input = event.target as HTMLInputElement
    this.current_color = input.value.replace("#","")
    console.log(this.current_color)
  }

  set_all(color: String) {
      const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/setAllPixels';
      let data = {
        color: color
      }
      try {
        this.http.post(url, data).toPromise();
        //console.log(response)
        // handle the response
      } catch (error) {
        // handle the error
        //console.log(error)
      }

      for(let i =0;i<8;i++) {
        for(let j = 0 ; j<8;j++){
          this.led_grid[i][j].setAttribute("style",`background-color: #${color}`)
        }
      }
  }

  clear_all() {
    const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/setAllPixels';
    let data = {
      color: "FFFFFF"
    }
    try {
      this.http.post(url, data).toPromise();
      //console.log(response)
      // handle the response
    } catch (error) {
      // handle the error
      //console.log(error)
    }
    for(let i =0;i<8;i++) {
      for(let j = 0 ; j<8;j++){
        this.led_grid[i][j].setAttribute("style",`background-color: #000000`)
      }
    }
  }

  set_color(x: Number, y: Number, color: String) {
    if(!this.current_mode) {
      const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/setSinglePixel';
      let data = {
        x: x,
        y: y,
        color: color
      }
      try {
        this.http.post(url, data).toPromise();
        //console.log(response)
        // handle the response
      } catch (error) {
        // handle the error
        //console.log(error)
      }
      this.led_grid[x as number][y as number].setAttribute("style",`background-color: #${color}`)
    }
    else {
      const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/setSinglePixel';
      let data = {
        x: x,
        y: y,
        color: "FFFFFF"
      }
      try {
        this.http.post(url, data).toPromise();
        //console.log(response)
        // handle the response
      } catch (error) {
        // handle the error
        //console.log(error)
      }
      this.led_grid[x as number][y as number].setAttribute("style",`background-color: #000000`)
    }
    
  }

  switch_mode() {
    this.current_mode = !this.current_mode
  }

  async get_pixels() {
    const url = 'https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io/getPixels';
    let data = null
    let result_grid: Result<Array<Array<Number>>>
    try {
      const response = await this.http.post(url, data).toPromise();
      //console.log(response)
      result_grid= new Result(response)
      // handle the response
    } catch (error) {
      // handle the error
      //console.log(error)
      result_grid= new Result(error)
    }

    console.log("result_grid",result_grid)

    console.log("grid",this.led_grid)

    console.log("test3",this.led_grid[0][0])

    if(result_grid.result=="OK") {
      for(let i = 0; i<8;i++) {
        for(let j = 0; j< 8; j++) {
          this.led_grid[i][j].setAttribute("style",`background-color: #${result_grid.data[8*i+j][0].toString(16)}${result_grid.data[8*i+j][1].toString(16)}${result_grid.data[8*i+j][2].toString(16)}`)
        }
      }
    }
  }
}
