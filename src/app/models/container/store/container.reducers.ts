import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { createItemSuccess, deleteItemsSuccess, loadAllSuccess, updateItemSuccess } from './container.actions';
import { IContainerModel } from '../../types';


export interface ContainerState extends EntityState<IContainerModel> {
  containersLoaded: boolean;
}

export const adapter: EntityAdapter<IContainerModel> = createEntityAdapter<IContainerModel>();

export const initialState = adapter.getInitialState({
  containersLoaded: false
});

export const containerReducer = createReducer(
  initialState,

  on(loadAllSuccess, (state, action) => {
    return adapter.addMany(action.entities, {...state, containersLoaded: true});
  }),

  on(createItemSuccess, (state: ContainerState, action) => {
    return adapter.addOne(action.entity, state);
  }),

  on(deleteItemsSuccess, (state: ContainerState, action) => {
    return adapter.removeMany(action.ids, state);
  }),

  on(updateItemSuccess, (state: ContainerState, action) => {
    const {entity} = action;
    return adapter.updateOne({changes: entity, id: entity.id}, state);
  }),
);

