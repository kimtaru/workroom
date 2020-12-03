import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import sample from './sample';
import user from './user';

const reducer = (history) =>
  combineReducers({
    sample,
    user,
    router: connectRouter(history),
  });

export default reducer;
