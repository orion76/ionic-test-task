import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { storeItemActions, storeItemActionsTypes } from './store-item.actions';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IStoreItem, IUserStoreDataService } from '../../types';
import { STORE_ITEM_DATA_SERVICE } from '../services/user-store-data.service';
import { AppState } from '../../../store/reducers';
import { select, Store } from '@ngrx/store';
import { storeItemSelectors } from './store-item.selectors';


@Injectable()
export class StoreItemEffects {

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(storeItemActions.loadAll),
    mergeMap((action) => this.loadAll()),
  ));
  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(storeItemActions.createItem),
    mergeMap((action) => this.createItem(action.entity)),
  ));


  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(storeItemActions.deleteItem),
    switchMap((action) => this.store.pipe(select(storeItemSelectors.selectTree(action.id)), take(1))),
    map((items: IStoreItem[]) => items.map((item) => item.id)),
    map((ids) => storeItemActions.deleteTree({ids})),
  ));

  deleteTree$ = createEffect(() => this.actions$.pipe(
    ofType(storeItemActions.deleteTree),
    mergeMap((action) => this.deleteTree(action.ids)),
  ));


  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(storeItemActions.updateItem),

    mergeMap((action) => this.updateItem(action.entity),
    )));


  deleteTree(ids: number[]): Observable<storeItemActionsTypes> {
    return this.dataService.delete(ids).pipe(
      map(() => storeItemActions.deleteTreeSuccess({ids})),
    );
  }


  loadAll(): Observable<storeItemActionsTypes> {
    return this.dataService.getAll().pipe(
      map((entities: IStoreItem[]) => storeItemActions.loadAllSuccess({entities})),
    );
  }

  createItem(storeItem: IStoreItem): Observable<storeItemActionsTypes> {
    return this.dataService.create(storeItem).pipe(
      map((entity: IStoreItem) => storeItemActions.createItemSuccess({entity})),
      catchError((error) => {
        console.error(error);
        return of(null);
      }),
    );
  }


  deleteItem(ids: number[]): Observable<storeItemActionsTypes> {
    return this.dataService.delete(ids).pipe(
      map((storeItems) => storeItemActions.deleteTreeSuccess({ids})),

      // catchError((error) => {
      //   this.messageService.errorDelete(id, error);
      //   return of(storeItemActions.deleteItemError({id, error}));
      // }),
    );
  }


  updateItem(entity: IStoreItem): Observable<storeItemActionsTypes> {
    return this.dataService.update(entity).pipe(
      map((updated) => storeItemActions.updateItemSuccess({entity: updated})),
      // catchError((error) => {
      //   this.messageService.errorUpdate(update, error);
      //   return of(storeItemActions.updateItemError({update, error}));
      // }),
    );
  }


  constructor(@Inject(STORE_ITEM_DATA_SERVICE) private dataService: IUserStoreDataService,
              private actions$: Actions<storeItemActionsTypes>,
              private store: Store<AppState>
  ) {
  }


}
