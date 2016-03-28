'use strict';

import { Shipyard } from './shipyard';

export class GameManager {
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


