/*global kakao*/
import CommonHeader from "../header";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./map.css";

function Map() {
  const [questList, setQuestList] = useState([]);
  const history = useHistory();
  const getQuests = async () => {
    const result = await fetch(`${process.env.REACT_APP_SERVER_IP}/quest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await result.json();
    setQuestList([...data]);
  };

  useEffect(() => {
    getQuests();
  }, []);

  const RoutePage = (id) => {
    history.push(`/quest/detail/${id}`);
  };

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.555943079142075, 127.04352676109791),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const imageOption = { offset: new kakao.maps.Point(13, 69) };

    questList.map((quest) => {
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const position = new kakao.maps.LatLng(quest.lat, quest.lng);

      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: quest.title,
        image: markerImage,
      });

      let content = document.createElement("div");
      content.className = "customoverlay";
      let aTag = document.createElement("a");
      aTag.target = "_blank";
      let spanTag = document.createElement("span");
      spanTag.className = "overlay-title";
      spanTag.innerHTML = quest.title;
      aTag.appendChild(spanTag);
      content.appendChild(aTag);
      content.addEventListener("click", () => RoutePage(quest.id));

      const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
        clickable: true,
      });
    });
  }, [questList]);

  return (
    <div className="map-area">
      <div id="map" style={{ width: "100vw", flex: 1 }}></div>
    </div>
  );
}

export default Map;
