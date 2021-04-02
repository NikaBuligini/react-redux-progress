import { progress as reducer, ProgressState } from '../src/reducer';

describe('reducer.js', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      isActive: false,
      activeIds: [],
    });
  });

  it('should toggle progress on', () => {
    const initialState: ProgressState = {
      isActive: false,
      activeIds: [],
    };
    const action = {
      progressId: 'unique-id',
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      isActive: true,
      activeIds: ['unique-id'],
    });
  });

  it('should toggle progress off', () => {
    const initialState: ProgressState = {
      isActive: true,
      activeIds: ['unique-id'],
    };
    const action = {
      progressId: 'unique-id',
    };

    // action to toggle on
    const state = reducer(initialState, action);

    expect(state).toEqual({
      isActive: false,
      activeIds: [],
    });
  });
});
