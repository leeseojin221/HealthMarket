import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import MainPage from './../pages/MainPage';
import MyPage from './../pages/MyPage';
import SignInPage from './../pages/SignInPage';
import SignUpPage from './../pages/SignUpPage';
import DetailPage from './../pages/DetailPage';
import EditPage from './../pages/EditPage';
import ErrorPage from './../pages/ErrorPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/signinPage" element={<SignInPage />} />
          <Route path="/signupPage" element={<SignUpPage />} />
          <Route path="/detailPage" element={<DetailPage />} />
          <Route path="/editPage" element={<EditPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
