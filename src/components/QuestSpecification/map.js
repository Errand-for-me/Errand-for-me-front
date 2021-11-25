/*global kakao*/
import React, { useEffect } from "react";

function MiniMap(props) {
  const { lat, lng, title } = props;
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const imageOption = { offset: new kakao.maps.Point(13, 69) };

  useEffect(() => {
    let container = document.getElementById("mini-map");
    let options = {
      center: new kakao.maps.LatLng(37.555943079142075, 127.04352676109791),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    let marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
      title: title,
      image: markerImage,
    });

    const content = `<div class="customoverlay">
        <a target="_blank">
          <span class="overlay-title">${title}</span>
        </a>
      </div>`;

    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: markerPosition,
      content: content,
      yAnchor: 1,
    });
  }, [title]);

  return (
    <div className="minimap">
      <div id="mini-map" style={{ width: "80vw", height: "80vh", margin: "auto" }}></div>
      <input id="lat" name="lat" type="hidden" value="" />
      <input id="lng" name="lng" type="hidden" value="" />
    </div>
  );
}

export default MiniMap;
