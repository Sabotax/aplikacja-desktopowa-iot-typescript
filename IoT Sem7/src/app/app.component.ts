import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { PanelComponent } from "./panel/panel.component";
import { DaneComponent } from "./dane/dane.component";
import { TableComponent } from "./table/table.component";
import { SettingsComponent } from "./settings/settings.component";
import { State } from './enums';
import { LedComponent } from "./led/led.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [PanelComponent,LedComponent,DaneComponent,TableComponent,SettingsComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  state = State;
  current_state: State = State.Default;
  currentIP: String = "https://32ae4481-ebc0-4c6a-b976-5870907b8d40.mock.pstmn.io";

  constructor() {}
  
  change_state(state: State) {
    if(state == this.current_state) this.current_state=State.Default
    else this.current_state=state
  }

  setIp(IP: String) {
    this.currentIP = IP;
    console.log("currentIP", this.currentIP)
  }
}
