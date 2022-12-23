import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State } from '../enums';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  standalone: true,
  imports: [NgIf,NgClass]
})
export class PanelComponent  {
    @Input() id!: String;
    @Input() label!: String;
    @Input() active!: Boolean;
    @Input() state!: State;
    @Input() parent_state!: State;
    @Output() myEvent = new EventEmitter<State>();

  constructor(
  ) { }

  activate_state() {
    if(this.state == this.parent_state) {
      this.myEvent.emit(this.state)
    }
    else {
      this.myEvent.emit(this.state)
    }
  }

}
