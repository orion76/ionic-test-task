import { createAction, props, union } from '@ngrx/store';
import { IContainerModel } from '../../types';


export enum EContainerActions {
  LOAD_ALL = '[Containers List] LOAD_ALL',
  LOAD_ALL_SUCCESS = '[Container] LOAD_ALL_SUCCESS',
  LOAD_ALL_ERROR = '[Container] LOAD_ALL_ERROR',
  CREATE_ITEM = '[Container] CREATE_ITEM',
  CREATE_ITEM_SUCCESS = '[Container] CREATE_ITEM_SUCCESS',
  CREATE_ITEM_ERROR = '[Container] CREATE_ITEM_ERROR',
  UPDATE_ITEM = '[Container] UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS = '[Container] UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_ERROR = '[Container] UPDATE_ITEM_ERROR',
  DELETE_ITEMS = '[Container] DELETE_ITEMS',
  DELETE_ITEMS_SUCCESS = '[Container] DELETE_ITEMS_SUCCESS',
  DELETE_ITEMS_ERROR = '[Container] DELETE_ITEMS_ERROR',
}

export const loadAll = createAction(
  EContainerActions.LOAD_ALL
);
export const loadAllSuccess = createAction(
  EContainerActions.LOAD_ALL_SUCCESS,
  props<{ entities: IContainerModel[] }>()
);
export const loadAllError = createAction(
  EContainerActions.LOAD_ALL_ERROR,
  props<{ error: string }>()
);


export const createItem = createAction(
  EContainerActions.CREATE_ITEM,
  props<{ entity: IContainerModel }>()
);

export const createItemSuccess = createAction(
  EContainerActions.CREATE_ITEM_SUCCESS,
  props<{ entity: IContainerModel }>()
);


export const createItemError = createAction(
  EContainerActions.CREATE_ITEM_ERROR,
  props<{ entity: IContainerModel, error: string }>()
);


export const updateItem = createAction(
  EContainerActions.UPDATE_ITEM,
  props<{ entity: IContainerModel }>()
);


export const updateItemSuccess = createAction(
  EContainerActions.UPDATE_ITEM_SUCCESS,
  props<{ entity: IContainerModel }>()
);


export const updateItemError = createAction(
  EContainerActions.UPDATE_ITEM_ERROR,
  props<{ entity: IContainerModel, error: string }>()
);

export const deleteItems = createAction(
  EContainerActions.DELETE_ITEMS,
  props<{ ids: number[] }>()
);
export const deleteItemsSuccess = createAction(
  EContainerActions.DELETE_ITEMS_SUCCESS,
  props<{ ids: number[] }>()
);


export const deleteItemsError = createAction(
  EContainerActions.DELETE_ITEMS_ERROR,
  props<{ ids: number[], error: string }>()
);

export const containerActions = {
  loadAll,
  loadAllSuccess,
  loadAllError,
  createItem,
  createItemSuccess,
  createItemError,
  updateItem,
  updateItemSuccess,
  updateItemError,
  deleteItems,
  deleteItemsSuccess,
  deleteItemsError,

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
  deleteItems,
  deleteItemsSuccess,
  deleteItemsError,

});

export type containerActionsTypes = typeof all;
