import { Car } from '@/types/car';
import carSedan from '@/assets/car-sedan.jpg';
import carSuv from '@/assets/car-suv.jpg';
import carSports from '@/assets/car-sports.jpg';
import carFamily from '@/assets/car-family.jpg';

export const SAMPLE_CARS: Car[] = [
  {
    id: 'sedan-1',
    name: 'Premium Sedan',
    model: 'Executive',
    year: 2023,
    pricePerKm: 15,
    description: 'A luxurious sedan perfect for business trips and comfortable city driving. Features premium leather seats, advanced safety systems, and excellent fuel efficiency.',
    category: 'Luxury Car',
    seatingCapacity: 'Seats 5 adults',
    images: [carSedan],
    mainImage: carSedan,
    availabilityStatus: 'available'
  },
  {
    id: 'suv-1',
    name: 'Family SUV',
    model: 'Explorer',
    year: 2023,
    pricePerKm: 20,
    description: 'Spacious SUV ideal for family trips and outdoor adventures. Equipped with all-wheel drive, large cargo space, and modern entertainment system.',
    category: 'Family Car',
    seatingCapacity: 'Seats 7 adults',
    images: [carSuv],
    mainImage: carSuv,
    availabilityStatus: 'most-liked'
  },
  {
    id: 'sports-1',
    name: 'Sports Convertible',
    model: 'Roadster',
    year: 2024,
    pricePerKm: 35,
    description: 'Experience the thrill of open-top driving with this high-performance sports car. Perfect for weekend getaways and special occasions.',
    category: 'Sports Car',
    seatingCapacity: 'Seats 2 adults',
    images: [carSports],
    mainImage: carSports,
    availabilityStatus: 'on-rent',
    availableDate: '15/12/2024'
  },
  {
    id: 'minivan-1',
    name: 'Family Minivan',
    model: 'Odyssey',
    year: 2023,
    pricePerKm: 18,
    description: 'The ultimate family vehicle with spacious interior, multiple seating configurations, and advanced safety features for worry-free travel.',
    category: 'Travel Car',
    seatingCapacity: 'Seats 8 adults',
    images: [carFamily],
    mainImage: carFamily,
    availabilityStatus: 'available'
  }
];

export const COMING_SOON_CARS: Car[] = [
  {
    id: 'luxury-1',
    name: 'Luxury Sedan',
    model: 'S-Class',
    year: 2024,
    pricePerKm: 45,
    description: 'Ultimate luxury experience with premium amenities and cutting-edge technology.',
    category: 'Luxury Car',
    seatingCapacity: 'Seats 5 adults',
    images: [carSedan],
    mainImage: carSedan,
    availabilityStatus: 'available',
    isComingSoon: true
  }
];

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  address: 'Sai Motors, 123 Auto Street, Motor City, State 12345',
  garageLocation: 'Near Central Bus Station, Motor City'
};