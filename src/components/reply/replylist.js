import React from "react";
import "./comment.css";

function ReplyList(props) {
  const { replies } = props;
  console.log(replies);

  return (
    <div>
      <div className="comment-header">댓글</div>
      {replies.map((val, idx) => (
        <div className="comment-card" key={idx}>
          <div className="comment-info">
            <div className="comment-writer">{val.writer}</div>
            <div className="comment-time">{val.time}</div>
          </div>
          {val.content}
        </div>
      ))}
    </div>
  );
}

export default ReplyList;