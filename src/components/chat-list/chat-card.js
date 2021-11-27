import React from "react";
import { useHistory } from "react-router";
import "./chat-card.css";
import profileImg from "../../images/profile.svg";

function ChatCard(props) {
  const { data } = props;
  const { title, writer } = data;
  const history = useHistory();

  const RoutePage = () => {
    history.push(`/chat-room?toId=${writer}&questTitle=${title}`);
  };

  return (
    <div className="chat-card" onClick={RoutePage}>
      <img className="chat-card-profile" src={profileImg} />
      <div className="chat-card-details">
        <div className="chat-card-title"> {title} </div>
        <div className="chat-card-writer"> {writer} </div>
      </div>
    </div>
  );
}

export default ChatCard;
