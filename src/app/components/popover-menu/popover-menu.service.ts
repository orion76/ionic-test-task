import { Injectable, InjectionToken } from '@angular/core';
import { IMenuItem, IPopoverMenuService } from './types';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu.component';

export const POPOVER_MENU_SERVICE = new InjectionToken('POPOVER_MENU_SERVICE');

function wrapCommand(item: IMenuItem, menu: HTMLIonPopoverElement) {
  const oldCommand = item.command;
  item.command = () => {
    menu.dismiss();
    oldCommand();
  };
}

@Injectable({providedIn: 'root'})
export class PopoverMenuService implements IPopoverMenuService {

  constructor(private popoverController: PopoverController) {
  }

  show(items: IMenuItem[]) {

    this.popoverController.create({
      component: PopoverMenuComponent,
      componentProps: {items}
    }).then((menu) => {
      items.forEach((item) => wrapCommand(item, menu));
      menu.present();
    });

  }
}
