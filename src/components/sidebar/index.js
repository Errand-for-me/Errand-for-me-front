import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import globalAtom from "../../loginState";
import "./sidebar.css";

const StyledSidebar = styled.div`
  width: 100vw;
  height: 92vh;
  position: fixed;
  z-index: 2;
  display: ${(props) => props.display.displayType};
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

const Sidebar = (props) => {
  const loginInfo = useRecoilValue(globalAtom.user);
  const setLoginInfo = useSetRecoilState(globalAtom.user);
  const history = useHistory();
  const { toggle } = props;
  const routePage = (url) => {
    history.push(`/${url}`);
  };

  return (
    <StyledSidebar className="sidebar" display={props}>
      {loginInfo.isLogin === false ? (
        <StyledDiv2>
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
          {/* <StyledSignIn onClick={logOut}>로그아웃</StyledSignIn> */}
        </StyledDiv2>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
