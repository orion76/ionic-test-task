import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataService, IModel, TModels } from '../models/types';

export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');


@Injectable()
export class DataService implements IDataService {


  constructor(private http: HttpClient) {
  }

  getAll<M extends IModel>(type: TModels): Observable<M[]> {
    return this.http.get<M[]>(`/api/${type}`);
  }

  load<M extends IModel>(type: TModels, id: number): Observable<M> {
    return this.http.get<M>(`/api/${type}` + id);
  }

  create<M extends IModel>(model: IModel): Observable<M> {
    return this.http.post<M>(`/api/${model.type}`, model);
  }

  delete<M extends IModel>(type: TModels, ids: number[]): Observable<M[]> {
    return this.http.delete<M[]>(`/api/${type}/` + ids.join(','));
  }

  update<M extends IModel>(changes: M): Observable<M> {
    return this.http.put<M>(`/api/${changes.type}`, changes);
  }
}
