# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from flask_cors import CORS, cross_origin
from controllers.gemini_controller import query_model

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
    # Returning an api for showing in  reactjs

    result = query_model("Can you make a behavioral interview question?").text
    text_dict = {"Question": result}
    return text_dict

# Running app
if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, port=8080)