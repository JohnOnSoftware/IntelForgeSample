AutodeskNamespace('Viewing.ClassroomTrainning');

var _viewer;
var _data;
var _options;
var _googleChart;

var _temperatureTimeSeries;
var _humidityTimeSeries;

var _normalTemperature = false;
var _sensorElement = '2210'; // please change to your element in the viewer.

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );
    _viewer = viewer;
    _self = this;
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


Viewing.ClassroomTrainning.Extension.prototype.onSelectionChanged = function(event){
    var infoToIot = {
        "name": "",
        "dbid": ""
    };
    
    if( curSelection = event.selections.length === 0){
        console.log('clear the selection');
        _self.socketio.emit('element select', JSON.stringify(infoToIot) );
    }
    else{
        infoToIot.dbid = event.selections[0].dbIdArray[0];
        infoToIot.name = "model";
        console.log('current element is: ' + infoToIot.dbid);
        _self.socketio.emit('element select', JSON.stringify(infoToIot) );
    }
};

Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{

    //replace with your own website
    const baseurl = 'http://localhost:3000';
    _self.socketio = io.connect(baseurl);

    //replace with your suitable topic names 
    const SOCKET_TOPIC_SENSORS          = 'Intel-Forge-Sensors';
    


    // // Step 3, Uncomment the code to add charts and timeline
    // ///////////////////////////////////////////////////////////////////////
    // /// create google charts for Temperature and Humidity
    // google.charts.load('current', { 'packages': ['gauge'] });
    // google.charts.setOnLoadCallback(drawChart);
    // function drawChart() {
    //     _data = google.visualization.arrayToDataTable([
    //         ['Label', 'Value'],
    //         ['Temperature', 40],
    //         ['Humidity', 100]
    //     ]);
    //     _options = {
    //         width: 400, height: 120,
    //         redFrom: 90, redTo: 100,
    //         yellowFrom: 75, yellowTo: 90,
    //         minorTicks: 5
    //     };
    //     _googleChart = new google.visualization.Gauge(document.getElementById('chartDiv'));
    //     _googleChart.draw(_data, _options);
    // }

    // //////////////////////////////////////////////////////////////////////////////
    // /// create smoothie timeline chart
    // _temperatureTimeSeries   = new TimeSeries();
    // _humidityTimeSeries      = new TimeSeries();
    
    // var temperatureChart = new SmoothieChart();
    // temperatureChart.addTimeSeries(_temperatureTimeSeries, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
    // temperatureChart.streamTo(document.getElementById("chart1"),1000);

    // var humidityChart    = new SmoothieChart();
    // humidityChart.addTimeSeries(_humidityTimeSeries, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
    // humidityChart.streamTo(document.getElementById("chart2"), 1000);
    // // Step 3, Uncomment the code to add charts and timeline




    //////////////////////////////////////////////////////////////////////////////////
    /// get iot data from socket connection

    // // Step 4, Uncomment the code to add event to update the data
    // // subscribe the socket data
    // $("#startwebsocket").click(function (res) {
    //     //Add selection changed event
    //     _viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, _self.onSelectionChanged);
    //     _self.socketio.on(SOCKET_TOPIC_SENSORS, function (msg) {
    //         console.log("Sensor Data from Intel: " + msg);
    //         var msgJson = JSON.parse(msg);
            
    //         // set the temperature data 
    //         _data.setValue(0, 1, msgJson.temperature);
    //         _googleChart.draw(_data, _options);
    //         _temperatureTimeSeries.append(new Date().getTime(), msgJson.temperature);
            
    //         // set the humidity data 
    //         _data.setValue(1, 1, msgJson.humidity);
    //         _googleChart.draw(_data, _options);
    //         _humidityTimeSeries.append(new Date().getTime(), msgJson.humidity);

    //         if( msgJson.dbid === "" )
    //             return;

    //         // mark it red when the temperature of roof is higher than 35 degree.
    //         if( _normalTemperature && msgJson.temperature > 35 )    {
    //             _viewer.setThemingColor(
    //                 _sensorElement,
    //                 new THREE.Vector4(1, 0, 0, 1)
    //             );
    //             _normalTemperature = false;
    //         }
    //         if( !_normalTemperature && msgJson.temperature < 35){
    //             _viewer.setThemingColor(
    //                 _sensorElement,
    //                 new THREE.Vector4(0, 1, 0, 1)
    //             );
    //             _normalTemperature = true;
    //         }
    //     });
    // });
    // // Step 4, Uncomment the code to add event to update the data


    // // Step 5: Uncomment the code to remove the listeners
    // // unsubscribe the socket data 
    // $("#endwebsocket").click(function (res) {
    //     _self.socketio.removeAllListeners(SOCKET_TOPIC_SENSORS);
    //     _viewer.removeEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT);     
    // });
    // // Step 5: Uncomment the code to remove the listeners


    console.log('My Extension is loaded');
    return true;
};

Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    console.log('My Extension is unloaded');
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);


//////////////////////////////////////////////////////////


