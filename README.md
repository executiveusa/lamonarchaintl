
# Universal Translator App

This application provides real-time translation services through a React frontend and Flask backend API, using the DeepL translation service.

## Prerequisites

- Node.js and npm for the React frontend
- Python 3.7+ for the Flask backend
- pip (Python package installer)

## Setup Instructions

### Frontend Setup
The frontend is already configured in the React application.

### Backend Setup
1. Install the required Python packages:
```bash
pip install flask flask-cors requests
```

2. DeepL API
The application is configured to use the DeepL translation API. A DeepL API key is already configured in the code:
- API Key: `5ad15edc-f0f2-4eab-8334-600a984b8915:fx`

3. Run the Flask API:
```bash
python universal_translator.py
```
The API will run on http://localhost:5000.

## Using the Application

1. Navigate to the Translator page in the application
2. Enter text to be translated
3. Select the target language
4. Click the "Translate" button

## API Endpoints

### POST /translate
Translates text to a specified language.

**Request Body:**
```json
{
  "text": "Hello world",
  "target_language": "es",
  "source_language": "en" // Optional
}
```

**Response:**
```json
{
  "original_text": "Hello world",
  "translated_text": "Hola mundo",
  "target_language": "es",
  "service": "DeepL API"
}
```

## Fallback Mechanism
If the DeepL API is unavailable or doesn't support a requested language, the application will automatically fall back to using mock translations for demonstration purposes.

## Supported Languages
The following languages are supported through DeepL:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Chinese (zh)
- Portuguese (pt)
- Russian (ru)
- Korean (ko)

Additional languages are supported through mock translations:
- Arabic (ar)
- Hindi (hi)
