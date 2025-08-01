import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchUserBookings();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Fallback user data
        setUser({
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+977-1234567890'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      // Mock bookings data - replace with actual API call
      setBookings([
        {
          id: 1,
          hotel_name: 'Himalayan Grand Hotel',
          location: 'Kathmandu',
          check_in: '2024-02-01',
          check_out: '2024-02-03',
          status: 'confirmed',
          total_price: 36000,
          guests: 2,
          image: '/images/Image 5.jpeg'
        },
        {
          id: 2,
          hotel_name: 'Everest View Lodge',
          location: 'Namche Bazaar',
          check_in: '2024-03-15',
          check_out: '2024-03-18',
          status: 'pending',
          total_price: 45000,
          guests: 1,
          image: '/images/Image 7.jpeg'
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading your dashboard...</p>
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
      <UserNavbar />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Welcome Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            gap: '1rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#667eea'
            }}>
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span style={{ fontSize: '1.5rem', color: 'white' }}>👤</span>
              )}
            </div>
            <div style={{ fontSize: '3rem' }}>🏔️</div>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.firstName}!
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            Ready to explore more amazing hotels in Nepal?
          </p>
          
          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea' }}>
                {bookings.length}
              </div>
              <div style={{ color: '#718096', fontSize: '0.9rem' }}>Total Bookings</div>
            </div>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div style={{ color: '#718096', fontSize: '0.9rem' }}>Confirmed</div>
            </div>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div style={{ color: '#718096', fontSize: '0.9rem' }}>Pending</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/hotels" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block',
            flex: '1',
            minWidth: '250px'
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
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginRight: '1rem'
              }}>
                🏨
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  margin: 0
                }}>
                  Browse Hotels
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Find your perfect stay
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Discover amazing hotels across Nepal with stunning mountain views.
            </p>
          </Link>

          <Link to="/bookings" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block',
            flex: '1',
            minWidth: '250px'
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
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginRight: '1rem'
              }}>
                📋
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  margin: 0
                }}>
                  My Bookings
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  View your reservations
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Manage all your hotel bookings, check status, and view booking history.
            </p>
          </Link>

          <Link to="/user/profile" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block',
            flex: '1',
            minWidth: '250px'
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
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginRight: '1rem'
              }}>
                👤
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  margin: 0
                }}>
                  Profile Settings
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Update your information
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Update your personal information, contact details, and preferences.
            </p>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📅 Recent Bookings
          </h2>
          
          {bookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                🏔️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                No bookings yet
              </h3>
              <p style={{
                color: '#718096',
                marginBottom: '1.5rem'
              }}>
                Start exploring amazing hotels in Nepal!
              </p>
              <Link to="/hotels" style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#667eea',
                color: 'white',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a67d8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.transform = 'translateY(0)';
              }}>
                Browse Hotels
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {bookings.map((booking) => (
                <div key={booking.id} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <img 
                      src={booking.image} 
                      alt={booking.hotel_name}
                      style={{
                        width: '80px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#1a202c',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {booking.hotel_name}
                      </h3>
                      <p style={{
                        color: '#718096',
                        fontSize: '0.9rem',
                        margin: '0 0 0.25rem 0'
                      }}>
                        📍 {booking.location} • 👥 {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                      </p>
                      <p style={{
                        color: '#4a5568',
                        fontSize: '0.9rem',
                        margin: 0
                      }}>
                        📅 {booking.check_in} - {booking.check_out}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1a202c',
                        marginBottom: '0.5rem'
                      }}>
                        NPR {booking.total_price.toLocaleString()}
                      </div>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 