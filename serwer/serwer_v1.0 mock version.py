from flask import Flask, request, jsonify,make_response
#from sense_hat import SenseHat
import json
from random import randint
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
#sense = SenseHat()

@app.route('/getPixels', methods=['POST'])
def getPixels():
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44, "orient": {"roll":60.0,"pitch":123.0,"yaw":78.0}}[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]')

    return resp

@app.route('/getBasicData', methods=['POST'])
def getBasicData():
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44}')

    return resp


#oczekuje body w postaci {
#{
#"x": 0,
#"y": 0,
#"color": FFFFFF
#}
@app.route('/setSinglePixel', methods=['POST'])
def setSingleLedPanel():
    content = request.get_json(silent=True)
    print("single, dostałem")
    print(content)
    resp = make_response()

    return resp

#oczekuje body w postaci {
#{
#"color": FFFFFF
#}
@app.route('/setAllPixels', methods=['POST'])
def setAllPixels():
    content = request.get_json(silent=True)
    print("all, dostałem")
    print(content)
    resp = make_response()

    
    return resp

@app.route('/getAdvancedData', methods=['POST','GET'])
def getAdvancedData():
    
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44, "orient": {"roll":60.0,"pitch":123.0,"yaw":78.0}}')

    return resp

    
if __name__ == "__main__":
    app.run(port=8080,host="0.0.0.0")