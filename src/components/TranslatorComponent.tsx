
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "es", name: "Spanish" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
];

const TranslatorComponent = () => {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to translate.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // For now, since we don't have a backend, we'll mock the translation
      // In a real implementation, you would connect to your Flask API
      
      /*
      // This is how you would connect to the Flask API:
      const response = await axios.post("http://localhost:5000/translate", {
        text: text,
        target_language: targetLanguage,
      });
      setTranslatedText(response.data.translated_text);
      */
      
      // Mock translation (replace this with the actual API call)
      setTimeout(() => {
        const mockTranslations = {
          es: "Texto traducido al español",
          fr: "Texte traduit en français",
          de: "Text ins Deutsche übersetzt",
          zh: "翻译成中文的文本",
          ar: "النص المترجم إلى العربية",
          hi: "हिंदी में अनुवादित पाठ",
          en: "Text translated to English",
          ja: "日本語に翻訳されたテキスト",
          ko: "한국어로 번역된 텍스트",
          pt: "Texto traduzido para o português",
          ru: "Текст, переведенный на русский",
        };
        
        setTranslatedText(mockTranslations[targetLanguage as keyof typeof mockTranslations] || 
                          `Text translated to ${languages.find(l => l.code === targetLanguage)?.name}`);
        setLoading(false);
        
        toast({
          title: "Translation Complete",
          description: "Your text has been translated successfully.",
        });
      }, 1000);
    } catch (error) {
      console.error("Translation error:", error);
      setLoading(false);
      toast({
        title: "Translation Failed",
        description: "There was an error translating your text. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-display font-medium mb-6 text-center">Universal Translator</h2>
      
      <div className="mb-4">
        <label htmlFor="text-input" className="block text-sm font-medium mb-2">
          Enter text to translate:
        </label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[120px]"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="language-select" className="block text-sm font-medium mb-2">
          Select target language:
        </label>
        <select 
          id="language-select"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={handleTranslate}
        disabled={loading}
        className="w-full bg-monarca-terracotta hover:bg-monarca-orange"
      >
        {loading ? "Translating..." : "Translate"}
      </Button>

      {translatedText && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">Translated Text:</h3>
          <p className="whitespace-pre-wrap">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatorComponent;
