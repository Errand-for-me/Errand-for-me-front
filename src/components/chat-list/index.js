import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import Modal from "../utils/modal/modal";
import globalAtom from "../../loginState";
import CommonHeader from "../header";
import NavBar from "../nav-bar";
import BeneathNavBarContainer from "../utils/beneath-nav-bar-template";
import ChatListIter from "./chat-list";
import getId from "../utils/get-id";

const HotBulletinContainer = styled.div`
  width: 100vw;
  text-align: center;
  margin: auto;
  margin-top: 25px;
  padding-bottom: 15px;
  border-bottom: solid 1px lightgray;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
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
          const modal = document.querySelector("#modal");
          modal.style.display = "flex";
        }
        setLoginInfo(result);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="ChatLobby">
      <Modal />
      <CommonHeader />
      <NavBar menu="chat" />
      <BeneathNavBarContainer>
        <HotBulletinContainer>
          <HotBulletinHeader>채팅 목록</HotBulletinHeader>
        </HotBulletinContainer>
        <ChatListIter data={chatList} />
      </BeneathNavBarContainer>
    </div>
  );
}

export default ChatList;
