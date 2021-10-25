import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRoutingModule } from './user-routing.module';

import { UserContainersPage } from './containers/user-containers.page';
import { PipesModule } from '../../pipes/pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreItemResolver } from './store-item.resolver';
import { StoreItemInfoComponent } from './containers/components/store-item-info/store-item-info.component';
import { StoreItemContainersComponent } from './containers/components/store-item-containers/store-item-containers.component';
import { StoreItemBreadcrumbComponent } from './containers/components/store-item-breadcrumb/store-item-breadcrumb.component';
import { StoreItemThingsComponent } from './containers/components/store-item-things/store-item-things.component';
import { StoreItemActionsComponent } from './containers/components/store-item-actions/store-item-actions.component';
import { UserAuthModule } from './login/user-auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRoutingModule,
    FontAwesomeModule,
    PipesModule,

  ],
  exports: [UserContainersPage],
  declarations: [
    UserContainersPage,
    StoreItemInfoComponent,
    StoreItemContainersComponent,
    StoreItemThingsComponent,
    StoreItemBreadcrumbComponent,
    StoreItemActionsComponent,
  ],
  providers: [StoreItemResolver]
})
export class UserModule {
}
