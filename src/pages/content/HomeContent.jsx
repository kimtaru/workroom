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
          My simple issue manager
          <br /> 'Workroom'
        </div>
        <div className=""></div>
      </div>
    </Content>
  );
}
