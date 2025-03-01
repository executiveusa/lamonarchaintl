
import React from "react";
import TranslatorComponent from "@/components/TranslatorComponent";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Translator = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-medium text-center mb-10">
            Universal Translator
          </h1>
          <p className="text-center text-monarca-gray/90 max-w-xl mx-auto mb-12">
            Translate text between multiple languages instantly. Perfect for international communication and content creation.
          </p>
          <TranslatorComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Translator;
