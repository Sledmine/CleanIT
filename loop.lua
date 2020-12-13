--[[if (IsWaterEmpty == 1 and not AlreadyNotified) then
    http.post("http://l92.168.100.5/message?token=Ad98d0nbI2FA8PA",
              "Content-Type: application/json\r\n", sjson.encode(
                  {
            title = "Clean IT - Bajo nivel de agua",
            message = "El sistema ha detectado un descenso en el nivel de agua de tu acuario"
        }), function(code, data)
        if (code < 0) then
            print("HTTP request failed")
        else
            print(code, data)
        end
    end)
    AlreadyNotified = true
end]]

if (ADDR == nil) then
    print("No device detected.")
else
    print(ADDR:byte(1, 8))
    local crc = ow.crc8(string.sub(ADDR, 1, 7))
    if crc == ADDR:byte(8) then
        if (ADDR:byte(1) == 0x10) or (ADDR:byte(1) == 0x28) then
            print("Device is a DS18S20 family device.")
            tmr.create():alarm(1000, tmr.ALARM_AUTO, function()
                ow.reset(TempPin)
                ow.select(TempPin, ADDR)
                ow.write(TempPin, 0x44, 1) -- convert T command
                tmr.create():alarm(750, tmr.ALARM_SINGLE, function()
                    ow.reset(TempPin)
                    ow.select(TempPin, ADDR)
                    ow.write(TempPin, 0xBE, 1) -- read scratchpad command
                    local data = ow.read_bytes(TempPin, 9)
                    print(data:byte(1, 9))
                    local crc = ow.crc8(string.sub(data, 1, 8))
                    CRC = crc
                    print("CRC=" .. crc)
                    if crc == data:byte(9) then
                        local t = (data:byte(1) + data:byte(2) * 256) * 625
                        local sgn = t < 0 and -1 or 1
                        local tA = sgn * t
                        local t1 = math.floor(tA / 10000)
                        local t2 = tA % 10000
                        print("WaterTemperature=" .. (sgn < 0 and "-" or "") .. t1 .. "." .. t2 ..
                                  " Centigrade")
                        print("IsWaterEmpty " .. tostring(gpio.read(waterPin)))
                        WaterTemperature = tonumber((sgn < 0 and "-" or "") .. t1 .. "." .. t2)
                        IsWaterEmpty = gpio.read(waterPin)
                    end
                end)
            end)
        else
            print("Device family is not recognized.")
        end
    else
        print("CRC is not valid!")
    end
end
