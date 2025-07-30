import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import NotFound from './pages/NotFound';

// Admin Components
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';

// User Components
import UserLogin from './user/pages/UserLogin';
import UserDashboard from './user/pages/UserDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
  const token = localStorage.getItem(`${userType}Token`);
  return token ? children : <Navigate to={`/${userType}/login`} replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/hotels" element={
            <>
              <Navbar />
              <Hotels />
            </>
          } />
          
          {/* User Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user" element={
            <ProtectedRoute userType="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute userType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
