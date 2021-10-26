import styled from "styled-components";
import ChatImage from "../../images/chat.png";
import SettingImage from "../../images/settings.png";
import GroupImage from "../../images/group.png";

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
        <StyledMenu src={ChatImage} ></StyledMenu>
        <StyledMenu src={SettingImage}></StyledMenu>
        <StyledMenu src={GroupImage}></StyledMenu>
      </StyledDiv>
    </StyledSidebar>
  );
}

export default Sidebar;