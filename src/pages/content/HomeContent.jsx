import React from 'react';
import { Layout } from 'antd';

export default function HomeContent() {
  const { Content } = Layout;
  return (
    <Content id="HomeContent">
      <div>
        <div className="copyright">
          1. 비밀번호 찾기 구현
          <br />
          2. 구글 로그인 구현
        </div>
      </div>
    </Content>
  );
}
