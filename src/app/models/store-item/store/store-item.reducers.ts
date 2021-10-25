import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { createItemSuccess, deleteTreeSuccess, loadAllSuccess, updateItemSuccess } from './store-item.actions';
import { IStoreItem } from '../../types';


export interface StoreItemState extends EntityState<IStoreItem> {
  storeItemsLoaded: boolean;
}

export const adapter: EntityAdapter<IStoreItem> = createEntityAdapter<IStoreItem>();

export const initialState = adapter.getInitialState({
  storeItemsLoaded: false
});

export const storeItemReducer = createReducer(
  initialState,

  on(loadAllSuccess, (state, action) => {
    return adapter.addMany(
      action.entities,
      {...state, storeItemsLoaded: true}
    );
  }),

  on(createItemSuccess, (state, action) => {
    return adapter.addOne(action.entity, state);
  }),

  on(deleteTreeSuccess, (state, action) => {
    return adapter.removeMany(action.ids, state);
  }),

  on(updateItemSuccess, (state, action) => {
    const {entity} = action;
    return adapter.updateOne({changes: entity, id: entity.id}, state);
  }),
);

