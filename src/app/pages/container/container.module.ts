import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerRoutingModule } from './container-routing.module';

import { ContainerViewPage } from './view/container-view.page';
import { ContainerFormPage } from './form/container-form.page';
import { ContainerSelectPage } from './select/container-select.page';
import { ContainerSelectResolver } from './container-select.resolver';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerRoutingModule,
    FontAwesomeModule,
    PipesModule,
  ],
  exports: [
    ContainerSelectPage,
    ContainerViewPage,
    ContainerFormPage,
  ],
  declarations: [
    ContainerViewPage,
    ContainerFormPage,
    ContainerSelectPage,
  ],
  providers: [
    ContainerSelectResolver,
  ]
})
export class ContainerModule {
}
