import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import globalAtom from "../../loginState";
import "./chat-room.css";

const regex = /(?<year>[0-9]+)\-(?<month>[0-9]+)\-(?<day>[0-9]+).+?(?<hour>[0-9]+)\:(?<min>[0-9]+)/;

function ChatContainer(props) {
  const [chats, setChats] = useState([]);
  const { questTitle } = props;

  const getData = async () => {
    const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/chat-history?quest_title=${questTitle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await result.json();

    const proc_data = data.map((el) => {
      const date = el.chatTime;
      const group = regex.exec(date).groups;

      let { year, month, day, hour, min } = group;

      hour = Number(hour) + 9;
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

    setChats(proc_data);
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="chat-container">
      <ChatHistory data={chats} />
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
        <div className="chat-temp" key={idx * 3}>
          <div className={`time-container${val.from === myName ? "-my" : ""}`} key={idx * 3 + 1}>
            {val.time}
          </div>
          <div className={`chat-balloon${val.from === myName ? "-my" : ""}`} key={idx * 3 + 2}>
            {val.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatContainer;
