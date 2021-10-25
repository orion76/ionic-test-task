import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { containerReducer, ContainerState } from '../../models/container/store/container.reducers';
import { thingReducer, ThingState } from '../../models/thing/store/thing.reducers';
import { storeItemReducer, StoreItemState } from '../../models/store-item/store/store-item.reducers';


export interface AppState {
  container: ContainerState;
  thing: ThingState;
  storeItem: StoreItemState;
}

export const reducers: ActionReducerMap<AppState> = {
  container: containerReducer,
  thing: thingReducer,
  storeItem: storeItemReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
