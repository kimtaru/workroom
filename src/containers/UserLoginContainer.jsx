import React from 'react';
import UserLoginComponent from '../components/UserLoginComponent';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { startUserLogin, modalSet } from '../redux/modules/user';

export default function UserLoginContainer() {
  const dispatch = useDispatch();

  const executeLogin = useCallback(
    (username, password) => {
      dispatch(startUserLogin(username, password));
    },
    [dispatch],
  );

  const modalCall = useCallback(() => {
    dispatch(modalSet());
  }, [dispatch]);
  return (
    <UserLoginComponent modalCall={modalCall} executeLogin={executeLogin} />
  );
}
