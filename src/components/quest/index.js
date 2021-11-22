import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import globalAtom from "../../loginState";
import CommonHeader from "../header";
import PlusImg from "../../images/plus.svg";
import QuestList from "./quest-list";

const HotBulletinContainer = styled.div`
  width: 90vw;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  border: solid 1px;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
`;

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

function Quest() {
  const history = useHistory();
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);

  const WritePage = async () => {
    if (loginInfo.isLogin === false) {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/isLogin`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await result.json();
      if (data.name === null) {
        alert("로그인 해주세요");
      } else {
        setLoginInfo({ isLogin: true, nickname: data.nickname });
        history.push("/quest/write");
      }
    } else {
      history.push("/quest/write");
    }
  };

  const [questList, setQuest] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/quest`, {
        mode: "cors",
      });

      const data = await result.json();
      setQuest(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <StyledPlus src={PlusImg} onClick={WritePage} />
      <CommonHeader />
      <HotBulletinContainer>
        <HotBulletinHeader>심부름 찾기</HotBulletinHeader>
      </HotBulletinContainer>
      <QuestList data={questList} />
    </div>
  );
}

export default Quest;
