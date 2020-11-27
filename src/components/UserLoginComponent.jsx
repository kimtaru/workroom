import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function UserLoginComponent() {
  const google = <FontAwesomeIcon icon={faGoogle} size="lg" />;
  return (
    <div id="UserLoginComponent">
      <div className="title">Sign in</div>
      <div className="subtitle">간편한 이슈관리 툴, 워크룸</div>
      <div className="form">
        <div className="alert">
          가입되지 않은 이메일 이거나 비밀번호가 잘못되었습니다.
        </div>
        <div className="email">
          <input type="text" placeholder="이메일" />
        </div>
        <div className="password">
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="forgot">비밀번호 찾기</div>
        <div className="btn-div">
          <button className="loginBtn">로그인</button>
          <hr />
          <div className="googleLogin">{google} Google 계정으로 로그인</div>
        </div>
      </div>
    </div>
  );
}
