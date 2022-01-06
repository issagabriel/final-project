import React from "react";
import { post } from "../http/actions";

const Comment = (props) => {
  const [comment, setComment] = React.useState("");
  const [deleteComment, setDeleteComment] = React.useState({});
  const [showComment, setShowComment] = React.useState("");

  const postComment = () => {
    post(`/comments/add-comment`, {
      content: comment,
    })
      .then((results) => {
        console.log(results);
        setShowComment(results.data.content);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  return (
    <div className="Comment">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Anything in Common?"
      ></input>

      <button onClick={postComment}>Add Comment</button>
      <p>{showComment}</p>
    </div>
  );
};

export default Comment;
