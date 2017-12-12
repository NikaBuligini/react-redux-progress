/* eslint-disable no-param-reassign */

export default () => next => action => {
  const { debounce } = action;

  if (debounce) {
    setTimeout(() => {
      delete action.debounce;
      next(action);
    }, debounce);
  } else {
    next(action);
  }
};
