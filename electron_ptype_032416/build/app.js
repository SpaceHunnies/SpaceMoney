(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

var greet = function () {
    return 'Hello World!';
};

var app$1;
if (process.type === 'renderer') {
    app$1 = require('electron').remote.app;
} else {
    app$1 = require('electron').app;
}
var appDir$1 = jetpack.cwd(app$1.getAppPath());

var manifest = appDir$1.read('package.json', 'json');

var env = manifest.env;

class Ship {
	constructor(properties) {
		this.properties = properties;
		this.name = properties.name;
		console.log("created a ship with name " + this.properties.name);
	}

	addFood (amount) {
		if (food + amount <= foodMax) {
			food = food + amount;
			return 0;
		} else {
			let overflow = foodMax - food;
			food = foodMax;
			return overflow;
		}
	}
}

class Shipyard {
	constructor(properties) {
		console.log("created a shipyard")
		this.properties = properties;
		this.shipList = [];
	}

	buildShip(properties) {
		console.log("spawning a ship named " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}

	print() {
		for (var i = this.shipList.length - 1; i >= 0; i--) {
			console.log(this.shipList[i]);
		}
	}
}

class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip({name: "prototypeShip"});
	}

	update (deltaTime) {
		timer();
	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
}




// let mainLoop = setInterval(update, 1000 / 60);

// let protoShip = shipManager.spawnShip({
// 		name: 'prototypeShip',
// 		speed: 5,
// 		crewMax: 20,
// 		food: 0,
// 		foodMax: 100,
// 		oxy: 0,
// 		oxyMax: 100,
// 		water: 0,
// 		waterMax: 100,
// 		captain: null,
// 		comms: null,
// 		nav: null,
// 		quartermaster: null
// });

let gm = new GameManager();

console.log('Loaded environment variables:', env);

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('greet').innerHTML = greet();
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = env.name;
    document.getElementById('ship').innerHTML = gm.ship.name;
});
}());
//# sourceMappingURL=app.js.map