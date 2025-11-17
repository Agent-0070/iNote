import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AuthService from '@/services/auth';
import { User } from '@/types/auth';

interface LogoutButtonProps {
  user: User;
}

export function LogoutButton({ user }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      // Force page reload to reset application state
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Logout error',
        description: error.message || 'Failed to logout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 font-poppins">
      <span className="text-sm text-muted-foreground">
        Welcome, {user.firstName || user.username}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
}