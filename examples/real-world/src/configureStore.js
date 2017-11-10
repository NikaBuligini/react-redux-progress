import { createStore, compose } from 'redux';

export default function configureStore(
  preloadedState,
  middlewares,
  rootReducer,
) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(middlewares),
  );
}
