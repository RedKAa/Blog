import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/light";
import { DarkTheme } from "./themes/dark";
import { useDarkModeStore } from "./store/dark-mode";

import Layout from "./layouts/Layout";
import Home from "./pages/home";
import Blog from "./pages/post";
import Contact from "./components/contact/Contact";
import Login from "./pages/login";
import Register from "./pages/register";
import ErrorPage from "./components/utils/ErrorPage";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import ProfileSetting from "./pages/settings/components/setting/profile-setting/ProfileSetting";
import AccountSetting from "./pages/settings/components/setting/account-setting/AccountSetting";
import CustomizationSetting from "./pages/settings/components/setting/customization-setting/CustomizationSetting";
import Tags from "./pages/tags";
import Search from "./pages/search";
import CreatePost from "./pages/create-post";
import Tag from "./pages/tag";
import EditPost from "./pages/edit-post";
import ReadingList from "./pages/reading-list";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import ProtectedRoute  from "./components/Routers/ProtectedRoute";
import Video from "./pages/home copy";
import Request from "./pages/requests";
import Approved from "./pages/approved";
import RejectedList from "./pages/rejected-list";
import Published from "./pages/published";
import Submitted from "./pages/submitted";
import Rejected from "./pages/rejected";

function App() {
  const mode = useDarkModeStore((state) => state.mode);
  return (
    <ThemeProvider theme={mode === "Light" ? lightTheme : DarkTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute acceptedRoles={['Student','Teacher']} />}>
            <Route index element={<Home />} />
            {/* <Route path="/:username/:slug" element={<Blog />} /> */}
            <Route path="/post/:slug" element={<Blog />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/user/:userid" element={<Profile />} />

            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/settings" element={<Settings />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSetting />} />
              {/* <Route path="account" element={<AccountSetting />}></Route> */}
              <Route
                path="customization"
                element={<CustomizationSetting />}
              ></Route>
            </Route>
            <Route path="tags" element={<Tags />} />
            <Route path="t/:tagId" element={<Tag />} />
            <Route path="search" element={<Search />} />
            <Route path="readinglist" element={<ReadingList />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="videos" element={<Video />} />
            <Route path="published" element={<Published />} />
          </Route>

          <Route element={<ProtectedRoute acceptedRoles={['Teacher']} />}>
            <Route path="requests" element={<Request />} />
            <Route path="approved" element={<Approved />} />
            <Route path="rejected-list" element={<RejectedList/>} />

          </Route>
          <Route element={<ProtectedRoute acceptedRoles={['Student']} />}>
            <Route path="submitted" element={<Submitted />} />
            <Route path="rejected" element={<Rejected />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute acceptedRoles={['Student','Teacher']} />}>
          {/* <Route path="/:username/:slug/edit" element={<EditPost />} /> */}
          <Route path="/post/:slug/edit" element={<EditPost />} />

          <Route path="/new" element={<CreatePost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
