
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { checkIsAdmin } from '../services/adminService';
import AdminArticleForm from '../components/AdminArticleForm';
import Navigation from '../components/Navigation';
import { Skeleton } from '../components/ui/skeleton';

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("articles");

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const adminStatus = await checkIsAdmin();
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
        navigate('/');
      }
    };
    
    verifyAdmin();
  }, [navigate]);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <Skeleton className="h-12 w-48 mb-6" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AdminArticleForm />
              </div>
              <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Tips for Writing</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Keep titles concise and descriptive</li>
                  <li>Include a summary to improve SEO</li>
                  <li>Add relevant images to increase engagement</li>
                  <li>Be consistent with categories</li>
                  <li>Remember that multilingual articles will be machine translated</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="users">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p>User management features will be implemented in future updates.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
              <p>Admin settings will be implemented in future updates.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
