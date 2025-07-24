import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-nepal-blue to-nepal-red text-white rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Hotel Nepal</h1>
        <p className="text-xl mb-8">Discover the beauty of Nepal with our premium hotel bookings</p>
        <Link 
          to="/hotels" 
          className="bg-white text-nepal-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          Explore Hotels
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="text-4xl mb-4">🏔️</div>
          <h3 className="text-xl font-bold mb-2">Mountain Views</h3>
          <p className="text-gray-600">Experience breathtaking views of the Himalayas from our selected hotels</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">🛏️</div>
          <h3 className="text-xl font-bold mb-2">Comfortable Stay</h3>
          <p className="text-gray-600">Enjoy luxury accommodation with modern amenities and traditional hospitality</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
          <p className="text-gray-600">Simple and secure booking process with instant confirmation</p>
        </div>
      </div>

      {/* About Nepal Section */}
      <div className="card">
        <h2 className="text-3xl font-bold mb-4 text-center">About Nepal</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Nepal, officially known as the Federal Democratic Republic of Nepal, is a landlocked country 
          in South Asia. It is mainly situated in the Himalayas, but also includes parts of the 
          Indo-Gangetic Plain. Nepal is home to eight of the world's ten tallest mountains, 
          including Mount Everest, the highest point on Earth.
        </p>
      </div>
    </div>
  );
};

export default Home;
