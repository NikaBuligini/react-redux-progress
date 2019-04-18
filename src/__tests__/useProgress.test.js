import { reducer } from '../useProgress';

describe('useProgress.js', () => {
  it('should return initial state', () => {
    expect(reducer(-1, {})).toBe(-1);
  });

  it('should start progress with 0', () => {
    expect(reducer(-1, { type: 'start' })).toBe(0);
  });

  it('should set progress', () => {
    const expectedProgress = 30;
    expect(reducer(20, { type: 'set', payload: expectedProgress })).toBe(
      expectedProgress,
    );
  });

  it('should increment progress by 5', () => {
    expect(
      reducer(10, { type: 'increment', payload: { maxPercent: 85, add: 5 } }),
    ).toBe(15);
  });

  it('should increment progress until maxPercent', () => {
    const maxPercent = 85;
    expect(
      reducer(82, {
        type: 'increment',
        payload: { maxPercent, add: 10 },
      }),
    ).toBe(maxPercent);
  });

  it('should finish progress', () => {
    expect(reducer(82, { type: 'finish' })).toBe(100);
  });

  it('should reset progress', () => {
    expect(reducer(100, { type: 'reset' })).toBe(-1);
  });

  it('should not change progress', () => {
    const initialProgress = 70;
    expect(reducer(initialProgress, { type: 'UNKNOWN_ACTION' })).toBe(
      initialProgress,
    );
  });
});
