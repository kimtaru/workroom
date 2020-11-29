import React from 'react';
import UserJoinComponent from '../components/UserJoinComponent';
import UserService from '../services/UserService';

export default function UserJoinContainer() {
  const executeJoin = (user) => {
    UserService.executeJoin(user);
  };
  return <UserJoinComponent executeJoin={executeJoin} />;
}
