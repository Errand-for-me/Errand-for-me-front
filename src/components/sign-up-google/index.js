import CommonHeader from "../header";
import React, { useEffect } from "react";
import "./sign-up-google.css";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import globalAtom from "../../loginState";

function SignUpGooglePage() {
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const history = useHistory();
  useEffect(() => {
    alert("회원가입이 필요합니다.");
  }, []);

  const send = async () => {
    const nickname = document.querySelector("#head").value;
    await fetch(`${process.env.REACT_APP_SERVER_IP}/google-sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
      credentials: "include",
    });

    setLoginInfo({ isLogin: true, nickname: nickname });
    history.goBack();
  };

  return (
    <div className="sign-up-write-google">
      <CommonHeader />
      <div className="input-container">
        닉네임
        <input className="head" id="head" name="nickname" type="text" placeholder="닉네임" />
      </div>
      <button type="submit" className="submit-btn-google" onClick={send}>
        회원가입
      </button>
    </div>
  );
}

export default SignUpGooglePage;
