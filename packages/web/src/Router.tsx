import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import { useCurrentProfile } from './hooks/useProfile';
import { ProfileSearchPage } from './pages/ProfileSearchPage';
import { PostNewPage } from './pages/PostNewPage';
import { FeedPage } from './pages/FeedPage';

function Router(): React.ReactElement {
  const { data: currentProfile } = useCurrentProfile();
  const profileId = currentProfile?.id;

  return (
    <Routes>
      {/* Public routes, only show if not logged in */}

      <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </>

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FeedPage />} />
        <Route path="profiles" element={<Navigate to={`/profiles/${profileId ?? ''}`} replace />} />
        <Route path="profiles/search" element={<ProfileSearchPage />} />
        <Route path="profiles/:id" element={<ProfilePage />} />
        <Route path="posts/new" element={<PostNewPage />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
