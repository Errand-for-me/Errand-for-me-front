import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import globalAtom from "../../loginState";
import CommonHeader from "../header";
import NavBar from "../nav-bar";
import ChatListIter from "./chat-list";
import getId from "../utils/get-id";

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

function ChatList() {
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/chat-title-list`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await result.json();

      const processed_data = data.map((el) => {
        if (el.writer === loginInfo.nickname) {
          return { title: el.title, writer: el.receiver };
        } else {
          return { title: el.title, writer: el.writer };
        }
      });

      setChatList(processed_data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (loginInfo.isLogin === false) {
        const result = await getId();
        if (result.isLogin === false) {
          alert("로그인 해주세요");
        }
        setLoginInfo(result);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="ChatLobby">
      <CommonHeader />
      <NavBar menu="chat" />
      <HotBulletinContainer>
        <HotBulletinHeader>채팅 목록</HotBulletinHeader>
      </HotBulletinContainer>
      <ChatListIter data={chatList} />
    </div>
  );
}

export default ChatList;
