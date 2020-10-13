-- Setup configuration and pins
tempPin = 3
waterPin = 1
gpio.mode(waterPin, gpio.INPUT)

ow.setup(tempPin)
addr = ow.reset_search(tempPin)
addr = ow.search(tempPin)

print("Setting up WIFI...")

-- Set your WiFi configuration here
wifi.setmode(wifi.STATION)
wifi.sta.config({
    ssid = "TOTALSLD",
    pwd = "conectotal",
    auto = true
})

-- Create a non blocking loop/timer for checking connectivity
timer = tmr.create()
timer:alarm(1000, tmr.ALARM_AUTO, function()
    if wifi.sta.getip() == nil then
        print("Waiting for IP ...")
    else
        print("IP is " .. wifi.sta.getip())
        timer:stop(1)
    end
end)

-- Load http libray, serving static files
dofile("httpServer.lua")

-- Set listen port for the http protocol
httpServer:listen(80)

-- Create our custom endpoints API

-- Get json
httpServer:use("/data", function(req, res)
    local jsonResponse = "{\"waterTemperature\": \"$TEMP\",\"isWaterFull\":\"$WATER\"}"
    res:type("application/json")
    res:send(jsonResponse:gsub("$TEMP", WaterTemperature):gsub("$WATER", IsWaterFull))
end)

-- Load main program execution in a loop
dofile("loop.lua")
