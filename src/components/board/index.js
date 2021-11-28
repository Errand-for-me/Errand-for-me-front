import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import CommonHeader from "../header";
import BulletList from "./bullet-list";
import AdsArea from "../advertisement";
import globalAtom from "../../loginState";
import Modal from "../utils/modal/modal";

const HotBulletinContainer = styled.div`
  width: 100vw;
  margin: auto;
  margin-top: 5px;
  padding-top: 10px;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
`;

const StyledPlus = styled.div`
  font-family: "one_mobile";
  color: #fd8f00;
  position: fixed;
  padding: 10px;
  margin: 20px;
  margin-top: 140px;
  margin-left: 71vw;
  border: solid 3px #fd8f00;
  border-radius: 20px;
  padding-height: 60px;
  background-color: white;
  width: 60px;
  height: 17px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
`;

const regex = /(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+).+?(?<hour>[0-9]+):(?<min>[0-9]+)/;

function Board() {
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
        document.body.style.overflow = "hidden";
        const modal = document.querySelector("#modal");
        modal.style.display = "flex";
      } else {
        setLoginInfo({ isLogin: true, nickname: data.nickname });
        history.push("/bulletin/write");
      }
    } else {
      history.push("/bulletin/write");
    }
  };

  const [bulletList, setBoard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/board`, {
        mode: "cors",
      });

      const data = await result.json();

      const proc_data = data.map((el) => {
        const date = el.postTime;
        const group = regex.exec(date).groups;
        let { year, month, day, hour, min } = group;

        hour = Number(hour) + 9;
        let isDay = false;
        if (hour >= 12) {
          isDay = true;
          if (hour > 12) hour -= 12;
        }

        return {
          id: el.id,
          writer: el.writer,
          title: el.title,
          content: el.content,
          time: `${year.slice(2)}.${month}.${day} ${isDay ? "오후" : "오전"} ${hour}:${min}`,
        };
      });

      setBoard(proc_data);
    }

    fetchData();
  }, []);

  return (
    <div className="bullet-board">
      <Modal />
      <StyledPlus onClick={WritePage}>글 쓰기</StyledPlus>
      <CommonHeader menu="bulletin" />
      <HotBulletinContainer>
        <HotBulletinHeader>전체 게시판</HotBulletinHeader>
        <AdsArea />
        <BulletList data={bulletList} />
      </HotBulletinContainer>
    </div>
  );
}

export { Board };
