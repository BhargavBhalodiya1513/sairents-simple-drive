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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-destructive to-red-600 text-white p-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            <h1 className="text-xl font-bold">Sai Motors Admin</h1>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container p-4 space-y-6">
        {/* Quick Actions */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Actions
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowAddCar(true)}
              className="w-full btn-automotive"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Car to Fleet
            </Button>
          </CardContent>
        </Card>

        {/* Car Management */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CarIcon className="w-5 h-5" />
              Manage Cars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cars.map((car) => (
              <div key={car.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">
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
                    Mark Available
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkMostLiked(car)}
                    disabled={car.availabilityStatus === 'most-liked'}
                  >
                    Mark Most Liked
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
                    Mark On Rent
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
                    Add to Coming Soon
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Coming Soon Management */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Coming Soon Cars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comingSoonCars.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No cars in coming soon section
              </p>
            ) : (
              comingSoonCars.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};