import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import sample from './sample';

const reducer = (history) =>
  combineReducers({
    sample,
    router: connectRouter(history),
  });

export default reducer;
