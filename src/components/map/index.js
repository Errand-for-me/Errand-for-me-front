/*global kakao*/
import CommonHeader from "../header";
import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.555943079142075, 127.04352676109791),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="App">
      <CommonHeader />
      <div id="map" style={{ width: "100vw", height: "80vh" }}></div>
      되겠냐
    </div>
  );
}

export default Map;
