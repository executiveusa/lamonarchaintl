
import React from 'react';

interface LanguageSelectorProps {
  languages: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages }) => {
  return (
    <div className="p-3 bg-blue-50 rounded-md">
      <p className="text-sm font-medium mb-2">
        This article will be automatically translated to:
      </p>
      <div className="text-sm">
        {languages.map((lang) => (
          <span 
            key={lang} 
            className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2 mb-2"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
