import { isObject } from "chart.js/dist/helpers/helpers.core"

export class TableRow {
    time: string
    humidity: Number
    
    constructor(
        time: string,
        humidity: Number
    ) {
        this.time = time
        this.humidity = humidity
    }
}
export class Result<T> {
    result: String = "Err"
    data!: T
    constructor(input: Object | undefined | unknown) {
        console.log("input123",typeof(input) == "object")
        if(typeof(input) == "object") {
            this.result = "OK"
            this.data = input as T
        }
    }
}

export class getBasicDataResponse{
    temperatura: Number
    pressure: Number
    humidity: Number
    constructor(
        temperatura: Number,
        pressure: Number,
        humidity: Number
    ) {
        this.temperatura = temperatura
        this.pressure = pressure
        this.humidity = humidity
    }
}

export class getAdvancedDataResponse{
    temperatura: Number
    pressure: Number
    humidity: Number
    orient: Orient
    joystick: Array<any>

    constructor(
        temperatura: Number,
        pressure: Number,
        humidity: Number,
        orient: Orient,
        joystick: Array<any>
    ) {
        this.temperatura = temperatura
        this.pressure = pressure
        this.humidity = humidity
        this.orient = orient
        this.joystick = joystick
    }
}

class Orient{
    roll: Number
    pitch: Number
    yaw: Number

    constructor(
        roll: Number,
        pitch: Number,
        yaw: Number
    ) {
        this.roll = roll
        this.pitch = pitch
        this.yaw = yaw
    }
}

export class getPixelsResponse {
    pixels: Array<Array<Number>>

    constructor(
        pixels: Array<Array<Number>>
    ) {
        this.pixels = pixels
    }
}