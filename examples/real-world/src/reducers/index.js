// @flow

import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import fetch from './fetch';
import progress from '../../../../reducer';
import type { Action } from '../actions/types';

type ActionWithApiResponse = {
  response?: {
    entities?: Object,
  },
};

type Entities = {
  [key: string]: Object,
};

const defaultEntities = {};

export function entities(
  state: Entities = defaultEntities,
  action: ActionWithApiResponse,
) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const rootReducer = combineReducers({
  entities,
  fetch,
  progress,
});

export default rootReducer;
