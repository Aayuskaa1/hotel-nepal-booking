import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '4rem 3rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '6rem',
          marginBottom: '1.5rem'
        }}>
          🏔️
        </div>
        
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '700',
          color: '#1a202c',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1a202c',
          marginBottom: '1rem'
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          color: '#718096',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
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
            🏠 Go to Home
          </Link>
        </div>
        
        <div style={{
          fontSize: '0.9rem',
          color: '#718096'
        }}>
          <p style={{ marginBottom: '1rem' }}>Or try one of these pages:</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Link to="/hotels" 
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f7fafc',
                    border: '1px solid #e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#667eea';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f7fafc';
                    e.target.style.color = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}>
              🏨 Hotels
            </Link>
            <Link to="/login" 
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f7fafc',
                    border: '1px solid #e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#667eea';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f7fafc';
                    e.target.style.color = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}>
              🔐 Login
            </Link>
            <Link to="/register" 
                  style={{
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#f7fafc',
                    border: '1px solid #e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#667eea';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f7fafc';
                    e.target.style.color = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}>
              ✨ Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 