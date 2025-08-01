import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data - replace with actual API call
      const mockUsers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@email.com',
          phone: '+977-9841234567',
          status: 'active',
          created_at: '2024-01-15',
          total_bookings: 5,
          last_login: '2024-02-01'
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@email.com',
          phone: '+977-9842345678',
          status: 'active',
          created_at: '2024-01-20',
          total_bookings: 3,
          last_login: '2024-01-30'
        },
        {
          id: 3,
          first_name: 'Mike',
          last_name: 'Johnson',
          email: 'mike.johnson@email.com',
          phone: '+977-9843456789',
          status: 'active',
          created_at: '2024-01-25',
          total_bookings: 8,
          last_login: '2024-02-02'
        },
        {
          id: 4,
          first_name: 'Sarah',
          last_name: 'Wilson',
          email: 'sarah.wilson@email.com',
          phone: '+977-9844567890',
          status: 'inactive',
          created_at: '2024-01-10',
          total_bookings: 2,
          last_login: '2024-01-25'
        },
        {
          id: 5,
          first_name: 'David',
          last_name: 'Brown',
          email: 'david.brown@email.com',
          phone: '+977-9845678901',
          status: 'active',
          created_at: '2024-01-30',
          total_bookings: 1,
          last_login: '2024-02-03'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading users...</p>
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
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            👥
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            User Management
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Manage user accounts and access permissions
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users List */}
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
            marginBottom: '1.5rem'
          }}>
            Users ({filteredUsers.length})
          </h2>
          
          {filteredUsers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#718096'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <p style={{ fontSize: '1.1rem' }}>No users found</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {filteredUsers.map((user) => (
                <div key={user.id} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
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
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '1.5rem',
                    alignItems: 'center'
                  }}>
                    {/* User Avatar */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: '600'
                    }}>
                      {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </div>
                    
                    {/* User Info */}
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#1a202c',
                          margin: 0
                        }}>
                          {user.first_name} {user.last_name}
                        </h3>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: user.status === 'active' ? '#c6f6d5' : '#fed7d7',
                          color: user.status === 'active' ? '#22543d' : '#c53030'
                        }}>
                          {user.status}
                        </span>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            Email
                          </p>
                          <p style={{
                            color: '#1a202c',
                            margin: 0
                          }}>
                            📧 {user.email}
                          </p>
                        </div>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            Phone
                          </p>
                          <p style={{
                            color: '#1a202c',
                            margin: 0
                          }}>
                            📞 {user.phone}
                          </p>
                        </div>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            Total Bookings
                          </p>
                          <p style={{
                            color: '#667eea',
                            fontWeight: '600',
                            margin: 0
                          }}>
                            📋 {user.total_bookings} bookings
                          </p>
                        </div>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            Member Since
                          </p>
                          <p style={{
                            color: '#1a202c',
                            margin: 0
                          }}>
                            📅 {user.created_at}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                      }}>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            Last Login
                          </p>
                          <p style={{
                            color: '#4a5568',
                            margin: 0
                          }}>
                            🕒 {user.last_login}
                          </p>
                        </div>
                        <div>
                          <p style={{
                            color: '#718096',
                            fontSize: '0.9rem',
                            margin: '0 0 0.25rem 0'
                          }}>
                            User ID
                          </p>
                          <p style={{
                            color: '#4a5568',
                            margin: 0,
                            fontFamily: 'monospace'
                          }}>
                            #{user.id}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: user.status === 'active' ? '#f59e0b' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = user.status === 'active' ? '#d97706' : '#059669';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = user.status === 'active' ? '#f59e0b' : '#10b981';
                        }}
                      >
                        {user.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
                      </button>
                      
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#5a67d8';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#667eea';
                        }}
                      >
                        📊 View Details
                      </button>
                      
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#c53030';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#e53e3e';
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics Summary */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginTop: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1.5rem'
          }}>
            User Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#f7fafc',
              borderRadius: '12px'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                👥
              </div>
              <p style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a202c',
                margin: '0 0 0.5rem 0'
              }}>
                {users.length}
              </p>
              <p style={{
                color: '#718096',
                margin: 0
              }}>
                Total Users
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#f7fafc',
              borderRadius: '12px'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                ✅
              </div>
              <p style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#10b981',
                margin: '0 0 0.5rem 0'
              }}>
                {users.filter(u => u.status === 'active').length}
              </p>
              <p style={{
                color: '#718096',
                margin: 0
              }}>
                Active Users
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#f7fafc',
              borderRadius: '12px'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                📋
              </div>
              <p style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#667eea',
                margin: '0 0 0.5rem 0'
              }}>
                {users.reduce((total, user) => total + user.total_bookings, 0)}
              </p>
              <p style={{
                color: '#718096',
                margin: 0
              }}>
                Total Bookings
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#f7fafc',
              borderRadius: '12px'
            }}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                📊
              </div>
              <p style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#f59e0b',
                margin: '0 0 0.5rem 0'
              }}>
                {users.length > 0 ? Math.round(users.reduce((total, user) => total + user.total_bookings, 0) / users.length) : 0}
              </p>
              <p style={{
                color: '#718096',
                margin: 0
              }}>
                Avg Bookings/User
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 