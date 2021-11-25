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
      <div className="details">
        <div className="title"> {title} </div>
        <div className="info-container">
          <div className="writer"> {writer} </div>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
