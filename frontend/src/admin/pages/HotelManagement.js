import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { getHotels, createHotel, updateHotel, deleteHotel } from '../../services/api';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    rating: '',
    image: ''
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  // Auto-hide success/error messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchHotels = async () => {
    try {
      const apiHotels = await getHotels();
      
      // Transform API data to match our local format
      const transformedHotels = apiHotels.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        description: hotel.description,
        price: hotel.price_per_night,
        rating: hotel.rating,
        image: hotel.image,
        status: 'active' // Default status for API hotels
      }));

      setHotels(transformedHotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      // Fallback to mock data if API fails
      const mockHotels = [
        {
          id: 1,
          name: 'Himalayan Grand Hotel',
          location: 'Kathmandu, Nepal',
          description: 'Luxury hotel with mountain views',
          price: 12000,
          rating: 4.5,
          image: '/images/Image.jpeg',
          status: 'active'
        },
        {
          id: 2,
          name: 'Everest View Lodge',
          location: 'Pokhara, Nepal',
          description: 'Scenic lodge with lake views',
          price: 8000,
          rating: 4.2,
          image: '/images/Image 3.jpeg',
          status: 'active'
        },
        {
          id: 3,
          name: 'Pokhara Lake Resort',
          location: 'Pokhara, Nepal',
          description: 'Premium resort by the lake',
          price: 15000,
          rating: 4.8,
          image: '/images/Image 4.jpeg',
          status: 'active'
        }
      ];
      setHotels(mockHotels);
      setMessage({ type: 'error', text: 'Failed to load hotels from API. Using fallback data.' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Hotel name is required' });
      return false;
    }
    if (!formData.location.trim()) {
      setMessage({ type: 'error', text: 'Location is required' });
      return false;
    }
    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Description is required' });
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setMessage({ type: 'error', text: 'Valid price is required' });
      return false;
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setMessage({ type: 'error', text: 'Rating must be between 1 and 5' });
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    setMessage({ type: '', text: '' });
    
    try {
      console.log('Uploading file:', file.name, file.type, file.size);
      
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5001/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload response data:', data);

      if (data.success) {
        const imageUrl = `http://localhost:5001${data.imageUrl}`;
        console.log('Setting image URL:', imageUrl);
        
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
        setMessage({ 
          type: 'success', 
          text: '✅ Image uploaded successfully!' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Failed to upload image. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to upload image: ${error.message}` 
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare hotel data for API
      const hotelData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        price_per_night: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        image: formData.image,
        address: formData.address || '',
        city: formData.city || '',
        postal_code: formData.postal_code || '',
        phone: formData.phone || '',
        email: formData.email || ''
      };

      if (editingHotel) {
        // Update existing hotel
        const updatedHotel = await updateHotel(editingHotel.id, hotelData);
        
        // Update local state
        const updatedHotels = hotels.map(hotel =>
          hotel.id === editingHotel.id ? { ...updatedHotel, status: hotel.status } : hotel
        );
        setHotels(updatedHotels);
        
        setMessage({ 
          type: 'success', 
          text: updatedHotel.message || `✅ Hotel "${formData.name}" has been successfully updated!` 
        });
        setEditingHotel(null);
      } else {
        // Add new hotel
        const newHotel = await createHotel(hotelData);
        
        // Add to local state
        setHotels([...hotels, { ...newHotel, status: 'active' }]);
        
        setMessage({ 
          type: 'success', 
          text: newHotel.message || `✅ Hotel "${formData.name}" has been successfully added!` 
        });
      }

      // Reset form
      setFormData({
        name: '',
        location: '',
        description: '',
        price: '',
        rating: '',
        image: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving hotel:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to save hotel: ${error.message}` 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      price: hotel.price.toString(),
      rating: hotel.rating.toString(),
      image: hotel.image
    });
    setShowAddForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (hotelId) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (window.confirm(`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`)) {
      try {
        await deleteHotel(hotelId);

        setHotels(hotels.filter(h => h.id !== hotelId));
        setMessage({ 
          type: 'success', 
          text: `🗑️ Hotel "${hotel.name}" has been successfully deleted!` 
        });
      } catch (error) {
        console.error('Error deleting hotel:', error);
        setMessage({ 
          type: 'error', 
          text: `Failed to delete hotel: ${error.message}` 
        });
      }
    }
  };

  const handleStatusToggle = (hotelId) => {
    const updatedHotels = hotels.map(hotel =>
      hotel.id === hotelId
        ? { ...hotel, status: hotel.status === 'active' ? 'inactive' : 'active' }
        : hotel
    );
    setHotels(updatedHotels);
    
    const hotel = hotels.find(h => h.id === hotelId);
    const newStatus = hotel.status === 'active' ? 'inactive' : 'active';
    setMessage({ 
      type: 'success', 
      text: `🔄 Hotel "${hotel.name}" status changed to ${newStatus}!` 
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingHotel(null);
    setFormData({
      name: '',
      location: '',
      description: '',
      price: '',
      rating: '',
      image: ''
    });
    setMessage({ type: '', text: '' });
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading hotels...</p>
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
            🏨
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Hotel Management
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Manage your hotel inventory and information
          </p>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div style={{
            backgroundColor: message.type === 'success' ? '#c6f6d5' : '#fed7d7',
            border: `1px solid ${message.type === 'success' ? '#9ae6b4' : '#feb2b2'}`,
            color: message.type === 'success' ? '#22543d' : '#c53030',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '1.2rem' }}>
              {message.type === 'success' ? '✅' : '❌'}
            </span>
            {message.text}
          </div>
        )}

        {/* Search and Add Button */}
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
              placeholder="Search hotels by name or location..."
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
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingHotel(null);
              setFormData({
                name: '',
                location: '',
                description: '',
                price: '',
                rating: '',
                amenities: '',
                image: ''
              });
              setMessage({ type: '', text: '' });
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a67d8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ➕ Add New Hotel
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
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
              {editingHotel ? '✏️ Edit Hotel' : '➕ Add New Hotel'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#4a5568'
                  }}>
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter hotel name"
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
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#4a5568'
                  }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter location (e.g., Kathmandu, Nepal)"
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
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#4a5568'
                  }}>
                    Price per Night (NPR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="100"
                    placeholder="Enter price"
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
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#4a5568'
                  }}>
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    required
                    placeholder="Enter rating"
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
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#4a5568'
                }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Enter hotel description"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical'
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

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#4a5568'
                }}>
                  Hotel Image
                </label>
                <div style={{
                  position: 'relative',
                  width: '100%'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      opacity: uploadingImage ? 0.6 : 1,
                      cursor: uploadingImage ? 'not-allowed' : 'pointer'
                    }}
                    onFocus={(e) => {
                      if (!uploadingImage) {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {uploadingImage && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '1rem',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#667eea',
                      fontSize: '0.875rem'
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Uploading...
                    </div>
                  )}
                </div>
                {formData.image && (
                  <div style={{
                    marginTop: '1rem',
                    textAlign: 'center'
                  }}>
                    <img 
                      src={formData.image} 
                      alt="Hotel preview" 
                      style={{
                        maxWidth: '200px',
                        maxHeight: '150px',
                        borderRadius: '8px',
                        border: '2px solid #e2e8f0'
                      }}
                    />
                  </div>
                )}
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#667eea';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#667eea';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: submitting ? '#a0aec0' : '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.target.style.backgroundColor = '#5a67d8';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.target.style.backgroundColor = '#667eea';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {submitting ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      {editingHotel ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingHotel ? 'Update Hotel' : 'Add Hotel'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Hotels List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1a202c'
            }}>
              Hotels ({filteredHotels.length})
            </h2>
            <button
              onClick={fetchHotels}
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
              🔄 Refresh
            </button>
          </div>
          
          {filteredHotels.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#718096'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏨</div>
              <p style={{ fontSize: '1.1rem' }}>
                {searchTerm ? 'No hotels found matching your search' : 'No hotels found. Add your first hotel!'}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {filteredHotels.map((hotel) => (
                <div key={hotel.id} style={{
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
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#f7fafc'
                    }}>
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f7fafc',
                        color: '#a0aec0',
                        fontSize: '2rem'
                      }}>
                        🏨
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#1a202c',
                          margin: 0
                        }}>
                          {hotel.name}
                        </h3>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          backgroundColor: hotel.status === 'active' ? '#c6f6d5' : '#fed7d7',
                          color: hotel.status === 'active' ? '#22543d' : '#c53030'
                        }}>
                          {hotel.status}
                        </span>
                      </div>
                      <p style={{
                        color: '#718096',
                        margin: '0 0 0.5rem 0',
                        fontSize: '0.9rem'
                      }}>
                        📍 {hotel.location}
                      </p>
                      <p style={{
                        color: '#4a5568',
                        margin: '0 0 0.5rem 0',
                        fontSize: '0.9rem'
                      }}>
                        {hotel.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ color: '#667eea', fontWeight: '600' }}>
                          NPR {hotel.price.toLocaleString()}/night
                        </span>
                        <span style={{ color: '#f59e0b', fontWeight: '600' }}>
                          ⭐ {hotel.rating}
                        </span>

                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleEdit(hotel)}
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
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleStatusToggle(hotel.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: hotel.status === 'active' ? '#f59e0b' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = hotel.status === 'active' ? '#d97706' : '#059669';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = hotel.status === 'active' ? '#f59e0b' : '#10b981';
                        }}
                      >
                        {hotel.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(hotel.id)}
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
      </div>

      {/* CSS Animation for Loading Spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HotelManagement; 