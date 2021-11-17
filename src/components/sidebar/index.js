import styled from "styled-components";
import BulletImage from "../../images/bullet.svg";
import SettingImage from "../../images/settings.png";
import AskImage from "../../images/ask.svg";
import { useHistory } from "react-router-dom";

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
