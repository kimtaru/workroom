import React from 'react';
import FindPwdComponent from '../components/FindPwdComponent';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSendEmail, startAuthKey } from '../redux/modules/user';

export default function FindPwdContainer() {
  const { loading, message, authKey } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const executeSendAuthKey = useCallback(
    (email) => {
      dispatch(startSendEmail(email));
    },
    [dispatch],
  );

  const authKeyCheck = useCallback(
    (key) => {
      dispatch(startAuthKey(key));
    },
    [dispatch],
  );
  return (
    <FindPwdComponent
      loading={loading}
      message={message}
      authKey={authKey}
      authKeyCheck={authKeyCheck}
      executeSendAuthKey={executeSendAuthKey}
    />
  );
}
