# Test All API Endpoints

## Test Authentication Endpoints

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "name": "Test User",
    "role": "passenger"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

## Test Protected Endpoints (Replace TOKEN with actual JWT)

### Booking Endpoints
```bash
# Get all bookings
curl -X GET http://localhost:5000/api/v1/booking \
  -H "Authorization: Bearer TOKEN"

# Get active bookings
curl -X GET http://localhost:5000/api/v1/booking/active \
  -H "Authorization: Bearer TOKEN"

# Create booking
curl -X POST http://localhost:5000/api/v1/booking \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tripId": "507f1f77bcf86cd799439011",
    "seatNumber": "A1",
    "passenger": [
      {
        "name": "John Doe",
        "age": 25,
        "gender": "male",
        "seatNumber": "A1"
      }
    ],
    "totalAmount": 500
  }'
```

### Payment Endpoints
```bash
# Get all payments
curl -X GET http://localhost:5000/api/v1/payment \
  -H "Authorization: Bearer TOKEN"

# Get paid payments
curl -X GET http://localhost:5000/api/v1/payment/status/paid \
  -H "Authorization: Bearer TOKEN"

# Create payment
curl -X POST http://localhost:5000/api/v1/payment \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "BOOKING_ID_HERE",
    "amount": 500,
    "paymentMethod": "upi"
  }'
```

### Passenger Endpoints
```bash
# Get all passengers
curl -X GET http://localhost:5000/api/v1/passenger \
  -H "Authorization: Bearer TOKEN"

# Get adult passengers
curl -X GET http://localhost:5000/api/v1/passenger/adults \
  -H "Authorization: Bearer TOKEN"

# Get passengers by age range
curl -X GET "http://localhost:5000/api/v1/passenger/age-range?minAge=18&maxAge=65" \
  -H "Authorization: Bearer TOKEN"

# Create passenger
curl -X POST http://localhost:5000/api/v1/passenger \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "age": 28,
    "gender": "female",
    "seatNumber": "B2"
  }'
```

### Bus Endpoints
```bash
# Get all buses
curl -X GET http://localhost:5000/api/v1/bus \
  -H "Authorization: Bearer TOKEN"

# Create bus (need owner and driver user IDs)
curl -X POST http://localhost:5000/api/v1/bus \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "USER_ID_HERE",
    "driver": "USER_ID_HERE",
    "license_number": "KA01AB1234",
    "contact": "+1234567890",
    "type": "AC Sleeper",
    "is_ac": true,
    "total_sleepers": 20,
    "total_seats": 40
  }'
```

## PowerShell Commands (Windows)

### Register User
```powershell
$body = @{
    email = "testuser@example.com"
    phone = "+1234567890"
    password = "password123"
    name = "Test User"
    role = "passenger"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login User
```powershell
$loginBody = @{
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $response.token
```

### Test Protected Endpoint
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/v1/booking" -Method GET -Headers $headers
```

## Expected Responses

### Successful Registration
```json
{
  "status": true,
  "message": "User registered successfully"
}
```

### Successful Login
```json
{
  "status": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "testuser@example.com",
    "name": "Test User",
    "role": "passenger"
  }
}
```

### Authentication Error (No Token)
```json
{
  "status": true,
  "message": "No token provided",
  "errors": [
    {
      "error": "No token provided"
    }
  ]
}
```

### Successful API Response
```json
{
  "status": true,
  "message": "SUCCESS",
  "data": [...],
  "count": 0
}
```
