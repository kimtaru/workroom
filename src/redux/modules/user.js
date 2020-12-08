import UserService from '../../services/UserService';
import { put, delay, call, takeLeading } from 'redux-saga/effects';
import { createActions, handleActions, createAction } from 'redux-actions';
import { push } from 'connected-react-router';

const prefix = 'workroom/user';

const {
  start,
  successJoin,
  success,
  fail,
  doubleCheck,
  wrongCheck,
} = createActions(
  'START',
  'SUCCESS_JOIN',
  'SUCCESS',
  'FAIL',
  'DOUBLE_CHECK',
  'WRONG_CHECK',
  {
    prefix,
  },
);

const initialState = {
  token: null,
  wrongInfo: false,
  double: false, // 중복된 계정인지 여부 T or F
  loading: false, // 로딩 상태일 때 여부 true일 때 스피너 렌더링
  error: null,
};

const reducer = handleActions(
  {
    DOUBLE_CHECK: (state, action) => ({ ...state, double: action.payload }),
    WRONG_CHECK: (state, action) => ({ ...state, wrongInfo: action.payload }),
    START: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS_JOIN: (state) => ({ ...state, loading: false, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      wrongInfo: false,
      loading: false,
      error: null,
      //logout시에도 적용돰
    }),
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

const START_USER_JOIN = `${prefix}/START_USER_JOIN`;
const START_DOUBLE_CHECK = `${prefix}/START_DOUBLE_CHECK`;
const START_USER_LOGIN = `${prefix}/START_USER_LOGIN`;
const START_USER_LOGOUT = `${prefix}/START_USER_LOGOUT`;

export const startUserJoin = createAction(START_USER_JOIN, (user) => ({
  user,
}));
export const startDoubleCheck = createAction(`${START_DOUBLE_CHECK}`);
export const startUserLogin = createAction(
  START_USER_LOGIN,
  (username, password) => ({
    username,
    password,
  }),
);
export const startUserLogout = createAction(`${START_USER_LOGOUT}`);

function* startUserLogoutSaga() {
  yield put(start());
  UserService.removeToken();
  yield put(success(null));
  yield put(push('/'));
}

function* startUserLoginSaga(action) {
  const { username, password } = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const token = yield call(UserService.executeLogin, username, password);
    UserService.saveToken(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (err) {
    yield put(wrongCheck(true));
    yield put(fail(err));
  }
}

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
  //console.log(user);
  try {
    yield put(start());
    yield delay(2000);
    yield call(UserService.executeJoin, user);
    yield put(successJoin());
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
  yield takeLeading(START_USER_LOGIN, startUserLoginSaga);
  yield takeLeading(START_USER_LOGOUT, startUserLogoutSaga);
}
