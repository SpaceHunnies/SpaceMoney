(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));
var _ = _interopDefault(require('lodash'));

var app$1;
if (process.type === 'renderer') {
    app$1 = require('electron').remote.app;
} else {
    app$1 = require('electron').app;
}
var appDir$1 = jetpack.cwd(app$1.getAppPath());

var manifest = appDir$1.read('package.json', 'json');

var env = manifest.env;

const linearAlgebra$1 = require('linear-algebra')();
const Vector$1 = linearAlgebra$1.Vector;
const Matrix$1 = linearAlgebra$1.Matrix;
Matrix$1.sqrDistance = function (fromVector, toVector) {
	let displacement = fromVector.minus(toVector);
	let sqrDist = displacement.map(function(v) {
		return v * v;
	});
	return sqrDist.getSum();
};

Matrix$1.distance = function(fromVector, toVector) {
	return Math.sqrt(Matrix$1.sqrDistance(fromVector, toVector));
};

class Transform {
	constructor(position) {
		position ? this.position = position : this.position = new Matrix$1([0, 0, 0]);
	}

	translate(x, y, z) {
		this.position = this.position.plus(new Matrix$1([x, y, z]));
		return this.position.toArray();
	}

	translateToVector(translation) {
		this.position = this.position.plus(translation);
		return this.position.toArray();
	}

	moveTo(x, y, z) {
		this.position = new Matrix$1([x, y, z]);
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
		this.captain = properties.captain;
		this.comms = properties.waterMax;
		this.quartermaster = properties.quartermaster;
		this.navigator = properties.navigator;
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

class CrewMember extends GameObject {
	constructor(properties) {
		super(properties);
		this.full_name = properties.full_name;
		console.log("created a crew member with full name " + properties.full_name);
	}
}

class Tavern {
	constructor(properties) {
		console.log("created a tavern")
		this.properties = properties;
	}

	generateCrew() {
		let props = {}
    props.full_name = this.generateFullName();
    console.log("spawning a crew member with properties:\n " + props);

		return new CrewMember(props);
	}

  generateFullName() {
    let syllables = [
      "sym", "aes", "cer", "ceph", "zym", "xym", "rus", "ym", "al", "an", "dic",
      "dor", "ges", "ido", "kre", "via", "xeu", "ze", "usu", "ly"
    ]

    let end_syllables = [
      "us", "os", "lu", "er", "id", "ede", "isto", "ea", "ia", "ra", "ike", "eus",
      "ett", "son", "bell"
    ]

    return _.startCase(_.sample(syllables)) + _.sample(end_syllables);
  }
}

class Shipyard {
	constructor(properties) {
		console.log("created a shipyard")
		this.properties = properties;
		this.shipList = [];
		let tavern = new Tavern(); // hack?
		this.shipTemplate = {
			name: 'prototypeShip',
			speed: 5,
			crewMax: 20,
			food: 0,
			foodMax: 100,
			oxy: 0,
			oxyMax: 100,
			water: 0,
			waterMax: 100,
			captain: tavern.generateCrew(),
			comms: tavern.generateCrew(),
			quartermaster: tavern.generateCrew(),
			navigator: tavern.generateCrew()
		};
	}

	buildShip(properties) {
		console.log("spawning a ship with properties:\n " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}
}

const linearAlgebra$2 = require('linear-algebra')();
const Vector$2 = linearAlgebra$2.Vector;
const Matrix$2 = linearAlgebra$2.Matrix;
class UniverseForge {
	constructor(howMany, x, y, z) {
		this.howMany = howMany;
		this.x = x;
		this.y = y;
		this.z = z;
		this.universe = this.generateUniverse();
	}

	generateVec3() {
		return new Transform(new Matrix$2([
			Math.floor(Math.random() * 2 * this.x) - this.x,
			Math.floor(Math.random() * 2 * this.y) - this.y,
			Math.floor(Math.random() * 2 * this.z) - this.z,
			]));
	}

	generateUniverse() {
		let universe = [];
		for (var i = 0; i < this.howMany; i++) {
			universe.push(this.generateVec3());
		}
		return universe;
	}
}

const linearAlgebra = require('linear-algebra')();
const Vector = linearAlgebra.Vector;
const Matrix = linearAlgebra.Matrix;
class GameManager {
	constructor(args) {
		console.log("constructing game manager")
		this.shipyard = new Shipyard();
		this.ship = this.shipyard.buildShip(this.shipyard.shipTemplate);
		console.log(this.ship);

		this.universe = new UniverseForge(2, 10000, 10000, 10000).universe;
		console.log(this.universe);

		let newPos = this.ship.transform.translateToVector(this.universe[0].position);
		console.log(this.universe[0].position.toArray());
	}

	// we probably want some way to handle real-time loops and
	// async or "jump-ahead" updates
	update (deltaTime) {
		// this.ship.move({direction: this.universe[0].position.toArray(), speed: 1 * deltaTime});
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

document.addEventListener('DOMContentLoaded', function () {
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

// all game functionality routes through the game manager
function update () {
	gm.update(framerate / 1000);
}

function draw () {
	document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;

	let list = '';
	for (var i = gm.universe.length - 1; i >= 0; i--) {
		if (gm.universe[i].position.data[0] == gm.ship.transform.position.data[0] &&
			gm.universe[i].position.data[1] == gm.ship.transform.position.data[1] &&
			gm.universe[i].position.data[2] == gm.ship.transform.position.data[2]
			) { break };
		list += gm.universe[i].position.data;
		list += "\n";
	}

	document.getElementById("destinations").innerHTML = list;
}

setInterval(mainLoop, framerate);
}());
//# sourceMappingURL=app.js.map