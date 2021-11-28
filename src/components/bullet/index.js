import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import "./write.css";
import CommonHeader from "../header";
import ReplySection from "../reply";
import profileImage from "../../images/profile.svg";
import globalAtom from "../../loginState.js";
import AdsArea from "../advertisement";

const regex = /(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+).+?(?<hour>[0-9]+):(?<min>[0-9]+)/;

function Bullet(props) {
  const history = useHistory();
  const { params } = props.match;
  const loginInfo = useRecoilValue(globalAtom.user);
  const bulletId = params.id;
  const [bulletData, setBulletData] = useState({ title: "", content: "" });

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/bullet?id=${bulletId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      const data = await result.json();
      const group = regex.exec(data.postTime).groups;
      let { year, month, day, hour, min } = group;

      hour = Number(hour) + 9;
      let isDay = false;
      if (hour >= 12) {
        isDay = true;
        if (hour > 12) hour -= 12;
      }

      data.time = `${year.slice(2)}.${month}.${day} ${isDay ? "오후" : "오전"} ${hour}:${min}`;

      setBulletData(data);
    }
    fetchData();
  }, []);

  const deleteBullet = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_IP}/board/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: bulletId,
      }),
      mode: "cors",
    });
    history.push("/bulletin");
  };

  return (
    <div className="bullet">
      <CommonHeader path="bulletin" menu="bulletin" />
      <div className="post-container">
        <div className="user-info">
          <img className="user-profile" src={profileImage} />
          <div className="writer-info-container">
            <div className="user-name">{bulletData.writer}</div>
            <div className="post-time">{bulletData.time ? bulletData.time : "언제보냇누"}</div>
          </div>
        </div>
        <div className="bulletin-title">{bulletData.title}</div>
        <div className="bulletin-content">{bulletData.content}</div>
      </div>

      {loginInfo.nickname === bulletData.writer ? (
        <div>
          <div className="submit-btn-delete" onClick={deleteBullet}>
            글 삭제
          </div>
        </div>
      ) : (
        <></>
      )}
      <AdsArea />
      <ReplySection bulletTitle={bulletData.title} />
    </div>
  );
}

export default Bullet;
