import { useState } from "react";
import { useAtom } from "jotai";
import { Alert, Button } from "antd";

import { useUserStore } from "../../../../store/user";
import { createComment } from "../../../../api/Comment";
import { commentsAtom } from "../../atom/comments";
import * as S from "./styles";
import { USER_DEFAULT_IMG, getUserInfo } from "../../../../utils/utils";

const NewComment = ({ postId }) => {
  const authUser = getUserInfo();
  const [comments, setComments] = useAtom(commentsAtom);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState("idle");
  const handleNewComment = () => {
    if(newComment) {
      setStatus("pending");
      createComment({
        postId,
        content: newComment,
        commenterId: authUser.id
      })
        .then((res) => {
            setComments((prevComments) => [{...res, commenter:authUser}, ...prevComments]);
            setNewComment("");
            setStatus("resolved");
        })
    }
  };

  return (
    <>
      <S.NewComment>
        <S.Image
          src={`${(authUser.avatarLink && authUser.avatarLink.length > 20)
            ? `${authUser.avatarLink}`
            : USER_DEFAULT_IMG}`}
          alt="user image"
          height="32"
          width="32"
        />

        <S.Field>
          <form>
            <S.TextEditor value={newComment} onChange={setNewComment} />
            <Button
              type="primary"
              onClick={handleNewComment}
              disabled={status === "pending"}
            >
              Submit
            </Button>
          </form>
        </S.Field>
      </S.NewComment>
    </>
  );
};

export default NewComment;
