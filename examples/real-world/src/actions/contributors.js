import { CALL_API, Schemas } from '../api';
import { getContributors } from '../selectors';

export const CONTRIBUTORS_REQUEST = 'CONTRIBUTORS_REQUEST';
export const CONTRIBUTORS_SUCCESS = 'CONTRIBUTORS_SUCCESS';
export const CONTRIBUTORS_FAILURE = 'CONTRIBUTORS_FAILURE';

function fetchContributors(owner, repo, callback) {
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

export function loadContributors(owner, repo, force, callback) {
  return (dispatch, getState) => {
    const { contributors: loadedContributors } = getContributors(
      getState(),
      owner,
      repo
    );

    if (force || loadedContributors.length === 0) {
      dispatch(fetchContributors(owner, repo, callback));
    }
  };
}
