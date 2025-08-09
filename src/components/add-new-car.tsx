import { useState } from 'react';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, X, Car as CarIcon } from 'lucide-react';

interface AddNewCarProps {
  onAddCar: (car: Car) => void;
  onCancel: () => void;
}

export const AddNewCar = ({ onAddCar, onCancel }: AddNewCarProps) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerKm: 0,
    description: '',
    category: 'Family Car' as Car['category'],
    seatingCapacity: ''
  });
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImage = () => {
    const imageUrl = prompt('Enter image URL (or upload feature will be added):');
    if (imageUrl && imageFiles.length < 10) {
      setImageFiles(prev => [...prev, imageUrl]);
      toast({
        title: "Image Added",
        description: `Added image ${imageFiles.length + 1}`,
      });
    } else if (imageFiles.length >= 10) {
      toast({
        title: "Maximum Images Reached",
        description: "You can add up to 10 images per car",
        variant: "destructive"
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageFiles.length < 7) {
      toast({
        title: "Minimum Images Required",
        description: "Please add at least 7 images for the car",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.model || !formData.description || !formData.seatingCapacity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newCar: Car = {
      id: `car-${Date.now()}`,
      name: formData.name,
      model: formData.model,
      year: formData.year,
      pricePerKm: formData.pricePerKm,
      description: formData.description,
      category: formData.category,
      seatingCapacity: formData.seatingCapacity,
      images: imageFiles,
      mainImage: imageFiles[0],
      availabilityStatus: 'available'
    };

    onAddCar(newCar);
    toast({
      title: "Car Added Successfully",
      description: `${newCar.name} has been added to the fleet`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CarIcon className="w-5 h-5" />
            Add New Car
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car-name">Car Name *</Label>
                <Input
                  id="car-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Premium Sedan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-model">Model *</Label>
                <Input
                  id="car-model"
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., Executive"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car-year">Year</Label>
                <Input
                  id="car-year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  min="2010"
                  max="2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-price">Price per KM (₹) *</Label>
                <Input
                  id="car-price"
                  type="number"
                  value={formData.pricePerKm}
                  onChange={(e) => handleInputChange('pricePerKm', parseInt(e.target.value))}
                  placeholder="e.g., 15"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Car['category']) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Family Car">Family Car</SelectItem>
                    <SelectItem value="Sports Car">Sports Car</SelectItem>
                    <SelectItem value="Travel Car">Travel Car</SelectItem>
                    <SelectItem value="Luxury Car">Luxury Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-seating">Seating Capacity *</Label>
                <Input
                  id="car-seating"
                  type="text"
                  value={formData.seatingCapacity}
                  onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                  placeholder="e.g., Seats 5 adults"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="car-description">Description *</Label>
              <Textarea
                id="car-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detailed description of the car features and benefits..."
                rows={4}
                required
              />
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Car Images (Minimum 7 required)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImage}
                  disabled={imageFiles.length >= 10}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image URL
                </Button>
              </div>

              {imageFiles.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images added yet</p>
                  <p className="text-sm text-muted-foreground">Add at least 7 images</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageFiles.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Images added: {imageFiles.length}/10 (Minimum 7 required)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 btn-automotive"
                disabled={imageFiles.length < 7}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Car to Fleet
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};