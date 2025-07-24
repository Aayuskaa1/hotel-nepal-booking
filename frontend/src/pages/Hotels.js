import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { getHotels } from '../services/api';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const data = await getHotels();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      // Fallback data for demonstration
      setHotels([
        {
          id: 1,
          name: 'Himalayan Grand Hotel',
          location: 'Kathmandu',
          description: 'Luxury hotel in the heart of Kathmandu with stunning mountain views',
          price_per_night: 150,
          rating: 4.5,
          amenities: 'WiFi,Pool,Spa,Restaurant',
          image: '/images/Image 5.jpeg'
        },
        {
          id: 2,
          name: 'Everest View Lodge',
          location: 'Namche Bazaar',
          description: 'Perfect base for Everest trekkers with panoramic mountain views',
          price_per_night: 80,
          rating: 4.2,
          amenities: 'WiFi,Restaurant,Heating',
          image: '/images/Image 7.jpeg'
        },
        {
          id: 3,
          name: 'Pokhara Lake Resort',
          location: 'Pokhara',
          description: 'Lakeside resort with beautiful views of Phewa Lake and mountains',
          price_per_night: 120,
          rating: 4.7,
          amenities: 'WiFi,Pool,Spa,Restaurant,Lake View',
          image: '/images/Image 8.jpeg'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-xl">Loading hotels...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Available Hotels</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search hotels by name or location..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-blue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hotels Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">No hotels found matching your search.</div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
