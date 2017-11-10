// @flow

import { CALL_API, Schemas } from '../api';
import { getContributors } from '../selectors';
import type { Dispatch, GetState, ApiCallback } from './types';

export const CONTRIBUTORS_REQUEST: string = 'CONTRIBUTORS_REQUEST';
export const CONTRIBUTORS_SUCCESS: string = 'CONTRIBUTORS_SUCCESS';
export const CONTRIBUTORS_FAILURE: string = 'CONTRIBUTORS_FAILURE';

function fetchContributors(
  owner: string,
  repo: string,
  callback: ?ApiCallback,
) {
  return {
    key: `${owner}/${repo}`,
    [CALL_API]: {
      types: [CONTRIBUTORS_REQUEST, CONTRIBUTORS_SUCCESS, CONTRIBUTORS_FAILURE],
      endpoint: `repos/${owner}/${repo}/contributors`,
      schema: Schemas.USER_ARRAY,
      showProgress: true,
      debounce: 2000,
      callback,
    },
  };
}

export function loadContributors(
  owner: string,
  repo: string,
  force: boolean,
  callback?: ApiCallback,
) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { contributors: loadedContributors } = getContributors(
      getState(),
      owner,
      repo,
    );

    if (force || loadedContributors.length === 0) {
      dispatch(fetchContributors(owner, repo, callback));
    }
  };
}
