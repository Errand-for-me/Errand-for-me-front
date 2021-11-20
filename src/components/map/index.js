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

    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow({zindex:1});

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }
    
    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    
    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      // if (status === kakao.maps.services.Status.OK) {
      //   var infoDiv = document.getElementById('centerAddr');
    
      //   for(var i = 0; i < result.length; i++) {
      //     // 행정동의 region_type 값은 'H' 이므로
      //     if (result[i].region_type === 'H') {
      //         infoDiv.innerHTML = result[i].address_name;
      //         break;
      //     }
      //   }
      // }    
    }

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
          
          let content = '<div class="bAddr">' +
                          '<span class="title">법정동 주소정보</span>' + 
                          detailAddr + 
                      '</div>';

          console.log(mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng())
          // 마커를 클릭한 위치에 표시합니다 
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })
    })
  }, []);

  return (
    <div className="App">
      <CommonHeader />
      <div id="map" style={{ width: "100vw", height: "80vh" }}></div>
    </div>
  );
}

export default Map;
