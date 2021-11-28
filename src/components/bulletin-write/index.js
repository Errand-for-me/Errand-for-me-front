import React from "react";
import CommonHeader from "../header";
import "./write.css";

function BulletinWrite() {
  return (
    <div className="write">
      <CommonHeader path="bulletin" menu="bulletin" />
      <form className="container" action={`${process.env.REACT_APP_SERVER_IP}/board`} method="POST">
        <div className="input-container">
          <input className="bullet-head" id="head" name="title" type="text" placeholder="제목" />
        </div>
        <div className="input-container">
          <textarea className="bullet-content" id="content" name="content" type="text" placeholder="본문" />
        </div>
        <button type="submit" className="bullet-submit-btn">
          글 쓰기
        </button>
      </form>
    </div>
  );
}

export default BulletinWrite;
