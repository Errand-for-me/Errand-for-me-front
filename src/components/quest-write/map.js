/*global kakao*/
import React, { useEffect } from "react";
import "./quest-write.css";

function MiniMap() {
  useEffect(() => {
    let container = document.getElementById("mini-map");
    const latField = document.querySelector("#lat");
    const lngField = document.querySelector("#lng");
    let options = {
      center: new kakao.maps.LatLng(37.555943079142075, 127.04352676109791),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address ? "<div>도로명주소 : " + result[0].road_address.address_name + "</div>" : "";
          detailAddr += "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          let content = '<div class="bAddr">' + '<span class="title">주소정보</span>' + detailAddr + "</div>";

          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();
          latField.value = lat;
          lngField.value = lng;
          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
  }, []);

  return (
    <div className="minimap">
      <div id="mini-map" style={{ width: "80vw", height: "60vh", margin: "auto" }}></div>
      <input id="lat" name="lat" type="number" value="0" />
      <input id="lng" name="lng" type="number" value="0" />
    </div>
  );
}

export default MiniMap;
