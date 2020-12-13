import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as common from '../../common-function/Common';

import { startResetPwd } from '../../redux/modules/user';
import ShowSpinning from '../../components/common/ShowSpinning';

export default function ResetPwd() {
  const { email, loading } = useSelector((state) => state.user);
  const pwd = useRef();
  const pwdCheck = useRef();
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdCheckMsg, setPwdCheckMsg] = useState('');
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdCheckValid, setPwdCheckValid] = useState(false);
  const dispatch = useDispatch();
  const pwdValidation = () => {
    let _pwd = pwd.current.value;
    if (common.checkPwd(_pwd)) {
      setPwdMsg('CORRECT');
      setPwdValid(true);
    } else {
      setPwdMsg('INCORRECT');
      setPwdValid(false);
    }
  };

  const pwdCheckValidation = () => {
    let _pwd = pwd.current.value;
    let _pwdCheck = pwdCheck.current.value;
    if (_pwd === _pwdCheck) {
      setPwdCheckMsg('CORRECT');
      setPwdCheckValid(true);
    } else {
      setPwdCheckMsg('INCORRECT');
      setPwdCheckValid(false);
    }
  };

  const resetPassword = () => {
    let _pwd = pwd.current.value;
    let _pwdCheck = pwdCheck.current.value;
    if (_pwd !== '' && _pwdCheck !== '') {
      if (pwdValid && pwdCheckValid) {
        dispatch(startResetPwd(email, _pwd));
      }
    }
  };
  return (
    <div id="ResetPwd">
      <ShowSpinning loading={loading} />
      <div className="form">
        <div className="title">비밀번호 변경하기</div>
        <div className="label">이메일</div>
        <input type="text" disabled value={email} />
        <div className="mssg"></div>
        <div className="label">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호"
          ref={pwd}
          onChange={pwdValidation}
        />
        <div className="mssg">
          {pwdMsg === 'INCORRECT' &&
            `영문, 숫자 혼합하여 8자리 이상 20자리 이하`}
        </div>
        <div className="label">비밀번호 확인</div>
        <input
          type="password"
          placeholder="비밀번호 확인"
          ref={pwdCheck}
          onChange={pwdCheckValidation}
        />
        <div className="mssg last">
          {pwdCheckMsg === 'INCORRECT' && `비밀번호가 일치하지 않습니다.`}
        </div>
        <button onClick={resetPassword}>비밀번호 변경하기</button>
      </div>
    </div>
  );
}
