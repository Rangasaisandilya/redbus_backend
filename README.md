# RedBus Backend API

A simple bus booking application API similar to RedBus built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Management**: Registration, login, and profile management
- **Bus Management**: Add, update, and manage bus information
- **Booking System**: Create, update, cancel, and manage bookings
- **Payment Processing**: Handle payments and payment status
- **Passenger Management**: Manage passenger information
- **API Documentation**: Interactive Swagger documentation

## Tech Stack

- **Node.js & Express**: Backend framework
- **TypeScript**: Type safety
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **Swagger**: API documentation
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/redbus
   JWT_ACCESS_SECRET=your-secret-key
   BASIC_API_URL=/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

## API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### User Management
- `PUT /api/v1/user/:id` - Update user profile

### Bus Management
- `POST /api/v1/bus` - Add a new bus
- `GET /api/v1/bus` - Get all buses
- `PUT /api/v1/bus/:id` - Update bus

### Booking Management
- `POST /api/v1/booking` - Create a new booking
- `GET /api/v1/booking` - Get all bookings
- `GET /api/v1/booking/:id` - Get booking by ID
- `GET /api/v1/booking/trip/:tripId` - Get bookings by trip
- `GET /api/v1/booking/active` - Get active bookings
- `PUT /api/v1/booking/:id` - Update booking
- `PATCH /api/v1/booking/:id/cancel` - Cancel booking
- `DELETE /api/v1/booking/:id` - Delete booking

### Payment Management
- `POST /api/v1/payment` - Create a new payment
- `GET /api/v1/payment` - Get all payments
- `GET /api/v1/payment/:id` - Get payment by ID
- `GET /api/v1/payment/booking/:bookingId` - Get payments by booking
- `GET /api/v1/payment/status/paid` - Get paid payments
- `GET /api/v1/payment/status/failed` - Get failed payments
- `PATCH /api/v1/payment/:id/confirm` - Confirm payment
- `PATCH /api/v1/payment/:id/fail` - Mark payment as failed
- `DELETE /api/v1/payment/:id` - Delete payment

### Passenger Management
- `POST /api/v1/passenger` - Create a new passenger
- `GET /api/v1/passenger` - Get all passengers
- `GET /api/v1/passenger/:id` - Get passenger by ID
- `GET /api/v1/passenger/seat/:seatNumber` - Get passengers by seat
- `GET /api/v1/passenger/age-range` - Get passengers by age range
- `GET /api/v1/passenger/adults` - Get adult passengers
- `PUT /api/v1/passenger/:id` - Update passenger
- `DELETE /api/v1/passenger/:id` - Delete passenger

## Data Models

### User
- `email`: User email address
- `phone`: User phone number
- `password`: User password (hashed)
- `name`: User full name
- `role`: User role (passenger, driver, owner, admin)

### Bus
- `owner`: Reference to owner user
- `driver`: Reference to driver user
- `license_number`: Bus license number
- `contact`: Contact phone number
- `type`: Bus type
- `is_ac`: Whether bus is AC
- `total_sleepers`: Number of sleeper seats
- `total_seats`: Total number of seats

### Booking
- `tripId`: Reference to trip
- `seatNumber`: Booked seat number
- `passenger`: Array of passenger references
- `totalAmount`: Total booking amount
- `status`: Booking status (pending, confirmed, cancelled, completed)
- `paymentStatus`: Payment status (pending, paid, failed, refunded)
- `bookedAt`: Booking timestamp

### Payment
- `bookingId`: Reference to booking
- `amount`: Payment amount
- `paymentMethod`: Payment method (credit_card, debit_card, upi, net_banking, wallet)
- `transactionId`: Unique transaction ID
- `status`: Payment status (pending, paid, failed)

### Passenger
- `name`: Passenger name
- `age`: Passenger age
- `gender`: Passenger gender (male, female, other)
- `seatNumber`: Assigned seat number

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API uses consistent error response format:
```json
{
  "status": false,
  "message": "Error message",
  "errors": [
    {
      "msg": "Specific error message",
      "path": "field_name"
    }
  ]
}
```

## Success Response

Success responses follow this format:
```json
{
  "status": true,
  "message": "Success message",
  "data": {...},
  "count": 10,
  "page": 1,
  "limit": 10
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address

## Security Features

- Helmet for security headers
- CORS for cross-origin requests
- Input validation using Express Validator
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
