import React, { useState, useEffect } from 'react';
import { getBookings } from '../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback empty array
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600 mb-4">You don't have any bookings yet.</div>
          <a 
            href="/hotels" 
            className="btn-primary inline-block"
          >
            Browse Hotels
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{booking.hotel_name}</h3>
                  <p className="text-gray-600">📍 {booking.hotel_location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-nepal-blue">
                    ${booking.total_price}
                  </div>
                  <div className="text-sm text-gray-600">
                    Booking #{booking.id}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p><strong>Guest Name:</strong> {booking.guest_name}</p>
                  <p><strong>Email:</strong> {booking.guest_email}</p>
                  <p><strong>Phone:</strong> {booking.guest_phone}</p>
                </div>
                <div>
                  <p><strong>Check-in:</strong> {formatDate(booking.check_in_date)}</p>
                  <p><strong>Check-out:</strong> {formatDate(booking.check_out_date)}</p>
                  <p><strong>Guests:</strong> {booking.number_of_guests}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Booked on: {formatDate(booking.created_at)}
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
