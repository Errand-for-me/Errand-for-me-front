import React from "react";
import { useHistory } from "react-router";
import "./chat-card.css";

function ChatCard(props) {
  const { data } = props;
  const { title, writer } = data;
  const history = useHistory();

  const RoutePage = () => {
    history.push(`/chat-room?toId=${writer}&questTitle=${title}`);
  };

  return (
    <div className="chat-card" onClick={RoutePage}>
      <div className="chat-card-details">
        <div className="chat-card-title"> 퀘스트: {title} </div>
        <div className="chat-card-info-container">
          <div className="chat-card-writer"> 대화 상대: {writer} </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
