import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, createBooking } from '../services/api';

const BookingForm = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    loadUserData();
  }, [hotelId]);

  const loadUserData = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        guest_name: `${user.firstName} ${user.lastName}`,
        guest_email: user.email,
        guest_phone: user.phone || ''
      }));
    }
  };

  const fetchHotel = async () => {
    try {
      console.log('Fetching hotel with ID:', hotelId);
      const data = await getHotelById(hotelId);
      console.log('Hotel data received:', data);
      setHotel(data);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      // Fallback data
      const fallbackHotel = {
        id: hotelId,
        name: 'Himalayan Grand Hotel',
        location: 'Kathmandu',
        price_per_night: 150,
        image: '/images/Image 5.jpeg',
        description: 'Luxury hotel in the heart of Kathmandu with stunning mountain views'
      };
      console.log('Using fallback hotel data:', fallbackHotel);
      setHotel(fallbackHotel);
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
    
    // Check if user is logged in
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      alert('Please login to make a booking');
      navigate('/login');
      return;
    }
    
    // Validation
    if (!formData.guest_name || !formData.guest_email || !formData.guest_phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!formData.check_in_date || !formData.check_out_date) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkIn < today) {
      alert('Check-in date cannot be in the past');
      return;
    }
    
    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    if (formData.number_of_guests < 1) {
      alert('Number of guests must be at least 1');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const bookingData = {
        ...formData,
        hotel_id: hotelId,
        total_price: calculateTotalPrice()
      };
      
      await createBooking(bookingData);
      alert('🎉 Booking confirmed successfully! You will receive a confirmation email shortly.');
      navigate('/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    } finally {
      setSubmitting(false);
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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading hotel details...</p>
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
        maxWidth: '800px',
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
            Book Your Stay
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Complete your booking details below
          </p>
        </div>

        {/* Login Prompt */}
        {!localStorage.getItem('userToken') && (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>
              🔐
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '1rem'
            }}>
              Login Required
            </h3>
            <p style={{
              color: '#92400e',
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>
              Please login to complete your booking
            </p>
            <Link to="/login" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#f59e0b',
              color: 'white',
              fontWeight: '600',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d97706';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f59e0b';
              e.target.style.transform = 'translateY(0)';
            }}>
              Login Now
            </Link>
          </div>
        )}

        {/* Hotel Info */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <img 
              src={hotel?.image} 
              alt={hotel?.name}
              style={{
                width: '150px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '12px',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                {hotel?.name}
              </h2>
              <p style={{
                color: '#718096',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📍 {hotel?.location}
              </p>
              {hotel?.description && (
                <p style={{
                  color: '#4a5568',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  {hotel.description}
                </p>
              )}
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#667eea'
              }}>
                NPR {hotel?.price_per_night?.toLocaleString()}/night
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="guest_name"
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  value={formData.guest_name}
                  onChange={handleInputChange}
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
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="guest_email"
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  value={formData.guest_email}
                  onChange={handleInputChange}
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
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="guest_phone"
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  value={formData.guest_phone}
                  onChange={handleInputChange}
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
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Number of Guests *
                </label>
                <select
                  name="number_of_guests"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    backgroundColor: 'white'
                  }}
                  value={formData.number_of_guests}
                  onChange={handleInputChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="check_in_date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  value={formData.check_in_date}
                  onChange={handleInputChange}
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
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}>
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="check_out_date"
                  required
                  min={formData.check_in_date || new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  value={formData.check_out_date}
                  onChange={handleInputChange}
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
            
            {/* Total Price */}
            {calculateTotalPrice() > 0 && (
              <div style={{
                backgroundColor: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#4a5568'
                  }}>
                    Total Price:
                  </span>
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea'
                  }}>
                    NPR {calculateTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            )}
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={() => navigate('/hotels')}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1rem',
                  backgroundColor: '#718096',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#4a5568';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#718096';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Back to Hotels
              </button>
              <button
                type="submit"
                disabled={submitting || !localStorage.getItem('userToken')}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '1rem',
                  backgroundColor: !localStorage.getItem('userToken') ? '#a0aec0' : '#667eea',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: (submitting || !localStorage.getItem('userToken')) ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  opacity: (submitting || !localStorage.getItem('userToken')) ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!submitting && localStorage.getItem('userToken')) {
                    e.target.style.backgroundColor = '#5a67d8';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting && localStorage.getItem('userToken')) {
                    e.target.style.backgroundColor = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {submitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Confirming...
                  </span>
                ) : !localStorage.getItem('userToken') ? (
                  'Login to Book'
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
