import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import jQuery from 'jquery';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUserLogout } from '../redux/modules/user';
window.$ = window.jQuery = jQuery;

export default function HeaderComponent({ current }) {
  const { Header } = Layout;

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const arr = $('.menu').get();
    arr.forEach((element) => {
      $(element).removeClass('current');
    }); // header menu item 전체의 클래스 제거
    $(arr[current]).addClass('current');
    // 현재 선택된 메뉴에만 클래스 추가
  }, [current]);

  const logout = useCallback(() => {
    dispatch(startUserLogout());
  }, [dispatch]);

  return (
    <Header id="HeaderComponent">
      <div className="HeaderComponent">
        <div className="logo">
          <Link to="/">
            <span>Workroom</span>
          </Link>
        </div>
        <div className="menuDiv">
          <div className="menu">
            <Link to="/">
              <span>HOME</span>
            </Link>
          </div>
          <div className="menu">
            <Link to="/issue">
              <span>ISSUE</span>
            </Link>
          </div>
          <div className="menu">
            <Link to="/plan">
              <span>PLAN</span>
            </Link>
          </div>
          <div className="menu">
            <Link to="/notice">
              <span>NOTICE</span>
            </Link>
          </div>
        </div>
        <div className="user-state">
          {token === null ? (
            <Link className="aa" to="/auth/login">
              <span className="loginBtn">[ LOGIN ]</span>
            </Link>
          ) : (
            <span className="loginBtn" onClick={logout}>
              [ LOGOUT ]
            </span>
          )}
        </div>
      </div>
    </Header>
  );
}
