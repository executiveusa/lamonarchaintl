
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-monarca-cream">
      <Navigation />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-down">
            <h1 className="text-9xl font-display font-bold text-monarca-terracotta mb-6">404</h1>
            <h2 className="text-3xl md:text-4xl font-display mb-8">Page Not Found</h2>
            <p className="text-lg text-monarca-gray/90 mb-10 max-w-xl mx-auto">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-monarca-terracotta hover:bg-monarca-orange text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
