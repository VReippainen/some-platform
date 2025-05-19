import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import { useCurrentUser } from './hooks/useAuth';

function Router(): React.ReactElement {
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/profile" replace />} />
        <Route path="profile" element={<Navigate to={`/profile/${userId ?? ''}`} replace />} />
        <Route path="profile/:id" element={<ProfilePage />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
