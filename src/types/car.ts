export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  pricePerKm: number;
  description: string;
  category: 'Family Car' | 'Sports Car' | 'Travel Car' | 'Luxury Car';
  seatingCapacity: string;
  images: string[];
  mainImage: string;
  availabilityStatus: 'available' | 'on-rent' | 'most-liked';
  availableDate?: string; // dd/mm/yyyy format
  isComingSoon?: boolean;
}

export interface AdminCredentials {
  id: string;
  password: string;
}

export const SAMPLE_ADMIN: AdminCredentials = {
  id: 'admin',
  password: '1234'
};