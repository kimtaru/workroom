import React from 'react';
import GoogleLogin from 'react-google-login';

export default function GoogleLoginComponent({ props }) {
  const { onLoginGoogle } = props;
  return (
    <div>
      <GoogleLogin clientId="173710766802-hk7mqd86vp1bt984g29kve2rse0tp77h.apps.googleusercontent.com" />
    </div>
  );
}
