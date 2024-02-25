# Filename - server.py
 
# Import flask and datetime module for showing date and time
from speech_recognizer import *
from flask import Flask, request
import datetime
from flask_cors import CORS, cross_origin
from controllers.gemini_controller import *
from gemini_session import pick_q
from speech_recognizer import *
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
    result = send_message("Ask me one behavioral question. Do not write anything except the question in your response. No headers.").text
    text_dict = {"Question": result}
    count = request.args.get('count')
    speak(result, count)
    return text_dict

@app.route('/analyze', methods=['POST'])
@cross_origin(origin='*')
def analyze_data():
    f = request.files['wavfile']
    count = request.args.get('count')
    save_file(f, False, count)
    return ""

@app.route('/analysis')
@cross_origin(origin='*')
def get_content_analysis():
    count = request.args.get('count')
    filepath = convert_file("./user_audio/voice" + str(count) + ".webm")
    answer = get_audio(filepath)
    analysis = analyze_conversation(answer).text
    text_dict = {"Analysis": analysis}
    return text_dict

# Running app
if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, port=8080)