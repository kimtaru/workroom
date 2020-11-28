import React from 'react';
import { Layout } from 'antd';

export default function HomeContent() {
  const { Content } = Layout;
  return (
    <Content id="HomeContent">
      <div>
        <div className="copyright">
          사용하기 간편한 이슈관리 툴
          <br /> <span>Workroom</span>
        </div>
      </div>
    </Content>
  );
}
