import React, { useState } from "react";
import styled from "styled-components";

import CommonHeader from './components/header';
import Sidebar from './components/sidebar';

import Hamburger from './images/hamburger.png';

const StyledHamburger = styled.img`
  position: fixed;
  padding: 10px;
  margin: 20px;
  margin-top: 60px;
  padding-height: 60px;
  background-color: white;
  border-radius: 50px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  box-shadow: 2px 5px 5px rgb(0 0 0 / 50%);
  z-index: 2;
`;

function App() {
  const [SidebarState, toggleSidebarState] = useState('none');

  const toggle = () => {
    if (SidebarState === 'none') {
      toggleSidebarState('flex');
    }
    else toggleSidebarState('none');
  };

  return (
    <div className="App">
      <StyledHamburger src={Hamburger} onClick={toggle} />
      <CommonHeader />
      <Sidebar displayType={SidebarState} />
    </div>
  );
}

export default App;
