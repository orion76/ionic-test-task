import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { ENTITY_SELECT_SERVICE, EntitySelectService } from './services/entity-select.service';
import { ContainerEffects } from './models/container/store/container.effects';
import { DATA_SERVICE, DataService } from './services/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataInterceptor } from './services/data.interceptor';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from './pipes/pipes.module';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LOCAL_STORAGE_SERVICE, LocalStorageService } from './services/local-storage.service';
import { ThingEffects } from './models/thing/store/thing.effects';
import { StoreItemEffects } from './models/store-item/store/store-item.effects';
import { STORE_ITEM_DATA_SERVICE, UserStoreDataService } from './models/store-item/services/user-store-data.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PopoverMenuModule } from './components/popover-menu/popover-menu.module';
import { UserAuthModule } from './pages/user/login/user-auth.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: true,
    //   autoPause: true,
    //
    // }),
    EffectsModule.forRoot([
      ContainerEffects,
      ThingEffects,
      StoreItemEffects,
    ]),
    PipesModule,
    PopoverMenuModule,
    UserAuthModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: DataInterceptor, multi: true},

    {provide: DATA_SERVICE, useClass: DataService},
    {provide: LOCAL_STORAGE_SERVICE, useClass: LocalStorageService},
    {provide: STORE_ITEM_DATA_SERVICE, useClass: UserStoreDataService},
    {provide: ENTITY_SELECT_SERVICE, useClass: EntitySelectService},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
