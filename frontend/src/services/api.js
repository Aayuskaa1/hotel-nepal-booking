import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hotels API
export const getHotels = async () => {
  try {
    const response = await api.get('/hotels');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const getHotelById = async (id) => {
  try {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw error;
  }
};

// Bookings API
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export default api;
