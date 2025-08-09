import { useState } from 'react';
import { Car } from '@/types/car';
import { SAMPLE_CARS, COMING_SOON_CARS } from '@/data/cars';
import { CarCard } from '@/components/car-card';
import { CarDetailModal } from '@/components/car-detail-modal';
import { AdminLogin } from '@/components/admin-login';
import { AdminPanel } from '@/components/admin-panel';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Car as CarIcon } from 'lucide-react';

const Index = () => {
  const [cars, setCars] = useState<Car[]>(SAMPLE_CARS);
  const [comingSoonCars, setComingSoonCars] = useState<Car[]>(COMING_SOON_CARS);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleUpdateCar = (updatedCar: Car) => {
    setCars(prevCars => 
      prevCars.map(car => car.id === updatedCar.id ? updatedCar : car)
    );
  };

  const handleRemoveCar = (carId: string) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
  };

  const handleAddToComingSoon = (car: Car) => {
    const comingSoonCar = { ...car, isComingSoon: true };
    setComingSoonCars(prev => [...prev, comingSoonCar]);
  };

  const handleRemoveFromComingSoon = (carId: string) => {
    setComingSoonCars(prev => prev.filter(car => car.id !== carId));
  };

  const handleAdminLogin = (loginSuccess: boolean) => {
    if (loginSuccess) {
      setIsAdmin(true);
      setShowAdminLogin(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminLogin(false);
  };

  // Admin Login Screen
  if (showAdminLogin) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Admin Panel
  if (isAdmin) {
    return (
      <AdminPanel
        cars={cars}
        comingSoonCars={comingSoonCars}
        onUpdateCar={handleUpdateCar}
        onRemoveCar={handleRemoveCar}
        onAddToComingSoon={handleAddToComingSoon}
        onRemoveFromComingSoon={handleRemoveFromComingSoon}
        onLogout={handleLogout}
      />
    );
  }

  // Main User Interface
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white">
        <div className="container py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sai Motors</h1>
              <p className="text-primary-foreground/80">Premium Car Rentals</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdminLogin(true)}
              className="text-white border-white hover:bg-white hover:text-primary"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>

      <div className="container p-4 space-y-8">
        {/* Available Cars Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Available Cars</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cars.filter(car => !car.isComingSoon).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => setSelectedCar(car)}
              />
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        {comingSoonCars.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">
                Coming Soon
              </Badge>
              <h2 className="text-xl font-semibold">Future Arrivals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comingSoonCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onClick={() => setSelectedCar(car)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Car Detail Modal */}
      <CarDetailModal
        car={selectedCar}
        isOpen={!!selectedCar}
        onClose={() => setSelectedCar(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
