import React from "react";
import styled from 'styled-components';

const HotBulletinContent = styled.div`
  margin: 10px;
`

function BulletList(props) {
  const { data } = props;
  console.log('넘어온 데이타', data);
  return (
    <div className="bullet-list">
      {
        data.forEach((val, idx) => {
          return <HotBulletinContent key={idx}> {val.title} </HotBulletinContent>
        })
      }
    </div>
  );
}

export default BulletList;