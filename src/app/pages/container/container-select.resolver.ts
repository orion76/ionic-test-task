import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { containerSelectors } from '../../models/container/store/container.selectors';
import { containerActions } from '../../models/container/store/container.actions';


@Injectable({providedIn: 'root'})
export class ContainerSelectResolver implements Resolve<boolean> {

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(containerSelectors.areContainersLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(containerActions.loadAll());
        }
      }),
      filter(loaded => !!loaded),
      first()
    );

  }

}
