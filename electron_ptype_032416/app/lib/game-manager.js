'use strict';

// const smScript = require ('./ship-manager');
// const sm = new ShipManager();
import ShipManager from './ship-manager';
console.log(ShipManager)

let mainLoop = setInterval(update, 1000 / 60);

let protoShip = shipManager.spawnShip({
		name: 'prototypeShip',
		speed: 5,
		crewMax: 20,
		food: 0,
		foodMax: 100,
		oxy: 0,
		oxyMax: 100,
		water: 0,
		waterMax: 100,
		captain: null,
		comms: null,
		nav: null,
		quartermaster: null
});


function update (deltaTime) {
	timer();
}

function timer () {
	var d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}