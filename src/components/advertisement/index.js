import styled from "styled-components";

const Ads = styled.div`
  background-color: #ffd7a7;
  width: 100vw;
  height: 12vh;
  size: 20px;
  margin: auto;
  margin-top: 10px;
  padding-top: 5px;
  text-align: center;
  border-radius: 20px;
`;

const AdsArea = () => {
  return <Ads className="Ads">광고 영역</Ads>;
};

export default AdsArea;
