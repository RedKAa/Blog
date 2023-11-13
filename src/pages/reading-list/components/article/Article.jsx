import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import * as S from "./styles";

import { format } from "date-fns";
import { Fragment } from "react";
import { USER_DEFAULT_IMG } from "../../../../utils/utils";
import moment from "moment";
const { Title, Text } = Typography;

const Article = ({ post, onDelete }) => {
  return (
    <S.Card>
      <S.CardWrapper>
        <Link to={`/user/${post.author.id}`} style={{ display: "block" }}>
          <S.CardImage
           src={`${(post.author.avatarLink && post.author.avatarLink.length > 20)
            ? `${post.author.avatarLink}`
            : USER_DEFAULT_IMG}`}
            height={32}
            width={32}
            alt=""
          />
        </Link>
        <S.CardContent>
          <S.CardTitle to={`/post/${post.slug}`}>
            <S.Title level={4}>{post.title}</S.Title>
          </S.CardTitle>

          <S.CardDetails>
            <Link to={`/user/${post.id}`}>
              <S.Text>
                {post.author.userName}
              </S.Text>
            </Link>
            <S.Dot> • </S.Dot>
            <S.Time dateTime={post.createAt}>
              {moment(post.createAt).format('DD-MM-YYYY')}
            </S.Time>

            <span className="tags">
              {post.tags?.map((t) => {
                return (
                  <Fragment key={t.id}>
                    <S.Dot> • </S.Dot>
                    <S.Tag to={`/t/${t.id}`}>{t.name}</S.Tag>
                  </Fragment>
                );
              })}
            </span>
          </S.CardDetails>
        </S.CardContent>
      </S.CardWrapper>
      <Button
        size="large"
        type="link"
        danger
        onClick={() => onDelete(post.id)}
      >
        Remove
      </Button>
    </S.Card>
  );
};

export default Article;
