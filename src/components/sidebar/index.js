import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BulletImage from "../../images/bullet.svg";
import SettingImage from "../../images/settings.png";
import AskImage from "../../images/ask.svg";
import theme from "../../images/theme.png";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import globalAtom from "../../loginState";
import "./sidebar.css";

const StyledSidebar = styled.div`
  width: 100vw;
  height: 92vh;
  position: fixed;
  z-index: 2;
  display: ${(props) => props.display.displayType};
`;

const StyledMenu = styled.img`
  width: 36px;
  height: 36px;
  margin: 20px;
  cursor: pointer;
  filter: invert(100%);
`;

const StyledDiv = styled.div`
  display: flex;
  width: 20vw;
  flex-direction: column;
  background-color: rgb(32, 37, 64);
`;

const StyledDiv2 = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
`;

const StyledSignIn = styled.div`
  background-color: #fff;
  text-align: center;
  margin: 10px;
  margin-top: 10%;
  padding: 10px;
  border-radius: 10px;
`;

const StyledSignUp = styled.div`
  background-color: #fff;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const StyledUserInfo = styled.div`
  background-color: #fff;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
`;

const onFailure = () => {
  const modal = document.querySelector("#modal");
  modal.style.display = "flex";
};

const Sidebar = (props) => {
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const history = useHistory();
  const { toggle } = props;
  const routePage = (url) => {
    history.push(`/${url}`);
  };

  const logOut = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_IP}/logOut`, {
      method: "GET",
      headers: {
        "Conent-Type": "application/json",
      },
      credentials: "include",
    });
    setLoginInfo({ isLogin: false });
    toggle("none");
  };

  const googleLogin = async (response) => {
    const {
      profileObj: { email, name },
    } = response;

    try {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/sign-in-api?email=${email}&name=${name}`, {
        method: "GET",
        headers: {
          "Conent-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await result.json();
      if (data.id === null) {
        routePage("sign-up-google");
      } else {
        setLoginInfo({ isLogin: true, nickname: data.nickname });
        toggle("none");
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <StyledSidebar className="sidebar" display={props}>
      {/* <StyledDiv>
        <StyledMenu src={SettingImage}></StyledMenu>
        <StyledMenu src={BulletImage}></StyledMenu>
        <StyledMenu src={AskImage}></StyledMenu>
      </StyledDiv> */}
      {loginInfo.isLogin === false ? (
        <StyledDiv2>
          <GoogleLogin clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} buttonText="Login" onSuccess={googleLogin} onFailure={onFailure} className="google-login-btn" />
          <StyledSignIn
            onClick={() => {
              routePage("sign-in");
            }}
          >
            로그인
          </StyledSignIn>
          <StyledSignUp
            onClick={() => {
              routePage("sign-up");
            }}
          >
            회원가입
          </StyledSignUp>
        </StyledDiv2>
      ) : (
        <StyledDiv2>
          <StyledUserInfo>닉네임: {loginInfo.nickname}</StyledUserInfo>
          <StyledUserInfo>등급: 브론즈</StyledUserInfo>
          <StyledUserInfo>점수: 102 점</StyledUserInfo>
          <StyledSignIn onClick={logOut}>로그아웃</StyledSignIn>
        </StyledDiv2>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
