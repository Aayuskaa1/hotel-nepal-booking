import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/admin',
      icon: '📊',
      label: 'Dashboard',
      description: 'Overview and analytics'
    },
    {
      path: '/admin/hotels',
      icon: '🏨',
      label: 'Hotel Management',
      description: 'Manage hotel inventory'
    },
    {
      path: '/admin/bookings',
      icon: '📋',
      label: 'Booking Management',
      description: 'Monitor reservations'
    },
    {
      path: '/admin/users',
      icon: '👥',
      label: 'User Management',
      description: 'Manage user accounts'
    },
    {
      path: '/',
      icon: '🏔️',
      label: 'Main Site',
      description: 'Return to public site'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
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
            {/* Logo and Title */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ☰
              </button>
              <Link to="/admin" style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ⚙️ Hotel Nepal Admin
              </Link>
            </div>

            {/* Admin Info and Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                fontSize: '0.9rem'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  A
                </div>
                <span style={{ fontWeight: '500' }}>
                  Administrator
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 4rem)'
      }}>
        {/* Sidebar */}
        <div style={{
          width: isSidebarOpen ? '280px' : '0',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          position: 'fixed',
          top: '4rem',
          left: 0,
          height: 'calc(100vh - 4rem)',
          zIndex: 999
        }}>
          <div style={{
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActiveRoute(item.path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: isActiveRoute(item.path) ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveRoute(item.path)) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActiveRoute(item.path)) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginBottom: '0.25rem'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    opacity: 0.8
                  }}>
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          marginLeft: isSidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease',
          padding: '2rem 1rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
        />
      )}
    </div>
  );
};

export default AdminLayout; 