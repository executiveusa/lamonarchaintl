
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { signOut, getSession } from '../services/authService';
import { checkIsAdmin } from '../services/adminService';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

const AuthButton: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
        
        if (sessionData) {
          const adminStatus = await checkIsAdmin();
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setSession(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }

  if (!session) {
    return (
      <Button asChild variant="outline">
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }

  const email = session.user?.email || '';
  const initials = email.substring(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>{email}</DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin">Admin Panel</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
