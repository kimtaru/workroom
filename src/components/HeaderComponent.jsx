import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

export default function HeaderComponent({ current }) {
  const { Header } = Layout;

  useEffect(() => {
    const arr = $('.menu').get();
    arr.forEach((element) => {
      $(element).removeClass('current');
    });
    $(arr[current]).addClass('current');
  }, [current]);

  return (
    <Header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '2px solid black',
      }}
    >
      <div id="HeaderComponent">
        <div className="logo">Workroom</div>
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
      </div>
    </Header>
  );
}
