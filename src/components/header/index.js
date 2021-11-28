import { useEffect } from "react";
import "./header.css";
import back from "../../images/back.svg";
import Hamburger from "../../images/hamburger.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import globalAtom from "../../loginState";
import { useHistory } from "react-router";
import getId from "../utils/get-id";
import GoogleLogin from "react-google-login";
import NavBar from "../nav-bar";

const onFailure = () => {
  const modal = document.querySelector("#modal");
  modal.style.display = "flex";
};

const CommonHeader = (props) => {
  const { isMainPage, path, toggle, menu } = props;
  const history = useHistory();
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);

  const moveHome = () => {
    history.push("/");
  };

  useEffect(() => {
    async function fetchData() {
      if (loginInfo.isLogin === false) {
        const result = await getId();
        if (result.isLogin === true) {
          setLoginInfo(result);
        }
      }
    }
    fetchData();
  }, []);

  const logOut = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_IP}/logOut`, {
      method: "GET",
      headers: {
        "Conent-Type": "application/json",
      },
      credentials: "include",
    });
    setLoginInfo({ isLogin: false });
    history.push("/");
  };

  const routePage = (url) => {
    history.push(`/${url}`);
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
      }
    } catch (e) {
      throw e;
    }
  };

  const goBack = () => {
    switch (path) {
      case "bulletin":
        history.push("/bulletin");
        break;
      case "quest":
        history.push("/quest");
        break;
      case "chat":
        history.push("/chat-list");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <>
      <div className="common-header">
        {isMainPage ? <img className="back" src={Hamburger} onClick={toggle} /> : <img className="back" src={back} onClick={goBack} />}
        <div className="logo" onClick={moveHome} />
        {loginInfo.isLogin ? (
          <button className="custom-login-btn" onClick={logOut}>
            로그아웃
          </button>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            render={(renderProps) => (
              <button className="custom-login-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                로그인
              </button>
            )}
            buttonText="Login"
            onSuccess={googleLogin}
            onFailure={onFailure}
            className="google-login-btn"
          />
        )}
      </div>
      <NavBar menu={menu} />
    </>
  );
};

export default CommonHeader;
