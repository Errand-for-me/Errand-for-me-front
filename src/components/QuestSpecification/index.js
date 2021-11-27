import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import MiniMap from "./map";
import CommonHeader from "../header";
import "./quest-detail-page.css";
import { useHistory } from "react-router";
import globalAtom from "../../loginState";

function QuestDetail(props) {
  const history = useHistory();
  const loginInfo = useRecoilValue(globalAtom.user);
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

  const deleteQuest = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_IP}/quest/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: questId,
      }),
      mode: "cors",
    });
    history.push("/quest");
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

  useEffect(() => {
    async function fetchData() {
      await fetchQuestInfo();
    }
    fetchData();
  }, []);

  return (
    <div className="write">
      <CommonHeader path="quest" />
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
      <div className="input-container-quest-detail">위치 지정하기</div>
      <MiniMap lng={info.lng} lat={info.lat} title={info.title} />
      {info.writer === loginInfo.nickname ? (
        info.receiver === null ? (
          <div className="quest-accept-container">
            <div className="submit-btn-quest-detail" onClick={deleteQuest}>
              삭제하기
            </div>
          </div>
        ) : (
          <div className="quest-accept-container">
            <div className="submit-btn-quest-detail" onClick={deleteQuest}>
              완 료!
            </div>
          </div>
        )
      ) : info.receiver === null ? (
        <div className="quest-accept-container">
          <div className="submit-btn-quest-detail" onClick={acceptQuest}>
            수락하기
          </div>
        </div>
      ) : (
        <div className="quest-accept-container">
          <div className="submit-btn-quest-detail-accept">수락하기</div>
        </div>
      )}
    </div>
  );
}

export default QuestDetail;
