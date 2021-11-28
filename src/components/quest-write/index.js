import React, { useEffect, useState } from "react";
import MiniMap from "./map";
import CommonHeader from "../header";
import "./quest-write.css";

function QuestWrite() {
  const [mapInfo, setMapInfo] = useState(false);
  const [titleInfo, setTitleInfo] = useState(false);
  const [contentInfo, setContentInfo] = useState(false);
  const [peopleInfo, setPeopleInfo] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(false);
  const [imageInfo, setImageInfo] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".quest-container");
    const title = container.querySelector("#head");
    const content = container.querySelector("#content");
    const people = container.querySelector("#people");
    const payment = container.querySelector("#payment");
    const image = container.querySelector("#image");

    title.addEventListener("input", (e) => {
      if (e.target.value.length === 0) setTitleInfo(false);
      else setTitleInfo(true);
    });
    content.addEventListener("input", (e) => {
      if (e.target.value.length === 0) setContentInfo(false);
      else setContentInfo(true);
    });
    people.addEventListener("input", (e) => {
      if (e.target.value.length === 0) setPeopleInfo(false);
      else setPeopleInfo(true);
    });
    payment.addEventListener("input", (e) => {
      if (e.target.value.length === 0) setPaymentInfo(false);
      else setPaymentInfo(true);
    });
    image.addEventListener("input", (e) => {
      if (e.target.value) setImageInfo(true);
      else setImageInfo(false);
    });
  }, []);

  return (
    <div className="quest-write">
      <CommonHeader path="quest" menu="quest" />
      <form className="quest-container" action={`${process.env.REACT_APP_SERVER_IP}/quest`} method="POST" encType="multipart/form-data">
        <div className="quest-input-container">
          제목
          <input className="head" id="head" name="title" type="text" placeholder="제목" />
        </div>
        <div className="input-container">
          설명
          <textarea className="content" id="content" name="content" type="text" placeholder="본문" />
        </div>
        <div className="input-container">
          인원 수
          <input className="people-input" id="people" name="people" type="number" placeholder="인원" />
        </div>
        <div className="input-container">
          사례비
          <input className="people-input" id="payment" name="payment" type="number" placeholder="사례비" />
        </div>
        <div className="input-container">
          이미지
          <input className="image" id="image" name="image" type="file" accept="image/*" />
        </div>
        <div className="input-container">위치 지정하기</div>
        <MiniMap setMapInfo={setMapInfo} />
        {mapInfo && titleInfo && contentInfo && peopleInfo && paymentInfo ? (
          <button type="submit" className="quest-submit-btn">
            글 쓰기
          </button>
        ) : (
          <div className="quest-submit-btn-inactivated">글 쓰기</div>
        )}
      </form>
    </div>
  );
}

export default QuestWrite;
