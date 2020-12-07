import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/middlewares/saga';
import reducer from './modules/reducer';
import UserService from '../services/UserService';

export const history = createBrowserHistory();

export default function create() {
  const sagaMiddleware = createSagaMiddleware();
  const token = UserService.getToken();

  const preloadedState = {
    user: {
      token,
      wrongInfo: false,
      double: false,
      loading: false,
      error: null,
    },
  };

  const store = createStore(
    reducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
