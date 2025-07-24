import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, createBooking } from '../services/api';

const BookingForm = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in_date: '',
    check_out_date: '',
    number_of_guests: 1
  });

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  const fetchHotel = async () => {
    try {
      const data = await getHotelById(hotelId);
      setHotel(data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      // Fallback data
      setHotel({
        id: hotelId,
        name: 'Himalayan Grand Hotel',
        location: 'Kathmandu',
        price_per_night: 150
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotalPrice = () => {
    if (!formData.check_in_date || !formData.check_out_date) return 0;
    
    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights > 0 ? nights * hotel?.price_per_night : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const bookingData = {
        ...formData,
        hotel_id: hotelId,
        total_price: calculateTotalPrice()
      };
      
      await createBooking(bookingData);
      alert('Booking confirmed successfully!');
      navigate('/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading hotel details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Book Your Stay</h1>
        
        {/* Hotel Info */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-2">{hotel?.name}</h2>
          <p className="text-gray-600 mb-2">📍 {hotel?.location}</p>
          <p className="text-xl font-bold text-nepal-blue">NPR {hotel?.price_per_night?.toLocaleString()}/night</p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="card">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="guest_name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.guest_name}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="guest_email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.guest_email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="guest_phone"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.guest_phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests *
              </label>
              <select
                name="number_of_guests"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.number_of_guests}
                onChange={handleInputChange}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Date *
              </label>
              <input
                type="date"
                name="check_in_date"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.check_in_date}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date *
              </label>
              <input
                type="date"
                name="check_out_date"
                required
                min={formData.check_in_date || new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
                value={formData.check_out_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          {/* Total Price */}
          {calculateTotalPrice() > 0 && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-nepal-blue">
                  NPR {calculateTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/hotels')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Back to Hotels
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary py-3 px-6"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
