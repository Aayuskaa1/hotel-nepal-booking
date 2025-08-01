import React, { useState } from 'react';
import { createHotel } from '../services/api';

const HotelDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price_per_night: '',
    rating: '',
    image: '',
    address: '',
    city: '',
    postal_code: '',
    phone: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await createHotel(formData);
      setMessage(response.message);
      
      // Clear form after successful addition
      setFormData({
        name: '',
        location: '',
        description: '',
        price_per_night: '',
        rating: '',
        image: '',
        address: '',
        city: '',
        postal_code: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      setMessage('Error adding hotel: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Hotel Addition Demo</h1>
        
        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">📍</span>
              <span className="font-semibold">{message}</span>
            </div>
            {message.includes('successfully added') && (
              <div className="mt-2 text-sm text-green-600">
                The hotel is now available for bookings and will appear in the hotel listings.
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Hotel</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/City *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g., Kathmandu, Pokhara"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g., 123 Main Street"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g., Kathmandu"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night (USD) *
                </label>
                <input
                  type="number"
                  name="price_per_night"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g., 150"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.price_per_night}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="e.g., 4.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe the hotel..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>



            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? 'Adding Hotel...' : 'Add Hotel'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">How it works:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Fill in the hotel details including location and address</li>
            <li>• Click "Add Hotel" to submit the form</li>
            <li>• The system will show a success message with the exact location where the hotel was added</li>
            <li>• The location includes city, address, and any additional details you provided</li>
            <li>• The hotel will then be available for bookings in the main hotel listings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelDemo; 