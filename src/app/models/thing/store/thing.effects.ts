import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { thingActions, thingActionsTypes } from './thing.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDataService, IThingModel } from '../../types';
import { DATA_SERVICE } from '../../../services/data.service';


@Injectable()
export class ThingEffects {

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(thingActions.loadAll),
    mergeMap((action) => this.loadAll()),
  ));
  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(thingActions.createItem),
    mergeMap((action) => this.createItem(action.entity)),
  ));


  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(thingActions.deleteItems),
    mergeMap((action) => this.deleteItems(action.ids)),
  ));

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(thingActions.updateItem),

    mergeMap((action) => this.updateItem(action.entity),
    )));


  loadAll(): Observable<thingActionsTypes> {
    return this.dataService.getAll('thing').pipe(
      map((entities: IThingModel[]) => thingActions.loadAllSuccess({entities})),

      // catchError((error) => {
      //   this.messageService.errorGetAll(error);
      //   return of(thingActions.loadAllError({error}));
      // }),
    );
  }

  createItem(thing: IThingModel): Observable<thingActionsTypes> {
    return this.dataService.create(thing).pipe(
      map((entity: IThingModel) => thingActions.createItemSuccess({entity})),

      // catchError((error) => {
      //   this.messageService.errorCreate(thing, error);
      //   return of(thingActions.createItemError({thing, error}));
      // }),
    );
  }


  deleteItems(ids: number[]): Observable<thingActionsTypes> {
    return this.dataService.delete('thing', ids).pipe(
      map((things) => thingActions.deleteItemsSuccess({ids})),

      // catchError((error) => {
      //   this.messageService.errorDelete(id, error);
      //   return of(thingActions.deleteItemError({id, error}));
      // }),
    );
  }


  updateItem(entity: IThingModel): Observable<thingActionsTypes> {
    return this.dataService.update(entity).pipe(
      map((updated) => thingActions.updateItemSuccess({entity: updated})),
      // catchError((error) => {
      //   this.messageService.errorUpdate(update, error);
      //   return of(thingActions.updateItemError({update, error}));
      // }),
    );
  }


  constructor(@Inject(DATA_SERVICE) private dataService: IDataService,
              // @Inject(PRODUCT_MESSAGE_SERVICE) private messageService: IProductMessageService,
              private actions$: Actions<thingActionsTypes>,
  ) {
  }


}
