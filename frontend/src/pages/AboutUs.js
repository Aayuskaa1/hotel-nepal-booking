import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const AboutUs = () => {
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
            About Hotel Nepal
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Your trusted partner in discovering the most beautiful accommodations across Nepal
          </p>
        </div>

        {/* Our Story Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Our Story
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <p style={{
                color: '#4a5568',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                marginBottom: '1.5rem'
              }}>
                Founded in 2024, Hotel Nepal was born from a deep passion for showcasing the incredible hospitality and stunning accommodations that Nepal has to offer. Our journey began with a simple mission: to connect travelers with the most authentic and comfortable stays across this beautiful Himalayan nation.
              </p>
              <p style={{
                color: '#4a5568',
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>
                From the bustling streets of Kathmandu to the serene valleys of Pokhara, from the majestic Everest region to the wildlife-rich Chitwan, we've carefully curated a collection of hotels that represent the best of Nepali hospitality.
              </p>
            </div>
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '6rem',
                marginBottom: '1rem'
              }}>
                🏨
              </div>
              <p style={{
                color: '#718096',
                fontSize: '1rem',
                fontStyle: 'italic'
              }}>
                "Connecting travelers with the heart of Nepal"
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Our Mission & Vision
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f7fafc',
              borderRadius: '15px'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Our Mission
              </h3>
              <p style={{
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                To provide seamless booking experiences and connect travelers with authentic Nepali hospitality, ensuring every stay becomes a memorable part of their journey.
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f7fafc',
              borderRadius: '15px'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                👁️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Our Vision
              </h3>
              <p style={{
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                To become the leading platform for discovering and booking the finest accommodations across Nepal, promoting sustainable tourism and cultural exchange.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            What We Offer
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                🏔️
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Diverse Locations
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '0.9rem'
              }}>
                Hotels across Nepal's most beautiful destinations
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                💳
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Easy Booking
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '0.9rem'
              }}>
                Simple and secure booking process
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                🌟
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Quality Assurance
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '0.9rem'
              }}>
                Carefully selected and verified accommodations
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Best Prices
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '0.9rem'
              }}>
                Competitive rates and transparent pricing
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Meet Our Team
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f7fafc',
              borderRadius: '15px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'white'
              }}>
                👨‍💼
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Aayuska Adhikari
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Founder & CEO
              </p>
              <p style={{
                color: '#4a5568',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                Passionate about technology and hospitality, leading our mission to connect travelers with the best of Nepal.
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f7fafc',
              borderRadius: '15px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#764ba2',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'white'
              }}>
                👩‍💻
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Development Team
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Tech Experts
              </p>
              <p style={{
                color: '#4a5568',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                Dedicated developers creating seamless booking experiences and innovative solutions for our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & CTA */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Ready to Explore Nepal?
          </h2>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Start your journey with us and discover the most beautiful accommodations across Nepal
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/hotels" style={{
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
            }}>
              Browse Hotels
            </Link>
            <Link to="/register" style={{
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
            }}>
              Join Us
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Get in Touch
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                📧
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Email
              </h3>
              <p style={{
                color: '#718096'
              }}>
                info@hotelnepal.com
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                📞
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Phone
              </h3>
              <p style={{
                color: '#718096'
              }}>
                01-234567
              </p>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem'
              }}>
                📍
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                Address
              </h3>
              <p style={{
                color: '#718096'
              }}>
                Gatthaghar, Bhaktapur, Nepal
              </p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs; 