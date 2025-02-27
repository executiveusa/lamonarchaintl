
import { supabase } from "../integrations/supabase/client";

export const checkIsAdmin = async (): Promise<boolean> => {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', session.session.user.id)
      .single();
    
    if (error || !data) {
      return false;
    }
    
    return data.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    return session.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const addAdminRole = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('admin_roles')
      .insert([{ user_id: userId, role: 'admin' }]);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error adding admin role:', error);
    throw error;
  }
};
