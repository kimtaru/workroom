import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/middlewares/saga';
import reducer from './modules/reducer';

export const history = createBrowserHistory();

export default function create() {
  const sagaMiddleware = createSagaMiddleware();

  const preloadedState = {};

  const store = createStore(
    reducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
