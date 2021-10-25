import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContainerSelectResolver } from './pages/container/container-select.resolver';
import { ThingSelectResolver } from './pages/thing/thing-select.resolver';
import { AuthGuard } from './pages/user/login/services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    resolve: {container: ContainerSelectResolver, thing: ThingSelectResolver},

  },
  {
    path: 'container',
    loadChildren: () => import('./pages/container/container.module').then(m => m.ContainerModule),
    resolve: {list: ContainerSelectResolver}
  },
  {
    path: 'thing',
    loadChildren: () => import('./pages/thing/thing.module').then(m => m.ThingModule),
    resolve: {list: ThingSelectResolver}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
