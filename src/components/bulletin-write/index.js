import React from "react";
import CommonHeader from "../header";
import "./write.css";

function BulletinWrite() {
  return (
    <div className="write">
      <CommonHeader />
      <form className="container" action={`${process.env.REACT_APP_SERVER_IP}/board`} method="POST">
        <div className="input-container">
          <input className="head" id="head" name="title" type="text" placeholder="제목" />
        </div>
        <div className="input-container">
          <textarea className="content" id="content" name="content" type="text" placeholder="본문" />
        </div>
        <button type="submit" className="submit-btn">
          글 쓰기
        </button>
      </form>
    </div>
  );
}

export default BulletinWrite;
