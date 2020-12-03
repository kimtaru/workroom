import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function ShowSpinning({ loading }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  const locateSpinner = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  };
  if (loading) {
    return <Spin style={locateSpinner} indicator={antIcon} />;
  } else {
    return null;
  }
}
