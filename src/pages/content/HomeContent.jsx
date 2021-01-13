import React from 'react';
import { Layout } from 'antd';
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

export default function HomeContent() {
  const { Content } = Layout;
  var arr = [];

  $('.badge').on('click', function () {
    //alert('apple');
    var idx = $(this).attr('idx');
    setBadge(idx);
  });

  function setBadge(idx) {
    var setIdx = arr.indexOf(idx);
    if (setIdx < 0) {
      arr.push(idx);
    } else {
      arr.splice(setIdx, 1);
    }
    $('.badge').text('');
    for (var i = 0; i < arr.length; i++) {
      $('[idx=' + arr[i] + ']').text(i + 1);
    }
  }
  return (
    <Content id="HomeContent">
      <div>
        <div className="copyright">
          {/* 1. 비밀번호 찾기 구현 (ㅇ)
          <br />
          2. 구글 로그인 구현 <br /
          >
          - users entity에 googleId, name add함 <br />
          (1) 구글 로그인 시 회원목록에 없으면 소셜 가입을 유도한다. <br />
          (2) 회원 가입 안내 페이지로 이동 소셜 계정 연동을 진행한다. <br />
          (3) 소셜가입 하면 googleId와 콜백으로 오는 data를 테이블에 insert한다{' '}
          <br />
          (4) 가입 완료된 회원일 시 토큰 받아와서 스토리지에 저장 후 로그인
          처리한다. <br />
          (5) 소셜로그인 시 비밀번호가 없기 때문에 기존 제공되는 로그인
          컴포넌트는 이용할 수 없다. <br />
          -> 소셜로그인 버튼을 통한 로그인만 가능 <br />
          (6) 기존 회원가입 페이지에 이름을 입력할 수 있도록 항목 추가한다.{' '}
          <br /> */}
          <button className="badge" idx="0"></button>
          <button className="badge" idx="1"></button>
          <button className="badge" idx="2"></button>
          <button className="badge" idx="3"></button>
          <button className="badge" idx="4"></button>
          <button className="badge" idx="5"></button>
          <button className="badge" idx="6"></button>
        </div>
      </div>
    </Content>
  );
}
