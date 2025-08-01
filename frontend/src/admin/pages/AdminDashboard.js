import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentBookings: [],
    topHotels: []
  });
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    const savedAdminData = localStorage.getItem('adminData');
    if (savedAdminData) {
      setAdminData(JSON.parse(savedAdminData));
    } else {
      // Default admin data
      setAdminData({
        firstName: 'Admin',
        lastName: 'User',
        profileImage: null
      });
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 150,
        totalHotels: 25,
        totalBookings: 342,
        totalRevenue: 2500000,
        recentBookings: [
          {
            id: 1,
            hotel_name: 'Himalayan Grand Hotel',
            guest_name: 'John Doe',
            check_in: '2024-02-01',
            check_out: '2024-02-03',
            total_price: 36000,
            status: 'confirmed'
          },
          {
            id: 2,
            hotel_name: 'Everest View Lodge',
            guest_name: 'Jane Smith',
            check_in: '2024-02-05',
            check_out: '2024-02-07',
            total_price: 45000,
            status: 'pending'
          },
          {
            id: 3,
            hotel_name: 'Pokhara Lake Resort',
            guest_name: 'Mike Johnson',
            check_in: '2024-02-10',
            check_out: '2024-02-12',
            total_price: 28000,
            status: 'confirmed'
          }
        ],
        topHotels: [
          { name: 'Himalayan Grand Hotel', bookings: 45, revenue: 1800000 },
          { name: 'Everest View Lodge', bookings: 38, revenue: 1520000 },
          { name: 'Pokhara Lake Resort', bookings: 32, revenue: 1280000 }
        ]
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading admin dashboard...</p>
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
      <AdminNavbar />
      
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            gap: '1rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#667eea'
            }}>
              {adminData?.profileImage ? (
                <img
                  src={adminData.profileImage}
                  alt="Admin Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span style={{ fontSize: '2rem', color: 'white' }}>👤</span>
              )}
            </div>
            <div style={{ fontSize: '4rem' }}>⚙️</div>
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Manage your Hotel Nepal booking system
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
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
                👥
              </div>
              <div>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#718096',
                  margin: 0
                }}>
                  Total Users
                </p>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1a202c',
                  margin: 0
                }}>
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
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
                🏨
              </div>
              <div>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#718096',
                  margin: 0
                }}>
                  Total Hotels
                </p>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1a202c',
                  margin: 0
                }}>
                  {stats.totalHotels}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
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
                📋
              </div>
              <div>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#718096',
                  margin: 0
                }}>
                  Total Bookings
                </p>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1a202c',
                  margin: 0
                }}>
                  {stats.totalBookings}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
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
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginRight: '1rem'
              }}>
                💰
              </div>
              <div>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#718096',
                  margin: 0
                }}>
                  Total Revenue
                </p>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#1a202c',
                  margin: 0
                }}>
                  NPR {stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Link to="/admin/hotels" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block'
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
                  Manage Hotels
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Add, edit, or remove hotels
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Manage your hotel inventory, update information, and control availability.
            </p>
          </Link>

          <Link to="/admin/bookings" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block'
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
                  View Bookings
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  Manage all bookings
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Monitor reservations, update booking status, and handle customer requests.
            </p>
          </Link>

          <Link to="/admin/users" style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'block'
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
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                marginRight: '1rem'
              }}>
                👥
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  margin: 0
                }}>
                  Manage Users
                </h3>
                <p style={{
                  color: '#718096',
                  margin: 0,
                  fontSize: '0.9rem'
                }}>
                  View and manage users
                </p>
              </div>
            </div>
            <p style={{
              color: '#4a5568',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              Access user profiles, manage accounts, and view booking history.
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
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
              📋 Recent Bookings
            </h2>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {stats.recentBookings.map((booking) => (
                <div key={booking.id} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem',
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
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1a202c',
                      margin: 0
                    }}>
                      {booking.hotel_name}
                    </h3>
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
                  <p style={{
                    color: '#718096',
                    fontSize: '0.9rem',
                    margin: '0 0 0.5rem 0'
                  }}>
                    👤 {booking.guest_name}
                  </p>
                  <p style={{
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    margin: '0 0 0.5rem 0'
                  }}>
                    📅 {booking.check_in} - {booking.check_out}
                  </p>
                  <p style={{
                    color: '#667eea',
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    NPR {booking.total_price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hotels */}
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
              🏆 Top Performing Hotels
            </h2>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {stats.topHotels.map((hotel, index) => (
                <div key={index} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem',
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1a202c',
                      margin: 0
                    }}>
                      {hotel.name}
                    </h3>
                    <span style={{
                      backgroundColor: '#667eea',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      #{index + 1}
                    </span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <p style={{
                        color: '#718096',
                        fontSize: '0.9rem',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Bookings
                      </p>
                      <p style={{
                        color: '#1a202c',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {hotel.bookings}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        color: '#718096',
                        fontSize: '0.9rem',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Revenue
                      </p>
                      <p style={{
                        color: '#10b981',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        NPR {hotel.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 