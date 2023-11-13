import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import * as S from "./styles";

import parse from "html-react-parser";
import moment from "moment";
import { USER_DEFAULT_IMG, getUserInfo } from "../../../../utils/utils";
import { Button } from "antd";

const Comment = forwardRef(({ comment, onDelete }, ref) => {

  const authUser = getUserInfo();

  const handleDeleteComment = () => {
    if(comment) {
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
    <S.Comment ref={ref}>
      <S.ImageLink to={`/user/${comment.commenter?.id}`}>
        <S.Image
          src={
            (comment.commenter?.avatarLink && comment.commenter?.avatarLink.length > 20)
              ? `${comment.commenter?.avatarLink}`
              : USER_DEFAULT_IMG
          }
          alt="comment user image"
        />
      </S.ImageLink>
      <S.Content>
        <S.Header>
          <Link to={`/user/${comment.commenter?.id}`}>
            <S.Button type="text">
              {comment.commenter?.userName}
            </S.Button>
          </Link>

          <S.SeparateDot>·</S.SeparateDot>
          <S.PublishDate>
          {moment(comment.createAt).format('DD-MM-YYYY')}
          </S.PublishDate>

          {(authUser.id === comment.commenter.id) && <Button type="link" danger style={{position: 'absolute', right:'0px', top:'0px'}} onClick={() => onDelete(comment.id)}>
            Delete
          </Button>}

        </S.Header>
        <S.Description>{parse(`${comment.content}`)}</S.Description>
      </S.Content>
    </S.Comment>
  );
});

export default Comment;
