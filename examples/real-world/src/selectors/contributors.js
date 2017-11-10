/* eslint-disable import/prefer-default-export */
// @flow

function mapIdsToUsers(state: Object, ids: Array<number>) {
  return ids.map(id => state.entities.users[id]);
}

export function getContributors(state: Object, owner: string, repo: string) {
  const key = `${owner}/${repo}`;

  const fetchStatus = state.fetch.contributorsByRepo[key];

  if (fetchStatus) {
    const { isFetching, ids } = fetchStatus;
    return {
      isFetching,
      contributors: mapIdsToUsers(state, ids),
    };
  }

  return { isFetching: false, contributors: [] };
}
