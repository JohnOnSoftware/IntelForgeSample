/*

The MIT License (MIT)

Copyright (c) Thu Aug 18 2016 Zhong Wu zhong.wu@autodesk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
///////////////////////////////////////////////////////////
//replace with your suitable topic names 
const  MQTT_TOPIC_CONTROL = 'user98/control/data';
const  MQTT_TOPIC_SENSORS = 'user98/sensors/data';

// const  SOCKET_TOPIC_TEMPERATURE = 'Intel-Forge-Temperature';
const  SOCKET_TOPIC_SENSORS = 'Intel-Forge-Sensors';

var host = 'mqtt://test.mosquitto.org';


//import neccessary libraries 
var favicon = require('serve-favicon');
var express = require('express');
var app = express();  

//routes
var api = require('./routes/token.js'); 
app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/img/favicon.ico'));
app.use('/api', api); 
var server = require('http').Server(app); 

//// Step 1, Uncomment the socketio server creation code.
//// subscribe socket and publish the message to MQTT topic when received
var socketio = require('socket.io')(server);  
socketio.on('connection', function(socket){
    console.log('user connected to the socket');
    var timer;
    socket.on('element select', function(msg){
        console.log('message: ' + msg);

        var timesRun = 0;
        var interval = setInterval(()=>{
            timesRun += 1;
            if(timesRun === 4){
                clearInterval(interval);
            }
            mqttclient.publish(MQTT_TOPIC_CONTROL,msg);
        }, 1000);
    });

      socket.on('disconnect', function(){
        console.log('user disconnected from the socket');
      });
        

}); 
//// Step 1, Uncomment the socketio server creation code.



//// Stpe 2, Uncomment the mqtt subscribe and emit message to socketio
var mqtt = require('mqtt');
var mqttclient  = mqtt.connect(host);
mqttclient.on('connect', function () {
    console.log('mqtt on server side is connected');

    //subscribe mqtt topic
    mqttclient.subscribe(MQTT_TOPIC_SENSORS);
    mqttclient.subscribe(MQTT_TOPIC_CONTROL);

    // handle the message
    mqttclient.on('message', function (topic, message) {
        // MQTT_TOPIC_CONTROL is just used to check if the message is pulished successfully
        if (topic === MQTT_TOPIC_CONTROL) {
            var iotdata = message.toString();
            console.log('Intel data from topic: ' + topic + iotdata);
        }
        if (topic === MQTT_TOPIC_SENSORS) {
            var iotdata = message.toString();
            console.log('Intel data from topic: ' + topic + '\n' + iotdata)

            //broadcast the IoT data to socket
            socketio.emit(SOCKET_TOPIC_SENSORS, iotdata);
            //mqttclient.end()
        }
    })   
})
//// Stpe 2, Uncomment the mqtt subscribe and emit message to socketio


app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});