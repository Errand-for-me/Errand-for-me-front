import React from "react";
import { useHistory } from "react-router";
import getId from "../utils/get-id";
import "./quest-card.css";

function QuestCard(props) {
  const { data } = props;
  let { id, title, people, writer, imageURL, payment, receiver } = data;

  const history = useHistory();

  const RoutePage = async (id) => {
    const loginData = await getId();
    if (loginData.isLogin === false) {
      const modal = document.querySelector("#modal");
      modal.style.display = "flex";
    } else history.push(`/quest/detail/${id}`);
  };

  if (imageURL === null || imageURL === "") imageURL = "none.svg";

  return receiver === null ? (
    <div className="quest-card" onClick={() => RoutePage(id)}>
      <img className="card-img" src={`${process.env.REACT_APP_SERVER_IP}/img/${imageURL}`} width="50px" height="50px" />
      <div className="details">
        <div className="title"> {title} </div>
        <div className="info-container">
          <div className="people"> {people} 명 </div>
          <div className="people"> {payment} 원 </div>
          <div className="writer"> {writer} </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="quest-card accepted">
      <img className="card-img" src={`${process.env.REACT_APP_SERVER_IP}/img/${imageURL}`} width="50px" height="50px" />
      <div className="details">
        <div className="title"> {`${title} (진행 중!)`} </div>
        <div className="info-container">
          <div className="people"> {people} 명 </div>
          <div className="people"> {payment} 원 </div>
          <div className="writer"> {writer} </div>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
