import { createAction, props, union } from '@ngrx/store';
import { IThingModel } from '../../types';


export enum EThingActions {
  LOAD_ALL = '[Things List] LOAD_ALL',
  LOAD_ALL_SUCCESS = '[Thing] LOAD_ALL_SUCCESS',
  LOAD_ALL_ERROR = '[Thing] LOAD_ALL_ERROR',
  CREATE_ITEM = '[Thing] CREATE_ITEM',
  CREATE_ITEM_SUCCESS = '[Thing] CREATE_ITEM_SUCCESS',
  CREATE_ITEM_ERROR = '[Thing] CREATE_ITEM_ERROR',
  UPDATE_ITEM = '[Thing] UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS = '[Thing] UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_ERROR = '[Thing] UPDATE_ITEM_ERROR',
  DELETE_ITEM = '[Thing] DELETE_ITEM',
  DELETE_ITEM_SUCCESS = '[Thing] DELETE_ITEM_SUCCESS',
  DELETE_ITEM_ERROR = '[Thing] DELETE_ITEM_ERROR',
}

export const loadAll = createAction(
  EThingActions.LOAD_ALL
);
export const loadAllSuccess = createAction(
  EThingActions.LOAD_ALL_SUCCESS,
  props<{ entities: IThingModel[] }>()
);
export const loadAllError = createAction(
  EThingActions.LOAD_ALL_ERROR,
  props<{ error: string }>()
);


export const createItem = createAction(
  EThingActions.CREATE_ITEM,
  props<{ entity: IThingModel }>()
);

export const createItemSuccess = createAction(
  EThingActions.CREATE_ITEM_SUCCESS,
  props<{ entity: IThingModel }>()
);


export const createItemError = createAction(
  EThingActions.CREATE_ITEM_ERROR,
  props<{ entity: IThingModel, error: string }>()
);


export const updateItem = createAction(
  EThingActions.UPDATE_ITEM,
  props<{ entity: IThingModel }>()
);


export const updateItemSuccess = createAction(
  EThingActions.UPDATE_ITEM_SUCCESS,
  props<{ entity: IThingModel }>()
);


export const updateItemError = createAction(
  EThingActions.UPDATE_ITEM_ERROR,
  props<{ entity: IThingModel, error: string }>()
);

export const deleteItems = createAction(
  EThingActions.DELETE_ITEM,
  props<{ ids: number[] }>()
);
export const deleteItemsSuccess = createAction(
  EThingActions.DELETE_ITEM_SUCCESS,
  props<{ ids: number[] }>()
);


export const deleteItemsError = createAction(
  EThingActions.DELETE_ITEM_ERROR,
  props<{ id: number, error: string }>()
);

export const thingActions = {
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

export type thingActionsTypes = typeof all;
