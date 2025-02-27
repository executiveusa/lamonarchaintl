
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useLanguageStore } from '@/services/articleService';

const ResponsiveSearchBar = () => {
  const { language } = useLanguageStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    
    // Simulate search process
    if (searchTerm.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        // In a real application, this would trigger actual search functionality
      }, 1000);
    }
  };
  
  return (
    <form 
      onSubmit={handleSearch}
      className="mx-auto my-16 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-lg focus-within:border-gray-300 transition-all duration-300 hover:shadow-xl"
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={language === 'en' ? "Enter your search term..." : "Ingrese su término de búsqueda..."}
        className="px-6 py-3 w-full rounded-md flex-1 outline-none bg-white"
      />
      <button 
        type="submit" 
        className="w-full md:w-auto px-6 py-3 bg-monarca-terracotta hover:bg-monarca-orange text-white fill-white active:scale-95 duration-100 border border-monarca-terracotta will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70 flex items-center justify-center"
        disabled={isSearching}
      >
        <div className="relative">
          <div className={`flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${isSearching ? 'opacity-100' : 'opacity-0'}`}>
            <svg
              className="animate-spin w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <div className={`flex items-center transition-all ${isSearching ? 'opacity-0' : 'opacity-100'} gap-2`}>
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
              {language === 'en' ? "Search" : "Buscar"}
            </span>
            <Search className="h-4 w-4" />
          </div>
        </div>
      </button>
    </form>
  );
};

export default ResponsiveSearchBar;
