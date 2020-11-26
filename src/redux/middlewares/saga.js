import { all } from 'redux-saga/effects';
import { sampleSaga } from '../modules/sample';

export default function* rootSaga() {
  yield all([sampleSaga()]);
}
