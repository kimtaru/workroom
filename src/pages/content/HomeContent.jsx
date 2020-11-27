import React from 'react';
import { Layout } from 'antd';

export default function HomeContent() {
  const { Content } = Layout;
  const backgroundColorWhite = {
    backgroundColor: '#ffffff',
  };
  return (
    <Content style={backgroundColorWhite}>
      <div id="HomeContent">
        <div className="copyright">
          사용하기 간편한 이슈관리 툴
          <br /> <span>Workroom</span>
        </div>
      </div>
    </Content>
  );
}
