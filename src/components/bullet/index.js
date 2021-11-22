import React, { useEffect, useState } from "react";

import CommonHeader from "../header";

function Bullet(props) {
  const { params } = props.match;
  const [bulletData, setBulletData] = useState({ title: "", content: "" });

  useEffect(async () => {
    const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/bullet?id=${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await result.json();

    setBulletData(data);
  }, []);

  return (
    <div className="write">
      <CommonHeader />
      <div className="input-container">
        <div className="head" id="head" name="title" type="text">
          {bulletData.title}
        </div>
      </div>
      <div className="input-container">
        <div className="head" id="writer" name="writer" type="text">
          작성자: {bulletData.writer}
        </div>
      </div>
      <div className="input-container">
        <div className="content" id="content" name="content" type="text">
          {bulletData.content}
        </div>
      </div>
    </div>
  );
}

export default Bullet;
