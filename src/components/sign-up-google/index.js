import CommonHeader from "../header";
import React, { useEffect } from "react";
import "./sign-up-google.css";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import globalAtom from "../../loginState";
import Modal from "../utils/modal/modal";

function SignUpGooglePage() {
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const history = useHistory();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const modal = document.querySelector("#modal");
    modal.querySelector(".modal-title").innerHTML = "회원 가입!";
    modal.querySelector(".modal-content").innerHTML = "회원 가입이 필요해요!";
    modal.style.display = "flex";
  }, []);

  const send = async () => {
    const nickname = document.querySelector("#head").value.trim();
    if (nickname.length < 2 || nickname.length > 15) {
      document.body.style.overflow = "hidden";
      const modal = document.querySelector("#modal");
      modal.querySelector(".modal-title").innerHTML = "닉네임 검사";
      modal.querySelector(".modal-content").innerHTML = "3자에서 15자 사이로 지정해주세요!";
      modal.style.display = "flex";
    } else {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/google-sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
        }),
        credentials: "include",
      });

      const data = await result.text();
      if (data === "true") {
        setLoginInfo({ isLogin: true, nickname: nickname });
        history.goBack();
      } else {
        document.body.style.overflow = "hidden";
        const modal = document.querySelector("#modal");
        modal.querySelector(".modal-title").innerHTML = "회원 가입 오류!";
        modal.querySelector(".modal-content").innerHTML = "닉네임이 중복된 것 같아요!";
        modal.style.display = "flex";
      }
    }
  };

  return (
    <div className="sign-up-write-google">
      <Modal />
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
