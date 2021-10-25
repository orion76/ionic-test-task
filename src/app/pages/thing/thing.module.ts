import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThingViewPageRoutingModule } from './thing-routing.module';

import { ThingViewPage } from './view/thing-view.page';
import { ThingFormPage } from './form/thing-form.page';
import { ThingSelectPage } from './select/thing-select.page';
import { ThingSelectResolver } from './thing-select.resolver';
import { PipesModule } from '../../pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ThingViewPageRoutingModule,
    PipesModule
  ],
  exports: [
    ThingSelectPage,
    ThingViewPage,
    ThingFormPage,
  ],
  declarations: [
    ThingSelectPage,
    ThingViewPage,
    ThingFormPage,
  ],
  providers: [
    ThingSelectResolver,
  ]
})
export class ThingModule {
}
