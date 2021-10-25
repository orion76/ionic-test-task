import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { storeItemSelectors } from '../../models/store-item/store/store-item.selectors';
import { storeItemActions } from '../../models/store-item/store/store-item.actions';



@Injectable()
export class StoreItemResolver implements Resolve<boolean> {

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(storeItemSelectors.areStoreItemsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(storeItemActions.loadAll());
        }
      }),
      filter(loaded => !!loaded),
      first()
    );

  }

}
