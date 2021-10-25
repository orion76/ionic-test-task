import { Observable } from 'rxjs';

export type TModels = 'thing' | 'container' | 'store-item';


export interface IModel {
  type: TModels;
  id?: number;
  name?: string;
}


export interface IContainerModel extends IModel {
  type: 'container';
  name: string;
  description: string;
  icon: string;
  volume: number;
}


export interface IThingModel extends IModel {
  type: 'thing';
  name: string;
  description: string;
  icon: string;
  volume: number;
}

export interface IStoreItem extends IModel {
  type: 'store-item';
  item: IModel;
  parent?: IStoreItem;
}

export interface IStoreItemContainer extends IStoreItem {
  type: 'store-item';
  item: IContainerModel;
}

export interface IStoreItemThing extends IStoreItem {
  type: 'store-item';
  item: IThingModel;
}

export type TStoreItems = IStoreItemContainer | IStoreItemThing;

export interface IDataService {
  getAll<M extends IModel>(type: TModels): Observable<M[]>;

  load<M extends IModel>(type: TModels, id: number): Observable<M>;

  create<M extends IModel>(model: M): Observable<M>;

  delete<M extends IModel>(type: TModels, ids: number[]): Observable<M[]>;

  update<M extends IModel>(changes: M): Observable<M>;

}

export interface IUserStoreDataService {
  getAll(): Observable<IStoreItem[]>;

  load(id: number): Observable<IStoreItem>;

  create(model: IStoreItem): Observable<IStoreItem>;

  delete(ids: number[]): Observable<any>;

  update(changes: Partial<IStoreItem>): Observable<any>;
}

export interface IBreadcrumbItem {
  id: number;
  name: string;
}
