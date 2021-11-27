import { useHistory } from "react-router";
import styled from "styled-components";
import getId from "../utils/get-id";

const ButtonsContainer = styled.div`
  margin: auto;
  width: 100%;
  background-color: #ffffff;
  height: 64px;
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  font-size: 20px;
  font-family: "one_mobile";
  box-shadow: 0 9px 7px -3px lightgrey;
`;

const StyledMenuNotSelected = styled.div`
  padding: 20px;
  color: lightgray;
`;

const StyledMenuSelect = styled.div`
  padding: 20px;
  border-bottom: solid 4px black;
`;

function NavBar(props) {
  const history = useHistory();
  const { menu } = props;

  const RoutePage = async (url) => {
    const loginData = await getId();
    if (loginData.isLogin === false && (url === "map" || url === "chat-list")) {
      const modal = document.querySelector("#modal");
      modal.style.display = "flex";
    } else {
      history.push("/" + url);
    }
  };

  return (
    <ButtonsContainer>
      {menu === "bulletin" ? (
        <StyledMenuSelect
          onClick={() => {
            RoutePage("bulletin");
          }}
        >
          게시판
        </StyledMenuSelect>
      ) : (
        <StyledMenuNotSelected
          onClick={() => {
            RoutePage("bulletin");
          }}
        >
          게시판
        </StyledMenuNotSelected>
      )}

      {menu === "quest" ? (
        <StyledMenuSelect
          onClick={() => {
            RoutePage("quest");
          }}
        >
          퀘스트
        </StyledMenuSelect>
      ) : (
        <StyledMenuNotSelected
          onClick={() => {
            RoutePage("quest");
          }}
        >
          퀘스트
        </StyledMenuNotSelected>
      )}

      {menu === "chat" ? (
        <StyledMenuSelect
          onClick={() => {
            RoutePage("chat-list");
          }}
        >
          채팅
        </StyledMenuSelect>
      ) : (
        <StyledMenuNotSelected
          onClick={() => {
            RoutePage("chat-list");
          }}
        >
          채팅
        </StyledMenuNotSelected>
      )}
    </ButtonsContainer>
  );
}

export default NavBar;
