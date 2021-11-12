import React from "react";
import styled from "styled-components";

const QuestContent = styled.div`
  margin: 10px;
`;

function QuestList(props) {
  const { data } = props;
  return (
    <div className="quest-list">
      {data.map((val, idx) => (
        <QuestContent key={idx}> {val} </QuestContent>
      ))}
    </div>
  );
}

export default QuestList;
