type ProgressKey = string | number;

export interface ProgressState {
  isActive: boolean;
  activeIds: ProgressKey[];
}

interface ProgressAction {
  progressId?: ProgressKey;
}

function statuses(state: ProgressKey[], progressId: ProgressKey) {
  const index = state.indexOf(progressId);

  if (index === -1) {
    return [...state, progressId];
  }

  return [...state.slice(0, index), ...state.slice(index + 1)];
}

const initialState: ProgressState = {
  isActive: false,
  activeIds: [],
};

export function progress(
  state: ProgressState = initialState,
  action: ProgressAction
) {
  if (action.progressId) {
    const activeIds = statuses(state.activeIds, action.progressId);

    return {
      isActive: activeIds.length !== 0,
      activeIds,
    };
  }

  return state;
}
