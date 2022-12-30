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