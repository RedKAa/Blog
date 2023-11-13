import Container from "../../components/utils/Container";
import { Button, Typography } from "antd";

import { Link, useParams } from "react-router-dom";
import PostsList from "./components/PostsList";
import { useEffect, useState } from "react";
import { getTag } from "../../api/Tag";
import { allBlogByTag } from "../../api/Blog";
import * as S from "./styles";

function Tag() {
  const { tagId } = useParams();
  const [tag, setTag] = useState({});
  const [nbrPosts, setNbrPosts] = useState(0);

  useEffect(() => {
    getTag(tagId)
      .then((res) => {
        setTag(res);
      })
      .catch((e) => {
        console.log(e);
      });

      allBlogByTag(tagId)
      .then((res) => {
        setNbrPosts(res?.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [tagId]);
  return (
    <Container>
      <S.Tag>
        <S.Header tagStatus={tag.status}>
          <S.Title level={2}>{tag.name}</S.Title>
        </S.Header>
        <S.Content>
          <S.Sidebar>
            <S.SidebarData>
              <S.Text>{nbrPosts} Posts Published</S.Text>
            </S.SidebarData>
          </S.Sidebar>
          <main>
            <PostsList tagId={+tagId} />
          </main>
        </S.Content>
      </S.Tag>
    </Container>
  );
}

export default Tag;
