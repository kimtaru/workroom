import React from 'react';
import ShowSpinning from './common/ShowSpinning';
import { useRef } from 'react';

export default function FindPwdComponent({
  loading,
  message,
  authKey,
  authKeyCheck,
  executeSendAuthKey,
}) {
  const email = useRef();
  const authKeyDupl = useRef();
  const sendAuthKey = () => {
    const _email = email.current.value;
    if (_email !== '') {
      executeSendAuthKey(_email);
    }
  };
  const checkAuthKey = () => {
    const key = authKeyDupl.current.value;
    if (authKey !== null && key !== '') {
      authKeyCheck(key);
    }
  };
  return (
    <div id="FindPwd">
      <ShowSpinning loading={loading} />
      <div className="find-div">
        <p className="title1">비밀번호를 잊으셨나요?</p>
        <p className="title2">
          <span className="strong">가입하신 메일</span>을 통해 본인인증을 한
          다음
          <br />
          새로운 비밀번호로 설정하세요.
        </p>

        <input
          type="text"
          className="email-input"
          placeholder="이메일 주소를 입력하세요."
          ref={email}
        />
        <br />
        <button onClick={sendAuthKey}>인증번호 전송하기</button>
        <div className="auth-div">
          <p className="title2">{message}</p>
          <input
            type="text"
            className="authKey-input"
            placeholder="인증번호를 입력하세요."
            ref={authKeyDupl}
          />
          <br />
          <button onClick={checkAuthKey}>인증하기</button>
        </div>
      </div>
    </div>
  );
}
