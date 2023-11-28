import { useEffect, useState, useRef, useCallback } from "react";
import { Button, Card, Col, Row, Space, Tooltip, Typography } from "antd";

import Container from "../../components/utils/Container";
// import homeIcon from "../../public/img/home.svg";
import styled from "styled-components";
// import readingListIcon from "../../public/img/reading-list.svg";
// import tagIcon from "../../public/img/tag.svg";
import ArticleList from "./components/ArticleList";
import { Link } from "react-router-dom";
import { USER_DEFAULT_IMG, getUserInfo } from "../../utils/utils";
import { getHotAuthors, getHotTeachers } from "../../api/User";
import * as S from "./components/styles";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  column-gap: 20px;
`;

const HomeSidebar = styled.aside``;
const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.linkColor};
  border-radius: 6px;
  padding: 8px 16px;
  &:hover {
    color: ${(props) => props.theme.linkBrandedColorHover};
    background-color: ${(props) => props.theme.linkBgHover};
    text-decoration: underline;
  }

  span {
    margin-left: -12px;
    margin-right: 8px;
  }
`;

const HomeMain = styled.main`
  header nav ul {
    display: flex;
    gap: 16px;
  }
`;

const SecondaryNavLink = styled(Link)`
  font-size: 18px;
  color: ${(props) =>
    props.$active ? props.theme.base["100"] : props.theme.base["70"]};
  font-weight: ${(props) => (props.$active ? "700" : "normal")};
  padding: 8px 12px;
  border-radius: 6px;
  &:hover {
    color: ${(props) => props.theme.accentBrand};
    background-color: ${(props) => props.theme.base.inverted};
  }
`;
const TopAuthors = () => {
  const [data, setData] = useState([]);
  const [hoveredStudent, setHoveredStudent] = useState(null);
  useEffect(() => {
    getHotAuthors()
      .then((res) => {
        setData(() => {
          return res;
        });
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  }, []);

  return (
    <S.ImageList>
      {data?.map((student, index) => (
        <Tooltip
          title={hoveredStudent === student ? student.userName : null}
          key={index}
          placement="left"
        >
          <Link to={`/user/${student.id}`}
            key={index}
            onMouseOver={() => setHoveredStudent(student)}
            onMouseOut={() => setHoveredStudent(null)}>
            <S.ImageStudent
              src={`${(student.avatarLink && student.avatarLink.length > 20)
                ? `${student.avatarLink}`
                : USER_DEFAULT_IMG}`}
              alt="said"
              width="100"
              height="100"
            />
          </Link>
        </Tooltip>
      ))}
    </S.ImageList>
  );
};

const TopTeachers = () => {
  const [data, setData] = useState([]);
  const [hoveredTeacher, setHoveredTeacher] = useState(null);

  useEffect(() => {
    getHotTeachers()
      .then((res) => {
        setData(() => {
          return res;
        });
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  }, []);

  return (
    <S.ImageList>
      {data?.map((teacher, index) => (
        <Tooltip
          title={hoveredTeacher === teacher ? teacher.userName : null}
          key={index}
          placement="left"
        >
          <Link to={`/user/${teacher.id}`}
            key={index}
            onMouseOver={() => setHoveredTeacher(teacher)}
            onMouseOut={() => setHoveredTeacher(null)}>
            <S.ImageTeacher
              src={`${(teacher.avatarLink && teacher.avatarLink.length > 20)
                ? `${teacher.avatarLink}`
                : USER_DEFAULT_IMG}`}
              alt="said"
              width="100"
              height="100"
            />
          </Link>
        </Tooltip>
      ))}
    </S.ImageList>
  );
};

const Home = () => {
  const authUser = getUserInfo();
  const role = authUser?.role;
  return (
    <Container>
      <HomeContainer>
        <HomeSidebar>
          <nav>
            <ul>
              <li>
                <SidebarLink to="/">
                  <span>
                    {/* <img src={homeIcon} alt="home icon" /> */}
                  </span>
                  Home
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="readinglist">
                  <span>
                    {/* <img src={readingListIcon} alt="reading list icon" /> */}
                  </span>
                  Reading List
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="videos">
                  <span>
                    {/* <img src={tagIcon} alt="tags icon" /> */}
                  </span>
                  Videos
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="subjects">
                  <span>
                    {/* <img src={tagIcon} alt="tags icon" /> */}
                  </span>
                  Subjects
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="tags">
                  <span>
                    {/* <img src={tagIcon} alt="tags icon" /> */}
                  </span>
                  Tags
                </SidebarLink>
              </li>
            </ul>
          </nav>
        </HomeSidebar>
        <HomeMain>
          <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <header style={{ marginBottom: "12px" }}>
              <nav>
                <ul>
                  <li>
                    <SecondaryNavLink $active={true} to="/">
                      Latest
                    </SecondaryNavLink>
                  </li>
                  <li>
                    <SecondaryNavLink $active={false} to="/trending">
                      Trending
                    </SecondaryNavLink>
                  </li>
                  {/* <li>
                  <SecondaryNavLink $active={false} to="/top">
                    Top
                  </SecondaryNavLink>
                </li> */}
                </ul>
              </nav>
            </header>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Top 3 Teacher" size="small" style={{ height: '170px' }}>
                  <S.CenteredContainer>
                    <TopTeachers />
                  </S.CenteredContainer>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Top 3 Student" size="small" style={{ height: '170px' }}>
                  <S.CenteredContainer>
                    <TopAuthors />
                  </S.CenteredContainer>
                </Card>
              </Col>
            </Row>
            <ArticleList />
          </Space>
        </HomeMain>
      </HomeContainer>
    </Container>
  );
};

export default Home;
