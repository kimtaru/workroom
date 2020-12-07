import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function UserLoginComponent({ executeLogin }) {
  const google = <FontAwesomeIcon icon={faGoogle} size="lg" />;

  const { wrongInfo } = useSelector((state) => state.user);

  const email = useRef();
  const pwd = useRef();

  const userLogin = () => {
    const _email = email.current.value;
    const _pwd = pwd.current.value;
    executeLogin(_email, _pwd);
  };
  return (
    <div id="UserLoginComponent">
      <div className="title">Sign in</div>
      <div className="subtitle">간편한 이슈관리 툴, 워크룸</div>
      <div className="form">
        <div className="alert">
          {wrongInfo &&
            '가입되지 않은 이메일 이거나 비밀번호가 잘못되었습니다.'}
        </div>
        <div className="email">
          <input type="text" placeholder="이메일" ref={email} />
        </div>
        <div className="password">
          <input type="password" placeholder="비밀번호" ref={pwd} />
        </div>
        <div className="forgot">비밀번호 찾기</div>
        {/* 비밀번호 찾기 함수 구현하기 */}
        <div className="btn-div">
          <button className="loginBtn" onClick={userLogin}>
            로그인
          </button>
          <hr />
          <div className="googleLogin">{google} Google 계정으로 로그인</div>
          <div className="messege">
            아직 계정이 없으신가요?{' '}
            <Link to="/join" className="link-to-join">
              계정 만들기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
