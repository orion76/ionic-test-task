import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { containerActions, containerActionsTypes } from './container.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IContainerModel, IDataService } from '../../types';
import { DATA_SERVICE } from '../../../services/data.service';


@Injectable()
export class ContainerEffects {


  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(containerActions.loadAll),
    mergeMap((action) => this.loadAll()),
  ));
  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(containerActions.createItem),
    mergeMap((action) => this.createItem(action.entity)),
  ));


  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(containerActions.deleteItems),
    mergeMap((action) => this.deleteItems(action.ids)),
  ));

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(containerActions.updateItem),

    mergeMap((action) => this.updateItem(action.entity),
    )));


  loadAll(): Observable<containerActionsTypes> {
    return this.dataService.getAll('container').pipe(
      map((entities: IContainerModel[]) => containerActions.loadAllSuccess({entities})),

      // catchError((error) => {
      //   this.messageService.errorGetAll(error);
      //   return of(containerActions.loadAllError({error}));
      // }),
    );
  }

  createItem(container: IContainerModel): Observable<containerActionsTypes> {
    return this.dataService.create(container).pipe(
      map((entity: IContainerModel) => containerActions.createItemSuccess({entity})),

      // catchError((error) => {
      //   this.messageService.errorCreate(container, error);
      //   return of(containerActions.createItemError({container, error}));
      // }),
    );
  }


  deleteItems(ids: number[]): Observable<containerActionsTypes> {
    return this.dataService.delete('container', ids).pipe(
      map((containers) => containerActions.deleteItemsSuccess({ids})),

      // catchError((error) => {
      //   this.messageService.errorDelete(id, error);
      //   return of(containerActions.deleteItemError({id, error}));
      // }),
    );
  }


  updateItem(update: IContainerModel): Observable<containerActionsTypes> {
    return this.dataService.update(update).pipe(
      map((updated) => containerActions.updateItemSuccess({entity: updated})),
      // catchError((error) => {
      //   this.messageService.errorUpdate(update, error);
      //   return of(containerActions.updateItemError({update, error}));
      // }),
    );
  }


  constructor(@Inject(DATA_SERVICE) private dataService: IDataService,
              // @Inject(PRODUCT_MESSAGE_SERVICE) private messageService: IProductMessageService,
              private actions$: Actions<containerActionsTypes>,
  ) {
  }


}
