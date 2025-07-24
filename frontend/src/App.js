import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import BookingForm from './pages/BookingForm';
import Bookings from './pages/Bookings';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/book/:hotelId" element={<BookingForm />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
