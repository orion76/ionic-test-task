import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ContainerState } from './container.reducers';
import { Dictionary } from '@ngrx/entity';
import { IContainerModel } from '../../types';


export const {selectAll, selectIds, selectEntities} = adapter.getSelectors();

export const containersFeatureSelector = createFeatureSelector<ContainerState>('container');


export const getAllContainers = createSelector(
  containersFeatureSelector,
  selectAll
);

export const selectContainers = createSelector(
  containersFeatureSelector,
  selectEntities
);

export const areContainersLoaded = createSelector(
  containersFeatureSelector,
  state => state.containersLoaded
);


export const selectContainer = (id: number) => createSelector(
  selectContainers,
  (containers: Dictionary<IContainerModel>) => containers[id]
);

const filterByVolume = (maxVolume: number) => {
  return (containers: IContainerModel[]) => {
    return containers.filter((entity) => maxVolume === undefined ? true : entity.volume <= maxVolume);
  };
};


export const selectByVolume = (maxVolume: number) => createSelector(
  getAllContainers,
  filterByVolume(maxVolume)
);


export const containerSelectors = {
  getAllContainers,
  selectContainers,
  areContainersLoaded,
  selectContainer,
  selectByVolume
};
