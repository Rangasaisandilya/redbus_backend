# Sample Data for Testing

## User Registration Sample

```json
{
  "email": "passenger@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "name": "John Doe",
  "role": "passenger"
}
```

## Login Sample

```json
{
  "email": "passenger@example.com",
  "password": "password123"
}
```

## Bus Sample

```json
{
  "owner": "USER_ID_OF_OWNER",
  "driver": "USER_ID_OF_DRIVER",
  "license_number": "KA01AB1234",
  "contact": "+1234567890",
  "type": "AC Sleeper",
  "is_ac": true,
  "total_sleepers": 20,
  "total_seats": 40
}
```

## Passenger Sample

```json
{
  "name": "Jane Doe",
  "age": 25,
  "gender": "female",
  "seatNumber": "A1"
}
```

## Booking Sample

```json
{
  "tripId": "TRIP_ID_HERE",
  "seatNumber": "A1",
  "passenger": [
    {
      "name": "Jane Doe",
      "age": 25,
      "gender": "female",
      "seatNumber": "A1"
    }
  ],
  "totalAmount": 500
}
```

## Payment Sample

```json
{
  "bookingId": "BOOKING_ID_HERE",
  "amount": 500,
  "paymentMethod": "upi"
}
```

## Testing Flow

1. **Register a user** with role "passenger"
2. **Login** to get JWT token
3. **Register owner and driver** users
4. **Create a bus** using owner and driver IDs
5. **Create passengers**
6. **Create booking** with passenger details
7. **Create payment** for the booking
8. **Confirm payment** to complete the booking

## Important Notes

- All endpoints except `/auth/register` and `/auth/login` require authentication
- Include JWT token in Authorization header: `Bearer <token>`
- Make sure to replace placeholder IDs with actual MongoDB ObjectIds
- Payment confirmation automatically updates booking status to "confirmed"
- Cancelling a booking calculates refund amount (90% of total amount)
