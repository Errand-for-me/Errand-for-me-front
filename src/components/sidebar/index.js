import styled from "styled-components";
import BulletImage from "../../images/bullet.svg";
import SettingImage from "../../images/settings.png";
import AskImage from "../../images/ask.svg";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

const StyledSidebar = styled.div`
  background-color: rgb(40, 45, 78);
  width: 100vw;
  height: 92vh;
  position: fixed;
  z-index: 1;
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
  flex-direction: column-reverse;
  background-color: rgb(32, 37, 64);
`;

const StyledDiv2 = styled.div`
  display: flex;
  width: 80vw;
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

const googleLogin = async (response) => {
  // login 로직 구현
  const option = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    data: {
      accessToken: response.accessToken,
    },
    url: this.serverHost + "/auth/googleLogin",
  };

  try {
    return await fetch(option);
  } catch (e) {
    throw e;
  }
};

const onFailure = (response) => {
  console.log(response);
};

const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?`;
const scope = `scope=https%253A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly`;
const responseType = `&response_type=id_token`;
const redirectURL = `&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth`;
const CLIENT_ID = `&client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID}`;

const oauthURL = googleURL + scope + redirectURL + CLIENT_ID + responseType;

const Sidebar = (props) => {
  const history = useHistory();

  const routePage = (url) => {
    history.push(`/${url}`);
  };

  return (
    <StyledSidebar className="sidebar" display={props}>
      <StyledDiv>
        <StyledMenu src={SettingImage}></StyledMenu>
        <StyledMenu src={BulletImage}></StyledMenu>
        <StyledMenu src={AskImage}></StyledMenu>
      </StyledDiv>
      <StyledDiv2>
        <a href={oauthURL}>로그인 하기</a>
        <GoogleLogin clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} buttonText="Login" onSuccess={googleLogin} onFailure={onFailure} />
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
    </StyledSidebar>
  );
};

export default Sidebar;
