import React from "react";
import CommonHeader from "../header";
import "./quest-write.css";
const AWS = require("aws-sdk");
AWS.region = "ap-northest-2";

// const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
// const region = "kr-standard";
// const access_key = process.env.REACT_APP_ACCESS_KEY;
// const secret_key = process.env.REACT_APP_SECRET_KEY;

// const S3 = new AWS.S3({
//   ACL: "public-read",
//   endpoint: endpoint,
//   region: "ap-northest-2",
//   credentials: {
//     accessKeyId: access_key,
//     secretAccessKey: secret_key,
//   },
// });

const S3 = new AWS.S3();

const submitPress = async (e) => {
  // if (e.target.files && e.target.files[0]) {
  //   // 업로드된 파일이 존재한다면
  //   const image = e.target.files[0];
  //   const datas = new FormData();
  //   datas.append("image", image, image.name);
  //   try {
  //     const result = await axios({
  //       method: "post",
  //       url: "api", // post 통신을 위한 api 주소
  //       data: datas,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   } catch (err) {
  //     setImageError(true);
  //   }
  // }
  let { Buckets } = await S3.listBuckets().promise();

  for (let bucket of Buckets) {
    console.log(bucket.Name);
  }
};

function QuestWrite() {
  submitPress();
  return (
    <div className="write">
      <CommonHeader />
      <form className="container" action="http://localhost:8080/quest" method="POST" encType="multipart/form-data">
        <div className="input-container">
          제목
          <input className="head" id="head" name="title" type="text" placeholder="제목" />
        </div>
        <div className="input-container">
          설명
          <textarea className="content" id="content" name="content" type="text" placeholder="본문" />
        </div>
        <div className="input-container">
          인원 수
          <input className="people-input" id="people" name="people" type="text" placeholder="인원" />
        </div>
        <div className="input-container">
          이미지
          <input className="image" id="image" name="image" type="file" accept="image/*" />
        </div>
        <button type="submit" className="submit-btn" onClick={submitPress}>
          글 쓰기
        </button>
      </form>
    </div>
  );
}

export default QuestWrite;
