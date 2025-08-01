import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { getHotels } from '../services/api';
import { Link } from 'react-router-dom'; // Added Link import

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
          image: '/images/Image 5.jpeg'
        },
        {
          id: 2,
          name: 'Everest View Lodge',
          location: 'Namche Bazaar',
          description: 'Perfect base for Everest trekkers with panoramic mountain views',
          price_per_night: 80,
          rating: 4.2,
          image: '/images/Image 7.jpeg'
        },
        {
          id: 3,
          name: 'Pokhara Lake Resort',
          location: 'Pokhara',
          description: 'Lakeside resort with beautiful views of Phewa Lake and mountains',
          price_per_night: 120,
          rating: 4.7,
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
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading amazing hotels...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            🏨
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Discover Amazing Hotels
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}>
            Find your perfect stay in the beautiful country of Nepal
          </p>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '4rem 2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem'
            }}>
              🔍
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              No hotels found
            </h2>
            <p style={{
              color: '#718096',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              Try adjusting your search terms or browse all available hotels
            </p>
            <button
              onClick={() => setSearchTerm('')}
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#667eea',
                color: 'white',
                fontWeight: '600',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a67d8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Show All Hotels
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {filteredHotels.map(hotel => (
              <div key={hotel.id} style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}>
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#1a202c',
                      margin: 0
                    }}>
                      {hotel.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: '#f7fafc',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px'
                    }}>
                      <span style={{ color: '#f59e0b' }}>⭐</span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#4a5568'
                      }}>
                        {hotel.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#718096',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    📍 {hotel.location}
                  </p>
                  
                  <p style={{
                    color: '#4a5568',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {hotel.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#667eea'
                      }}>
                        NPR {hotel.price_per_night?.toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#718096'
                      }}>
                        per night
                      </div>
                    </div>
                    <Link 
                      to={`/booking/${hotel.id}`}
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#5a67d8';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#667eea';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredHotels.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '3rem',
            marginTop: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Can't find what you're looking for?
            </h2>
            <p style={{
              color: '#718096',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              Contact us for personalized recommendations and special arrangements
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/" 
                style={{
                  display: 'inline-block',
                  padding: '1rem 2rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a67d8';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#667eea';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Back to Home
              </Link>
              <Link 
                to="/register" 
                style={{
                  display: 'inline-block',
                  padding: '1rem 2rem',
                  backgroundColor: 'transparent',
                  color: '#667eea',
                  fontWeight: '600',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  border: '2px solid #667eea',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#667eea';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#667eea';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
