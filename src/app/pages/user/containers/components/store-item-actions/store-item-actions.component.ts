import { Component, Input, OnInit } from '@angular/core';
import { IStoreItemContainer, IStoreItemThing } from '../../../../../models/types';

@Component({
  selector: 'app-store-item-info',
  templateUrl: './store-item-actions.component.html',
  styleUrls: ['./store-item-actions.component.scss'],
})
export class StoreItemActionsComponent implements OnInit {

  @Input() entity: IStoreItemContainer | IStoreItemThing;

  constructor() {
  }

  ngOnInit() {
  }

}
