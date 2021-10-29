import React, { useState } from "react";
import styled from "styled-components";

import CommonHeader from '../header';

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

function BulletinBoard() {
  return (
    <div className="App">
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

export default BulletinBoard;