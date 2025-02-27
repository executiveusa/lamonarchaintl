
import React from 'react';
import { useLanguageStore } from '@/services/articleService';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    window.location.reload(); // Simple way to refresh the content
  };

  return (
    <Button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-monarca-terracotta hover:bg-monarca-orange text-white"
      size="sm"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'Español' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;
