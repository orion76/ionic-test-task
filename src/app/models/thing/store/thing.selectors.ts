import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ThingState } from './thing.reducers';
import { Dictionary } from '@ngrx/entity';
import { IThingModel } from '../../types';


export const {selectAll, selectIds, selectEntities} = adapter.getSelectors();

export const thingsFeatureSelector = createFeatureSelector<ThingState>('thing');


export const getAllThings = createSelector(
  thingsFeatureSelector,
  selectAll
);

export const selectThings = createSelector(
  thingsFeatureSelector,
  selectEntities
);

export const areThingsLoaded = createSelector(
  thingsFeatureSelector,
  state => state.thingsLoaded
);


export const selectThing = (props: { id: number }) => createSelector(
  selectThings,
  (things: Dictionary<IThingModel>) => things[props.id]
);

const filterByVolume = (maxVolume: number) => {
  return (containers: IThingModel[]) => {
    return containers.filter((entity) => maxVolume === undefined ? true : entity.volume <= maxVolume);
  };
};


export const selectByVolume = (maxVolume: number) => createSelector(
  getAllThings,
  filterByVolume(maxVolume)
);


export const thingSelectors = {
  getAllThings,
  selectThings,
  areThingsLoaded,
  selectThing,
  selectByVolume,
};
