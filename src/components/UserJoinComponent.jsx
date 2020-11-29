import React, { useRef } from 'react';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import * as common from '../common-function/Common';

export default function UserJoinComponent({ executeJoin }) {
  const google = <FontAwesomeIcon icon={faGoogle} size="lg" />;

  const email = useRef();
  const pwd = useRef();
  const pwdCheck = useRef();

  const [emailMsg, setEmailMsg] = useState();
  const [pwdMsg, setPwdMsg] = useState();
  const [pwdCheckMsg, setPwdCheckMsg] = useState();
  const [termOne, setTermOne] = useState(false);
  const [termTwo, setTermTwo] = useState(false);

  // 이메일 유효성 검증
  const emailValidation = () => {
    let _email = email.current.value;
    if (common.checkEmail(_email)) {
      if (common.doubleCheck(_email)) {
        // 계정 중복체크 함수 만들어야 함 (중복이면 true, 아니면 false 반환 하도록)
        setEmailMsg(2); // 이미 사용중인 계정입니다.
      } else {
        setEmailMsg(true);
      }
    } else {
      setEmailMsg(3); // 올바른 이메일 형식이 아닙니다.
    }
  };
  // 패스워드 유효성 검증
  const pwdValidation = () => {
    let _pwd = pwd.current.value;
    if (common.checkPwd(_pwd)) {
      setPwdMsg(true);
    } else {
      setPwdMsg(1);
    }
  };
  //
  const pwdCheckValidation = () => {
    let _pwd = pwd.current.value;
    let _pwdCheck = pwdCheck.current.value;
    if (_pwd === _pwdCheck) {
      setPwdCheckMsg(true);
    } else {
      setPwdCheckMsg(1);
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
    if (emailMsg && pwdMsg && pwdCheckMsg && termOne) {
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
          {emailMsg === 2 && `이미 사용중인 계정입니다.`}
          {emailMsg === 3 && `올바른 이메일 형식이 아닙니다.`}
        </div>
        <div className="label">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호"
          ref={pwd}
          onChange={pwdValidation}
        />
        <div className="mssg">
          {pwdMsg === 1 && `영문, 숫자 혼합하여 8자리 이상 20자리 이하`}
        </div>
        <div className="label">비밀번호 확인</div>
        <input
          type="password"
          placeholder="비밀번호 확인"
          ref={pwdCheck}
          onChange={pwdCheckValidation}
        />
        <div className="mssg">
          {pwdCheckMsg === 1 && `비밀번호가 일치하지 않습니다.`}
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
