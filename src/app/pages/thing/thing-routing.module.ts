import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingViewPage } from './view/thing-view.page';
import { ThingSelectPage } from './select/thing-select.page';
import { ThingFormPage } from './form/thing-form.page';
import { ThingSelectResolver } from './thing-select.resolver';

const routes: Routes = [
  {
    path: 'select',
    component: ThingSelectPage,
    resolve: {list: ThingSelectResolver}
  },
  {
    path: 'add',
    component: ThingFormPage
  },
  {
    path: 'edit',
    component: ThingFormPage
  },
  {
    path: '',
    redirectTo: 'select',
  },
  {
    path: '**',
    redirectTo: 'select',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThingViewPageRoutingModule {
}
