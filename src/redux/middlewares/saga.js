import { all } from 'redux-saga/effects';
import { sampleSaga } from '../modules/sample';
import { userSaga } from '../modules/user';

export default function* rootSaga() {
  yield all([sampleSaga(), userSaga()]);
}
