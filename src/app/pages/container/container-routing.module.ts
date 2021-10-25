import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerViewPage } from './view/container-view.page';
import { ContainerSelectPage } from './select/container-select.page';
import { ContainerFormPage } from './form/container-form.page';
import { ContainerSelectResolver } from './container-select.resolver';

const routes: Routes = [
  {
    path: 'view',
    component: ContainerViewPage
  },
  {
    path: 'add',
    component: ContainerFormPage
  },
  {
    path: 'edit',
    component: ContainerFormPage
  },
  {
    path: 'select',
    component: ContainerSelectPage,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerRoutingModule {
}
