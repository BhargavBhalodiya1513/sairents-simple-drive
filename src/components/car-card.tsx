import { Car } from '@/types/car';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Calendar } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export const CarCard = ({ car, onClick }: CarCardProps) => {
  return (
    <Card 
      className="car-card-hover premium-card cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={car.mainImage}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Status badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {car.availabilityStatus === 'most-liked' && (
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none">
              <Crown className="w-3 h-3 mr-1" />
              Most Liked
            </Badge>
          )}
          {car.availabilityStatus === 'on-rent' && car.availableDate && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
              <Calendar className="w-3 h-3 mr-1" />
              Available {car.availableDate}
            </Badge>
          )}
          {car.isComingSoon && (
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none">
              Coming Soon
            </Badge>
          )}
        </div>

        {/* Car name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{car.name}</h3>
          <p className="text-white/80 text-sm">{car.category}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">{car.year} {car.model}</p>
            <p className="text-foreground font-medium">{car.seatingCapacity}</p>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-lg">₹{car.pricePerKm}</p>
            <p className="text-muted-foreground text-xs">per km</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};