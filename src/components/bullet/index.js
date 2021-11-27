import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import "./write.css";
import CommonHeader from "../header";
import ReplySection from "../reply";
import profileImage from "../../images/profile.svg";
import globalAtom from "../../loginState.js";
import AdsArea from "../advertisement";

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
      <CommonHeader />
      <div className="post-container">
        <div className="user-info">
          <img className="user-profile" src={profileImage} />
          <div className="writer-info-container">
            <div className="user-name">{bulletData.writer}</div>
            <div className="post-time">1시간 전</div>
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
