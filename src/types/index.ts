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
