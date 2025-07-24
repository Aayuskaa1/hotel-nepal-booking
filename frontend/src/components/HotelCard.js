import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="card">
      <img 
        src={hotel.image || '/api/placeholder/300/200'} 
        alt={hotel.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
      <p className="text-gray-600 mb-2">📍 {hotel.location}</p>
      <p className="text-gray-700 mb-4">{hotel.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-nepal-blue">
          NPR {hotel.price_per_night.toLocaleString()}/night
        </span>
        <Link 
          to={`/book/${hotel.id}`}
          className="btn-primary"
        >
          Book Now
        </Link>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        ⭐ {hotel.rating}/5 • {hotel.amenities?.split(',').length || 0} amenities
      </div>
    </div>
  );
};

export default HotelCard;
