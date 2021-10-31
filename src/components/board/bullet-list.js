import React from "react";
import styled from 'styled-components';

const HotBulletinContent = styled.div`
  margin: 10px;
`

function BulletList(props) {
  const { data } = props;

  return (
    <div className="bullet-list">
      {data.map((val, idx) => 
          <HotBulletinContent key={idx}> {val.title} </HotBulletinContent> 
      )}
    </div>
  );
}

export default BulletList;