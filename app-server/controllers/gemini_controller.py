from models.gemini_initializer import initialize_model

model = initialize_model()
# Query the Model
def query_model(input_data):
    response = model.generate_content(input_data)
    return response