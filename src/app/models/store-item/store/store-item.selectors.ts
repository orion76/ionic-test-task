import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, StoreItemState } from './store-item.reducers';
import { Dictionary } from '@ngrx/entity';
import { IBreadcrumbItem, IStoreItem, TModels, TStoreItems } from '../../types';


export const {selectAll, selectIds, selectEntities} = adapter.getSelectors();

export const storeItemsFeatureSelector = createFeatureSelector<StoreItemState>('storeItem');


export const getAllStoreItems = createSelector(
  storeItemsFeatureSelector,
  selectAll
);

export const selectStoreItems = createSelector(
  storeItemsFeatureSelector,
  selectEntities
);

export const areStoreItemsLoaded = createSelector(
  storeItemsFeatureSelector,
  state => state.storeItemsLoaded
);


export const selectStoreItem = (id: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => storeItems[id]
);


const getSibling = (parentId: number, storeItems: Dictionary<IStoreItem>, type?: TModels) => {
  return Array.from(Object.values(storeItems))
    .filter((entity) => type ? entity.item.type === type : true)
    .filter((entity) => {
      if (parentId === undefined) {
        return entity.parent === undefined;
      }
      return entity.parent ? entity.parent.id === parentId : false;
    });
};

const getFlattTree = (currentId: number, storeItems: Dictionary<IStoreItem>, tree: IStoreItem[] = []): IStoreItem[] => {
  const current = storeItems[currentId];
  tree.push(current);
  getSibling(current.id, storeItems).forEach((item) => getFlattTree(item.id, storeItems, tree));
  return tree;
};


const createBreadcrumb = (currentId: number, storeItems: Dictionary<IStoreItem>, path: IBreadcrumbItem[] = []): IBreadcrumbItem[] => {
  const current = storeItems[currentId];
  const maxCount = 2;

  if (current.parent) {
    const name = path.length < maxCount ? current.parent.item.name : '...';

    path.unshift({
      id: current.parent.id,
      name
    });
    if (path.length <= maxCount) {
      createBreadcrumb(current.parent.id, storeItems, path);
    }

  }
  return path;
};

export const selectSibling = (parentId: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => getSibling(parentId, storeItems)
);


export const selectContainerSibling = (parentId: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => getSibling(parentId, storeItems, 'container')
);

export const selectThingSibling = (parentId: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => getSibling(parentId, storeItems, 'thing')
);

export const selectBusyVolume = (parentId: number) => createSelector(
  selectSibling(parentId),
  (sibling: TStoreItems[]) => sibling.reduce((acc, entity) => acc += entity.item.volume, 0)
);


export const selectPath = (currentId: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => createBreadcrumb(currentId, storeItems)
);

export const selectTree = (currentId: number) => createSelector(
  selectStoreItems,
  (storeItems: Dictionary<IStoreItem>) => getFlattTree(currentId, storeItems)
);

export const storeItemSelectors = {
  getAllStoreItems,
  selectStoreItems,
  areStoreItemsLoaded,
  selectStoreItem,
  selectContainerSibling,
  selectThingSibling,
  selectBusyVolume,
  selectPath,
  selectTree
};
