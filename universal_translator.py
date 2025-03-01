
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mock translation phrases for demonstration
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

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    
    if not data or 'text' not in data or 'target_language' not in data:
        return jsonify({"error": "Missing required parameters"}), 400
    
    text = data['text']
    target_language = data['target_language']
    
    # Here you would typically call a translation API like Google Translate
    # For demo purposes, we're using mock translations
    
    # Simple mock translation
    if target_language in mock_translations:
        # For longer texts, repeat the mock phrases
        translated_words = []
        word_count = len(text.split())
        
        # Use the text length to generate a consistent but random-seeming translation
        random.seed(sum(ord(c) for c in text))
        
        for i in range(word_count):
            phrase_index = i % len(mock_translations[target_language])
            translated_words.append(mock_translations[target_language][phrase_index])
        
        translated_text = " ".join(translated_words)
    else:
        translated_text = f"[Translation to {target_language} not supported]"
    
    return jsonify({
        "original_text": text,
        "translated_text": translated_text,
        "target_language": target_language
    })

if __name__ == '__main__':
    # Run the Flask app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
    print(f"Flask API running on port {port}")
