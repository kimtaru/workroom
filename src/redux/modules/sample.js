import SampleService from '../../services/SampleService';
import { createAction, createActions, handleActions } from 'redux-actions';
import { select, put, call, takeEvery } from 'redux-saga/effects';

const prefix = 'workroom-front/sample';

const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', {
  prefix,
});

const initialState = {
  sample: [],
  loading: false,
  error: null,
};

const reducer = handleActions(
  {
    START: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      sample: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      sample: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

const START_GET_SAMPLE = `${prefix}/START_GET_SAMPLE`;

export const startGetSample = createAction(`${START_GET_SAMPLE}`);

function* startGetSampleSaga() {
  try {
    yield put(start());
    const token = yield select((state) => state.userLogin.token);
    const sample = yield call(SampleService.getSample, token);
    yield put(success(sample));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* sampleSaga() {
  yield takeEvery(START_GET_SAMPLE, startGetSampleSaga);
}
