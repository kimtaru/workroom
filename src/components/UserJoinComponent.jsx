import React, { useRef } from 'react';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import ShowSpinning from './common/ShowSpinning';
import * as common from '../common-function/Common';
import { useSelector } from 'react-redux';

export default function UserJoinComponent({ executeJoin, doubleCheck }) {
  const google = <FontAwesomeIcon icon={faGoogle} />;
  // icon image : Google Logo

  //Ref
  const email = useRef();
  const pwd = useRef();
  const pwdCheck = useRef();

  //State
  const [emailMsg, setEmailMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdCheckMsg, setPwdCheckMsg] = useState('');
  const [termOne, setTermOne] = useState(false);
  const [termTwo, setTermTwo] = useState(false);

  const { loading, double } = useSelector((state) => state.user);

  // 이메일 유효성 검증
  const emailValidation = () => {
    let _email = email.current.value;

    if (common.checkEmail(_email)) {
      setEmailMsg('CORRECT');
    } else {
      setEmailMsg('INCORRECT'); // 올바른 이메일 형식이 아닙니다.
    }

    doubleCheck(_email);
  };

  // 패스워드 유효성 검증
  const pwdValidation = () => {
    let _pwd = pwd.current.value;
    if (common.checkPwd(_pwd)) {
      setPwdMsg('CORRECT');
    } else {
      setPwdMsg('INCORRECT');
    }
  };
  //
  const pwdCheckValidation = () => {
    let _pwd = pwd.current.value;
    let _pwdCheck = pwdCheck.current.value;
    if (_pwd === _pwdCheck) {
      setPwdCheckMsg('CORRECT');
    } else {
      setPwdCheckMsg('INCORRECT');
    }
  };

  const checkAll = (e) => {
    setTermOne(e.target.checked);
    setTermTwo(e.target.checked);
  };

  const termOneCheck = (e) => {
    setTermOne(e.target.checked);
  };
  const termTwoCheck = (e) => {
    setTermTwo(e.target.checked);
  };

  const userJoin = () => {
    if (
      emailMsg === 'CORRECT' &&
      pwdMsg === 'CORRECT' &&
      pwdCheckMsg === 'CORRECT' &&
      !double &&
      termOne
    ) {
      const _email = email.current.value;
      const _pwd = pwd.current.value;
      const _termOne = termOne ? 1 : 0;
      const _termTwo = termTwo ? 1 : 0;

      const user = {
        userAccount: _email,
        password: _pwd,
        termOne: _termOne,
        termTwo: _termTwo,
      };

      executeJoin(user);
    }
  };
  return (
    <div id="UserJoinComponent">
      <ShowSpinning loading={loading} />
      <div className="title">
        세상 간편한 이슈관리
        <br />
        <span className="strong">워크룸</span>에 온 걸 환영해요!
      </div>
      <div className="form">
        <div className="label">이메일</div>
        <input
          type="text"
          placeholder="이메일"
          ref={email}
          onChange={emailValidation}
        />
        <div className="mssg">
          {double && `이미 사용중인 계정입니다.`}
          {emailMsg === 'INCORRECT' && `올바른 이메일 형식이 아닙니다.`}
        </div>
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
        <div className="mssg">
          {pwdCheckMsg === 'INCORRECT' && `비밀번호가 일치하지 않습니다.`}
        </div>
        <div className="first term-div">
          <Checkbox className="term" onChange={checkAll}>
            모두 동의합니다.
          </Checkbox>
        </div>
        <div className="term-div">
          <Checkbox className="term" checked={termOne} onChange={termOneCheck}>
            개인정보 약관 동의(필수)
          </Checkbox>
        </div>
        <div className="term-div">
          <Checkbox className="term" checked={termTwo} onChange={termTwoCheck}>
            제 3자 제공 동의(선택)
          </Checkbox>
        </div>
        <div className="join-btn">
          <button onClick={userJoin}>계정 만들기</button>
        </div>
        <hr />
        <div className="googleLogin">{google} Google 계정으로 로그인</div>
      </div>
    </div>
  );
}
