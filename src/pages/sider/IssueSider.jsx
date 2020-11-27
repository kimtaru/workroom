import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

export default function IssueSider() {
  const { Sider } = Layout;

  $(function () {
    $('.menuItem').click(function () {
      $('.menuItem').removeClass('selected');
      $(this).addClass('selected');
    });
  });

  return (
    <Sider id="IssueSider" width={260}>
      <Link to="/issue">
        <div className="menuItem selected">이슈 관리</div>
      </Link>
      <Link to="/issue/hello">
        <div className="menuItem">데이터 시각화(1)</div>
      </Link>
    </Sider>
  );
}
