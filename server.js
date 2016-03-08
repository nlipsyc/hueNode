var http = require ("http"),
	hue = require("node-hue-api"),
	HueApi = hue.HueApi,
	lightState = hue.lightState;

// var displayBridges = function(bridge) {
// 	console.log("Hue bridge found: " + JSON.stringify(bridge));
// };

// hue.upnpSearch().then(displayBridges).done();

var displayResult = function(result){
	console.log(JSON.stringify(result, null, 2));
};

var hostname = "172.16.206.183",
	username = "35fb3a396a9f975d2da67b63213ede61",
	api;

	api = new HueApi (hostname, username);

// //Config info
//	api.config().then(displayResult).done();


//Full state
// api.fullState().then(displayResult).done();


// //Turn on light
var lightStates,
	red = [255, 0, 0],
	green = [255, 0, 0],
	yellow = [255, 255, 0],
	white = [255, 255, 255],
	state = lightState.create();
	flash = lightState.create().on().longAlert();

//console.log(flash.rgb(yellow));

api.setLightState(3, state.on(true).bri(128).rgb(white))
	.then(setTimeout(function() {
			api.setLightState(3, flash.rgb(red));
		}, 1000))
	.then(api.setLightState(3,state.on().rgb(white)))
//	.then(api.setLightState(3, state.on(false)))
	.done();

// api.setLightState(3, flash.rgb(red))
// 	.then(api.setLightState(3, turnOff()))
// 	.then(api.setLightState(3, flash.rgb(green)))
// 	.then(displayResult)
// 	.done();