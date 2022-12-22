import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { PanelComponent } from "./panel/panel.component";
import { State } from './enums';

@Component({
  selector: "app-root",
  imports: [PanelComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  outcomes = State;
  current_state: State = State.Default;

  constructor() {}
  
  change_state(state: State) {
    if(state == this.current_state) this.current_state=State.Default
    else this.current_state=state
  }
}
