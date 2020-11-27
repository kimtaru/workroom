import React from 'react';
import { Layout } from 'antd';
import UserLoginContainer from '../containers/UserLoginContainer';

export default function UserLogin() {
  const { Content } = Layout;
  return (
    <Content id="UserLogin">
      <UserLoginContainer />
    </Content>
  );
}
