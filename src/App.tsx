import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Translator from '@/pages/Translator';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { Toaster } from 'sonner';
import MusicBlogs from '@/pages/MusicBlogs';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/music-blogs" element={<MusicBlogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
