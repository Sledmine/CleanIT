if (addr == nil) then
    print("No device detected.")
else
    print(addr:byte(1, 8))
    local crc = ow.crc8(string.sub(addr, 1, 7))
    if crc == addr:byte(8) then
        if (addr:byte(1) == 0x10) or (addr:byte(1) == 0x28) then
            print("Device is a DS18S20 family device.")
            tmr.create():alarm(1000, tmr.ALARM_AUTO, function()
                ow.reset(tempPin)
                ow.select(tempPin, addr)
                ow.write(tempPin, 0x44, 1) -- convert T command
                tmr.create():alarm(750, tmr.ALARM_SINGLE, function()
                    ow.reset(tempPin)
                    ow.select(tempPin, addr)
                    ow.write(tempPin, 0xBE, 1) -- read scratchpad command
                    local data = ow.read_bytes(tempPin, 9)
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
                        print("Temperature=" .. (sgn < 0 and "-" or "") .. t1 .. "." .. t2 ..
                                  " Centigrade")
                        print("Water " .. tostring(gpio.read(waterPin)))
                        WaterTemperature = tonumber((sgn < 0 and "-" or "") .. t1 .. "." .. t2)
                        IsWaterFull = gpio.read(waterPin)
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
