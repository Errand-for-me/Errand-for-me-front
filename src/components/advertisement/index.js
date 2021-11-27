import styled from "styled-components";
import adImage from "../../images/ad_img.png";

const Ads = styled.div`
  background-color: rgb(243, 243, 243);
  display: flex;
  width: 100vw;
  height: 88px;
  size: 20px;
  margin: auto;
  padding-top: 5px;
  border-radius: 5px;
`;

const AdImg = styled.img`
  width: 120px;
  height: 86px;
  margin-top: -10px;
`;

const AdTitle = styled.div`
  margin: 20px;
  font-weight: bold;
  font-size: 15px;
`;

const AdDescription = styled.div`
  margin-left: 20px;
  font-weight: bold;
  color: darkgray;
  font-size: 14px;
`;

const AdsArea = () => {
  return (
    <Ads className="Ads">
      <div>
        <AdTitle>프라이데이 베이커리 절찬 행사중!!</AdTitle>
        <AdDescription>뚝섬역 1번 출구 앞</AdDescription>
      </div>
      <AdImg src={adImage} />
    </Ads>
  );
};

export default AdsArea;
