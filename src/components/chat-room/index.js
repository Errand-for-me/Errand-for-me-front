import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import globalAtom from "../../loginState";
import CommonHeader from "../header";
import getId from "../utils/get-id";
import ChatContainer from "./chat-container";
import "./chat-room.css";

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

const SubmitBox = styled.div`
  display: flex;
  margin: auto;
  padding: 12px 20px;
  font-size: 20px;
`;

function ChatRoom(props) {
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const loginInfo = useRecoilValue(globalAtom.user);

  const query = props.location.search;
  const regex = /\?toId=(?<id>.+)&questTitle=(?<questTitle>.+)/;
  const groups = regex.exec(query).groups;
  const toId = decodeURI(groups.id);
  const questTitle = groups.questTitle;
  const myName = loginInfo.nickname;

  const send = async () => {
    const element = document.querySelector("#content");
    const content = element.value;
    element.value = "";
    await fetch(`${process.env.REACT_APP_SERVER_IP}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        sender: myName,
        receiver: toId,
        questTitle: questTitle,
      }),
      credentials: "include",
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (loginInfo.isLogin === false) {
        const result = await getId();
        setLoginInfo(result);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="ChatRoom">
      <CommonHeader path="chat" menu="chat" />
      <HotBulletinContainer>
        <HotBulletinHeader>채팅</HotBulletinHeader>
      </HotBulletinContainer>
      <ChatContainer questTitle={questTitle} />
      <SubmitBox>
        <input className="head-chat" id="content" name="content" type="text" autocomplete="off" placeholder="입력하세요" />
        <button type="submit" className="submit-btn-chat" onClick={send}>
          전 송
        </button>
      </SubmitBox>
    </div>
  );
}

export default ChatRoom;
