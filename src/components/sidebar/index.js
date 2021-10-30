import styled from "styled-components";
import BulletImage from "../../images/bullet.svg";
import SettingImage from "../../images/settings.png";
import AskImage from "../../images/ask.svg";

const StyledSidebar = styled.div`
  background-color: rgb(40, 45, 78);
  width: 100vw;
  height: 92vh;
  position: fixed;
  z-index: 1;
  display: ${props => props.display.displayType};
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
  flex-direction: column-reverse;
  background-color: rgb(32, 37, 64);
`;


const Sidebar = (props) => {
  return (
    <StyledSidebar className='sidebar' display={props}>
      <StyledDiv>
        <StyledMenu src={SettingImage}></StyledMenu>
        <StyledMenu src={BulletImage} ></StyledMenu>
        <StyledMenu src={AskImage}></StyledMenu>
      </StyledDiv>
      <div>
        <button>
          로그인
        </button>
        <button>
          회원가입
        </button>
      </div>
    </StyledSidebar>
  );
}

export default Sidebar;