# Filename - server.py
 
# Import flask and datetime module for showing date and time
import os
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

# def delete_files_in_directory(directory):
#     # Iterate over all files in the directory
#     for file_name in os.listdir(directory):
#         # Construct the full file path
#         file_path = os.path.join(directory, file_name)
#         # Check if it's a file (not a directory)
#         if os.path.isfile(file_path):
#             # Delete the file
#             os.remove(file_path)

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
    f = open("count.txt", "w+")
    f.write(count)
    f.close()
    return ""

@app.route('/analysis')
@cross_origin(origin='*')
def get_content_analysis():
    f = open("count.txt", "r")
    count = f.read()
    f.close()
    print("BREFORE")
    filepath = convert_file("voice" + str(count))
    print("AFTER")
    answer = get_audio(filepath)
    print("HELLPPPP")
    analysis, speed, tone = analyze_conversation(answer).text
    text_dict = {"Analysis": analysis, "Speed": speed, "Tone": tone}
    return text_dict

# @app.route('/delete')
# @cross_origin(origin='*')
# def delete_files():
#     delete_files_in_directory('./ai_audio')
#     delete_files_in_directory('./user_audio')
#     return text_dict

# Running app
if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, port=8080)