import React from "react";
import MiniMap from "./map";
import CommonHeader from "../header";
import "./quest-write.css";

function QuestWrite() {
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
        <MiniMap />
        <button type="submit" className="quest-submit-btn">
          글 쓰기
        </button>
      </form>
    </div>
  );
}

export default QuestWrite;
