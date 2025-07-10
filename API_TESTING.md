# API Testing Guide

## Testing the RedBus Backend API

### 1. Start the Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 2. Access Swagger Documentation

Open your browser and go to:
```
http://localhost:5000/api-docs
```

### 3. Test the API Endpoints

#### Step 1: Register a User

**POST** `http://localhost:5000/api/v1/auth/register`

```json
{
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "name": "John Doe",
  "role": "passenger"
}
```

#### Step 2: Login

**POST** `http://localhost:5000/api/v1/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "passenger"
  }
}
```

#### Step 3: Create a Passenger

**POST** `http://localhost:5000/api/v1/passenger`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

Body:
```json
{
  "name": "Jane Smith",
  "age": 28,
  "gender": "female",
  "seatNumber": "A1"
}
```

#### Step 4: Create a Booking

**POST** `http://localhost:5000/api/v1/booking`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

Body:
```json
{
  "tripId": "507f1f77bcf86cd799439011",
  "seatNumber": "A1",
  "passenger": [
    {
      "name": "Jane Smith",
      "age": 28,
      "gender": "female",
      "seatNumber": "A1"
    }
  ],
  "totalAmount": 500
}
```

#### Step 5: Create a Payment

**POST** `http://localhost:5000/api/v1/payment`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

Body:
```json
{
  "bookingId": "BOOKING_ID_FROM_STEP_4",
  "amount": 500,
  "paymentMethod": "upi"
}
```

#### Step 6: Confirm Payment

**PATCH** `http://localhost:5000/api/v1/payment/PAYMENT_ID/confirm`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 4. Test Other Endpoints

#### Get All Bookings

**GET** `http://localhost:5000/api/v1/booking`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Get Active Bookings

**GET** `http://localhost:5000/api/v1/booking/active`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Cancel a Booking

**PATCH** `http://localhost:5000/api/v1/booking/BOOKING_ID/cancel`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Get All Passengers

**GET** `http://localhost:5000/api/v1/passenger`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Get Adult Passengers

**GET** `http://localhost:5000/api/v1/passenger/adults`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Get Passengers by Age Range

**GET** `http://localhost:5000/api/v1/passenger/age-range?minAge=18&maxAge=65`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### 5. Testing with curl

You can also test with curl commands:

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "name": "John Doe",
    "role": "passenger"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Create Passenger (replace TOKEN)
curl -X POST http://localhost:5000/api/v1/passenger \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "age": 28,
    "gender": "female",
    "seatNumber": "A1"
  }'
```

### 6. Testing with Postman

1. Import the API endpoints from the Swagger documentation
2. Set up environment variables for the base URL and JWT token
3. Use the collection to test all endpoints systematically

### 7. Common Response Codes

- **200 OK**: Success
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid JWT token
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server error

### 8. Error Response Format

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

### 9. Success Response Format

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
