import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import fetch from './fetch';
import progress from '../../../../reducer';

const defaultEntities = {};

export function entities(state = defaultEntities, action) {
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
