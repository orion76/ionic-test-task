import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataService, IModel, TModels } from '../models/types';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, switchMap } from 'rxjs/operators';
import { log } from '../utils/rxjs.util';

export const LOCAL_STORAGE_SERVICE = new InjectionToken<IDataService>('LOCAL_STORAGE_SERVICE');


@Injectable()
export class LocalStorageService implements IDataService {


  constructor(private storage: Storage) {
  }

  getAll<M extends IModel>(type: TModels): Observable<M[]> {
    return fromPromise(this.storage.get(type));
  }

  load<M extends IModel>(type: TModels, id: number): Observable<M> {
    return this.getAll<M>(type).pipe(
      map((entities) => entities.find((entity) => entity.id === id))
    );
  }

  create<M extends IModel>(model: M): Observable<M> {
    const {type} = model;
    return this.getAll<M>(type).pipe(
      map((entities) => entities || []),
      map((entities) => {
        model.id = entities.length + 1;
        entities.push(model);
        return entities;
      }),
      switchMap((entities) => fromPromise(this.storage.set(type, entities))),
      map(() => model)
    );
  }

  delete<M extends IModel>(type: TModels, ids: number[]): Observable<M[]> {

    return this.getAll(type).pipe(
      map((entities) => {
        ids.forEach((id) => {
          const index = entities.findIndex((entity) => entity.id === id);
          if (index > -1) {
            entities.splice(index, 1);
          }
        });
        return entities;
      }),
      switchMap((entities) => fromPromise(this.storage.set(type, entities))),
    );
  }


  update<M extends IModel>(changes: M): Observable<M> {
    const {type} = changes;
    return this.getAll<M>(type).pipe(
      map((entities) => {
        entities.push(changes);
        return entities;
      }),
      switchMap((entities) => fromPromise(this.storage.set(type, entities))),
      map(() => changes)
    );
  }
}
