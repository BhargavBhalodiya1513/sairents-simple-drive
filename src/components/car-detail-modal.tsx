import { useState } from 'react';
import { Car } from '@/types/car';
import { CONTACT_INFO } from '@/data/cars';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Calendar, 
  Crown, 
  Users, 
  Car as CarIcon,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CarDetailModal = ({ car, isOpen, onClose }: CarDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!car) return null;

  const handleCallNow = () => {
    window.open(`tel:${CONTACT_INFO.phone}`, '_self');
  };

  const getAvailabilityText = () => {
    switch (car.availabilityStatus) {
      case 'available':
        return 'Available to Rent';
      case 'on-rent':
        return `Available on: ${car.availableDate}`;
      case 'most-liked':
        return 'Available to Rent';
      default:
        return 'Contact for Availability';
    }
  };

  const getAvailabilityBadge = () => {
    if (car.availabilityStatus === 'most-liked') {
      return (
        <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none mb-2">
          <Crown className="w-4 h-4 mr-1" />
          Most Liked
        </Badge>
      );
    }
    return null;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{car.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Car Images Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      index === currentImageIndex 
                        ? 'border-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Badge */}
          {getAvailabilityBadge()}

          {/* Car Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CarIcon className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Model:</span>
              <span className="font-medium">{car.year} {car.model}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Capacity:</span>
              <span className="font-medium">{car.seatingCapacity}</span>
            </div>
          </div>

          <Separator />

          {/* Price */}
          <div className="text-center py-2">
            <p className="text-3xl font-bold text-primary">₹{car.pricePerKm}</p>
            <p className="text-muted-foreground">per kilometer</p>
          </div>

          <Separator />

          {/* Category */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="secondary">{car.category}</Badge>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{getAvailabilityText()}</span>
          </div>

          {/* Call Button */}
          <Button 
            onClick={handleCallNow}
            className="w-full btn-automotive"
            size="lg"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now - {CONTACT_INFO.phone}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};