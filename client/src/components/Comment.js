import React from "react";

const Comment = () => {
  const [comment, setComment] = React.useState({});
  const [deleteComment, setDeleteComment] = React.useState({});

  React.useEffect(() => {
    post(`comments/add-comment`);
  });

  return (
    <div>
      <h3>Comments</h3>
    </div>
  );
};

export default Comment;
