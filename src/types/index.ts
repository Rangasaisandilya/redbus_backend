export interface IUser {
  id?: string;
  email: string;
  phone: string;
  password: string;
  name: string;
  role: 'passenger' | 'driver' | 'owner' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBus {
  id?: string;
  owner: string;
  driver: string;
  license_number: string;
  contact?: string;
  type: string;
  is_ac: boolean;
  total_sleepers: number;
  total_seats: number;
}





export interface IPassenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber: string;
}

export interface IBooking {
  id?: string;
  userId?: string;
  tripId: string;
  seatNumbers: Array<string>;
  passengers: Array<IPassenger>;
  totalAmount: number;
  status: "confirmed" | "cancelled" | "completed" | "pending";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  bookedAt: Date;
}

export interface IPayment{
  bookingId: string;
  amount: number;
  paymentMethod: "credit_card" | "debit_card" | "upi" | "net_banking" | "wallet";
  transactionId: string;
  status: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}
