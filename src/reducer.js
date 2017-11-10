// @flow

type ProgressKey = string | number;
type PossibleStatuses = 'loaded' | 'loading';

type ProgressStatuses = {
  [key: ProgressKey]: PossibleStatuses,
};

type ProgressState = {
  isActive: boolean,
  fetchStatus: ProgressStatuses,
};

type ProgressAction = {
  progressId?: ProgressKey,
};

function statuses(
  state: ProgressStatuses = {},
  status: ?PossibleStatuses,
  progressId: ProgressKey,
) {
  return Object.assign({}, state, {
    [progressId]: status ? 'loaded' : 'loading',
  });
}

let activeProgresses = 0;

export function resetProgressCounter() {
  activeProgresses = 0;
}

const initialState: ProgressState = {
  isActive: false,
  fetchStatus: {},
};

export default function progress(state: ProgressState = initialState, action: ProgressAction) {
  if (action.progressId) {
    const status = state.fetchStatus[action.progressId];

    activeProgresses += status ? -1 : 1;

    return {
      isActive: activeProgresses !== 0,
      fetchStatus: statuses(state.fetchStatus, status, action.progressId),
    };
  }

  return state;
}
