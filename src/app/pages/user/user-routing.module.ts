import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserContainersPage } from './containers/user-containers.page';
import { StoreItemResolver } from './store-item.resolver';
import { UserAuthComponent } from './login/form/user-auth.component';
import { AuthentificatedGuard } from './login/services/authentificated.guard';
import { AuthGuard } from './login/services/auth.guard';

const routes: Routes = [
  {
    path: 'containers',
    component: UserContainersPage,
    resolve: {list: StoreItemResolver},
    canActivate: [AuthGuard],

  },
  {
    path: 'containers/:id',
    component: UserContainersPage,
    resolve: {list: StoreItemResolver},
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: UserAuthComponent,
    canActivate: [AuthentificatedGuard]
  },
  {
    path: '**',
    redirectTo: 'containers'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
