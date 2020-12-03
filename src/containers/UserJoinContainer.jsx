import React, { useCallback } from 'react';
import UserJoinComponent from '../components/UserJoinComponent';
import { useDispatch } from 'react-redux';
import { startUserJoin, startDoubleCheck } from '../redux/modules/user';

export default function UserJoinContainer() {
  const dispatch = useDispatch();
  // const executeJoin = (user) => {
  //   UserService.executeJoin(user);
  // };
  const executeJoin = useCallback(
    (user) => {
      dispatch(startUserJoin(user));
    },
    [dispatch],
  );

  const doubleCheck = useCallback(
    (email) => {
      dispatch(startDoubleCheck(email));
    },
    [dispatch],
  );
  return (
    <UserJoinComponent executeJoin={executeJoin} doubleCheck={doubleCheck} />
  );
}
