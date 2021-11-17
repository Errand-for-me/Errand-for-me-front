import CommonHeader from "../header";
import React, { useEffect } from "react";
import "./sign-in.css";

function SignInPage() {
  return (
    <div className="sign-in-write">
      <CommonHeader />
      <form className="container" action={`${process.env.REACT_APP_SERVER_IP}/sign-up`} method="POST" encType="multipart/form-data">
        <div className="input-container">
          아이디
          <input className="head" id="head" name="title" type="text" placeholder="아이디" />
        </div>
        <div className="input-container">
          비밀번호
          <input className="sign-in-password" id="content" name="content" type="password" placeholder="비밀번호" />
        </div>
        <button type="submit" className="sign-in-submit-btn">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
