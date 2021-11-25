import React from "react";
import ChatCard from "./chat-card";

function ChatListIter(props) {
  const { data } = props;

  return (
    <div className="chat-list">
      {data.map((val, idx) => (
        <ChatCard key={idx} data={val} />
      ))}
    </div>
  );
}

export default ChatListIter;
