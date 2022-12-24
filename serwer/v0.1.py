# -*- coding: utf-8 -*-
"""
Created on Fri Dec 23 15:14:08 2022

@author: Daniel
"""

from flask import Flask, request, jsonify
from sense_hat import SenseHat
import json
from random import randint

app=Flask(__name__)
sense = SenseHat()

@app.route('/setSinglePixel', methods=['POST'])
def setSingleLedPanel():
    content = request.get_json(silent=True)
    print(content) # Do your processing
    sense.set_pixel(content["x"], content["y"], 
                   int(content["color"][0:2],16),
                   int(content["color"][2:4],16),
                   int(content["color"][4:6],16))

@app.route('/getSensors', methods=['GET'])
def root():
    h = sense.get_humidity()
    p = sense.get_orientation()["pitch"]
    t = sense.get_temperature()
    #reszte sensorow dopisac
    #uzyc biblitoeki pythongowej do jsona
    return "{" + f"\"humidity\":\"{h}\",\"pitch\":\"{p}\",\"temp\":\"{t}\",\"pressure\":\"{sense.get_pressure()}\"" + "}"

@app.route('/setAllPixels', methods=['POST'])
def setAllLedPanel():
    #ustawia wszystkie pixele na RGB otrzymane w ciele

if __name__=="__main__":
    app.run(port=8080,host="0.0.0.0")