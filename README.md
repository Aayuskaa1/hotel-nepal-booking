# Hotel Nepal Booking System

A simple web application for booking hotels in Nepal, built for a college project.



## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing

## Project Structure

```
hotel-nepal-booking/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── HotelCard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Hotels.js
│   │   │   ├── BookingForm.js
│   │   │   └── Bookings.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── server.js
│   ├── schema.sql
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- pgAdmin4 (optional, for database management)

### Database Setup

1. **Install PostgreSQL** and start the service

2. **Create the database** using pgAdmin4:
   ```sql
   CREATE DATABASE hotel_nepal;
   ```

3. **Run the schema** to create tables and insert sample data:
   - Open pgAdmin4
   - Connect to your PostgreSQL server
   - Open the `hotel_nepal` database
   - Open the Query Tool
   - Copy and paste the contents of `backend/schema.sql`
   - Execute the queries

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure database connection** (optional):
   - The app uses default PostgreSQL settings
   - If needed, update the database configuration in `server.js`:
     ```javascript
     const pool = new Pool({
       user: 'your_username',
       host: 'localhost',
       database: 'hotel_nepal',
       password: 'your_password',
       port: 5432,
     });
     ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## API Endpoints

- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/health` - Health check

## Usage

1. **Home Page**: Welcome page with information about Nepal and hotel booking features
2. **Hotels Page**: Browse all available hotels with search functionality
3. **Booking Form**: Select dates, number of guests, and complete booking
4. **My Bookings**: View all your confirmed bookings



### Hotels Table
- id, name, location, description
- price_per_night, rating, amenities
- image, created_at, updated_at

### Bookings Table
- id, hotel_id, guest_name, guest_email
- guest_phone, check_in_date, check_out_date
- number_of_guests, total_price, booking_status
- created_at, updated_at






With <3 from Pratyush

