import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
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
        {/* Hero Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '4rem 2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            🏔️
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to Hotel Nepal
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#718096',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Discover the beauty of Nepal with our premium hotel bookings
          </p>
          <Link 
            to="/hotels" 
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              backgroundColor: '#667eea',
              color: 'white',
              fontWeight: '600',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a67d8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }}
          >
            Explore Hotels
          </Link>
        </div>

        {/* Features Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
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
              fontSize: '3rem',
              marginBottom: '1.5rem'
            }}>
              🏔️
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Mountain Views
            </h3>
            <p style={{
              color: '#718096',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              Experience breathtaking views of the Himalayas from our selected hotels
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
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
              fontSize: '3rem',
              marginBottom: '1.5rem'
            }}>
              🛏️
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Comfortable Stay
            </h3>
            <p style={{
              color: '#718096',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              Enjoy luxury accommodation with traditional hospitality
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
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
              fontSize: '3rem',
              marginBottom: '1.5rem'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Easy Booking
            </h3>
            <p style={{
              color: '#718096',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              Simple and secure booking process with instant confirmation
            </p>
          </div>
        </div>

        {/* About Nepal Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            🇳🇵 About Nepal
          </h2>
          <p style={{
            color: '#4a5568',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Nepal, officially known as the Federal Democratic Republic of Nepal, is a landlocked country 
            in South Asia. It is mainly situated in the Himalayas, but also includes parts of the 
            Indo-Gangetic Plain. Nepal is home to eight of the world's ten tallest mountains, 
            including Mount Everest, the highest point on Earth.
          </p>
          
          {/* Quick Facts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                marginBottom: '0.5rem'
              }}>
                8
              </div>
              <div style={{
                color: '#718096',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                World's Tallest Mountains
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                8848m
              </div>
              <div style={{
                color: '#718096',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Mount Everest Height
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#f7fafc',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                147,516
              </div>
              <div style={{
                color: '#718096',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Square Kilometers
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
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
            Ready to Start Your Journey?
          </h2>
          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            Book your dream hotel in Nepal today and experience the magic of the Himalayas
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
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
            <Link 
              to="/about" 
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                backgroundColor: '#764ba2',
                color: 'white',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6b46c1';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#764ba2';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
