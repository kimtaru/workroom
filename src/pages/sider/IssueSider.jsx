import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

export default function IssueSider() {
  const { Sider } = Layout;
  return (
    <Sider id="IssueSider" theme="light" width={260}>
      <Link to="/issue">
        <div className="menuItem selected">
          <span>전체 이슈</span>
        </div>
      </Link>
      <Link to="/issue/hello">
        <div className="menuItem">
          <span>MY</span>
        </div>
      </Link>
    </Sider>
  );
}
