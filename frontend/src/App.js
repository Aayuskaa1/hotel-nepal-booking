import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Bookings from './pages/Bookings';
import BookingForm from './pages/BookingForm';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';

// Admin Components
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import HotelManagement from './admin/pages/HotelManagement';
import BookingManagement from './admin/pages/BookingManagement';
import UserManagement from './admin/pages/UserManagement';
import AdminForgotPassword from './admin/pages/AdminForgotPassword';
import AdminProfile from './admin/pages/AdminProfile';
import ProfilePrototype from './admin/pages/ProfilePrototype';
import HotelDemo from './pages/HotelDemo';

// User Components
import UserLogin from './user/pages/UserLogin';
import UserRegister from './user/pages/UserRegister';
import UserDashboard from './user/pages/UserDashboard';
import ProfileSettings from './user/pages/ProfileSettings';
import ForgotPassword from './user/pages/ForgotPassword';

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
          <Route path="/about" element={
            <>
              <Navbar />
              <AboutUs />
            </>
          } />
          <Route path="/hotel-demo" element={<HotelDemo />} />
          
          {/* User Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user" element={
            <ProtectedRoute userType="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user/profile" element={
            <ProtectedRoute userType="user">
              <ProfileSettings />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute userType="user">
              <>
                <Navbar />
                <Bookings />
              </>
            </ProtectedRoute>
          } />
          <Route path="/booking/:hotelId" element={
            <>
              <Navbar />
              <BookingForm />
            </>
          } />
          
          {/* Test route for debugging */}
          <Route path="/test-booking" element={
            <>
              <Navbar />
              <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '3rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center'
                }}>
                  <h1 style={{ color: '#1a202c', marginBottom: '1rem' }}>Booking Route Test</h1>
                  <p style={{ color: '#718096', marginBottom: '2rem' }}>The booking route is working!</p>
                  <Link to="/booking/1" style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    backgroundColor: '#667eea',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '12px',
                    textDecoration: 'none'
                  }}>
                    Test Booking Form
                  </Link>
                </div>
              </div>
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/profile" element={
            <ProtectedRoute userType="admin">
              <AdminProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile-prototype" element={
            <ProtectedRoute userType="admin">
              <ProfilePrototype />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute userType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/hotels" element={
            <ProtectedRoute userType="admin">
              <HotelManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute userType="admin">
              <BookingManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute userType="admin">
              <UserManagement />
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
