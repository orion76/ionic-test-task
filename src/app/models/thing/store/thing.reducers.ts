import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { createItemSuccess, deleteItemsSuccess, loadAllSuccess, updateItemSuccess } from './thing.actions';
import { IThingModel } from '../../types';


export interface ThingState extends EntityState<IThingModel> {
  thingsLoaded: boolean;
}

export const adapter: EntityAdapter<IThingModel> = createEntityAdapter<IThingModel>();

export const initialState = adapter.getInitialState({
  thingsLoaded: false
});

export const thingReducer = createReducer(
  initialState,

  on(loadAllSuccess, (state, action) => {
    return adapter.addMany(
      action.entities,
      {...state, thingsLoaded: true}
    );
  }),

  on(createItemSuccess, (state, action) => {
    return adapter.addOne(action.entity, state);
  }),

  on(deleteItemsSuccess, (state, action) => {
    return adapter.removeMany(action.ids, state);
  }),

  on(updateItemSuccess, (state, action) => {
    const {entity} = action;
    return adapter.updateOne({changes: entity, id: entity.id}, state);
  }),
);

