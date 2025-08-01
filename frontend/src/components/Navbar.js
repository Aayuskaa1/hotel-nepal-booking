import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const adminToken = localStorage.getItem('adminToken');
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAdmin(false);
    navigate('/');
  };
  return (
    <nav className="bg-nepal-blue text-white shadow-lg" 
         style={{ 
           backgroundColor: '#003893', 
           color: 'white', 
           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
           position: 'sticky',
           top: 0,
           zIndex: 1000
         }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="flex justify-between items-center py-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
          <Link to="/" className="text-2xl font-bold flex items-center" 
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'white'
                }}>
            🏔️ Hotel Nepal
          </Link>
          <ul className="flex space-x-6" style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            <li>
              <Link 
                to="/" 
                className="hover:text-nepal-red transition duration-200"
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '80px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#DC143C';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/hotels" 
                className="hover:text-nepal-red transition duration-200"
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '80px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#DC143C';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="hover:text-nepal-red transition duration-200"
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '80px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#DC143C';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to={isAdmin ? '/admin/profile' : (user ? '/user/profile' : '/login')} 
                className="hover:text-nepal-red transition duration-200"
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '80px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#DC143C';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Profile
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link 
                    to="/bookings" 
                    className="hover:text-nepal-red transition duration-200"
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s ease-in-out',
                      minWidth: '100px',
                      textAlign: 'center',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#DC143C';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    My Bookings
                  </Link>
                </li>

                <li>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-nepal-red transition duration-200"
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s ease-in-out',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      minWidth: '80px',
                      textAlign: 'center',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#DC143C';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="hover:text-nepal-red transition duration-200"
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s ease-in-out',
                      minWidth: '80px',
                      textAlign: 'center',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#DC143C';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="hover:text-nepal-red transition duration-200"
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      fontWeight: '500',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.2s ease-in-out',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      minWidth: '80px',
                      textAlign: 'center',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#DC143C';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link 
                to="/admin/login" 
                className="hover:text-nepal-red transition duration-200"
                style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s ease-in-out',
                  minWidth: '80px',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#DC143C';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
