
import { supabase } from "../integrations/supabase/client";
import { toast } from 'sonner';

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    
    toast.success('Registration successful! Please check your email for verification.');
    return data;
  } catch (error: any) {
    console.error('Error signing up:', error);
    toast.error(error.message || 'Failed to sign up');
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    toast.success('Login successful!');
    return data;
  } catch (error: any) {
    console.error('Error signing in:', error);
    toast.error(error.message || 'Failed to sign in');
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success('Logged out successfully');
  } catch (error: any) {
    console.error('Error signing out:', error);
    toast.error(error.message || 'Failed to sign out');
    throw error;
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    toast.success('Password reset email sent. Please check your inbox.');
  } catch (error: any) {
    console.error('Error sending reset password email:', error);
    toast.error(error.message || 'Failed to send reset password email');
    throw error;
  }
};
