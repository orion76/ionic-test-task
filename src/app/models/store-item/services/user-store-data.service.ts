import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IContainerModel, IDataService, IStoreItem, IThingModel, IUserStoreDataService, TModels } from '../../types';
import { filter, withLatestFrom } from 'rxjs/operators';
import { LOCAL_STORAGE_SERVICE } from '../../../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { containerSelectors } from '../../container/store/container.selectors';
import { thingSelectors } from '../../thing/store/thing.selectors';

export const STORE_ITEM_DATA_SERVICE = new InjectionToken('STORE_ITEM_DATA_SERVICE');


@Injectable()
export class UserStoreDataService implements IUserStoreDataService {

  entityType: TModels = 'store-item';

  containers$: Observable<IContainerModel[]>;
  things$: Observable<IThingModel[]>;


  constructor(@Inject(LOCAL_STORAGE_SERVICE) private localStorage: IDataService,
              private store: Store<AppState>
  ) {
    this.containers$ = this.store.select(containerSelectors.getAllContainers).pipe(filter<IContainerModel[]>(Boolean));
    this.things$ = this.store.select(thingSelectors.getAllThings).pipe(filter<IThingModel[]>(Boolean));
  }

  findById(id: number) {
    return (entity) => entity.id === id;
  }

  fillStoreItem(storeItem: IStoreItem, containers: IContainerModel[], things: IThingModel[]) {

    const entity = {...storeItem};

    switch (entity.item.type) {
      case 'container':
        entity.item = containers.find(this.findById(entity.item.id));
        break;

      case 'thing':
        entity.item = things.find(this.findById(entity.item.id));
        break;
    }
    return entity;
  }

  getAll(): Observable<IStoreItem[]> {
    const {containers$, things$} = this;

    return this.localStorage.getAll<IStoreItem>(this.entityType).pipe(
      withLatestFrom(containers$, things$, (items, containers, things) => {
        return items ? items.map((item) => this.fillStoreItem(item, containers, things)) : [];
      })
    );
  }

  load(id: number): Observable<IStoreItem> {
    const {containers$, things$} = this;
    return this.localStorage.load<IStoreItem>('store-item', id).pipe(
      withLatestFrom(containers$, things$, (item, containers, things) => {
        return this.fillStoreItem(item, containers, things);
      })
    );
  }

  toShort(fullEntity: Partial<IStoreItem>) {
    const {id, type, name} = fullEntity.item;
    const shortEntity: IStoreItem = {
      type: 'store-item',
      item: {id, type, name}
    };

    if (fullEntity.parent) {
      shortEntity.parent = fullEntity.parent;
    }
    return shortEntity;
  }

  create(fullEntity: IStoreItem): Observable<IStoreItem> {
    const {containers$, things$} = this;
    return this.localStorage.create(this.toShort(fullEntity)).pipe(
      withLatestFrom(containers$, things$, (item, containers, things) => {
        return this.fillStoreItem(item, containers, things);
      })
    );
  }

  delete(ids: number[]): Observable<any> {
    return this.localStorage.delete('store-item', ids);
  }

  update(changes: Partial<IStoreItem>): Observable<any> {
    const {containers$, things$} = this;
    return this.localStorage.create(this.toShort(changes)).pipe(
      withLatestFrom(containers$, things$, (item, containers, things) => {
        return this.fillStoreItem(item, containers, things);
      })
    );
  }

}
