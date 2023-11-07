import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, Drawer, Avatar, Input, Image } from "antd";
import {
  AuditOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import * as S from "./styles";
import { useLogout } from "../../hooks/useLogout";
import Container from "../../components/utils/Container";
import { useUserStore } from "../../store/user";
import { pageNumberAtom } from "../../pages/search/store/page-number";
import { USER_DEFAULT_IMG, getUserInfo, logOut } from "../../utils/utils";

let rightItems = [
  {
    label: <Link to="/login">Login</Link>,
    key: "login",
  },
  // {
  //   label: <Link to="/register">Register</Link>,
  //   key: "register",
  // },
];

const { Search } = Input;

function NavBar() {
  const [authMenu, setAuthMenu] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [_, setPageNumber] = useAtom(pageNumberAtom);
  const navigate = useNavigate();

  const authUser = getUserInfo();

  useEffect(() => {
    if (authUser) {
      let actions = [];
      if(authUser.role === "Teacher") {
        actions= [
          {
            label: (
              <Link to="requests">
                <ContainerOutlined style={{ marginRight: "8px" }} />
                Request Approval
              </Link>
            ),
            key: "request-post",
          },
          {
            label: (
              <Link to="approved">
                <AuditOutlined style={{ marginRight: "8px" }} />
                Approved
              </Link>
            ),
            key: "approved-post",
          },
          {
            label: (
              <Link to="rejected-list">
                <FileExcelOutlined style={{ marginRight: "8px" }} />
                Rejected
              </Link>
            ),
            key: "rejected-post",
          },
          {
            label: (
              <Link to="published">
                <FileDoneOutlined style={{ marginRight: "8px" }} />
                Published Post
              </Link>
            ),
            key: "published-post",
          },
        ]
      }
      if(authUser.role === "Student") {
        actions= [
          {
            label: (
              <Link to="submitted">
                <PlusCircleOutlined style={{ marginRight: "8px" }} />
                Submitted Post
              </Link>
            ),
            key: "submitted-post",
          },
          {
            label: (
              <Link to="published">
                <FileDoneOutlined style={{ marginRight: "8px" }} />
                Published Post
              </Link>
            ),
            key: "published-post",
          },
          {
            label: (
              <Link to="rejected">
                <FileExcelOutlined style={{ marginRight: "8px" }} />
                Rejected Post
              </Link>
            ),
            key: "rejected-post",
          },
        ]
      }
      setAuthMenu([
        {
          key: "auth1",
          label: (
            <Avatar
              src={
                (authUser.avatarLink && authUser.avatarLink.length > 20)
                  ? `${authUser.avatarLink}`
                  : USER_DEFAULT_IMG
              }
            />
          ),
          children: [
            {
              label: (
                <Link to={`/user/${authUser.id}`}>
                  <UserOutlined style={{ marginRight: "8px" }} />
                  Profile
                </Link>
              ),
              key: "profile",
            },
            {
              label: (
                <Link to="new">
                  <PlusCircleOutlined style={{ marginRight: "8px" }} />
                  Create Post
                </Link>
              ),
              key: "create-post",
            },
            ...actions,
            {
              label: (
                <Link to="/settings">
                  <SettingOutlined style={{ marginRight: "8px" }} />
                  Settings
                </Link>
              ),
              key: "Settings",
            },
            {
              label: (
                <span
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                  style={{ color: "inherit" }}
                >
                  <LogoutOutlined style={{ marginRight: "8px" }} />
                  logout
                </span>
              ),
              key: "logout",
            },
          ],
        },
      ]);
    } else {
      setAuthMenu(rightItems);
    }
  }, [authUser]);

  const onSearch = (value) => {
    setPageNumber(1);
    navigate(`/search?q=${value}&filters=posts`);
  };

  return (
    <S.Navbar>
      <Container>
        <S.NavbarContainer>
          <S.LeftNavbar>
            <S.Logo to="/">FPTBlog</S.Logo>
            <S.SearchWrapper>
              <S.Search placeholder="Search" size="large" onSearch={onSearch} />
            </S.SearchWrapper>
          </S.LeftNavbar>
          <S.RightNavbar style={{ minWidth: 0 }}>
            <S.MobileBtnWrapper onClick={() => setOpenDrawer(true)}>
              <MenuOutlined />
            </S.MobileBtnWrapper>
            <S.MenuWrapper mode="horizontal" items={authMenu} />
          </S.RightNavbar>
        </S.NavbarContainer>
        <S.DrawerWrapper
          title="FPTBlog"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
        >
          <S.MobileMenuWrapper
            mode="inline"
            items={authMenu}
            openKeys={["auth1"]}
          />
        </S.DrawerWrapper>
      </Container>
    </S.Navbar>
  );
}

export default NavBar;

/***
 * navbar i want:
 * https://github.com/thisuraseniya/Ant-Design-Navbar/
 *
 */
