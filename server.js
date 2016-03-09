var http = require ("http"),
	hue = require("node-hue-api"),
	express = require("express"),
	HueApi = hue.HueApi,
	lightState = hue.lightState;


// var displayBridges = function(bridge) {
// 	console.log("Hue bridge found: " + JSON.stringify(bridge));
// };

// hue.upnpSearch().then(displayBridges).done();
var displayResult = function(result){
	console.log(JSON.stringify(result, null, 2));
};

var hostname = "192.168.0.100",
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
	green = [0, 255, 0],
	yellow = [255, 255, 0],
	white = [255, 255, 255],
	state = lightState.create();
	flash = lightState.create().on().longAlert();
	

function offWhite(){
	api.setLightState(3, state.on(false).bri(128).rgb(white))
	.done();
}


function onWhite(){
	api.setLightState(3, state.on(true).bri(128).rgb(white))
	.done();
}

function onGreen(){
	api.setLightState(3, state.on(true).shortAlert().bri(128).rgb(green))
	.done();
}

function onRed(){
	api.setLightState(3, state.on(true).shortAlert().bri(128).rgb(red))
	.done();
}

function onYellow(){
	api.setLightState(3, state.on(true).shortAlert().bri(128).rgb(yellow))
	.done();
}

// api.setLightState(3, flash.rgb(red))
// 	.then(api.setLightState(3, turnOff()))
// 	.then(api.setLightState(3, flash.rgb(green)))
// 	.then(displayResult)
// 	.done();
// offWhite();
var exp = express();

exp.get('/on', function (req, res){
		res.send('Let there be light');
		onWhite();
});

exp.get('/off', function (req, res){
		res.send('Are you afraid of the dark?');
		offWhite();
});

exp.get('/new', function (req, res){
	res.send('Freeloaders...');
	onYellow();
});

exp.get('/upgrade', function (req, res){
	res.send('$$ Kah - Ching $$');
	onGreen();
});

exp.get('/cancel', function (req, res){
	res.send('Goodbye for now :(');
	onRed();
});

exp.listen(3000, function(){
	console.log('Example app listening on port 3000!');
});



	console.log('end');
