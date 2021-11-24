import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const HotBulletinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-weight: bold;
`;

const HotBulletinContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const Title = styled.div``;

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
    <div className="bullet-list">
      <HotBulletinHeader>
        <div> 글 제목 </div>
        <div> 작성자 </div>
      </HotBulletinHeader>
      {data.map((val, idx) => (
        <HotBulletinContent
          key={idx}
          onClick={() => {
            getBulletPage(val.id);
          }}
        >
          <Title> {val.title} </Title>
          <Writer> {val.writer} </Writer>
        </HotBulletinContent>
      ))}
    </div>
  );
}

export default BulletList;
