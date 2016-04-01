'use strict';

import { Ship } from './ship';
import { Tavern } from "./tavern"

export class Shipyard {
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
