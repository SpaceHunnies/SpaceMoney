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

const linearAlgebra = require('linear-algebra')();
const Vector = linearAlgebra.Vector;
const Matrix = linearAlgebra.Matrix;
Matrix.sqrDistance = function (fromVector, toVector) {
	let displacement = fromVector.minus(toVector);
	let sqrDist = displacement.map(function(v) {
		return v * v;
	});
	return sqrDist.getSum();
};

Matrix.distance = function(fromVector, toVector) {
	return Math.sqrt(Matrix.sqrDistance(fromVector, toVector));
};

class Transform {
	constructor(position) {
		position ? this.position = position : this.position = new Matrix([0, 0, 0]);
	}

	translate(translation) {
		this.position = this.position.plus(translation);
		return this.position.toArray();
	}

	translate(x, y, z) {
		this.position = this.position.plus(new Matrix([x, y, z]));
		return this.position.toArray();
	}

	moveTo(x, y, z) {
		this.position = new Matrix([x, y, z]);
	}
}

class GameObject {
	constructor(properties) {
		this.name = properties.name;
		this.transform = new Transform(properties.position);
	}
}

class Ship extends GameObject {
	constructor(properties) {
		super(properties);
		this.speed = properties.speed;
		this.crewMax = properties.crewMax;
		this.food = properties.food;
		this.foodMax = properties.foodMax;
		this.oxy = properties.oxy;
		this.oxyMax = properties.oxyMax;
		this.water = properties.water;
		this.waterMax = properties.waterMax;
		this.captain = null;
		this.comms = null;
		this.quartermaster = null;
		this.nav = null;
		console.log("created a ship with name " + properties.name);
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

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}

	move (val) {
		this.transform.translate(val.direction[0] * val.speed, val.direction[1] * val.speed, val.direction[2] * val.speed);
	}

}

class Shipyard {
	constructor(properties) {
		console.log("created a shipyard")
		this.properties = properties;
		this.shipList = [];
		this.shipTemplate = {
			name: 'prototypeShip',
			speed: 5,
			crewMax: 20,
			food: 0,
			foodMax: 100,
			oxy: 0,
			oxyMax: 100,
			water: 0,
			waterMax: 100
		};
	}

	buildShip(properties) {
		console.log("spawning a ship with properties:\n " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}
}

class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate);
		console.log(this.ship);

		let newPos = this.ship.translate(1, 1, 1);
	}

	update (deltaTime) {
		this.ship.move({direction: [1, 0, 1], speed: 1 * deltaTime});
	}

	timer () {
		var d = new Date();
		document.getElementById("demo").innerHTML = d.toLocaleTimeString();
	}
};

let framerate = 1000 / 4;

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
    document.getElementById('ship-name').innerHTML = gm.ship.name;
	document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;
});

document.addEventListener("keypress", function () {
	console.log("keypress!");
	gm.update();
});

function mainLoop() {
	update();
	draw();
}

function update () {
	gm.update(framerate / 1000);
}

function draw () {
	document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;
}

setInterval(mainLoop, framerate);
}());
//# sourceMappingURL=app.js.map