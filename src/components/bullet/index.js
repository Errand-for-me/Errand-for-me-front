import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import "./write.css";
import CommonHeader from "../header";
import ReplySection from "../reply";
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
    <div className="write">
      <CommonHeader />
      <div className="input-container">
        <div className="head" id="head" name="title" type="text">
          {bulletData.title}
        </div>
      </div>
      <div className="input-container">
        <div className="head" id="writer" name="writer" type="text">
          작성자: {bulletData.writer}
        </div>
      </div>
      <div className="input-container">
        <div className="content" id="content" name="content" type="text">
          {bulletData.content}
        </div>
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
