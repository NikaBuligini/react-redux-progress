/* eslint-disable no-use-before-define */
// @flow

export type Action = {};

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | ApiAction,
) => any;
export type GetState = () => Object;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type ApiCallback = Function | { resolve: Function, reject: Function };

type ApiMiddlewareOptions = {
  types: Array<string>,
  endpoint: string | (Object => string),
  schema?: any,
  body?: Object,
  headers?: Object,
  showProgress?: boolean,
  callback?: ApiCallback,
};

export type ApiAction = {
  [x: Symbol]: ApiMiddlewareOptions,
  key?: string | number,
};
