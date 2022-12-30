from flask import Flask, request, jsonify
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
    return json.dumps({'temperatura': t, 'pressure': p, 'humidity': h})


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
def setSingleLedPanel():
    content = request.get_json(silent=True)
    sense.set_pixels(
                   int(content["color"][0:2],16),
                   int(content["color"][2:4],16),
                   int(content["color"][4:6],16))

@app.route('/getAdvancedData', methods=['POST'])
def getAdvancedData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    
    orient = sense.get_orientation_degrees()
    sense.stick.wait_for_event()
    joy = sense.stick.get_events()
    return json.dumps({'temperatura': t, 'pressure': p, 'humidity': h, 'orient': orient, 'joystick': joy})

    
if __name__ == "__main__":
    app.run(port=8080,host="0.0.0.0")