import React from 'react';
import UserJoinContainer from '../containers/UserJoinContainer';
import { Layout } from 'antd';
export default function UserJoin() {
  const { Content } = Layout;
  return (
    <Content id="UserJoin">
      <UserJoinContainer />
    </Content>
  );
}
