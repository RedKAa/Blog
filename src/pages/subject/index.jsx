import Container from "../../components/utils/Container";
import { Button, Typography } from "antd";

import { Link, useParams } from "react-router-dom";
import PostsListBySubject from "./components/PostsListBySubject";
import { useEffect, useState } from "react";
import { getSubject } from "../../api/Subject";
import { allBlogBySubject } from "../../api/Blog";
import * as S from "./styles";

function Subject() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState({});
  const [nbrPosts, setNbrPosts] = useState(0);

  useEffect(() => {
    getSubject(subjectId)
      .then((res) => {
        setSubject(res);
      })
      .catch((e) => {
        console.log(e);
      });

      allBlogBySubject(subjectId)
      .then((res) => {
        setNbrPosts(res?.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [subjectId]);
  return (
    <Container>
      <S.Subject>
        <S.Header subjectStatus={subject.status}>
          <S.Title level={2}>{subject.name}</S.Title>
        </S.Header>
        <S.Content>
          <S.Sidebar>
            <S.SidebarData>
              <S.Text>{nbrPosts} Posts Published</S.Text>
            </S.SidebarData>
          </S.Sidebar>
          <main>
            <PostsListBySubject subjectId={+subjectId} />
          </main>
        </S.Content>
      </S.Subject>
    </Container>
  );
}

export default Subject;
