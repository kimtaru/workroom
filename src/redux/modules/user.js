import UserService from '../../services/UserService';
import { put, delay, call, takeLeading } from 'redux-saga/effects';
import { createActions, handleActions, createAction } from 'redux-actions';
import { push } from 'connected-react-router';

const prefix = 'workroom/user';

const { start, success, fail, doubleCheck } = createActions(
  'START',
  'SUCCESS',
  'FAIL',
  'DOUBLE_CHECK',
  {
    prefix,
  },
);

const initialState = {
  double: false,
  loading: false,
  error: null,
};

const reducer = handleActions(
  {
    DOUBLE_CHECK: (state, action) => ({ ...state, double: action.payload }),
    START: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state) => ({ ...state, loading: false, error: null }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

//saga

const START_USER_JOIN = `${prefix}/START_GET_BOOKS`;
const START_DOUBLE_CHECK = `${prefix}/START_DOUBLE_CHECK`;

export const startUserJoin = createAction(START_USER_JOIN, (user) => ({
  user,
}));
export const startDoubleCheck = createAction(`${START_DOUBLE_CHECK}`);

function* startDoubleCheckSaga(action) {
  const email = action.payload;
  try {
    const doubleAt = yield call(UserService.doubleCheck, email);
    if (doubleAt) {
      yield put(doubleCheck(true));
    } else {
      yield put(doubleCheck(false));
    }
  } catch (err) {
    yield put(fail(err));
  }
}

function* startUserJoinSaga(action) {
  const user = action.payload.user;
  console.log(user);
  try {
    yield put(start());
    yield delay(2000);
    yield call(UserService.executeJoin, action.payload.user);
    yield put(success());
    // 성공 화면으로 이동
    yield put(push('/join/success'));
  } catch (error) {
    // 실패 화면으로 이동
    yield put(fail(error));
    //let status = error.message.replace(/[^0-9]/g, '');
    // status code 상태에 따라 403, 402, 500 화면으로 분기
  }
}

export function* userSaga() {
  yield takeLeading(START_USER_JOIN, startUserJoinSaga);
  yield takeLeading(START_DOUBLE_CHECK, startDoubleCheckSaga);
}
