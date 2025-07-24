-- Create database (run this first in pgAdmin4 or psql)
-- CREATE DATABASE hotel_nepal;

-- Connect to hotel_nepal database and run the following:

-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0,
    amenities TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    booking_status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample hotels
INSERT INTO hotels (name, location, description, price_per_night, rating, amenities, image) VALUES
('Himalayan Grand Hotel', 'Kathmandu', 'Luxury 5-star hotel in the heart of Kathmandu with stunning views of the Himalayas. Features world-class amenities and traditional Nepalese hospitality.', 150.00, 4.5, 'WiFi,Pool,Spa,Restaurant,Room Service,Gym,Conference Room', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'),

('Everest View Lodge', 'Namche Bazaar', 'Perfect base camp for Everest trekkers. Offers panoramic views of Mount Everest and surrounding peaks. Cozy mountain lodge with all essential amenities.', 80.00, 4.2, 'WiFi,Restaurant,Heating,Mountain View,Trekking Guide', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop'),

('Pokhara Lake Resort', 'Pokhara', 'Beautiful lakeside resort with stunning views of Phewa Lake and the Annapurna mountain range. Perfect for relaxation and adventure activities.', 120.00, 4.7, 'WiFi,Pool,Spa,Restaurant,Lake View,Boating,Paragliding', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'),

('Chitwan Jungle Lodge', 'Chitwan National Park', 'Eco-friendly lodge in the heart of Chitwan National Park. Experience wildlife safaris and traditional Tharu culture in comfort.', 95.00, 4.3, 'WiFi,Restaurant,Safari Tours,Cultural Shows,Nature Walks', 'https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=800&h=600&fit=crop'),

('Bandipur Heritage Hotel', 'Bandipur', 'Historic hotel in the medieval town of Bandipur. Experience traditional Newari architecture and culture with modern comfort.', 75.00, 4.1, 'WiFi,Restaurant,Heritage Tours,Mountain View,Cultural Experience', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'),

('Gokyo Lake Lodge', 'Gokyo Valley', 'High-altitude lodge near the famous Gokyo Lakes. Perfect for serious trekkers seeking adventure in the Everest region.', 60.00, 4.0, 'WiFi,Restaurant,Heating,Mountain View,Trekking Support', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop');

-- Create indexes for better performance
CREATE INDEX idx_hotels_location ON hotels(location);
CREATE INDEX idx_hotels_rating ON hotels(rating);
CREATE INDEX idx_bookings_hotel_id ON bookings(hotel_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
