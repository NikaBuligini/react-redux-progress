import { combineReducers } from 'redux';
import union from 'lodash/union';
import * as ActionTypes from '../actions';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export const fetchStatus = ({
  types,
  mapActionToKey,
  initialState,
  retrieveData,
}) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  let initialStatusState = {
    isFetching: false,
    loaded: false,
    loadedAt: null,
    errors: [],
  };

  if (typeof initialState === 'object') {
    initialStatusState = { ...initialStatusState, ...initialState };
  }

  /* eslint-disable default-case, consistent-return */
  const updateFetchStatus = (state = initialStatusState, action) => {
    switch (action.type) {
      case requestType: {
        return {
          ...state,
          isFetching: true,
          errors: [],
        };
      }
      case successType: {
        const data = retrieveData ? retrieveData(state, action) : {};
        return {
          ...state,
          isFetching: false,
          loaded: true,
          loadedAt: Date.now(),
          ...data,
        };
      }
      case failureType: {
        return {
          ...state,
          isFetching: false,
          loaded: true,
          loadedAt: Date.now(),
          errors: action.error || ['Something bad happened'],
        };
      }
    }
  };
  /* eslint-enable default-case, consistent-return */

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string' && typeof key !== 'number') {
          throw new Error('Expected key to be a string or number.');
        }
        return {
          ...state,
          [key]: updateFetchStatus(state[key], action),
        };
      }
      default: {
        return state;
      }
    }
  };
};

const fetch = combineReducers({
  contributorsByRepo: fetchStatus({
    mapActionToKey: action => action.key,
    types: [
      ActionTypes.CONTRIBUTORS_REQUEST,
      ActionTypes.CONTRIBUTORS_SUCCESS,
      ActionTypes.CONTRIBUTORS_FAILURE,
    ],
    initialState: { ids: [] },
    retrieveData: (state, action) => ({
      ids: union(state.ids, action.response.result),
    }),
  }),
});

export default fetch;
