
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
import { useLanguageStore } from '@/services/articleService';

const AuthButton: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { language } = useLanguageStore();

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
    return <Button variant="ghost" disabled>{language === 'en' ? 'Loading...' : 'Cargando...'}</Button>;
  }

  if (!session) {
    return (
      <Button asChild variant="outline">
        <Link to="/auth">{language === 'en' ? 'Sign In' : 'Iniciar Sesión'}</Link>
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
        <DropdownMenuLabel>{language === 'en' ? 'My Account' : 'Mi Cuenta'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>{email}</DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin">{language === 'en' ? 'Admin Panel' : 'Panel de Administración'}</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
