import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    hotel_name: '',
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    guests: '',
    total_price: '',
    special_requests: ''
  });

  useEffect(() => {
    fetchBookings();
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

  const fetchBookings = async () => {
    try {
      // Mock data - replace with actual API call
      const mockBookings = [
        {
          id: 1,
          hotel_name: 'Himalayan Grand Hotel',
          guest_name: 'John Doe',
          guest_email: 'john.doe@email.com',
          guest_phone: '+977-9841234567',
          check_in: '2024-02-01',
          check_out: '2024-02-03',
          guests: 2,
          total_price: 36000,
          status: 'confirmed',
          booking_date: '2024-01-15',
          special_requests: 'Early check-in if possible'
        },
        {
          id: 2,
          hotel_name: 'Everest View Lodge',
          guest_name: 'Jane Smith',
          guest_email: 'jane.smith@email.com',
          guest_phone: '+977-9842345678',
          check_in: '2024-02-05',
          check_out: '2024-02-07',
          guests: 1,
          total_price: 16000,
          status: 'pending',
          booking_date: '2024-01-20',
          special_requests: 'Room with mountain view'
        },
        {
          id: 3,
          hotel_name: 'Pokhara Lake Resort',
          guest_name: 'Mike Johnson',
          guest_email: 'mike.johnson@email.com',
          guest_phone: '+977-9843456789',
          check_in: '2024-02-10',
          check_out: '2024-02-12',
          guests: 3,
          total_price: 45000,
          status: 'confirmed',
          booking_date: '2024-01-25',
          special_requests: 'Extra towels needed'
        },
        {
          id: 4,
          hotel_name: 'Himalayan Grand Hotel',
          guest_name: 'Sarah Wilson',
          guest_email: 'sarah.wilson@email.com',
          guest_phone: '+977-9844567890',
          check_in: '2024-02-15',
          check_out: '2024-02-18',
          guests: 2,
          total_price: 54000,
          status: 'cancelled',
          booking_date: '2024-01-30',
          special_requests: 'Late check-out requested'
        }
      ];
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setMessage({ type: 'error', text: 'Failed to load bookings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.hotel_name.trim()) {
      setMessage({ type: 'error', text: 'Hotel name is required' });
      return false;
    }
    if (!formData.guest_name.trim()) {
      setMessage({ type: 'error', text: 'Guest name is required' });
      return false;
    }
    if (!formData.guest_email.trim() || !formData.guest_email.includes('@')) {
      setMessage({ type: 'error', text: 'Valid email is required' });
      return false;
    }
    if (!formData.check_in) {
      setMessage({ type: 'error', text: 'Check-in date is required' });
      return false;
    }
    if (!formData.check_out) {
      setMessage({ type: 'error', text: 'Check-out date is required' });
      return false;
    }
    if (new Date(formData.check_out) <= new Date(formData.check_in)) {
      setMessage({ type: 'error', text: 'Check-out date must be after check-in date' });
      return false;
    }
    if (!formData.guests || formData.guests <= 0) {
      setMessage({ type: 'error', text: 'Number of guests must be greater than 0' });
      return false;
    }
    if (!formData.total_price || formData.total_price <= 0) {
      setMessage({ type: 'error', text: 'Valid total price is required' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingBooking) {
        // Update existing booking
        const updatedBookings = bookings.map(booking =>
          booking.id === editingBooking.id 
            ? { 
                ...formData, 
                id: booking.id, 
                guests: parseInt(formData.guests),
                total_price: parseFloat(formData.total_price),
                status: booking.status,
                booking_date: booking.booking_date
              } 
            : booking
        );
        setBookings(updatedBookings);
        setMessage({ 
          type: 'success', 
          text: `✅ Booking for "${formData.guest_name}" has been successfully updated!` 
        });
        setEditingBooking(null);
      } else {
        // Add new booking
        const newBooking = {
          ...formData,
          id: Date.now(),
          guests: parseInt(formData.guests),
          total_price: parseFloat(formData.total_price),
          status: 'pending',
          booking_date: new Date().toISOString().split('T')[0]
        };
        setBookings([...bookings, newBooking]);
        setMessage({ 
          type: 'success', 
          text: `✅ New booking for "${formData.guest_name}" has been successfully added!` 
        });
      }

      // Reset form
      setFormData({
        hotel_name: '',
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_in: '',
        check_out: '',
        guests: '',
        total_price: '',
        special_requests: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving booking:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to save booking. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      hotel_name: booking.hotel_name,
      guest_name: booking.guest_name,
      guest_email: booking.guest_email,
      guest_phone: booking.guest_phone,
      check_in: booking.check_in,
      check_out: booking.check_out,
      guests: booking.guests.toString(),
      total_price: booking.total_price.toString(),
      special_requests: booking.special_requests || ''
    });
    setShowAddForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    
    const booking = bookings.find(b => b.id === bookingId);
    setMessage({ 
      type: 'success', 
      text: `🔄 Booking status for "${booking.guest_name}" changed to ${newStatus}!` 
    });
  };

  const handleDelete = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (window.confirm(`Are you sure you want to delete the booking for "${booking.guest_name}"? This action cannot be undone.`)) {
      try {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        setMessage({ 
          type: 'success', 
          text: `🗑️ Booking for "${booking.guest_name}" has been successfully deleted!` 
        });
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: 'Failed to delete booking. Please try again.' 
        });
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingBooking(null);
    setFormData({
      hotel_name: '',
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      check_in: '',
      check_out: '',
      guests: '',
      total_price: '',
      special_requests: ''
    });
    setMessage({ type: '', text: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return { bg: '#c6f6d5', text: '#22543d' };
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'cancelled':
        return { bg: '#fed7d7', text: '#c53030' };
      default:
        return { bg: '#e2e8f0', text: '#4a5568' };
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
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
          <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading bookings...</p>
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
            📋
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Booking Management
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '1.2rem'
          }}>
            Monitor and manage all hotel reservations
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

        {/* Search, Filter and Add Button */}
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
              placeholder="Search by guest name, hotel, or email..."
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
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingBooking(null);
              setFormData({
                hotel_name: '',
                guest_name: '',
                guest_email: '',
                guest_phone: '',
                check_in: '',
                check_out: '',
                guests: '',
                total_price: '',
                special_requests: ''
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
            ➕ Add New Booking
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
              {editingBooking ? '✏️ Edit Booking' : '➕ Add New Booking'}
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
                    name="hotel_name"
                    value={formData.hotel_name}
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
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    name="guest_name"
                    value={formData.guest_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter guest name"
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
                    Guest Email *
                  </label>
                  <input
                    type="email"
                    name="guest_email"
                    value={formData.guest_email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter guest email"
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
                    Guest Phone
                  </label>
                  <input
                    type="tel"
                    name="guest_phone"
                    value={formData.guest_phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
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
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="check_in"
                    value={formData.check_in}
                    onChange={handleInputChange}
                    required
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
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="check_out"
                    value={formData.check_out}
                    onChange={handleInputChange}
                    required
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
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Enter number of guests"
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
                    Total Price (NPR) *
                  </label>
                  <input
                    type="number"
                    name="total_price"
                    value={formData.total_price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="100"
                    placeholder="Enter total price"
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
                  Special Requests
                </label>
                <textarea
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter any special requests..."
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
                      {editingBooking ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingBooking ? 'Update Booking' : 'Add Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bookings List */}
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
            Bookings ({filteredBookings.length})
          </h2>
          
          {filteredBookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#718096'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <p style={{ fontSize: '1.1rem' }}>
                {searchTerm || statusFilter !== 'all' ? 'No bookings found matching your criteria' : 'No bookings found. Add your first booking!'}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {filteredBookings.map((booking) => {
                const statusColors = getStatusColor(booking.status);
                return (
                  <div key={booking.id} style={{
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
                      gridTemplateColumns: '1fr auto',
                      gap: '1.5rem'
                    }}>
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
                            {booking.hotel_name}
                          </h3>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            backgroundColor: statusColors.bg,
                            color: statusColors.text
                          }}>
                            {booking.status}
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
                              Guest
                            </p>
                            <p style={{
                              color: '#1a202c',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              👤 {booking.guest_name}
                            </p>
                          </div>
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
                              📧 {booking.guest_email}
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
                              📞 {booking.guest_phone}
                            </p>
                          </div>
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Guests
                            </p>
                            <p style={{
                              color: '#1a202c',
                              margin: 0
                            }}>
                              👥 {booking.guests} person(s)
                            </p>
                          </div>
                        </div>
                        
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Check-in
                            </p>
                            <p style={{
                              color: '#1a202c',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              📅 {booking.check_in}
                            </p>
                          </div>
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Check-out
                            </p>
                            <p style={{
                              color: '#1a202c',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              📅 {booking.check_out}
                            </p>
                          </div>
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Total Price
                            </p>
                            <p style={{
                              color: '#667eea',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              💰 NPR {booking.total_price.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Booking Date
                            </p>
                            <p style={{
                              color: '#1a202c',
                              margin: 0
                            }}>
                              📅 {booking.booking_date}
                            </p>
                          </div>
                        </div>
                        
                        {booking.special_requests && (
                          <div>
                            <p style={{
                              color: '#718096',
                              fontSize: '0.9rem',
                              margin: '0 0 0.25rem 0'
                            }}>
                              Special Requests
                            </p>
                            <p style={{
                              color: '#4a5568',
                              margin: 0,
                              fontStyle: 'italic'
                            }}>
                              💬 {booking.special_requests}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        alignItems: 'flex-end'
                      }}>
                        <button
                          onClick={() => handleEdit(booking)}
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
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                          style={{
                            padding: '0.5rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        
                        <button
                          onClick={() => handleDelete(booking.id)}
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
                );
              })}
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

export default BookingManagement; 