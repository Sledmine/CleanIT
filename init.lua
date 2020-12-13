----------------------------------------------------------------
-- Sledmine
-- Initializer
-- Main entry of the Clean IT program
----------------------------------------------------------------
-- Setup configuration and pins
waterPin = 1
gpio.mode(waterPin, gpio.INPUT)

TempPin = 4
AlreadyNotified = false
ow.setup(TempPin)
ADDR = ow.reset_search(TempPin)
ADDR = ow.search(TempPin)

CRC = nil
WaterTemperature = nil
IsWaterEmpty = nil
NetworkIP = nil

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
    if not (wifi.sta.getip()) then
        print("Waiting for IP ...")
    else
        NetworkIP = wifi.sta.getip()
        print("IP is " .. NetworkIP)
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
    local jsonResponse = {
        crc = CRC,
        waterTemperature = WaterTemperature,
        isWaterEmpty = IsWaterEmpty,
        waterPh = 6
    }
    res:type("application/json")
    res:send(sjson.encode(jsonResponse))
end)

httpServer:use('/interface.js', function(req, res)
	res:sendFile("interface.js")
end)

httpServer:use("/status", function(req, res)
    res:type("application/json")
    res:send(sjson.encode({
        connected = (NetworkIP ~= nil)
    }))
end)

-- Load main program execution in a loop
dofile("loop.lua")
