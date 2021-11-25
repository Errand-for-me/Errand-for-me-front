import React, { useEffect, useState } from "react";
import MiniMap from "./map";
import CommonHeader from "../header";
import "./quest-detail-page.css";
import { useHistory } from "react-router";

function QuestDetail(props) {
  const history = useHistory();
  const { params } = props.match;
  const [info, setInfo] = useState({});
  const questId = params.id;

  const fetchQuestInfo = async () => {
    const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/quest-info?id=${questId}`, {
      mode: "cors",
    });

    const data = await result.json();
    setInfo(data);
  };

  const acceptQuest = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_IP}/quest-accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: questId,
      }),
      credentials: "include",
    });
    history.push("/quest");
  };

  useEffect(async () => {
    await fetchQuestInfo();
  }, []);

  return (
    <div className="write">
      <CommonHeader />
      <div className="input-container-quest-detail">
        제목
        <div className="head-quest-detail" id="head" name="title">
          {info.title}
        </div>
      </div>
      <div className="input-container-quest-detail">
        설명
        <div className="content-quest-detail" id="content" name="content" type="text" placeholder="본문">
          {info.content}
        </div>
      </div>
      <div className="input-container-quest-detail">
        인원 수
        <div className="people-input-quest-detail" id="people" name="people" type="text" placeholder="인원">
          {info.people}
        </div>
      </div>
      <div className="input-container-quest-detail">
        사례비
        <div className="people-input-quest-detail" id="payment" name="payment" type="text" placeholder="사례비">
          {info.payment}
        </div>
      </div>
      {/* <div className="input-container-quest-detail">
        이미지
        <div className="image-quest-detail" id="image" name="image" type="file" accept="image/*" />
      </div> */}
      <div className="input-container-quest-detail">위치 지정하기</div>
      <MiniMap lng={info.lng} lat={info.lat} title={info.title} />
      {info.receiver === null ? (
        <div className="quest-accept-container">
          <div type="submit" className="submit-btn-quest-detail" onClick={acceptQuest}>
            수락하기
          </div>
        </div>
      ) : (
        <div className="quest-accept-container">
          <div type="submit" className="submit-btn-quest-detail-accept">
            수락하기
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestDetail;
