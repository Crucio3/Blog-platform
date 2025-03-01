import React, { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header/Header.js';
import ArticleListPage from './pages/ArticlesListPage/ArticlesListPage.js';
import FullArticlePage from './pages/FullArticlePage/FullArticlePage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage.js';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/articles" element={<Navigate to="/" replace />} />
          <Route path="/articles/:slug" element={<FullArticlePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                <EditArticlePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
