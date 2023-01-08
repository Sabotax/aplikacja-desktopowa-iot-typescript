from flask import Flask, request, jsonify,make_response
from sense_hat import SenseHat
import json
from random import randint

app=Flask(__name__)
sense = SenseHat()

@app.route('/getPixels', methods=['POST'])
def getPixels():
    return json.dumps(sense.get_pixels())

@app.route('/getBasicData', methods=['POST'])
def getBasicData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    resp = make_response( json.dumps({'temperatura': t, 'pressure': p, 'humidity': h}))
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
    content = request.get_json(silent=True)
    sense.set_pixel(content["x"], content["y"], 
                    int(content["color"][0:2],16),
                    int(content["color"][2:4],16),
                    int(content["color"][4:6],16))

#oczekuje body w postaci {
#{
#"color": FFFFFF
#}
@app.route('/setAllPixels', methods=['POST'])
def setAllPixels():
    content = request.get_json(silent=True)
    sense.set_pixels(
                    int(content["color"][0:2],16),
                    int(content["color"][2:4],16),
                    int(content["color"][4:6],16))

@app.route('/getAdvancedData', methods=['POST','GET'])
def getAdvancedData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    
    orient = sense.get_orientation_degrees()
    sense.stick.wait_for_event()
    joy = sense.stick.get_events()
    
    resp = make_response(json.dumps({'temperatura': t, 'pressure': p, 'humidity': h, 'orient': orient, 'joystick': joy}))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, allow-control-access-origin";
    resp.headers["Content-Type"] = "application/json; charset=utf-8";
    
    return resp

    
if __name__ == "__main__":
    app.run(port=80,host="0.0.0.0")