import { useCallback, useRef, useState } from "react";
import useComments from "../hooks/useComments";
import Comment from "./comment/Comment";
import { removeComment } from "../../../api/Comment";
import { useNavigate } from "react-router";

const CommentsList = ({ postId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { comments, loading, hasMore } = useComments(pageNumber, {postId, status: 'Active', orderBy: 'createAt-asc'});
  const observer = useRef();
  const navigate = useNavigate();

  const onDeleteComment = (id) => {
    removeComment(id)
      .then(() => {
        navigate(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  // console.log(comments);

  const lastElementCommentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className="comments_list">
      {comments.map((comment, index) => {
        if (comments.length === index + 1) {
          return (
            <Comment
              key={comment.id}
              ref={lastElementCommentRef}
              comment={comment}
              onDelete={onDeleteComment}
            />
          );
        } else {
          return <Comment key={comment.id} comment={comment} onDelete={onDeleteComment}/>;
        }
      })}
    </div>
  );
};

export default CommentsList;
