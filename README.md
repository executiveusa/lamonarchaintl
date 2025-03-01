
# Universal Translator App

This application provides real-time translation services through a React frontend and Flask backend API.

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
pip install flask flask-cors
```

2. Run the Flask API:
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
  "target_language": "es"
}
```

**Response:**
```json
{
  "original_text": "Hello world",
  "translated_text": "Hola mundo",
  "target_language": "es"
}
```

## Note
This implementation uses mock translations for demonstration purposes. To integrate with a real translation service, you would need to update the Flask backend to use a service like Google Translate API, DeepL, or another translation provider.
