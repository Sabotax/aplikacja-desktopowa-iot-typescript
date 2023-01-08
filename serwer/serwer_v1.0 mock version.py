from flask import Flask, request, jsonify,make_response
#from sense_hat import SenseHat
import json
from random import randint

app=Flask(__name__)
#sense = SenseHat()

@app.route('/getPixels', methods=['POST'])
def getPixels():
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44, "orient": {"roll":60.0,"pitch":123.0,"yaw":78.0}}[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, allow-control-access-origin";
    resp.headers["Content-Type"] = "application/json; charset=utf-8";
    
    return resp

@app.route('/getBasicData', methods=['POST'])
def getBasicData():
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, allow-control-access-origin";
    resp.headers["Content-Type"] = "application/json; charset=utf-8";
    
    return resp


#oczekuje body w postaci {
#{
#"x": 0,
#"y": 0,
#"color": FFFFFF
#}
@app.route('/setSinglePixel', methods=['POST'])
def setSingleLedPanel():
    resp = make_response()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, allow-control-access-origin";
    resp.headers["Content-Type"] = "application/json; charset=utf-8";

    return resp

#oczekuje body w postaci {
#{
#"color": FFFFFF
#}
@app.route('/setAllPixels', methods=['POST'])
def setAllPixels():
    resp = make_response()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, allow-control-access-origin";
    resp.headers["Content-Type"] = "application/json; charset=utf-8";
    
    return resp

@app.route('/getAdvancedData', methods=['POST','GET'])
def getAdvancedData():
    
    resp = make_response('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44, "orient": {"roll":60.0,"pitch":123.0,"yaw":78.0}}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    
    return resp

    
if __name__ == "__main__":
    app.run(port=80,host="0.0.0.0")