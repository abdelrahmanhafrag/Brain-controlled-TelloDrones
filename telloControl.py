#install flask and djitellopy in your Python environment
#the only libraries to control tello drones are written in Python, the purpose of this file 
#is to create a bridge between TelloPy and JavaScript to control the drone,
#I used a REST API through Flask in Python that wraps the TelloPy library.

from flask import Flask, jsonify, request
from djitellopy import Tello

app = Flask(__name__)
drone = Tello()
drone.connect()

@app.route("/command", methods=["POST"])
def send_command():
    command = request.json["command"]
    drone.send_command_without_return(command)
    return jsonify({"message": "Command sent"})

if __name__ == "__main__":
    app.run(debug=True)
    app.run(host='localhost', port=5000) 
    #Once the server is running, 
    #I should be able to access the application at http://localhost:5000