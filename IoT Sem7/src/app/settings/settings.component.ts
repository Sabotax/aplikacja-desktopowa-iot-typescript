import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true
})
export class SettingsComponent implements OnInit {
  IPValue: String = "http://localhost:80";
  @Output() eventChangeIP = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  emitChangeIP() {
    let IPInput = <HTMLInputElement>document.getElementById('IPInput');
    this.IPValue = IPInput.value;
    this.eventChangeIP.emit(this.IPValue)
  }

}
