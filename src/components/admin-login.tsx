import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_ADMIN } from '@/types/car';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (isAdmin: boolean) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.id === SAMPLE_ADMIN.id && credentials.password === SAMPLE_ADMIN.password) {
      onLogin(true);
      toast({
        title: "Login Successful",
        description: "Welcome to Sai Motors Admin Panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      <Card className="w-full max-w-md premium-card">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-destructive to-red-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl font-bold">Admin Access</CardTitle>
          <p className="text-muted-foreground text-sm">Sai Motors Management Portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-id">Admin ID</Label>
              <Input
                id="admin-id"
                type="text"
                value={credentials.id}
                onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                placeholder="Enter admin ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-admin" size="lg">
              <Lock className="w-4 h-4 mr-2" />
              Admin Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};