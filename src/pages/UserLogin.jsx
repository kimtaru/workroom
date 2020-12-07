import React from 'react';
import { Layout } from 'antd';
import UserLoginContainer from '../containers/UserLoginContainer';
import useAuth from '../hooks/useAuth';

export default function UserLogin() {
  const { Content } = Layout;
  useAuth(false);
  return (
    <Content id="UserLogin">
      <UserLoginContainer />
    </Content>
  );
}
