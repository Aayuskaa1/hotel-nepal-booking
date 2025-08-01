import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      // Fallback data for demonstration
      setBookings([
        {
          id: 1,
          hotel_name: 'Himalayan Grand Hotel',
          hotel_location: 'Kathmandu',
          guest_name: 'John Doe',
          guest_email: 'john@example.com',
          guest_phone: '+977-1234567890',
          check_in_date: '2024-02-01',
          check_out_date: '2024-02-03',
          number_of_guests: 2,
          total_price: 36000,
          created_at: '2024-01-15',
          status: 'confirmed',
          image: '/images/Image 5.jpeg'
        },
        {
          id: 2,
          hotel_name: 'Everest View Lodge',
          hotel_location: 'Namche Bazaar',
          guest_name: 'John Doe',
          guest_email: 'john@example.com',
          guest_phone: '+977-1234567890',
          check_in_date: '2024-03-15',
          check_out_date: '2024-03-18',
          number_of_guests: 1,
          total_price: 45000,
          created_at: '2024-02-20',
          status: 'pending',
          image: '/images/Image 7.jpeg'
        }
      ]);
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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading your bookings...</p>
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
            📋
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            My Bookings
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Manage and view all your hotel reservations
          </p>
        </div>
        
        {bookings.length === 0 ? (
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
              🏔️
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              No bookings yet
            </h2>
            <p style={{
              color: '#718096',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              Start your journey by exploring amazing hotels in Nepal
            </p>
            <Link 
              to="/hotels" 
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
              Browse Hotels
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            {bookings.map(booking => (
              <div key={booking.id} style={{
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
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  padding: '2rem'
                }}>
                  <img 
                    src={booking.image} 
                    alt={booking.hotel_name}
                    style={{
                      width: '200px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: '#1a202c',
                          marginBottom: '0.5rem'
                        }}>
                          {booking.hotel_name}
                        </h3>
                        <p style={{
                          color: '#718096',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          📍 {booking.hotel_location}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#667eea',
                          marginBottom: '0.25rem'
                        }}>
                          NPR {booking.total_price?.toLocaleString()}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#718096'
                        }}>
                          Booking #{booking.id}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Guest:</strong> {booking.guest_name}
                        </p>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Email:</strong> {booking.guest_email}
                        </p>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Phone:</strong> {booking.guest_phone}
                        </p>
                      </div>
                      <div>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Check-in:</strong> {formatDate(booking.check_in_date)}
                        </p>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Check-out:</strong> {formatDate(booking.check_out_date)}
                        </p>
                        <p style={{ marginBottom: '0.5rem', color: '#4a5568' }}>
                          <strong>Guests:</strong> {booking.number_of_guests}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#718096'
                      }}>
                        Booked on: {formatDate(booking.created_at)}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: booking.status === 'confirmed' ? '#c6f6d5' : '#fef3c7',
                          color: booking.status === 'confirmed' ? '#22543d' : '#92400e'
                        }}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {bookings.length > 0 && (
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
              Ready for another adventure?
            </h2>
            <p style={{
              color: '#718096',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              Explore more amazing hotels and destinations in Nepal
            </p>
            <Link 
              to="/hotels" 
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
              Browse More Hotels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
