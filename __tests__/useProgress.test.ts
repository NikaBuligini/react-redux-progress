import { reducer } from '../src/useProgress';

describe('useProgress.js', () => {
  it('should start progress with 0', () => {
    expect(reducer(-1, { type: 'start' })).toBe(0);
  });

  it('should set progress', () => {
    const progress = 30;
    const state = reducer(20, { type: 'set', payload: progress });

    expect(state).toBe(progress);
  });

  it('should increment progress by 5', () => {
    const state = reducer(10, {
      type: 'increment',
      payload: {
        maxPercent: 85,
        add: 5,
      },
    });

    expect(state).toBe(15);
  });

  it('should increment progress until maxPercent', () => {
    const maxPercent = 85;
    const state = reducer(82, {
      type: 'increment',
      payload: { maxPercent, add: 10 },
    });

    expect(state).toBe(maxPercent);
  });

  it('should finish progress', () => {
    const state = reducer(82, { type: 'finish' });
    expect(state).toBe(100);
  });

  it('should reset progress', () => {
    const state = reducer(100, { type: 'reset' });
    expect(state).toBe(-1);
  });
});
