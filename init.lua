print("Konfiguracja WiFi...")
ipcfg = {}
ipcfg.ip="192.168.1.1"
ipcfg.netmask="255.255.255.0"
ipcfg.gateway="192.168.1.1"
wifi.ap.setip(ipcfg)
 
cfg={}
cfg.ssid="Urzadzenie pomiarowe 1"
cfg.pwd="12345678"
wifi.ap.config(cfg)
 
wifi.setmode(wifi.SOFTAP)

tempData = {}
humiData = {}
airQuality = {}

function readDHT()
    pin = 5
    status, temp, humi, temp_dec, humi_dec = dht.read(pin)
    if status == dht.OK then
        -- Integer firmware using this example
        print(string.format("DHT Temperature:%d.%03d;Humidity:%d.%03d\r\n",
              math.floor(temp),
              temp_dec,
              math.floor(humi),
              humi_dec
        ))
        table.insert(tempData, temp)
        table.insert(humiData, humi)
        
        -- Float firmware using this example
        print("DHT Temperature:"..temp..";".."Humidity:"..humi)
    
    elseif status == dht.ERROR_CHECKSUM then
        print( "Moduł temperatury: Checksum error." )
--        tempData = "Moduł temperatury: Checksum error."
--        humiData = "Moduł temperatury: Checksum error."
    elseif status == dht.ERROR_TIMEOUT then
        print( "Nie uzyskano połączenia z modułem temperatury." )
--        tempData = tempData .. "<p>Nie uzyskano połączenia z modułem temperatury.</p>"
--        humiData = humiData .. "<p>Nie uzyskano połączenia z modułem temperatury.</p>"
    end
    if table.getn(tempData) > 10 then
        table.remove(tempData, 1)
        print("Ucinam temp")
    end
    if table.getn(humiData) > 10 then
        table.remove(humiData, 1)
        print("Ucinam wilg")
    end
    analogRead = adc.read(0)
--    ppm = (30000*(1023.0 - analogRead) / analogRead)
--    print(analogRead)
--    print(ppm)
----
----    analogRead = 1023
--    Vrl = analogRead * ( 5 / 1024.0  )
--    Rs = 30000 * ( 5 - Vrl) / Vrl
--    ratio =  Rs/108251 
--    ppm1 = (37143 * ratio)^-3.178
----
--    print(ppm1)
--    
--    ppm = 37.58805473*(ppm/108251)^-3.235365807
    ppm = analogRead * (5000.0 / 1024.0)
    ppm = ppm * 0.2

    table.insert(airQuality, math.floor(ppm))

    if table.getn(airQuality) > 10 then
        table.remove(airQuality, 1)
        print("Ucinam powietrze")
    end
-- 0 - 100
    
    print(ppm)
    tmr.start(1)
end

tmr.alarm(0, 5000, tmr.ALARM_AUTO, readDHT)

if srv~=nil then
  srv:close()
end

print("Tworzę serwer")

srv=net.createServer(net.TCP) 
srv:listen(80,function(conn) 
    conn:on("receive",function(conn,payload) 
    print(payload) 
    if payload~=nil then
        html = "HTTP/1.1 200 OK\r\n\r\n<!doctype html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=windows-1250\" /><title>Pomiar</title></head><body><h1>Oprogramowanie pomiarowe. &copy Patryk Szczygło.</h1>"
        html = html .. "<h3>Temperatura: </h3>"
        for t=#tempData,1,-1 do
            html = html .. "<p>Temp: "..tempData[t].."</p>" 
        end
        html = html .. "<h3>Wilgotność: </h3>"
        for h=#humiData,1,-1 do
            html = html .. "<p>Wilg: "..humiData[h].."</p>" 
        end
        html = html .. "<h3>Zanieczyszczenie:</h3><p>~100-150 normalne</p><p>~700 alkohol</p><p>+750 lekkie gazy</p>"
        for q=#airQuality,1,-1 do
            html = html .. "<p>Zani: "..airQuality[q].."</p>" 
        end
        html = html .. "</body></html>"
        conn:send(html, function()
            conn:close()
        end)
    end
    end) 
end)
