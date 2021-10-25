import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { thingSelectors } from '../../models/thing/store/thing.selectors';
import { thingActions } from '../../models/thing/store/thing.actions';


@Injectable({providedIn: 'root'})
export class ThingSelectResolver implements Resolve<boolean> {

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(thingSelectors.areThingsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(thingActions.loadAll());
        }
      }),
      filter(loaded => !!loaded),
      first()
    );

  }

}
