import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from './types';

@Component({
  selector: 'popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
  @Input() items: IMenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
