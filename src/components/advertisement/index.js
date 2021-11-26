import styled from "styled-components";

const Ads = styled.div`
  background-color: aqua;
  width: 100vw;
  height: 20vh;
  size: 20px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 20px;
`;

const AdsArea = () => {
  return <Ads className="Ads">광고 영역</Ads>;
};

export default AdsArea;
