import { MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/data/cars';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border premium-card z-50">
      <div className="container py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs">{CONTACT_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-xs">{CONTACT_INFO.garageLocation}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};