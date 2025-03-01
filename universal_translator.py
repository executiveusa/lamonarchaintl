
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import random
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# DeepL API Configuration
DEEPL_API_KEY = "5ad15edc-f0f2-4eab-8334-600a984b8915:fx"
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

# Mock translation phrases as fallback
mock_translations = {
    "es": ["Hola mundo", "Buenos días", "¿Cómo estás?", "Gracias por usar nuestro traductor"],
    "fr": ["Bonjour le monde", "Bonjour", "Comment allez-vous?", "Merci d'utiliser notre traducteur"],
    "de": ["Hallo Welt", "Guten Morgen", "Wie geht es Ihnen?", "Danke, dass Sie unseren Übersetzer verwenden"],
    "zh": ["你好，世界", "早上好", "你好吗？", "谢谢使用我们的翻译器"],
    "ar": ["مرحبا بالعالم", "صباح الخير", "كيف حالك؟", "شكرا لاستخدام المترجم لدينا"],
    "hi": ["नमस्ते दुनिया", "सुप्रभात", "आप कैसे हैं?", "हमारे अनुवादक का उपयोग करने के लिए धन्यवाद"],
    "en": ["Hello world", "Good morning", "How are you?", "Thank you for using our translator"],
    "ja": ["こんにちは世界", "おはようございます", "お元気ですか？", "私たちの翻訳者を使用していただきありがとうございます"],
    "ko": ["안녕하세요 세계", "좋은 아침", "어떻게 지내세요?", "저희 번역기를 사용해 주셔서 감사합니다"],
    "pt": ["Olá mundo", "Bom dia", "Como vai você?", "Obrigado por usar nosso tradutor"],
    "ru": ["Привет, мир", "Доброе утро", "Как дела?", "Спасибо за использование нашего переводчика"]
}

# Map our language codes to DeepL language codes
deepl_language_map = {
    "es": "ES",
    "en": "EN",
    "fr": "FR",
    "de": "DE",
    "ja": "JA",
    "zh": "ZH",
    "pt": "PT",
    "ru": "RU",
    "ko": "KO",
    # Note: DeepL doesn't support all our languages, missing: ar, hi
}

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    
    if not data or 'text' not in data or 'target_language' not in data:
        return jsonify({"error": "Missing required parameters"}), 400
    
    text = data['text']
    target_language = data['target_language']
    
    # Check if the target language is supported by DeepL
    if target_language in deepl_language_map:
        try:
            # Call DeepL API
            payload = {
                "text": [text],
                "target_lang": deepl_language_map[target_language],
                "auth_key": DEEPL_API_KEY
            }
            
            # If source language is provided, add it to the request
            if 'source_language' in data and data['source_language'] in deepl_language_map:
                payload['source_lang'] = deepl_language_map[data['source_language']]
            
            response = requests.post(DEEPL_API_URL, data=payload)
            
            if response.status_code == 200:
                result = response.json()
                translated_text = result['translations'][0]['text']
                
                return jsonify({
                    "original_text": text,
                    "translated_text": translated_text,
                    "target_language": target_language,
                    "service": "DeepL API"
                })
            else:
                print(f"DeepL API error: {response.status_code} - {response.text}")
                # Fall back to mock translations
                return use_mock_translation(text, target_language)
                
        except Exception as e:
            print(f"Exception in DeepL API call: {str(e)}")
            # Fall back to mock translations
            return use_mock_translation(text, target_language)
    else:
        # Language not supported by DeepL, use mock translations
        return use_mock_translation(text, target_language)

def use_mock_translation(text, target_language):
    # Simple mock translation
    if target_language in mock_translations:
        # Use the text length to generate a consistent but random-seeming translation
        random.seed(sum(ord(c) for c in text))
        
        # For longer texts, repeat the mock phrases
        translated_words = []
        word_count = len(text.split())
        
        for i in range(word_count):
            phrase_index = i % len(mock_translations[target_language])
            translated_words.append(mock_translations[target_language][phrase_index])
        
        translated_text = " ".join(translated_words)
    else:
        translated_text = f"[Translation to {target_language} not supported]"
    
    return jsonify({
        "original_text": text,
        "translated_text": translated_text,
        "target_language": target_language,
        "service": "Mock Translation (DeepL fallback)"
    })

if __name__ == '__main__':
    # Run the Flask app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
    print(f"Flask API running on port {port}")
