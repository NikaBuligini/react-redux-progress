/* eslint-disable import/prefer-default-export */

function mapIdsToUsers(state, ids) {
  return ids.map(id => state.entities.users[id]);
}

export function getContributors(state, owner, repo) {
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
