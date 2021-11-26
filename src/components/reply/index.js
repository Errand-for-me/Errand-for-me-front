import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import globalAtom from "../../loginState";
import ReplyList from "./replylist";
import styled from "styled-components";

const SubmitBox = styled.div`
  display: flex;
  margin: auto;
  padding: 12px 20px;
  font-size: 20px;
`;

const regex = /(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+).+?(?<hour>[0-9]+):(?<min>[0-9]+)/;

function ReplySection(props) {
  const loginInfo = useRecoilValue(globalAtom.user);
  const { bulletTitle } = props;
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const data = await fetch(`${process.env.REACT_APP_SERVER_IP}/comment?bulletTitle=${bulletTitle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const result = await data.json();
    const processed = result.map((el) => {
      const date = el.postTime;
      const group = regex.exec(date).groups;
      let { year, month, day, hour, min } = group;
      let isDay = false;
      hour = Number(hour) + 9;
      if (hour >= 12) {
        isDay = true;
        if (hour > 12) hour -= 12;
      }
      return {
        writer: el.writer,
        content: el.content,
        time: `${year.slice(2)}.${month}.${day} ${isDay ? "오후" : "오전"} ${hour}:${min}`,
      };
    });
    setComments(processed.reverse());
  };

  useEffect(() => {
    async function fetchData() {
      await fetchComments();
    }
    fetchData();
  }, [bulletTitle]);

  const send = async () => {
    const contentContainer = document.querySelector("#comment-box");
    const content = contentContainer.value;
    contentContainer.value = "";
    await fetch(`${process.env.REACT_APP_SERVER_IP}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        bulletTitle: bulletTitle,
      }),
      credentials: "include",
    });
    await fetchComments();
  };

  return (
    <div>
      <ReplyList replies={comments} />
      {loginInfo.isLogin ? (
        <SubmitBox>
          <input className="head-chat" id="comment-box" name="content" type="text" placeholder="입력하세요" />
          <button type="submit" className="submit-btn-chat" onClick={send}>
            전송
          </button>
        </SubmitBox>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ReplySection;
