import { useState } from 'react';
import { Car } from '@/types/car';
import { AddNewCar } from '@/components/add-new-car';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Car as CarIcon, 
  Calendar,
  Plus,
  Settings,
  ArrowLeft,
  Trash2
} from 'lucide-react';

interface AdminPanelProps {
  cars: Car[];
  comingSoonCars: Car[];
  onUpdateCar: (car: Car) => void;
  onAddCar: (car: Car) => void;
  onRemoveCar: (carId: string) => void;
  onAddToComingSoon: (car: Car) => void;
  onRemoveFromComingSoon: (carId: string) => void;
  onLogout: () => void;
}

export const AdminPanel = ({
  cars,
  comingSoonCars,
  onUpdateCar,
  onAddCar,
  onRemoveCar,
  onAddToComingSoon,
  onRemoveFromComingSoon,
  onLogout
}: AdminPanelProps) => {
  const [showAddCar, setShowAddCar] = useState(false);
  const { toast } = useToast();

  const handleMarkOnRent = (car: Car, availableDate: string) => {
    const updatedCar: Car = {
      ...car,
      availabilityStatus: 'on-rent',
      availableDate
    };
    onUpdateCar(updatedCar);
    toast({
      title: "Car Status Updated",
      description: `${car.name} marked as on rent until ${availableDate}`,
    });
  };

  const handleMarkAvailable = (car: Car) => {
    const updatedCar: Car = {
      ...car,
      availabilityStatus: 'available',
      availableDate: undefined
    };
    onUpdateCar(updatedCar);
    toast({
      title: "Car Status Updated",
      description: `${car.name} marked as available`,
    });
  };

  const handleMarkMostLiked = (car: Car) => {
    const updatedCar: Car = {
      ...car,
      availabilityStatus: 'most-liked'
    };
    onUpdateCar(updatedCar);
    toast({
      title: "Car Status Updated",
      description: `${car.name} marked as most liked`,
    });
  };

  const getStatusBadge = (car: Car) => {
    switch (car.availabilityStatus) {
      case 'available':
        return <Badge className="bg-green-500 text-white">Available</Badge>;
      case 'on-rent':
        return <Badge className="bg-orange-500 text-white">On Rent</Badge>;
      case 'most-liked':
        return <Badge className="bg-amber-500 text-white">Most Liked</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleAddNewCar = (newCar: Car) => {
    onAddCar(newCar);
    setShowAddCar(false);
  };

  // Show Add New Car form
  if (showAddCar) {
    return (
      <AddNewCar
        onAddCar={handleAddNewCar}
        onCancel={() => setShowAddCar(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <Button 
            onClick={onLogout}
            variant="outline"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container p-4 space-y-6">
        {/* Add New Car */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-medium mb-3">Add New Car</h2>
          <Button 
            onClick={() => setShowAddCar(true)}
            className="w-full"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>
        </div>

        {/* Car Management */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Manage Cars</h2>
          </div>
          <div className="p-4 space-y-4">
            {cars.map((car) => (
              <div key={car.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{car.name}</h3>
                    <p className="text-sm text-gray-600">
                      {car.year} {car.model} • ₹{car.pricePerKm}/km
                    </p>
                  </div>
                  {getStatusBadge(car)}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkAvailable(car)}
                    disabled={car.availabilityStatus === 'available'}
                  >
                    Available
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkMostLiked(car)}
                    disabled={car.availabilityStatus === 'most-liked'}
                  >
                    Most Liked
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const date = prompt('Enter available date (dd/mm/yyyy):');
                      if (date) handleMarkOnRent(car, date);
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    On Rent
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newCar: Car = { ...car, isComingSoon: true };
                      onAddToComingSoon(newCar);
                      toast({
                        title: "Added to Coming Soon",
                        description: `${car.name} added to coming soon section`,
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Coming Soon
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm(`Are you sure you want to remove ${car.name}?`)) {
                        onRemoveCar(car.id);
                        toast({
                          title: "Car Removed",
                          description: `${car.name} has been removed from the fleet`,
                        });
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Management */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Coming Soon Cars</h2>
          </div>
          <div className="p-4 space-y-4">
            {comingSoonCars.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No cars in coming soon section
              </p>
            ) : (
              comingSoonCars.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{car.name}</h3>
                    <p className="text-sm text-gray-600">
                      {car.year} {car.model} • ₹{car.pricePerKm}/km
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onRemoveFromComingSoon(car.id);
                      toast({
                        title: "Removed from Coming Soon",
                        description: `${car.name} removed from coming soon section`,
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};