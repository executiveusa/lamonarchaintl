import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { checkIsAdmin } from '../services/adminService';
import AdminArticleForm from '../components/AdminArticleForm';
import AdminPlaceForm from '../components/AdminPlaceForm';
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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-2">La Monarca Editorial Desk</h1>
        <p className="text-gray-600 mb-6">Publish stories and manage the human verification queue for La Guía Monarca.</p>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Stories</TabsTrigger>
            <TabsTrigger value="places">Verified Places</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AdminArticleForm />
              </div>
              <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Editorial checklist</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                  <li>Use real people, places, sources, and images.</li>
                  <li>Keep titles concise and descriptive.</li>
                  <li>Include a useful summary for discovery and SEO.</li>
                  <li>Do not present machine translation as human-reviewed translation.</li>
                  <li>Link a place record only when the real-world entity has been checked.</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="places">
            <AdminPlaceForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
