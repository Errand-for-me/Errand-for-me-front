import React from "react";
import QuestCard from "./quest-card";

function QuestList(props) {
  const { data } = props;

  return (
    <div className="quest-list">
      {data.map((val, idx) => (
        <QuestCard key={idx} data={val} />
      ))}
    </div>
  );
}

export default QuestList;
