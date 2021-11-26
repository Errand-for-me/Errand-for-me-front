import { useState, useEffect } from "react";
import styled from "styled-components";
import BulletImage from "../../images/bullet.svg";
import MapImage from "../../images/map.svg";
import AskImage from "../../images/ask.svg";
import ChatImage from "../../images/chat.png";
import getId from "../utils/get-id";
import { useHistory } from "react-router-dom";

const ButtonsContainer = styled.div`
  margin: auto;
`;

const HotBulletin = styled.div`
  padding: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const HotBulletinContainer = styled.div`
  width: 80vw;
  margin: auto;
  border-radius: 20px;
  border: solid 1px;
`;

const HotBulletinHeader = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const HotBulletinContent = styled.div`
  margin: 10px;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const StyledMenu = styled.img`
  width: 36px;
  height: 36px;
  margin: 20px;
  cursor: pointer;
`;

const StyledTitle = styled.div`
  font-size: 15px;
`;

const StyledWriter = styled.div`
  font-size: 10px;
  margin-left: 10px;
  align-self: flex-end;
`;

const weekArr = ["월요일입니다.", "화요일입니다.", "수요일입니다.", "목요일입니다.", "금요일입니다.", "토요일입니다.", "일요일입니다.", "SAT", "SUN", "MON", "TUE", "WED", "THU"];

const HotBullet = () => {
  const history = useHistory();
  const [hotBulletList, setHotBoard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/board`, {
        mode: "cors",
      });

      const data = await result.json();
      const processed = data.slice(0, 4);
      setHotBoard(processed);
    }

    fetchData();
  }, []);

  const RoutePage = async (url) => {
    const loginData = await getId();
    if (loginData.isLogin === false && (url === "map" || url === "chat-list")) alert("로그인 해주세요.");
    else history.push("/" + url);
  };

  return (
    <HotBulletin className="hotBulletins">
      <ButtonsContainer>
        <StyledMenu
          src={BulletImage}
          onClick={() => {
            RoutePage("bulletin");
          }}
        ></StyledMenu>
        <StyledMenu
          src={AskImage}
          onClick={() => {
            RoutePage("quest");
          }}
        ></StyledMenu>
        <StyledMenu
          src={MapImage}
          onClick={() => {
            RoutePage("map");
          }}
        ></StyledMenu>
        <StyledMenu
          src={ChatImage}
          onClick={() => {
            RoutePage("chat-list");
          }}
        ></StyledMenu>
      </ButtonsContainer>
      <HotBulletinContainer>
        <HotBulletinHeader>Hot 게시판!!</HotBulletinHeader>
        {hotBulletList.map((val, idx) => {
          return (
            <HotBulletinContent key={idx}>
              <StyledTitle>{val.title}</StyledTitle>
              <StyledWriter>{val.writer}</StyledWriter>
            </HotBulletinContent>
          );
        })}
      </HotBulletinContainer>
    </HotBulletin>
  );
};

export default HotBullet;
