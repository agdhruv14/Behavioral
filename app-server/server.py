# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
from flask_cors import CORS, cross_origin
 
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
 
     
# Running app
if __name__ == '__main__':
    CORS(app)
    app.run(debug=True, port=8080)