# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask
from flask import request
import datetime
from flask_cors import CORS, cross_origin
from controllers.gemini_controller import send_message
from gemini_session import pick_q

x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route('/data')
@cross_origin(origin='*')
def get_time():
    # Returning an api for showing in  reactjs
    return {"Name":"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
 
@app.route('/questions')
@cross_origin(origin='*')
def get_questions():
    result = send_message("Can you make one behavioral interview question?").text
    text_dict = {"Question": result}
    return text_dict

@app.route('/analyze', methods=['POST'])
@cross_origin(origin='*')
def analyze_data():
    if request.method == 'POST':
        f = request.files['wavfile']
        f.save('audio.wav')
        return "test"

@app.route('/session')
@cross_origin(origin='*')
def get_next_questions():
    result = send_message("Can you make one behavioral interview question?").text
    text_dict = {"Question": result}
    return text_dict

# Running app
if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, port=8080)