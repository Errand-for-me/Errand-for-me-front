import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const BulletListContainer = styled.div``;

const HotBulletinContent = styled.div`
  justify-content: space-between;
  margin: 10px;
  border-bottom: 1px solid lightgray;
`;

const Title = styled.div`
  font-family: "one_mobile";
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Preview = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
`;

const Time = styled.div`
  font-size: 13px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Writer = styled.div`
  font-size: 13px;
`;

function BulletList(props) {
  const { data } = props;
  const history = useHistory();

  const getBulletPage = (id) => {
    history.push(`bulletins/${id}`);
  };

  return (
    <BulletListContainer>
      {data.map((val, idx) => (
        <HotBulletinContent
          key={idx}
          onClick={() => {
            getBulletPage(val.id);
          }}
        >
          <Title> {val.title.length > 15 ? val.title.slice(0, 15) + "..." : val.title} </Title>
          <Preview> {val.content.length > 15 ? val.content.slice(0, 20) + "..." : val.content} </Preview>
          <Detail>
            <Time> {val.time ? val.time : "언제보냇누"} </Time>
            <Writer> {val.writer} </Writer>
          </Detail>
        </HotBulletinContent>
      ))}
    </BulletListContainer>
  );
}

export default BulletList;
