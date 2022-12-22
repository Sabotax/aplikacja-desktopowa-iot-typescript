import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class PanelComponent  {
    @Input() id!: String;
    @Input() label!: String;
    @Input() active!: Boolean;
  constructor(
  ) { }


}
