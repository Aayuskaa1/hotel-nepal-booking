import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const ProfilePrototype = () => {
  const [admin, setAdmin] = useState({
    firstName: 'Aayuska',
    lastName: 'Adhikari',
    email: 'aayuska@hotelnepal.com',
    phone: '+977-1234567890',
    address: 'Gatthaghar, Bhaktapur, Nepal',
    role: 'Super Administrator',
    department: 'Hotel Management',
    joinDate: '2024-01-15',
    profileImage: 'https://via.placeholder.com/150/667eea/ffffff?text=AA'
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phone,
      address: admin.address
    });
  }, [admin]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call to update admin profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAdmin({
        ...admin,
        ...formData
      });
      
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      setIsEditing(false);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setMessage({ 
        type: 'error', 
        text: 'New passwords do not match!' 
      });
      setSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ 
        type: 'error', 
        text: 'Password must be at least 6 characters long!' 
      });
      setSaving(false);
      return;
    }

    try {
      // Simulate API call to change password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ 
        type: 'success', 
        text: 'Password changed successfully!' 
      });
      e.target.reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to change password. Please try again.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdmin({
          ...admin,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <AdminNavbar />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Profile Prototype
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.1rem'
          }}>
            Complete profile management system with all features
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div style={{
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            backgroundColor: message.type === 'success' ? '#f0fff4' : '#fed7d7',
            border: `2px solid ${message.type === 'success' ? '#68d391' : '#fc8181'}`,
            color: message.type === 'success' ? '#22543d' : '#742a2a',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {message.text}
          </div>
        )}

        {/* Profile Header Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Profile Image */}
            <div style={{ position: 'relative' }}>
              <img
                src={admin.profileImage}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '4px solid #667eea',
                  objectFit: 'cover'
                }}
              />
              <label style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: '#667eea',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Profile Info */}
            <div style={{ textAlign: 'left' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '0.5rem'
              }}>
                {admin.firstName} {admin.lastName}
              </h2>
              <p style={{
                color: '#667eea',
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '0.5rem'
              }}>
                {admin.role}
              </p>
              <p style={{
                color: '#718096',
                fontSize: '1rem'
              }}>
                {admin.department}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '1rem'
        }}>
          {[
            { id: 'personal', label: 'Personal Info', icon: '👤' },
            { id: 'account', label: 'Account Details', icon: '⚙️' },
            { id: 'security', label: 'Security', icon: '🔐' },
            { id: 'preferences', label: 'Preferences', icon: '🎨' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === tab.id ? '#667eea' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#4a5568',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.backgroundColor = '#edf2f7';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1a202c'
                }}>
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: isEditing ? '#e53e3e' : '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isEditing ? '#c53030' : '#5a67d8';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isEditing ? '#e53e3e' : '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr'
                  }
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#4a5568'
                    }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isEditing ? 'white' : '#f7fafc',
                        color: isEditing ? '#1a202c' : '#718096'
                      }}
                      onFocus={(e) => {
                        if (isEditing) e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#4a5568'
                    }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isEditing ? 'white' : '#f7fafc',
                        color: isEditing ? '#1a202c' : '#718096'
                      }}
                      onFocus={(e) => {
                        if (isEditing) e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#4a5568'
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isEditing ? 'white' : '#f7fafc',
                        color: isEditing ? '#1a202c' : '#718096'
                      }}
                      onFocus={(e) => {
                        if (isEditing) e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#4a5568'
                    }}>
                      Contact
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isEditing ? 'white' : '#f7fafc',
                        color: isEditing ? '#1a202c' : '#718096'
                      }}
                      onFocus={(e) => {
                        if (isEditing) e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#4a5568'
                    }}>
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: isEditing ? 'white' : '#f7fafc',
                        color: isEditing ? '#1a202c' : '#718096',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        if (isEditing) e.target.style.borderColor = '#667eea';
                      }}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.7 : 1,
                      transition: 'all 0.2s ease',
                      marginTop: '1.5rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!saving) {
                        e.target.style.backgroundColor = '#5a67d8';
                        e.target.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!saving) {
                        e.target.style.backgroundColor = '#667eea';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}
              </form>
            </div>
          )}

          {/* Account Details Tab */}
          {activeTab === 'account' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1.5rem'
              }}>
                Account Information
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr'
                }
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#4a5568',
                    fontSize: '0.875rem'
                  }}>
                    Role
                  </span>
                  <div style={{
                    color: '#667eea',
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    {admin.role}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#4a5568',
                    fontSize: '0.875rem'
                  }}>
                    Department
                  </span>
                  <div style={{
                    color: '#1a202c',
                    fontWeight: '500',
                    fontSize: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    {admin.department}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#4a5568',
                    fontSize: '0.875rem'
                  }}>
                    Join Date
                  </span>
                  <div style={{
                    color: '#1a202c',
                    fontWeight: '500',
                    fontSize: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    {new Date(admin.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontWeight: '500',
                    color: '#4a5568',
                    fontSize: '0.875rem'
                  }}>
                    Status
                  </span>
                  <div style={{
                    color: '#38a169',
                    fontWeight: '500',
                    fontSize: '1rem',
                    marginTop: '0.25rem'
                  }}>
                    Active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1.5rem'
              }}>
                Security Settings
              </h2>

              <form onSubmit={handlePasswordChange}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#4a5568'
                  }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#4a5568'
                  }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#4a5568'
                  }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#5a67d8';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) {
                      e.target.style.backgroundColor = '#667eea';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {saving ? 'Changing Password...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1.5rem'
              }}>
                Preferences
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                '@media (max-width: 768px)': {
                  gridTemplateColumns: '1fr'
                }
              }}>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '1rem'
                  }}>
                    Theme
                  </h3>
                  <select style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}>
                    <option>Light Theme</option>
                    <option>Dark Theme</option>
                    <option>Auto</option>
                  </select>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '1rem'
                  }}>
                    Language
                  </h3>
                  <select style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}>
                    <option>English</option>
                    <option>Nepali</option>
                    <option>Hindi</option>
                  </select>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '1rem'
                  }}>
                    Notifications
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked />
                      Email Notifications
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked />
                      SMS Notifications
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" />
                      Push Notifications
                    </label>
                  </div>
                </div>

                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f7fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '1rem'
                  }}>
                    Privacy
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked />
                      Profile Visibility
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" />
                      Activity Status
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" defaultChecked />
                      Contact Information
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePrototype; 