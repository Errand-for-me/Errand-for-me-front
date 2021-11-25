import React from "react";
import { useRecoilValue } from "recoil";
import globalAtom from "../../loginState";
import "./chat-room.css";

const regex = /(?<year>[0-9]+)\-(?<month>[0-9]+)\-(?<day>[0-9]+).+?(?<hour>[0-9]+)\:(?<min>[0-9]+)/;

function ChatContainer(props) {
  const { data } = props;

  const proc_data = data.map((el) => {
    const date = el.chatTime;
    const group = regex.exec(date).groups;

    let { year, month, day, hour, min } = group;

    let isDay = false;
    if (hour >= 12) {
      isDay = true;
      if (hour > 12) hour -= 12;
    }

    return {
      from: el.fromID,
      to: el.toID,
      content: el.content,
      time: `${year.slice(2)}.${month}.${day} ${isDay ? "오후" : "오전"} ${hour}:${min}`,
    };
  });

  return (
    <div className="chat-container">
      <ChatHistory data={proc_data} />
    </div>
  );
}

function ChatHistory(props) {
  const { data } = props;
  const loginInfo = useRecoilValue(globalAtom.user);
  const myName = loginInfo.nickname;

  return (
    <div className="chat-bound">
      {data.map((val, idx) => (
        <div className="chat-temp">
          <div className={`time-container${val.from === myName ? "-my" : ""}`} key={idx * 2}>
            {val.time}
          </div>
          <div className={`chat-balloon${val.from === myName ? "-my" : ""}`} key={idx * 2 + 1}>
            {val.content} {val.to}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatContainer;
