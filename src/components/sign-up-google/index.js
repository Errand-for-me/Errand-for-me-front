import CommonHeader from "../header";
import React, { useEffect } from "react";
import "./sign-up-google.css";

function SignUpGooglePage() {
  useEffect(() => {
    alert("회원가입이 필요합니다.")
  }, []);
  
  return (
    <div className="sign-up-write-google">
      <CommonHeader />
      <div className="input-container">
        닉네임
        <input className="head" id="head" name="title" type="text" placeholder="제목" />
      </div>
      <button type="submit" className="submit-btn-google">
        회원가입
      </button>
    </div>
  );
}

export default SignUpGooglePage;
