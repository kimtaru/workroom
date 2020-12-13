import UserService from '../../services/UserService';
import { put, delay, call, takeLeading, select } from 'redux-saga/effects';
import { createActions, handleActions, createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import * as common from '../../common-function/Common';

const prefix = 'workroom/user';

const {
  start,
  setLoading,
  success,
  fail,
  doubleCheck,
  wrongCheck,
  modalCall,
  setMessage,
  setAuthKey,
  setEmail,
} = createActions(
  'START',
  'SET_LOADING',
  'SUCCESS',
  'FAIL',
  'DOUBLE_CHECK',
  'WRONG_CHECK',
  'MODAL_CALL',
  'SET_MESSAGE',
  'SET_AUTH_KEY',
  'SET_EMAIL',
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
  visible: false,
  message: null,
  authKey: null,
  email: null,
};

const reducer = handleActions(
  {
    DOUBLE_CHECK: (state, action) => ({ ...state, double: action.payload }),
    WRONG_CHECK: (state, action) => ({ ...state, wrongInfo: action.payload }),
    START: (state) => ({ ...state, loading: true, error: null }),
    SET_LOADING: (state) => ({ ...state, loading: false, error: null }),
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
    MODAL_CALL: (state, action) => ({
      ...state,
      visible: action.payload,
    }),
    SET_MESSAGE: (state, action) => ({
      ...state,
      message: action.payload,
    }),
    SET_AUTH_KEY: (state, action) => ({
      ...state,
      authKey: action.payload,
    }),
    SET_EMAIL: (state, action) => ({
      ...state,
      email: action.payload,
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
const MODAL_SET = `${prefix}/MODAL_SET`;
const START_SEND_EMAIL = `${prefix}/START_SEND_EMAIL`;
const START_AUTH_KEY = `${prefix}/START_AUTH_KEY`;
const START_RESET_PWD = `${prefix}/START_RESET_PWD`;

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
export const modalSet = createAction(`${MODAL_SET}`);
export const startSendEmail = createAction(`${START_SEND_EMAIL}`);
export const startAuthKey = createAction(`${START_AUTH_KEY}`);
export const startResetPwd = createAction(
  START_RESET_PWD,
  (username, password) => ({
    username,
    password,
  }),
);

function* startAuthKeySaga(action) {
  const duplKey = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const oriKey = yield select((state) => state.user.authKey);
    if (oriKey === duplKey) {
      yield put(push('/auth/setPwd'));
    } else {
      yield put(setMessage('인증번호가 맞지 않습니다.'));
    }
    yield put(setLoading());
  } catch (err) {
    yield put(fail(err));
  }
}

function* startSendEmailSaga(action) {
  const email = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const doubleAt = yield call(UserService.doubleCheck, email);
    if (doubleAt) {
      // 사용중인 계정이 있음
      const authKey = common.generateKey();
      yield put(setAuthKey(authKey));
      yield call(UserService.sendEmailToFindPwd, email, authKey);
      yield put(setMessage('입력된 주소로 인증번호가 전송되었습니다.'));
      yield put(setEmail(email));
    } else {
      // 사용중인 계정이 없음
      yield put(setMessage('입력한 주소를 찾을 수 없습니다.'));
    }
    yield put(setLoading());
  } catch (err) {
    yield put(fail(err));
  }
}

function* modalSetSaga() {
  const bool = yield select((state) => state.user.visible);
  yield put(modalCall(!bool));
}

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
    yield delay(1000);
    yield call(UserService.executeJoin, user);
    yield put(setLoading());
    // 성공 화면으로 이동
    yield put(push('/join/success'));
  } catch (error) {
    // 실패 화면으로 이동
    yield put(fail(error));
    //let status = error.message.replace(/[^0-9]/g, '');
    // status code 상태에 따라 403, 402, 500 화면으로 분기
  }
}

function* startResetPwdSaga(action) {
  const { username, password } = action.payload;

  try {
    yield put(start());
    yield delay(1000);
    yield call(UserService.resetPwd, username, password);
    yield put(setLoading());
    yield put(push('/auth/login'));
  } catch (err) {
    yield put(fail(err));
  }
}

export function* userSaga() {
  yield takeLeading(START_USER_JOIN, startUserJoinSaga);
  yield takeLeading(START_DOUBLE_CHECK, startDoubleCheckSaga);
  yield takeLeading(START_USER_LOGIN, startUserLoginSaga);
  yield takeLeading(START_USER_LOGOUT, startUserLogoutSaga);
  yield takeLeading(MODAL_SET, modalSetSaga);
  yield takeLeading(START_SEND_EMAIL, startSendEmailSaga);
  yield takeLeading(START_AUTH_KEY, startAuthKeySaga);
  yield takeLeading(START_RESET_PWD, startResetPwdSaga);
}
