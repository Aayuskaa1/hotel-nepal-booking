import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '3rem 0 1rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🏔️ Hotel Nepal
            </h3>
            <p style={{
              color: '#a0aec0',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Your trusted partner in discovering the most beautiful accommodations across Nepal.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                📧
              </span>
              <span style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                📞
              </span>
              <span style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                📍
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{
                  color: '#a0aec0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/hotels" style={{
                  color: '#a0aec0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                  Hotels
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/about" style={{
                  color: '#a0aec0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/register" style={{
                  color: '#a0aec0',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#667eea'}
                onMouseLeave={(e) => e.target.style.color = '#a0aec0'}>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Services
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#a0aec0' }}>Hotel Booking</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#a0aec0' }}>Travel Planning</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#a0aec0' }}>24/7 Support</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#a0aec0' }}>Best Price Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Contact Info
            </h4>
            <div style={{
              color: '#a0aec0',
              lineHeight: '1.8'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                📧 info@hotelnepal.com
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                📞 01-234567
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                📍 Gatthaghar, Bhaktapur, Nepal
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #2d3748',
          paddingTop: '1rem',
          textAlign: 'center',
          color: '#a0aec0',
          fontSize: '0.9rem'
        }}>
          <p>
            © 2024 Hotel Nepal. All rights reserved. | 
            <Link to="/about" style={{
              color: '#a0aec0',
              textDecoration: 'none',
              marginLeft: '0.5rem'
            }}>
              About Us
            </Link> | 
            <span style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
              Privacy Policy
            </span> | 
            <span style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
              Terms of Service
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 