
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageSelectorProps {
  languages: string[];
  onChange?: (languages: string[]) => void;
}

const availableLanguages = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Spanish' },
  { code: 'FR', name: 'French' },
  { code: 'DE', name: 'German' },
  { code: 'IT', name: 'Italian' },
  { code: 'PT', name: 'Portuguese' },
  { code: 'RU', name: 'Russian' },
  { code: 'ZH', name: 'Chinese' },
  { code: 'JA', name: 'Japanese' },
  { code: 'KO', name: 'Korean' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onChange }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(languages);

  const handleAddLanguage = (lang: string) => {
    if (!selectedLanguages.includes(lang)) {
      const newLanguages = [...selectedLanguages, lang];
      setSelectedLanguages(newLanguages);
      onChange?.(newLanguages);
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    const newLanguages = selectedLanguages.filter(l => l !== lang);
    setSelectedLanguages(newLanguages);
    onChange?.(newLanguages);
  };

  const availableToAdd = availableLanguages.filter(
    lang => !selectedLanguages.includes(lang.code)
  );

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium mb-2">
          This article will be automatically translated to:
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedLanguages.map((lang) => {
            const language = availableLanguages.find(l => l.code === lang);
            return (
              <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                {language?.name || lang}
                <button 
                  type="button" 
                  onClick={() => handleRemoveLanguage(lang)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  aria-label={`Remove ${language?.name || lang}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>
      
      {availableToAdd.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Add more languages:</p>
          <div className="flex flex-wrap gap-2">
            {availableToAdd.map((lang) => (
              <Button 
                key={lang.code}
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => handleAddLanguage(lang.code)}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
