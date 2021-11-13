import React from "react";
import "./quest-card.css";

function QuestCard(props) {
  const { data } = props;
  const { title, people, writer, imageURL } = data;

  return (
    <div className="quest-card">
      <img className="card-img" src={`${imageURL}`} width="50px" height="50px" />
      <div className="details">
        <div className="title"> {title} </div>
        <div className="info-container">
          <div className="people"> {people} 명 </div>
          <div className="writer"> {writer} </div>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
