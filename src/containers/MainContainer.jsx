import React from 'react';
import NavComp from '../components/NavComp';
import ContentComp from '../components/ContentComp';

export default function MainContainer() {
  return (
    <div id="MainContainer">
      <div id="NavComp">
        <NavComp />
      </div>
      <div id="ContentComp">
        <ContentComp />
      </div>
    </div>
  );
}
