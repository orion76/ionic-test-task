import { createAction, props, union } from '@ngrx/store';
import { IStoreItem } from '../../types';


export enum EStoreItemActions {
  LOAD_ALL = '[StoreItems List] LOAD_ALL',
  LOAD_ALL_SUCCESS = '[StoreItem] LOAD_ALL_SUCCESS',
  LOAD_ALL_ERROR = '[StoreItem] LOAD_ALL_ERROR',
  CREATE_ITEM = '[StoreItem] CREATE_ITEM',
  CREATE_ITEM_SUCCESS = '[StoreItem] CREATE_ITEM_SUCCESS',
  CREATE_ITEM_ERROR = '[StoreItem] CREATE_ITEM_ERROR',
  UPDATE_ITEM = '[StoreItem] UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS = '[StoreItem] UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_ERROR = '[StoreItem] UPDATE_ITEM_ERROR',
  DELETE_ITEM = '[StoreItem] DELETE_ITEM',
  DELETE_TREE = '[StoreItem] DELETE_TREE',
  DELETE_TREE_SUCCESS = '[StoreItem] DELETE_TREE_SUCCESS',
  DELETE_TREE_ERROR = '[StoreItem] DELETE_TREE_ERROR',
}

export const loadAll = createAction(
  EStoreItemActions.LOAD_ALL
);
export const loadAllSuccess = createAction(
  EStoreItemActions.LOAD_ALL_SUCCESS,
  props<{ entities: IStoreItem[] }>()
);
export const loadAllError = createAction(
  EStoreItemActions.LOAD_ALL_ERROR,
  props<{ error: string }>()
);


export const createItem = createAction(
  EStoreItemActions.CREATE_ITEM,
  props<{ entity: IStoreItem }>()
);

export const createItemSuccess = createAction(
  EStoreItemActions.CREATE_ITEM_SUCCESS,
  props<{ entity: IStoreItem }>()
);


export const createItemError = createAction(
  EStoreItemActions.CREATE_ITEM_ERROR,
  props<{ entity: IStoreItem, error: string }>()
);


export const updateItem = createAction(
  EStoreItemActions.UPDATE_ITEM,
  props<{ entity: IStoreItem }>()
);


export const updateItemSuccess = createAction(
  EStoreItemActions.UPDATE_ITEM_SUCCESS,
  props<{ entity: IStoreItem }>()
);


export const updateItemError = createAction(
  EStoreItemActions.UPDATE_ITEM_ERROR,
  props<{ entity: IStoreItem, error: string }>()
);

export const deleteItem = createAction(
  EStoreItemActions.DELETE_ITEM,
  props<{ id: number }>()
);

export const deleteTree = createAction(
  EStoreItemActions.DELETE_TREE,
  props<{ ids: number[] }>()
);


export const deleteTreeSuccess = createAction(
  EStoreItemActions.DELETE_TREE_SUCCESS,
  props<{ ids: number[] }>()
);


export const deleteTreeError = createAction(
  EStoreItemActions.DELETE_TREE_ERROR,
  props<{ ids: number[], error: string }>()
);

export const storeItemActions = {
  loadAll,
  loadAllSuccess,
  loadAllError,
  createItem,
  createItemSuccess,
  createItemError,
  updateItem,
  updateItemSuccess,
  updateItemError,
  deleteItem,
  deleteTree,
  deleteTreeSuccess,
  deleteTreeError,

};

const all = union({
  loadAll,
  loadAllSuccess,
  loadAllError,
  createItem,
  createItemSuccess,
  createItemError,
  updateItem,
  updateItemSuccess,
  updateItemError,
  deleteItem,
  deleteTree,
  deleteTreeSuccess,
  deleteTreeError,

});

export type storeItemActionsTypes = typeof all;
