from models.gemini_initializer import initialize_model

model = initialize_model()

def start_chat():
    chat = model.start_chat(history=[])
    return chat
chat = start_chat()

def send_message(input_data):
    response = chat.send_message(input_data)
    return response

def query_model(input_data):
    response = model.generate_content(input_data)
    return response

def send_history():
    return chat.history

def analyze_conversation(input_data):
    response = chat.send_message(f'Here is my answer to this question:{input_data}. Please evaluate my answer to your question based on the STAR method and give me feedback. Please be concise.')
    return response

