import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="card" style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.75rem', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      padding: '1.5rem', 
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease-in-out',
      border: '1px solid #e5e7eb'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-5px)';
      e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <img 
        src={hotel.image || '/api/placeholder/300/200'} 
        alt={hotel.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}
      />
      <h3 className="text-xl font-bold mb-2" style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem',
        color: '#003893'
      }}>
        {hotel.name}
      </h3>
      <p className="text-gray-600 mb-2" style={{ 
        color: '#666', 
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        📍 {hotel.location}
      </p>
      {hotel.address && (
        <p className="text-gray-500 mb-1" style={{ 
          color: '#6b7280', 
          marginBottom: '0.25rem',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🏠 {hotel.address}
        </p>
      )}
      {hotel.city && hotel.city !== hotel.location && (
        <p className="text-gray-500 mb-1" style={{ 
          color: '#6b7280', 
          marginBottom: '0.25rem',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🏙️ {hotel.city}
        </p>
      )}
      <p className="text-gray-700 mb-4" style={{ 
        color: '#374151', 
        marginBottom: '1rem',
        lineHeight: '1.5'
      }}>
        {hotel.description}
      </p>
      <div className="flex justify-between items-center" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <span className="text-2xl font-bold text-nepal-blue" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#003893' 
        }}>
          NPR {hotel.price_per_night?.toLocaleString()}/night
        </span>
        <Link 
          to={`/booking/${hotel.id}`}
          className="btn-primary"
          style={{
            backgroundColor: '#003893',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#002d6b';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#003893';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Book Now
        </Link>
      </div>
      <div className="mt-2 text-sm text-gray-500" style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.875rem', 
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        ⭐ {hotel.rating}/5
      </div>
    </div>
  );
};

export default HotelCard;
