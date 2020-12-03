import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

export default function Successed({ title, subtitle, routeName, addr }) {
  const checkCircle = (
    <FontAwesomeIcon
      style={{ color: '#4386f1' }}
      icon={faCheckCircle}
      size="10x"
    />
  );
  return (
    <div id="Successed">
      <div className="imgDiv">{checkCircle}</div>
      <div className="title">{title}이 성공적으로 완료되었습니다.</div>
      <div className="subtitle">{subtitle}</div>
      <Link to={addr}>
        <button className="moveBtn">{routeName}</button>
      </Link>
    </div>
  );
}
