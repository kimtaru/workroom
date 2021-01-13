import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ShowSpinning from './common/ShowSpinning';
import { GoogleLogin } from 'react-google-login';

export default function UserLoginComponent({ executeLogin, modalCall }) {
  const google = <FontAwesomeIcon icon={faGoogle} size="lg" />;

  const { wrongInfo, loading } = useSelector((state) => state.user);

  const history = useHistory();
  const email = useRef();
  const pwd = useRef();

  const userLogin = () => {
    const _email = email.current.value;
    const _pwd = pwd.current.value;
    executeLogin(_email, _pwd);
  };

  const onkeyPress = (e) => {
    if (e.key === 'Enter') {
      userLogin();
    }
  };

  const responseGoogle = (response) => {
    //console.log(response);
    console.log(response.profileObj);
  };

  const findPwd = () => {
    history.push('/auth/findPwd');
  };

  return (
    <div id="UserLoginComponent">
      <ShowSpinning loading={loading} />
      {/* <FindPasswordPop modalCall={modalCall} visible={visible}>
        Hello
      </FindPasswordPop> */}
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
          <input
            type="password"
            placeholder="비밀번호"
            ref={pwd}
            onKeyPress={onkeyPress}
          />
        </div>
        <div className="forgot" onClick={findPwd}>
          비밀번호 찾기
        </div>
        {/* 비밀번호 찾기 함수 구현하기 */}
        <div className="btn-div">
          <button className="loginBtn" onClick={userLogin}>
            로그인
          </button>
          <hr />

          {/* <div className="googleLogin">{google} Google 계정으로 로그인</div> */}
          <GoogleLogin
            clientId="173710766802-hk7mqd86vp1bt984g29kve2rse0tp77h.apps.googleusercontent.com"
            render={(renderProps) => (
              <div
                className="googleLogin"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {google} Google 계정으로 로그인
              </div>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
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
