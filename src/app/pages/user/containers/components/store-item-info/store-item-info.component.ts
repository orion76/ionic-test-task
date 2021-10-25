import { Component, Input, OnInit } from '@angular/core';
import { IStoreItemContainer, IStoreItemThing } from '../../../../../models/types';

@Component({
  selector: 'store-item-info',
  templateUrl: './store-item-info.component.html',
  styleUrls: ['./store-item-info.component.scss'],
})
export class StoreItemInfoComponent implements OnInit {

  @Input() entity: IStoreItemContainer | IStoreItemThing;
  @Input() busyVolume;

  constructor() {
  }

  get freeVolume() {
    return this.entity.item.volume - this.busyVolume;
  }

  ngOnInit() {
  }

}
