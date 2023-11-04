import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { getUserById, getUserByUsername } from "../../api/User";
import { userAtom } from "./atom/user";
import Container from "../../components/utils/Container";
import UserPreview from "./components/user-preview/UserPreview";
import SideBar from "./components/sidebar/Sidebar";
import ArticlesList from "./components/ArticlesList";
import styled from "styled-components";

function Profile() {

  const { userid } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserById(userid)
      .then((res) => {
        console.log('user',res);
        if(res){
          setUser(res);
        }
      })
      .catch((e) => {
        setError(e);
      });

  }, [userid]);

  return (
    <Container>
      <UserPreview user={user} />
      <Content>
        <SideBar />
        <main>{user.id && <ArticlesList userId={user.id} />}</main>
      </Content>
    </Container>
  );
}

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 12px;
`;

export default Profile;
