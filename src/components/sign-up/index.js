import CommonHeader from "../header";
import React from "react";
import "./sign-up.css";

function SignUpPage() {
  return (
    <div className="sign-up-write">
      <CommonHeader />
      <div className="input-container">
        제목
        <input className="head" id="head" name="title" type="text" placeholder="제목" />
      </div>
      <div className="input-container">
        설명
        <input className="content" id="content" name="content" type="text" placeholder="본문" />
      </div>
      <div className="input-container">
        인원 수
        <input className="people-input" id="people" name="people" type="text" placeholder="인원" />
      </div>
      <button type="submit" className="submit-btn">
        글 쓰기
      </button>
    </div>
  );
}

export default SignUpPage;
