import os

import google.generativeai as genai

# Initialize the model as None initially
_initialized_model = None

def initialize_model():
    # Using `GOOGLE_API_KEY` environment variable.
    global _initialized_model
    if _initialized_model is None:
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=GOOGLE_API_KEY)

    # Checking for all available models with generateContent feature
        for model in genai.list_models():
            if "generateContent" in model.supported_generation_methods:
                print(model.name)

    # Initiate the Model
        _initialized_model = genai.GenerativeModel(model_name="gemini-pro")
    return _initialized_model
