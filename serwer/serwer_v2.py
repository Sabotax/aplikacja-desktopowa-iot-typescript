from flask import Flask, request, jsonify,make_response
from sense_emu import SenseHat
import json
from random import randint
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
sense = SenseHat()

@app.route('/getPixels', methods=['POST'])
def getPixels():
    resp = make_response(json.dumps(sense.get_pixels()))
    return resp

@app.route('/getBasicData', methods=['POST'])
def getBasicData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    resp = make_response( json.dumps({'temperatura': t, 'pressure': p, 'humidity': h}))

    return resp


@app.route('/setSinglePixel', methods=['POST'])
def setSingleLedPanel():
    content = request.get_json(silent=True)
    print("single, dostałem")
    print(content)
    sense.set_pixel(content["x"], content["y"], 
                    int(content["R"]),
                    int(content["G"]),
                    int(content["B"]))
    resp = make_response()

    return resp


@app.route('/setAllPixels', methods=['POST'])
def setAllPixels():
    content = request.get_json(silent=True)
    print("all, dostałem")
    print(content)
    sense.set_pixels(content)
    
    resp = make_response()

    return resp

@app.route('/getAdvancedData', methods=['POST','GET'])
def getAdvancedData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    
    orient = sense.get_orientation_degrees()
    #sense.stick.wait_for_event()
    joy = sense.stick.get_events()
    
    resp = make_response(json.dumps({'temperatura': t, 'pressure': p, 'humidity': h, 'orient': orient, 'joystick': joy}))

    return resp

    
if __name__ == "__main__":
    app.run(port=8080,host="0.0.0.0")
