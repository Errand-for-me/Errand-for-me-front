import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import CommonHeader from '../header';

import PlusImg from '../../images/plus.svg';

const weekArr = ["곽진현 머함", "한달만에 가능?", "대충해야 됨ㅋㅋ", "spring 어렵누", "할거 너무 많누", "SAT", "SUN", "MON", "TUE", "WED", "THU"];

const HotBulletinContainer = styled.div`
  width: 80vw;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  border: solid 1px;
`

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
`

const HotBulletinContent = styled.div`
  margin: 10px;
`

const StyledPlus = styled.img`
  position: fixed;
  padding: 10px;
  margin: 20px;
  margin-top: 85vh;
  margin-left: 76vw;
  padding-height: 60px;
  background-color: white;
  border-radius: 50px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  box-shadow: 2px 5px 5px rgb(0 0 0 / 50%);
  z-index: 2;
`;

function Board() {
  const history = useHistory();

  const WritePage = () => {
    history.push('/bulletin/write');
  };

  return (
    <div className="App">
      <StyledPlus src={PlusImg} onClick={WritePage} />
      <CommonHeader />
      <HotBulletinContainer>
        <HotBulletinHeader>전체 게시판!!</HotBulletinHeader>
        {
          weekArr.map((val, idx) => {
            return <HotBulletinContent key={idx}> {val} </HotBulletinContent>
          })
        }
      </HotBulletinContainer>
    </div>
  );
}

export { Board };