import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <Link to="/" style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🏔️ Hotel Nepal
              </Link>
            </div>
            <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
              <div style={{
                marginLeft: '2.5rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem'
              }}>
                <Link
                  to="/"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/hotels"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Hotels
                </Link>
                <Link
                  to="/user"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/bookings"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  My Bookings
                </Link>
              </div>
            </div>
          </div>
          <div style={{ display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
            <div style={{
              marginLeft: '1rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Logout
              </button>
            </div>
          </div>
          <div style={{ display: 'block', '@media (min-width: 768px)': { display: 'none' } }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div style={{
          display: 'block',
          '@media (min-width: 768px)': { display: 'none' }
        }}>
          <div style={{
            padding: '0.5rem 1rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}>
            <Link
              to="/"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </Link>
            <Link
              to="/hotels"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Hotels
            </Link>
            <Link
              to="/user"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/bookings"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar; 