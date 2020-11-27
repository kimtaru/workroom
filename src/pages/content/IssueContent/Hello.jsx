import React from 'react';
import { Layout } from 'antd';
export default function Hello() {
  const { Content } = Layout;

  return (
    <Content id="Hello">
      <div>Hello</div>
    </Content>
  );
}
