import { NgModule } from '@angular/core';
import { PopoverMenuComponent } from './popover-menu.component';
import { POPOVER_MENU_SERVICE, PopoverMenuService } from './popover-menu.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [PopoverMenuComponent],
  declarations: [PopoverMenuComponent],
  providers: [
    {provide: POPOVER_MENU_SERVICE, useClass: PopoverMenuService}
  ],
})
export class PopoverMenuModule {
}

