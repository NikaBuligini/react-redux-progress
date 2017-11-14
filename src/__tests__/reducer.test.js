import reducer, { resetProgressCounter } from '../reducer';

describe('reducer.js', () => {
  beforeEach(() => {
    resetProgressCounter();
  });

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isActive: false,
      fetchStatus: {},
    });
  });

  it('should toggle progress on', () => {
    const state = {
      isActive: false,
      fetchStatus: {},
    };

    const action = {
      progressId: 'unique-id',
    };

    expect(reducer(state, action)).toEqual({
      isActive: true,
      fetchStatus: {
        'unique-id': 'loading',
      },
    });
  });

  it('should toggle progress off', () => {
    const state = {
      isActive: false,
      fetchStatus: {},
    };

    const action = {
      progressId: 'unique-id',
    };

    // action to toggle on
    const reducedState = reducer(state, action);

    expect(reducer(reducedState, action)).toEqual({
      isActive: false,
      fetchStatus: {
        'unique-id': 'loaded',
      },
    });
  });
});
