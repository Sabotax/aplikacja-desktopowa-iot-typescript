from flask import Flask, request, jsonify, make_response
from sense_hat import SenseHat
import json
from random import randint

app=Flask(__name__)
sense = SenseHat()


@app.route('/getPixels', methods=['POST'])
def getPixels():
    response = make_response(json.dumps(sense.get_pixels()))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route('/getBasicData', methods=['POST'])
def getBasicData():
    h = sense.get_humidity()
    p = sense.get_pressure()
    t = sense.get_temperature()
    response = make_response(json.dumps({'temperatura': t, 'pressure': p, 'humidity': h}))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


#oczekuje body w postaci {
#{
#"x": 0,
#"y": 0,
#"color": FFFFFF
#}
@app.route('/setSinglePixel', methods=['POST'])
def setSingleLedPanel():
    content = request.get_json(silent=True)
    print(content)
    sense.set_pixel(content["x"], content["y"], 
                   int(content["color"][0:2],16),
                   int(content["color"][2:4],16),
                   int(content["color"][4:6],16))

    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

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
    return json.dumps({'temperatura': t, 'pressure': p, 'humidity': h, 'orient': orient, 'joystick': joy})

    
@app.route('/', methods=['POST','GET'])
def root():
    return "test"

    
if __name__ == "__main__":
    app.run(port=8080,host="0.0.0.0")