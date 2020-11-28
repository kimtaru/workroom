import React from 'react';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function UserJoinComponent() {
  const google = <FontAwesomeIcon icon={faGoogle} size="lg" />;
  return (
    <div id="UserJoinComponent">
      <div className="title">
        세상 간편한 이슈관리
        <br />
        <span className="strong">워크룸</span>에 온 걸 환영해요!
      </div>
      <div className="form">
        <div className="label">이메일</div>
        <input type="text" placeholder="이메일" />
        <div className="label">비밀번호</div>
        <input type="password" placeholder="비밀번호" />
        <div className="label">비밀번호 확인</div>
        <input type="password" placeholder="비밀번호 확인" />
        <div className="term-div">
          <Checkbox className="term">모두 동의합니다.</Checkbox>
        </div>
        <div className="term-div">
          <Checkbox className="term">개인정보 약관 동의(필수)</Checkbox>
        </div>
        <div className="term-div">
          <Checkbox className="term">제 3자 제공 동의(선택)</Checkbox>
        </div>
        <div className="join-btn">
          <button>계정 만들기</button>
        </div>
        <hr />
        <div className="googleLogin">{google} Google 계정으로 로그인</div>
      </div>
    </div>
  );
}
